import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import User from "../models/user";

export default class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({
        name,
        email,
        password
      });
      res.send(newUser);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.params.limit) || 5;
      const offset = parseInt(req.params.offset) || 0;
      
      const searchTerms = req.query.search || null;

      if (!searchTerms) {
        const result = await User.findAndCountAll({
          limit: limit,
          offset: offset,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
          paranoid: true
        });
        res.send(result);
        return;
      }

      const filters = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerms}%` } },
          { email: { [Op.like]: `%${searchTerms}%` } }
        ]
      }

      const result = await User.findAndCountAll({
        where: filters,
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        paranoid: true
      });

      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id);

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await user.destroy();
      res.send({ message: 'User deleted' });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, name, email, password } = req.body;

      const user = await User.findByPk(Number(id));

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await user.update({
        name,
        email,
        password
      });

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
}