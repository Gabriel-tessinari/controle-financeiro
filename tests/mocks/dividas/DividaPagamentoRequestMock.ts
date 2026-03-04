import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaPagamentoRequestMock {
  static criar(sobrescreve = {}) {
    return {
      dividaId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      valor: Aleatorios.getInt(),
      ...sobrescreve,
    };
  }
}
