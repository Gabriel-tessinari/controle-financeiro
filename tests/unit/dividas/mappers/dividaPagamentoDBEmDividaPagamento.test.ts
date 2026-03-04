import { dividaDBEmDivida } from "../../../../src/dividas/mappers/dividaDBEmDivida";
import { DividaDBMock } from "../../../mocks/dividas/DividaDBMock";

describe("dividaDBEmDivida", () => {
  it("deve mapear uma dívida corretamente", () => {
    const objeto = DividaDBMock.criar();

    const resultado = dividaDBEmDivida(objeto);

    expect(resultado).toEqual({
      id: objeto.id,
      devedorId: objeto.devedor_id,
      data: objeto.data_divida,
      descricao: objeto.descricao,
      valor: objeto.valor,
      observacao: objeto.observacao,
      pagamentos: [],
    });
  });
});
