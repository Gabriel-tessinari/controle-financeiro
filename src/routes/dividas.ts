import { Router } from "express";
import {
  getDividasByDevedor,
  postDivida,
  postDividaPagamento,
} from "../dividas/controllers/dividasController";

const router = Router();

router.get("/devedor/:devedorId", getDividasByDevedor);
router.post("/", postDivida);
router.post("/pagamentos", postDividaPagamento);

export default router;
