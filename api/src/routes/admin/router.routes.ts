import { Router } from "express";
import RouterController from "@controllers/router.controller";

class RouterRoutes {
  router = Router();
  controller = new RouterController();

  constructor () {
    this.initializeRoutes();
  } 

  initializeRoutes() {
    this.router.get('/', this.controller.findAll);
  }
}

export default new RouterRoutes().router;