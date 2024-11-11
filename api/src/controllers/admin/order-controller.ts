import { Order } from "../../models/order";

exports.findAll = async (req, res) => {
  const orders: Order[] = await Order.findAll({ paranoid: true });
  
  if (orders.length === 0) {
    res.status(404).json({ message: 'No orders found' });
    return;
  }

  res.json(orders);
};

exports.findOne = async (req, res) => {
  const { id } = req.query;

  const order: Order | undefined = await Order.findByPk(Number(id));

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  res.json(order);
};

exports.create = async (req, res) => {
  const { name, email } = req.body;
  
  const newOrder = await Order.create({
    name: name,
    email: email
  });

  res.json(newOrder);
};

exports.delete = async (req, res) => {
  const { id } = req.query;

  const order: Order | undefined = await Order.findByPk(Number(id));

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  order.destroy();

  res.json({ messa: 'Order deleted' });
};

exports.update = async (req, res) => {
  const { id, name, email } = req.body;

  if (!id) {
    return res.json({ message: 'Order ID is required' });
  }
  
  const order: Order | undefined = await Order.findByPk(Number(id));
  
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  
  order.update({
    name: name,
    email: email
  });

  res.json(order);
};