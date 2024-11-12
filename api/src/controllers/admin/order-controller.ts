import { Op } from "sequelize";
import { Order } from "../../models/order";

exports.findAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.params.limit) || 5;
    const offset = parseInt(req.params.offset) || 0;

    const searchTerms = req.query.search || null;

    if (!searchTerms) {
      const result = await Order.findAndCountAll({
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

    const result = await Order.findAndCountAll({
      where: filters,
      limit: limit,
      offset: offset,
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      paranoid: true
    });

    res.send(result);
  } catch (error) {
    next(error)
  }
};

exports.size = async (req, res, next) => {
  try {
    const count = await Order.findAll({ paranoid: true });
    res.send({ count: count.length });
  } catch (error) {
    next(error)
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

exports.create = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    console.log(newOrder);
    res.send(newOrder);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order: Order | undefined = await Order.findByPk(id);
    order.destroy();

    res.send({ message: 'Order deleted' });
  } catch (error) {
    next(error);
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