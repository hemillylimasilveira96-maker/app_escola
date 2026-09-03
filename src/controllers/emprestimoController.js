import { Router } from "express";
import emprestimoController from "./_emprestimoController.js";

const router = Router();

router.get("/emprestimos", emprestimoController.index);
router.post("/emprestimos", emprestimoController.cadastrarEmprestimo);

export default router;
