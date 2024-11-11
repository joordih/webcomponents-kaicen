interface OrderParameters {
  id?: number;
  name: string;
  email: string;
  date_of_creation: string;
  date_of_update: string;
}

interface Order extends OrderParameters { };

class Order {
  public static orders: Order[] = [];

  constructor(parameters: OrderParameters) {
    Object.assign<this, OrderParameters>(this, {
      id: Order.all().length + 1,
      date_of_creation: new Date(parameters.date_of_creation),
      date_of_update: new Date(parameters.date_of_update),
      ...parameters
    });

    Order.orders.push(this);
  }

  public remove(): void {
    const index: number = Order.orders.findIndex(order => order.id === this.id);

    if (index === -1) {
      return;
    }

    Order.orders.splice(index, 1);
  }

  public save(): void {
    const index: number = Order.orders.findIndex(order => order.id === this.id);

    if (index === -1) {
      return;
    }

    Order.orders[index] = this;
  }
  
  public static find(id: number): Order | undefined {
    return Order.orders.find(order => order.id === id);
  }

  public static all(): Order[] {
    return Order.orders;
  }
}

export { Order };