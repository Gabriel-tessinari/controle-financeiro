import { Router } from "express";
import {
  getDevedores,
  postDevedor,
} from "../devedores/controllers/devedoresController";

const router = Router();

router.get("/", getDevedores);
router.post("/", postDevedor);

export default router;
