import { DevedorInput } from "../../../src/devedores/models/DevedorInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DevedorInputMock {
  static criar(sobrescreve = {}): DevedorInput {
    return {
      nome: Aleatorios.getString("Devedor"),
      ...sobrescreve,
    };
  }
}
