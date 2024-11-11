import { Order } from "../../models/order";

exports.findAll = (req, res) => {
  const orders: Order[] = Order.all();
  
  if (orders.length === 0) {
    res.json({ message: 'No orders found' });
    return;
  }

  res.json(orders);
};

exports.findOne = (req, res) => {
  const { id } = req.query;

  const order: Order | undefined = Order.find(Number(id));

  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }

  res.json(order);
};

exports.create = (req, res) => {
  const { name, email, date_of_creation, date_of_update } = req.query;

  const newOrder: Order = new Order({
    name: name as string,
    email: email as string,
    date_of_creation: date_of_creation as string,
    date_of_update: date_of_update as string
  });

  res.json(newOrder);
};

exports.delete = (req, res) => {
  const { id } = req.query;

  const order: Order | undefined = Order.find(Number(id));

  if (!order) {
    res.json({ message: 'Order not found' });
    return;
  }

  order.remove();

  res.json({ messa: 'Order deleted' });
};

exports.update = (req, res) => {
  const { id, name, email, date_of_update } = req.query;

  if (!id) {
    return res.json({ message: 'Order ID is required' });
  }
  
  const order: Order | undefined = Order.find(Number(id));
  
  if (!order) {
    return res.json({ message: 'Order not found' });
  }
  
  if (name) order.name = name as string;
  if (email) order.email = email as string;
  if (date_of_update) order.date_of_update = date_of_update as string;
  
  res.json(order);
};