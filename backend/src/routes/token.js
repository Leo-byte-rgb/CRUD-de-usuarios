import { Router } from "express";
import token from "../controller/Token";

const router = new Router();

router.post("/", token.store);

export default router;

/*
  index => lista todos os usuários
  store ou create => cria um novo usuário
  delete => apaga um usuário
  show => mostra 1 usuários
  update => atualiza um usuário
*/
