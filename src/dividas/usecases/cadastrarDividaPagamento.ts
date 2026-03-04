import { DividaPagamento } from "../models/DividaPagamento";
import { DividaPagamentoInput } from "../models/DividaPagamentoInput";
import { insertPagamento } from "../repositories/dividasPagamentosRepository";

export async function cadastrarDividaPagamento(
  pagamento: DividaPagamentoInput
): Promise<DividaPagamento> {
  const resultado = await insertPagamento(pagamento);
  return resultado;
}
