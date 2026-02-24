import { validar } from "../../shared/utils/validar";
import { DividaInput } from "../models/DividaInput";

export const reqEmDividaInput = (body: any): DividaInput => {
  validaReq(body);

  return {
    devedorId: body.devedorId,
    data: body.data,
    descricao: body.descricao,
    valor: body.valor,
    observacao: body.observacao,
  };
};

function validaReq(body: any): void {
  validar(
    typeof body.devedorId !== "number" || body.devedorId <= 0,
    "Dívida: Id do devedor inválido."
  );

  validar(!body.data, "Dívida: data inválida.");

  validar(
    !body.descricao || typeof body.descricao !== "string",
    "Dívida: descrição não informada."
  );

  validar(
    typeof body.valor !== "number" || body.valor <= 0,
    "Dívida: valor inválido."
  );
}
