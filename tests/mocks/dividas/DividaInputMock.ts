import { DividaInput } from "../../../src/dividas/models/DividaInput";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaInputMock {
  static criar(sobrescreve = {}): DividaInput {
    return {
      devedorId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      descricao: Aleatorios.getString("Descrição"),
      valor: Aleatorios.getInt(),
      observacao: Aleatorios.getString("Observação"),
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2): DividaInput[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
