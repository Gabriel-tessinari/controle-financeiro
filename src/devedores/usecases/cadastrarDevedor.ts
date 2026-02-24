import { DevedorInput } from "../models/DevedorInput";
import { insertDevedor } from "../repositories/devedoresRepository";

export async function cadastrarDevedor(devedor: DevedorInput): Promise<number> {
  const devedorId = await insertDevedor(devedor);
  return devedorId;
}
