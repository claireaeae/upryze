import * as React from "react";
import { type Product, getProducts } from "./products";
import { useQuery } from "@tanstack/react-query";

export type CartItem = { id: number; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (id: number, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: Array<{ product: Product; qty: number }>;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = React.createContext<CartCtx | null>(null);
const KEY = "upryze_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = (id: number, qty = 1) =>
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });
  const remove = (id: number) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: number, qty: number) =>
    setItems((p) =>
      qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  const clear = () => setItems([]);

  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>;

  const subtotal = detailed.reduce((s, d) => s + d.product.price * d.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider
      value={{ items, add, remove, setQty, clear, count, subtotal, detailed, open, setOpen }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = React.useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}