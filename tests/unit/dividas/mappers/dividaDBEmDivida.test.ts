import { dividaPagamentoDBEmDividaPagamento } from "../../../../src/dividas/mappers/dividaPagamentoDBEmDividaPagamento";
import { DividaPagamentoDBMock } from "../../../mocks/dividas/DividaPagamentoDBMock";

describe("dividaPagamentoDBEmDividaPagamento", () => {
  it("deve mapear um pagamento corretamente", () => {
    const objeto = DividaPagamentoDBMock.criar();

    const resultado = dividaPagamentoDBEmDividaPagamento(objeto);

    expect(resultado).toEqual({
      id: objeto.id,
      dividaId: objeto.divida_id,
      data: objeto.data_pagamento,
      valor: objeto.valor_pago,
    });
  });
});
