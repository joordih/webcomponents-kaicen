import { Op } from "sequelize";
import { Order } from "../../models/order";

exports.findAll = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    // const searchTerms = req.query.search || null;
    
    // if (!searchTerms) {
    //   const result = await Order.findAndCountAll({
    //     limit, offset, 
    //     include: ['name', 'email', 'createdAt', 'updatedAt'],
    //     paranoid: true
    //   });
    //   res.send(result);
    //   return;
    // }

    // const filters = {
    //   [Op.or]: [
    //     { name: { [Op.like]: `%${searchTerms}%` } },
    //     { email: { [Op.like]: `%${searchTerms}%` } }
    //   ]
    // }

    const result = await Order.findAndCountAll({
       limit: limit,
       offset: offset,
       include: ['name', 'email', 'createdAt', 'updatedAt'],
       paranoid: true
      });

    res.send(result);
  } catch (error) {
    throw new Error('Orders not found');
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.param.id;
    const order: Order | undefined = await Order.findByPk(id);

    res.send(order);
  } catch (error) {
    throw new Error('Order not found');
  }
};

exports.create = async (req, res) => {  
  try {
    const newOrder = await Order.create(req.body);
    res.send(newOrder);
  } catch (error) {
    throw new Error('Order not created');
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.param.id;

    const order: Order | undefined = await Order.findByPk(id);
    order.destroy();

    res.send({ message: 'Order deleted' });
  } catch (error) {
    throw new Error('Order not found');
  }
};

exports.update = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    const order: Order | undefined = await Order.findByPk(Number(id));
    
    order.update({
      name: name,
      email: email
    });

    res.send(order);
  } catch (error) {
    throw new Error('Order not found');
  }
};