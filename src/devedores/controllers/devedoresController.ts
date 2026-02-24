import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { logger } from "../../shared/utils/logger";
import { reqEmDevedorInput } from "../mappers/reqEmDevedorInput";
import { DevedorInput } from "../models/DevedorInput";
import { cadastrarDevedor } from "../usecases/cadastrarDevedor";
import { listarDevedores } from "../usecases/listarDevedores";

export async function getDevedores(req: Request, res: Response): Promise<void> {
  try {
    const devedores = await listarDevedores();

    logger.info({ devedores }, "Lista de Devedores.");

    res.status(200).json(devedores);
  } catch (err) {
    logger.error({ err }, "Erro interno ao listar devedores.");
    res.status(500).json({ error: "Erro ao listar devedores." });
  }
}
export async function postDevedor(req: Request, res: Response): Promise<void> {
  try {
    const compra: DevedorInput = reqEmDevedorInput(req.body);

    const devedorId: number = await cadastrarDevedor(compra);

    logger.info({ devedorId }, "Devedor cadastrado com sucesso.");

    res.status(201).json({
      message: "Devedor cadastrado com sucesso.",
      devedorId,
    });
  } catch (err) {
    if (err instanceof BusinessError) {
      logger.warn({ err }, "Regra de negócio impediu o cadastro do devedor.");
      res.status(400).json({ error: err.message });
    } else {
      logger.error({ err }, "Erro interno ao cadastrar devedor.");
      res.status(500).json({ error: "Erro ao cadastrar devedor." });
    }
  }
}
