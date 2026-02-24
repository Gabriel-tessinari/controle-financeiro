import { DividaPagamento } from "./DividaPagamento";

export interface Divida {
  id: number;
  devedorId: number;
  data: Date;
  descricao: string;
  valor: number;
  observacao: string;
  pagamentos: DividaPagamento[];
}
