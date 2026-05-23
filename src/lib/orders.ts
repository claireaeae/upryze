export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type OrderItem = { id: number; qty: number };

export type Order = {
  orderId: string;
  createdAt: string; // ISO string
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    note?: string;
  };
  items: OrderItem[];
  total: number;
  paymentMethod: "cod";
  status: OrderStatus;
};

const STORAGE_KEY = "upryze_orders";

function readAll(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function saveOrder(order: Omit<Order, "orderId" | "createdAt" | "status">): Order {
  const newOrder: Order = {
    ...order,
    orderId: `UPR-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "pending",
  };
  const orders = readAll();
  writeAll([newOrder, ...orders]);
  return newOrder;
}

export function getOrders(): Order[] {
  return readAll();
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = readAll().map((o) => (o.orderId === orderId ? { ...o, status } : o));
  writeAll(orders);
}

export function deleteOrder(orderId: string): void {
  writeAll(readAll().filter((o) => o.orderId !== orderId));
}

export function getLastOrder(): Order | null {
  const orders = readAll();
  return orders.length > 0 ? orders[0] : null;
}
