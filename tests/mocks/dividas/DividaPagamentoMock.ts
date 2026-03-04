import { DividaPagamento } from "../../../src/dividas/models/DividaPagamento";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaPagamentoMock {
  static criar(sobrescreve = {}): DividaPagamento {
    return {
      id: Aleatorios.getInt(),
      dividaId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      valor: Aleatorios.getInt(),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2): DividaPagamento[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
