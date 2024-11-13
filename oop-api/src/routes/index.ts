import { Request, Response, NextFunction, Application } from "express";
import orderRoutes from "./orders.routes";
import usersRoute from "./users.route";

export default class Route {
  constructor(app: Application) {
    app.use('/api/admin/orders', orderRoutes);
    app.use('/api/admin/users', usersRoute);

    app.use((err, req, res, next) => {
      if (err instanceof TypeError && err.message.includes('circular structure')) {
        console.error('Error de serialización:', err);
        return res.status(500).json({
          error: 'Error interno del servidor',
          message: 'No se pudo procesar la respuesta'
        });
      }
      next(err);
    });
  }
}