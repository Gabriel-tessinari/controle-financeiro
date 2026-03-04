import * as controller from "../../../../src/dividas/controllers/dividasController";
import { reqEmDividaInput } from "../../../../src/dividas/mappers/reqEmDividaInput";
import { reqEmDividaPagamentoInput } from "../../../../src/dividas/mappers/reqEmDividaPagamentoInput";
import { cadastrarDivida } from "../../../../src/dividas/usecases/cadastrarDivida";
import { cadastrarDividaPagamento } from "../../../../src/dividas/usecases/cadastrarDividaPagamento";
import { listarDividasPorDevedor } from "../../../../src/dividas/usecases/listarDividasPorDevedor";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { DividaInputMock } from "../../../mocks/dividas/DividaInputMock";
import { DividaMock } from "../../../mocks/dividas/DividaMock";
import { DividaPagamentoInputMock } from "../../../mocks/dividas/DividaPagamentoInputMock";
import { DividaPagamentoMock } from "../../../mocks/dividas/DividaPagamentoMock";

jest.mock("../../../../src/dividas/mappers/reqEmDividaInput");
jest.mock("../../../../src/dividas/mappers/reqEmDividaPagamentoInput");
jest.mock("../../../../src/dividas/usecases/cadastrarDivida");
jest.mock("../../../../src/dividas/usecases/listarDividasPorDevedor");
jest.mock("../../../../src/dividas/usecases/cadastrarDividaPagamento");

describe("dividasController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getDividasByDevedor", () => {
    it("deve retornar lista de dívidas", async () => {
      req = { params: { devedorId: "1" } };
      const dividas = DividaMock.criarLista();

      (listarDividasPorDevedor as jest.Mock).mockResolvedValue(dividas);

      await controller.getDividasByDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(dividas);
    });

    it("deve retornar 400 em caso de id de devedor inválido", async () => {
      req = { params: { devedorId: "inválido" } };

      await controller.getDividasByDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "O ID do devedor deve ser um número inteiro válido.",
      });
      expect(listarDividasPorDevedor).toHaveBeenCalledTimes(0);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (listarDividasPorDevedor as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.getDividasByDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao listar dívidas.",
      });
    });
  });

  describe("postDivida", () => {
    it("deve retornar 201 ao cadastrar dívida", async () => {
      const divida = DividaMock.criar();

      (reqEmDividaInput as jest.Mock).mockReturnValue(DividaInputMock.criar());
      (cadastrarDivida as jest.Mock).mockResolvedValue(divida);

      await controller.postDivida(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(divida);
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmDividaInput as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Erro de negócio.");
      });

      await controller.postDivida(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro de negócio." });
      expect(cadastrarDivida).toHaveBeenCalledTimes(0);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (reqEmDividaInput as jest.Mock).mockReturnValue(DividaInputMock.criar());
      (cadastrarDivida as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.postDivida(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao cadastrar dívida.",
      });
    });
  });

  describe("postDividaPagamento", () => {
    it("deve retornar 201 ao cadastrar pagamento", async () => {
      const pagamento = DividaPagamentoMock.criar();

      (reqEmDividaPagamentoInput as jest.Mock).mockReturnValue(
        DividaPagamentoInputMock.criar()
      );
      (cadastrarDividaPagamento as jest.Mock).mockResolvedValue(pagamento);

      await controller.postDividaPagamento(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(pagamento);
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmDividaPagamentoInput as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Erro de negócio.");
      });

      await controller.postDividaPagamento(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro de negócio." });
      expect(cadastrarDivida).toHaveBeenCalledTimes(0);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (reqEmDividaPagamentoInput as jest.Mock).mockReturnValue(
        DividaPagamentoInputMock.criar()
      );
      (cadastrarDividaPagamento as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.postDividaPagamento(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao cadastrar pagamento.",
      });
    });
  });
});
