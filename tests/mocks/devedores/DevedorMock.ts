import { Devedor } from "../../../src/devedores/models/Devedor";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DevedorMock {
  static criar(sobrescreve = {}): Devedor {
    return {
      id: Aleatorios.getInt(),
      nome: Aleatorios.getString("Devedor"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2): Devedor[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
