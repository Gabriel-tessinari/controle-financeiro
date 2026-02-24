import * as controller from "../../../../src/devedores/controllers/devedoresController";
import { reqEmDevedorInput } from "../../../../src/devedores/mappers/reqEmDevedorInput";
import { cadastrarDevedor } from "../../../../src/devedores/usecases/cadastrarDevedor";
import { listarDevedores } from "../../../../src/devedores/usecases/listarDevedores";
import { BusinessError } from "../../../../src/shared/errors/BusinessError";
import { DevedorInputMock } from "../../../mocks/devedores/DevedorInputMock";
import { DevedorMock } from "../../../mocks/devedores/DevedorMock";
import { DevedorRequestMock } from "../../../mocks/devedores/DevedorRequestMock";

jest.mock("../../../../src/devedores/mappers/reqEmDevedorInput");
jest.mock("../../../../src/devedores/usecases/cadastrarDevedor");
jest.mock("../../../../src/devedores/usecases/listarDevedores");

describe("devedoresController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: DevedorRequestMock.criar() };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getDevedores", () => {
    it("deve retornar lista de devedores", async () => {
      const devedores = DevedorMock.criarLista();

      (listarDevedores as jest.Mock).mockResolvedValue(devedores);

      await controller.getDevedores(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(devedores);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (listarDevedores as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.getDevedores(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao listar devedores.",
      });
    });
  });

  describe("postDevedor", () => {
    it("deve retornar 201 ao cadastrar devedor", async () => {
      (reqEmDevedorInput as jest.Mock).mockReturnValue(
        DevedorInputMock.criar()
      );
      (cadastrarDevedor as jest.Mock).mockResolvedValue(18);

      await controller.postDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Devedor cadastrado com sucesso.",
        devedorId: 18,
      });
    });

    it("deve retornar 400 em caso de BusinessError", async () => {
      (reqEmDevedorInput as jest.Mock).mockImplementation(() => {
        throw new BusinessError("Erro de negócio.");
      });

      await controller.postDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Erro de negócio." });
      expect(cadastrarDevedor).toHaveBeenCalledTimes(0);
    });

    it("deve retornar 500 em caso de erro", async () => {
      (reqEmDevedorInput as jest.Mock).mockReturnValue(
        DevedorInputMock.criar()
      );
      (cadastrarDevedor as jest.Mock).mockRejectedValue(
        new Error("Erro genérico.")
      );

      await controller.postDevedor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Erro ao cadastrar devedor.",
      });
    });
  });
});
