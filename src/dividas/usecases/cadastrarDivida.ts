import { Divida } from "../models/Divida";
import { DividaInput } from "../models/DividaInput";
import { insertDivida } from "../repositories/dividasRepository";

export async function cadastrarDivida(divida: DividaInput): Promise<Divida> {
  const resultado = await insertDivida(divida);
  return resultado;
}
