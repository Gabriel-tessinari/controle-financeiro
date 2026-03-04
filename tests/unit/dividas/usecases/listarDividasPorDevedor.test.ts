const clientMock = {
  query: jest.fn(),
  release: jest.fn(),
};

jest.mock("../../../../src/db", () => {
  const client = clientMock;
  const mockPool = {
    connect: jest.fn().mockResolvedValue(client),
  };

  return {
    __esModule: true,
    pool: mockPool,
    client,
    default: mockPool,
  };
});

import { pool } from "../../../../src/db";
import { selectPagamentosByDivida } from "../../../../src/dividas/repositories/dividasPagamentosRepository";
import { selectDividasByDevedor } from "../../../../src/dividas/repositories/dividasRepository";
import { listarDividasPorDevedor } from "../../../../src/dividas/usecases/listarDividasPorDevedor";
import { Aleatorios } from "../../../../src/shared/utils/aleatorio";
import { DividaMock } from "../../../mocks/dividas/DividaMock";
import { DividaPagamentoMock } from "../../../mocks/dividas/DividaPagamentoMock";

const dbMock = jest.requireMock("../../../../src/db") as {
  pool: { connect: jest.Mock };
  client: { query: jest.Mock; release: jest.Mock };
  default: any;
};
const client = dbMock.client;

jest.mock("../../../../src/dividas/repositories/dividasRepository");
jest.mock("../../../../src/dividas/repositories/dividasPagamentosRepository");

describe("usecase listarDividasPorDevedor (transação completa)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (pool.connect as jest.Mock).mockResolvedValue(client);
  });

  it("deve fazer COMMIT e retornar lista de dívidas de um devedor quando tudo ocorrer bem", async () => {
    const dividas = DividaMock.criarLista(1);
    const pagamentos = DividaPagamentoMock.criarLista(1);
    const devedorId = Aleatorios.getInt();

    (selectDividasByDevedor as jest.Mock).mockResolvedValue(dividas);
    (selectPagamentosByDivida as jest.Mock).mockResolvedValue(pagamentos);

    const resultado = await listarDividasPorDevedor(devedorId);

    expect(resultado).toStrictEqual([{ ...dividas[0], pagamentos }]);
    expect(client.query.mock.calls).toEqual([["BEGIN"], ["COMMIT"]]);
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se selectDividasByDevedor lançar erro", async () => {
    const devedorId = Aleatorios.getInt();

    (selectDividasByDevedor as jest.Mock).mockRejectedValue(
      new Error("Erro em selectDividasByDevedor")
    );

    await expect(listarDividasPorDevedor(devedorId)).rejects.toThrow(
      "Erro em selectDividasByDevedor"
    );
    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(selectPagamentosByDivida).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalled();
  });

  it("deve fazer ROLLBACK se selectPagamentosByDivida lançar erro", async () => {
    const devedorId = Aleatorios.getInt();
    const dividas = DividaMock.criarLista(1);

    (selectDividasByDevedor as jest.Mock).mockResolvedValue(dividas);
    (selectPagamentosByDivida as jest.Mock).mockRejectedValue(
      new Error("Erro em selectPagamentosByDivida")
    );

    await expect(listarDividasPorDevedor(devedorId)).rejects.toThrow(
      "Erro em selectPagamentosByDivida"
    );
    expect(client.query.mock.calls).toEqual([["BEGIN"], ["ROLLBACK"]]);
    expect(client.release).toHaveBeenCalled();
  });
});
