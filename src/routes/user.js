import { Router } from "express";
import UserController from "../controller/userController";
import auth from "../middlewares/auth";
const router = new Router();

router.post("/create", UserController.store);
router.get("/index", auth, UserController.index);
router.get("/show/:id", UserController.showUser);
router.delete("/delete/:id", auth, UserController.deleteUser);
router.put("/update/:id", auth, UserController.updateUser);
export default router;

/*
  index => lista todos os usuários
  store ou create => cria um novo usuário
  delete => apaga um usuário
  show => mostra 1 usuários
  update => atualiza um usuário
*/
