import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaRequestMock {
  static criar(sobrescreve = {}) {
    return {
      devedorId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      descricao: Aleatorios.getString("Descrição"),
      valor: Aleatorios.getInt(),
      observacao: Aleatorios.getString("Observação"),
      ...sobrescreve,
    };
  }
}
