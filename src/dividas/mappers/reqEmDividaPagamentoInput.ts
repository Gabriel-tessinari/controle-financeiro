import { validar } from "../../shared/utils/validar";
import { DividaPagamentoInput } from "../models/DividaPagamentoInput";

export const reqEmDividaPagamentoInput = (body: any): DividaPagamentoInput => {
  validaReq(body);

  return {
    dividaId: body.dividaId,
    data: body.data,
    valor: body.valor,
  };
};

function validaReq(body: any): void {
  validar(
    typeof body.dividaId !== "number" || body.dividaId <= 0,
    "Pagamento: Id da dívida inválido."
  );

  validar(!body.data, "Pagamento: data inválida.");

  validar(
    typeof body.valor !== "number" || body.valor <= 0,
    "Pagamento: valor inválido."
  );
}
