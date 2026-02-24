import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DevedorRequestMock {
  static criar(sobrescreve = {}) {
    return {
      nome: Aleatorios.getString("Devedor"),
      ...sobrescreve,
    };
  }
}
