import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      devedor_id: Aleatorios.getInt(),
      data_divida: Aleatorios.getData(),
      descricao: Aleatorios.getString("Descrição"),
      valor: Aleatorios.getInt(),
      observacao: Aleatorios.getString("Observação"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
