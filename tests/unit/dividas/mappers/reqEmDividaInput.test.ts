import { reqEmDividaInput } from "../../../../src/dividas/mappers/reqEmDividaInput";
import { DividaInputMock } from "../../../mocks/dividas/DividaInputMock";

describe("reqEmDividaInput", () => {
  it("deve mapear uma dívida input corretamente", () => {
    const objeto = DividaInputMock.criar();
    const req = { body: objeto };

    const resultado = reqEmDividaInput(req.body);

    expect(resultado).toEqual({
      devedorId: objeto.devedorId,
      data: objeto.data,
      descricao: objeto.descricao,
      valor: objeto.valor,
      observacao: objeto.observacao,
    });
  });
});
