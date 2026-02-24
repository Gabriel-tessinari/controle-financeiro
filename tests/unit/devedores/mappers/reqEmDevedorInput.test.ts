import { reqEmDevedorInput } from "../../../../src/devedores/mappers/reqEmDevedorInput";
import { DevedorInputMock } from "../../../mocks/devedores/DevedorInputMock";

describe("reqEmDevedorInput", () => {
  it("deve mapear um devedor input corretamente", () => {
    const objeto = DevedorInputMock.criar();
    const req = { body: objeto };

    const resultado = reqEmDevedorInput(req.body);

    expect(resultado).toEqual({
      nome: objeto.nome,
    });
  });
});
