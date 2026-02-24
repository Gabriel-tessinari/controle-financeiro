import { Devedor } from "../models/Devedor";

export function devedorDBEmDevedor(row: any): Devedor {
  return {
    id: row.id,
    nome: row.nome,
  };
}
