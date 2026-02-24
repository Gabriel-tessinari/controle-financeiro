import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DevedorDBMock {
  static criar(sobrescreve = {}) {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Devedor"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2) {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
