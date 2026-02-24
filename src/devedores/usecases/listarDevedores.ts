import { Devedor } from "../models/Devedor";
import { selectDevedores } from "../repositories/devedoresRepository";

export async function listarDevedores(): Promise<Devedor[]> {
  const devedores = await selectDevedores();
  return devedores;
}
