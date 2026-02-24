import pool from "../../db";
import { dividaDBEmDivida } from "../mappers/dividaDBEmDivida";
import { Divida } from "../models/Divida";
import { DividaInput } from "../models/DividaInput";

export async function insertDivida(
  divida: DividaInput,
  client?: any
): Promise<Divida> {
  const executor = client || pool;

  const query = `
    INSERT INTO dividas (devedor_id, data_divida, descricao, valor, observacao)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    divida.devedorId,
    divida.data,
    divida.descricao,
    divida.valor,
    divida.observacao,
  ];

  const result = await executor.query(query, values);
  return dividaDBEmDivida(result.rows[0]);
}

export async function selectDividasByDevedor(
  devedorId: number,
  client?: any
): Promise<Divida[]> {
  const executor = client || pool;

  const query = `SELECT * FROM dividas WHERE devedor_id = $1 ORDER BY id`;

  const values = [devedorId];

  const result = await executor.query(query, values);
  return result.rows.map(dividaDBEmDivida);
}
