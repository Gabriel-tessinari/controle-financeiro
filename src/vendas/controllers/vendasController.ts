import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { reqEmVendaInput } from "../mappers/reqEmVendaInput";
export async function postVendaComItensEPagamentos(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const venda = reqEmVendaInput(req.body);

    const vendaId = await cadastrarVendaComItensEPagamentos(venda);

    res.status(201).json({
      message: "Venda cadastrada com sucesso.",
      vendaId,
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      res.status(400).json({ error: err.message });
    } else {
      console.error("Erro ao cadastrar venda:", err);
      res.status(500).json({ error: "Erro ao cadastrar venda." });
    }
  }
}
