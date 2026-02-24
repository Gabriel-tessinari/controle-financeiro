import { Divida } from "../models/Divida";

export function dividaDBEmDivida(row: any): Divida {
  return {
    id: row.id,
    devedorId: row.devedor_id,
    data: row.data_divida,
    descricao: row.descricao,
    valor: row.valor,
    observacao: row.observacao,
    pagamentos: [],
  };
}
