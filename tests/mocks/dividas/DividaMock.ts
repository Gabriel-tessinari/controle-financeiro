import { Divida } from "../../../src/dividas/models/Divida";
import { Aleatorios } from "../../../src/shared/utils/aleatorio";

export class DividaMock {
  static criar(sobrescreve = {}): Divida {
    return {
      id: Aleatorios.getInt(),
      devedorId: Aleatorios.getInt(),
      data: Aleatorios.getData(),
      descricao: Aleatorios.getString("Descrição"),
      valor: Aleatorios.getInt(),
      observacao: Aleatorios.getString("Observação"),
      pagamentos: [],
      ...sobrescreve,
    };
  }

  static criarLista(qtd = 2): Divida[] {
    return Array.from({ length: qtd }, () => this.criar());
  }
}
