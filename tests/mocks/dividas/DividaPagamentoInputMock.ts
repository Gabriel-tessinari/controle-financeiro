import { DividaPagamentoInput } from "../../../src/dividas/models/DividaPagamentoInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaPagamentoInputMock {
  static criar(sobrescreve = {}): DividaPagamentoInput {
    return {
      dividaId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      valor: Aleatorios.getInt(),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2): DividaPagamentoInput[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
