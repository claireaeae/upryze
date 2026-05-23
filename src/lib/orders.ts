import { supabase } from "./supabase";

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

// Helper to map DB row back to the Frontend structure
function mapRowToOrder(row: any): Order {
  return {
    orderId: row.orderId,
    createdAt: row.createdAt,
    customer: {
      name: row.customerName,
      email: row.customerEmail,
      phone: row.customerPhone,
      address: row.customerAddress,
      city: row.customerCity,
      note: row.customerNote,
    },
    items: row.items as OrderItem[],
    total: row.total,
    paymentMethod: row.paymentMethod as "cod",
    status: row.status as OrderStatus,
  };
}

export async function saveOrder(order: Omit<Order, "orderId" | "createdAt" | "status">): Promise<Order> {
  const newOrderId = `UPR-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  
  const { data, error } = await supabase
    .from("orders")
    .insert({
      orderId: newOrderId,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone,
      customerAddress: order.customer.address,
      customerCity: order.customer.city,
      customerNote: order.customer.note,
      items: order.items,
      total: order.total,
      paymentMethod: order.paymentMethod,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving order to Supabase:", error);
    throw error;
  }
  
  return mapRowToOrder(data);
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("createdAt", { ascending: false });
    
  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  return data.map(mapRowToOrder);
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("orderId", orderId);
    
  if (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

export async function deleteOrder(orderId: string): Promise<void> {
  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("orderId", orderId);
    
  if (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

export async function getLastOrder(): Promise<Order | null> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(1)
    .single();
    
  if (error) return null;
  return mapRowToOrder(data);
}
