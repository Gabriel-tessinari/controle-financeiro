import { Request, Response } from "express";
import { BusinessError } from "../../shared/errors/BusinessError";
import { logger } from "../../shared/utils/logger";
import { reqEmDividaInput } from "../mappers/reqEmDividaInput";
import { reqEmDividaPagamentoInput } from "../mappers/reqEmDividaPagamentoInput";
import { DividaInput } from "../models/DividaInput";
import { DividaPagamentoInput } from "../models/DividaPagamentoInput";
import { cadastrarDivida } from "../usecases/cadastrarDivida";
import { cadastrardividaPagamento } from "../usecases/cadastrarDividaPagamento";
import { listarDividasPorDevedor } from "../usecases/listarDividasPorDevedor";

export async function getDividasByDevedor(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { devedorId } = req.params;
    const id: number = parseInt(devedorId);

    if (isNaN(id) || id <= 0) {
      logger.warn(
        { devedorId },
        "Erro ao listar dívidas por devedor: id inválido."
      );
      res
        .status(400)
        .json({ error: "O ID do devedor deve ser um número inteiro válido." });
      return;
    }

    const dividas = await listarDividasPorDevedor(id);

    logger.info({ dividas }, "Lista de Dívidas.");

    res.status(200).json(dividas);
  } catch (err) {
    logger.error({ err }, "Erro interno ao listar dívidas.");
    res.status(500).json({ error: "Erro ao listar dívidas." });
  }
}

export async function postDivida(req: Request, res: Response): Promise<void> {
  try {
    const divida: DividaInput = reqEmDividaInput(req.body);

    const resultado = await cadastrarDivida(divida);

    logger.info({ resultado }, "Dívida cadastrada com sucesso.");

    res.status(201).json(resultado);
  } catch (err) {
    if (err instanceof BusinessError) {
      logger.warn({ err }, "Regra de negócio impediu o cadastro da dívida.");
      res.status(400).json({ error: err.message });
    } else {
      logger.error({ err }, "Erro interno ao cadastrar dívida.");
      res.status(500).json({ error: "Erro ao cadastrar dívida." });
    }
  }
}

export async function postDividaPagamento(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const pagamento: DividaPagamentoInput = reqEmDividaPagamentoInput(req.body);

    const resultado = await cadastrardividaPagamento(pagamento);

    logger.info({ resultado }, "Pagamento cadastrado com sucesso.");

    res.status(201).json(resultado);
  } catch (err) {
    if (err instanceof BusinessError) {
      logger.warn({ err }, "Regra de negócio impediu o cadastro do pagamento.");
      res.status(400).json({ error: err.message });
    } else {
      logger.error({ err }, "Erro interno ao cadastrar pagamento.");
      res.status(500).json({ error: "Erro ao cadastrar pagamento." });
    }
  }
}
