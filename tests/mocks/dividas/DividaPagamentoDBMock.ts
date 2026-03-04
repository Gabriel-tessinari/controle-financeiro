import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaPagamentoDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      divida_id: Aleatorios.getInt(),
      data_pagamento: Aleatorios.getData(),
      valor_pago: Aleatorios.getInt(),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
