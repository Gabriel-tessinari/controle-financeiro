import { StatusPagamento } from "../../shared/types/StatusPagamento";
import { CompraItemInput } from "./CompraItemInput";
import { CompraPagamentoInput } from "./CompraPagamentoInput";

export interface CompraInput {
  fornecedorId: number;
  dataCompra: string;
  frete: number;
  outrasTaxas: number;
  itens: CompraItemInput[];
  pagamentos: CompraPagamentoInput[];
  statusPagamento: StatusPagamento;
}
