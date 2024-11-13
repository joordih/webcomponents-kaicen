import { Op } from "sequelize";
import Order from "../models/order";

interface IOrderRepository {
  save(order: Order): Promise<Order>;
  getAll(limit?: number, offset?: number, searchTerms?: string ): Promise<{ rows: Order[], count: number }>;
  getById(id: number): Promise<Order | null>;
  delete(id: number): Promise<number>;
  update(Order: Order): Promise<number>;
}

class OrderRepository implements IOrderRepository {
  async save(order: Order): Promise<Order> {
    try {
      return await Order.create({
        name: order.name,
        email: order.email,
        published: order.published
      });
    } catch (error) {
      throw new Error('Error creating order');
    }
  }

  async getAll(limit?: number, offset?: number, searchTerms?: string): Promise<{ rows: Order[]; count: number; }> {
    try {
      if (!searchTerms) {
        return await Order.findAndCountAll({
          limit: limit,
          offset: offset,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
          paranoid: true
        });
      }
  
      const filters = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerms}%` } },
          { email: { [Op.like]: `%${searchTerms}%` } }
        ]
      }
  
      return await Order.findAndCountAll({
        where: filters,
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        paranoid: true
      });
    } catch (error) {
      throw new Error('Error getting orders');
    }
  }
  async getById(id: number): Promise<Order | null> {
    try {
      return await Order.findByPk(id);
    } catch (error) {
      throw new Error("Error getting order by id");
    }
  }
  async delete(id: number): Promise<number> {
    try {
      const affectedRows = await Order.destroy({ where: { id } });

      return affectedRows;
    } catch (error) {
      throw new Error("Error deleting order");
    }
  }
  async update(Order: Order): Promise<number> {
    const { id, name, email, createdAt, updatedAt } = Order;
    
    try {
      const affectedRows = await Order.update(
        { name, email, createdAt, updatedAt },
         { where: { id } }
      );
      
      return affectedRows[0];
    } catch (error) {
      throw new Error("Error updating order");
    }
  }
}

export default new OrderRepository();