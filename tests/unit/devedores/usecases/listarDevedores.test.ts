import { selectDevedores } from "../../../../src/devedores/repositories/devedoresRepository";
import { listarDevedores } from "../../../../src/devedores/usecases/listarDevedores";
import { DevedorMock } from "../../../mocks/devedores/DevedorMock";

jest.mock("../../../../src/devedores/repositories/devedoresRepository");

describe("listarDevedores", () => {
  it("deve retornar lista de devedores", async () => {
    const devedores = DevedorMock.criarLista(1);

    (selectDevedores as jest.Mock).mockResolvedValue(devedores);

    const resultado = await listarDevedores();

    expect(resultado).toStrictEqual(devedores);
  });
});
