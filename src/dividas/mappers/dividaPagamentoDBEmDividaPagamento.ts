import { DividaPagamento } from "../models/DividaPagamento";

export function dividaPagamentoDBEmDividaPagamento(row: any): DividaPagamento {
  return {
    id: row.id,
    dividaId: row.divida_id,
    data: row.data_pagamento,
    valor: row.valor_pago,
  };
}
