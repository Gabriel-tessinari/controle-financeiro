import pool from "../../db";
import { devedorDBEmDevedor } from "../mappers/devedorDBEmDevedor";
import { Devedor } from "../models/Devedor";
import { DevedorInput } from "../models/DevedorInput";

export async function insertDevedor(
  devedor: DevedorInput,
  client?: any
): Promise<number> {
  const executor = client || pool;

  const query = `
    INSERT INTO devedores (nome)
    VALUES ($1)
    RETURNING id
  `;

  const values = [devedor.nome];

  const result = await executor.query(query, values);
  return result.rows[0].id;
}

export async function selectDevedores(client?: any): Promise<Devedor[]> {
  const executor = client || pool;

  const query = `SELECT * FROM devedores ORDER BY id`;

  const result = await executor.query(query);
  return result.rows.map(devedorDBEmDevedor);
}
