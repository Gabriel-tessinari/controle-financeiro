import { FormaPagamento } from "../../shared/types/FormaPagamento";
import { StatusParcela } from "../../shared/types/StatusParcela";

export interface VendaPagamentoInput {
  dataPagamento: string;
  valorPago: number;
  formaPagamento: FormaPagamento;
  statusParcela: StatusParcela;
  observacao?: string;
}
