import express, { Express, Router } from 'express';
import { Order } from './models/order';
import cors from 'cors';

const router: Router = express.Router();
const app: Express = express();

app.use(cors());
app.use(express.json());

router.get('/', (req, res) => {
  const orders: Order[] = Order.all();

  if (orders.length === 0) {
    res.status(404).json({ message: 'No orders found' });
    return;
  }

  res.json(orders);
});

router.get('/create', (req, res) => {
  const { name, email, date_of_creation, date_of_update } = req.query;

  const newOrder: Order = new Order({
    name: name as string,
    email: email as string,
    date_of_creation: date_of_creation as string,
    date_of_update: date_of_update as string
  });

  res.json(newOrder);
});

router.get('/delete', (req, res) => {
  const { id } = req.query;

  const order: Order | undefined = Order.find(Number(id));

  if (!order) {
    res.json({ message: 'Order not found' });
    return;
  }

  order.remove();

  res.json({ messa: 'Order deleted' });
})

router.get('/', (req, res) => {
  const orders: Order[] = Order.all();

  if (orders.length === 0) {
    res.status(404).json({ message: 'No orders found' });
    return;
  }

  res.json(orders);
});

app.use('/admin/orders', router);

app.listen(8080, () => { console.log('Server is running on port 8080'); });