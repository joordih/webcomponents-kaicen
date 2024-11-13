import { Application } from "express";
import orderRoutes from "./orders.routes";
import usersRoute from "./users.route";

export default class Route {
  constructor (app: Application) {
    app.use('/api/admin/orders', orderRoutes);
    app.use('/api/admin/users', usersRoute);

    app.use((err, req, res, next) => {
      res.status(500).send({
        error: true,
        message: err.message || 'Error interno del servidor',
        request: req,
        stack: err.stack
      });
    });
  }
}