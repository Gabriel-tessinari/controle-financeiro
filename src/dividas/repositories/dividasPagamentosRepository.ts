import pool from "../../db";
import { dividaPagamentoDBEmDividaPagamento } from "../mappers/dividaPagamentoDBEmDividaPagamento";
import { DividaPagamento } from "../models/DividaPagamento";
import { DividaPagamentoInput } from "../models/DividaPagamentoInput";

export async function insertPagamento(
  dividaPagamento: DividaPagamentoInput,
  client?: any
): Promise<DividaPagamento> {
  const executor = client || pool;

  const query = `
    INSERT INTO pagamentos (divida_id, data_pagamento, valor_pago)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    dividaPagamento.dividaId,
    dividaPagamento.data,
    dividaPagamento.valor,
  ];

  const result = await executor.query(query, values);
  return dividaPagamentoDBEmDividaPagamento(result.rows[0]);
}

export async function selectPagamentosByDivida(
  dividaId: number,
  client?: any
): Promise<DividaPagamento[]> {
  const executor = client || pool;

  const query = `SELECT * FROM pagamentos WHERE divida_id = $1 ORDER BY data_pagamento`;

  const values = [dividaId];

  const result = await executor.query(query, values);
  return result.rows.map(dividaPagamentoDBEmDividaPagamento);
}
