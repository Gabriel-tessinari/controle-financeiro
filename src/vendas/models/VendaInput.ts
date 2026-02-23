import { StatusPagamento } from "../../shared/types/StatusPagamento";
import { VendaItemInput } from "./VendaItemInput";
import { VendaPagamentoInput } from "./VendaPagamentoInput";

export interface VendaInput {
  fornecedorId: number;
  dataVenda: string;
  frete: number;
  outrasTaxas: number;
  itens: VendaItemInput[];
  pagamentos: VendaPagamentoInput[];
  statusPagamento: StatusPagamento;
}
