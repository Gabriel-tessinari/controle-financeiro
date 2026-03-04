import { reqEmDividaPagamentoInput } from "../../../../src/dividas/mappers/reqEmDividaPagamentoInput";
import { DividaPagamentoInputMock } from "../../../mocks/dividas/DividaPagamentoInputMock";

describe("reqEmDividaPagamentoInput", () => {
  it("deve mapear um pagamento input corretamente", () => {
    const objeto = DividaPagamentoInputMock.criar();
    const req = { body: objeto };

    const resultado = reqEmDividaPagamentoInput(req.body);

    expect(resultado).toEqual({
      dividaId: objeto.dividaId,
      data: objeto.data,
      valor: objeto.valor,
    });
  });
});
