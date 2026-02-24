import { devedorDBEmDevedor } from "../../../../src/devedores/mappers/devedorDBEmDevedor";
import { DevedorDBMock } from "../../../mocks/devedores/DevedorDBMock";

describe("devedorDBEmDevedor", () => {
  it("deve mapear um devedor corretamente", () => {
    const objeto = DevedorDBMock.criar();

    const resultado = devedorDBEmDevedor(objeto);

    expect(resultado).toEqual({
      id: objeto.id,
      nome: objeto.nome,
    });
  });
});
