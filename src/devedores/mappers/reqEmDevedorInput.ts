import { validar } from "../../shared/utils/validar";
import { DevedorInput } from "../models/DevedorInput";

export const reqEmDevedorInput = (body: any): DevedorInput => {
  validaReq(body);

  return {
    nome: body.nome,
  };
};

function validaReq(body: any): void {
  validar(!body.nome, "Devedor: nome não informado.");
}
