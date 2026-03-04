import { insertPagamento } from "../../../../src/dividas/repositories/dividasPagamentosRepository";
import { cadastrarDividaPagamento } from "../../../../src/dividas/usecases/cadastrarDividaPagamento";
import { DividaPagamentoInputMock } from "../../../mocks/dividas/DividaPagamentoInputMock";
import { DividaPagamentoMock } from "../../../mocks/dividas/DividaPagamentoMock";

jest.mock("../../../../src/dividas/repositories/dividasPagamentosRepository");

describe("cadastrarDividaPagamento", () => {
  it("deve cadastrar pagamento", async () => {
    const input = DividaPagamentoInputMock.criar();
    const pagamento = DividaPagamentoMock.criar();

    (insertPagamento as jest.Mock).mockResolvedValue(pagamento);

    const response = await cadastrarDividaPagamento(input);

    expect(response).toStrictEqual(pagamento);
  });
});
