import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getOrders, updateOrderStatus, deleteOrder, type Order, type OrderStatus } from "@/lib/orders";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { ShoppingBag, Clock, Truck, CheckCircle, XCircle, Package, Trash2, Eye, EyeOff, TrendingUp, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Upryze" }] }),
  component: AdminPage,
});

const ADMIN_PIN = "888888";
const SESSION_KEY = "upryze_admin_auth";

const STATUS_CONFIG: Record<OrderStatus, { label: string; labelVi: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", labelVi: "Chờ xử lý", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400", icon: Clock },
  processing: { label: "Processing", labelVi: "Đang xử lý", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: Package },
  shipped: { label: "Shipped", labelVi: "Đã giao vận", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", icon: Truck },
  delivered: { label: "Delivered", labelVi: "Đã giao hàng", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400", icon: CheckCircle },
  cancelled: { label: "Cancelled", labelVi: "Đã huỷ", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
};

function PinScreen({ onAuth }: { onAuth: () => void }) {
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState(false);
  const [shake, setShake] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const handlePin = (val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 6);
    setPin(clean);
    setError(false);
    if (clean.length === 6) {
      if (clean === ADMIN_PIN) {
        sessionStorage.setItem(SESSION_KEY, "1");
        onAuth();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => { setShake(false); setPin(""); }, 600);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
      <div className={`w-full max-w-sm text-center ${shake ? "animate-bounce" : ""}`}>
        <div className="inline-flex items-center justify-center h-16 w-16 bg-neutral-800 mb-8">
          <ShoppingBag className="h-7 w-7 text-neutral-50" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-50 mb-2">Admin Dashboard</h1>
        <p className="text-sm text-neutral-400 mb-10">Enter your PIN to continue</p>

        {/* PIN dots */}
        <div className="flex justify-center gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 w-3 rounded-full border transition-all ${
                i < pin.length
                  ? error ? "bg-red-500 border-red-500" : "bg-neutral-50 border-neutral-50"
                  : "border-neutral-600"
              }`}
            />
          ))}
        </div>

        <input
          ref={inputRef}
          type="password"
          inputMode="numeric"
          pattern="\d*"
          value={pin}
          onChange={(e) => handlePin(e.target.value)}
          className="opacity-0 absolute pointer-events-none"
          aria-label="PIN"
        />

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "⌫"].map((k, i) => (
            <button
              key={i}
              onClick={() => {
                if (k === null) return;
                if (k === "⌫") handlePin(pin.slice(0, -1));
                else handlePin(pin + String(k));
              }}
              disabled={k === null}
              className={`h-14 text-lg font-medium rounded-none transition-colors ${
                k === null
                  ? "invisible"
                  : k === "⌫"
                  ? "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 cursor-pointer"
                  : "bg-neutral-800 text-neutral-50 hover:bg-neutral-700 cursor-pointer"
              }`}
            >
              {k}
            </button>
          ))}
        </div>

        {error && <p className="mt-6 text-sm text-red-400">Incorrect PIN. Try again.</p>}

        <p className="mt-8 text-xs text-neutral-600">
          <Link to="/" className="hover:text-neutral-400 transition-colors">← Back to store</Link>
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-sm font-medium ${cfg.color}`}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function OrderCard({ order, onStatusChange, onDelete }: {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const total = formatPrice(order.total);
  const date = new Date(order.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-4 px-5 py-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">{order.orderId}</p>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm font-medium mt-1 truncate">{order.customer.name}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{date} · {order.customer.city}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-base font-semibold tabular-nums">{total}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{order.items.reduce((s, i) => s + i.qty, 0)} item(s)</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="Toggle details"
        >
          {expanded ? <EyeOff className="h-4 w-4 text-neutral-400" /> : <Eye className="h-4 w-4 text-neutral-400" />}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 px-5 py-4 space-y-4 bg-neutral-50 dark:bg-neutral-950">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">Customer</p>
              <p className="text-sm">{order.customer.name}</p>
              <p className="text-xs text-neutral-500">{order.customer.email}</p>
              <p className="text-xs text-neutral-500">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">Delivery Address</p>
              <p className="text-sm">{order.customer.address}</p>
              <p className="text-xs text-neutral-500">{order.customer.city}</p>
              {order.customer.note && <p className="text-xs text-neutral-500 italic mt-1">Note: {order.customer.note}</p>}
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-2">Items Ordered</p>
            <div className="space-y-2">
              {order.items.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={product.image} alt={product.en.name} className="h-10 w-10 object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{product.en.name}</p>
                      <p className="text-xs text-neutral-500">× {item.qty} · {formatPrice(product.price * item.qty)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <label className="text-xs tracking-widest uppercase text-neutral-500">Update Status</label>
              <select
                value={order.status}
                onChange={(e) => onStatusChange(order.orderId, e.target.value as OrderStatus)}
                className="text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 px-2 py-1.5 focus:outline-none cursor-pointer"
              >
                {(Object.keys(STATUS_CONFIG) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              {confirmDelete ? (
                <>
                  <button onClick={() => setConfirmDelete(false)} className="text-xs px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 cursor-pointer">Cancel</button>
                  <button onClick={() => onDelete(order.orderId)} className="text-xs px-3 py-1.5 bg-red-600 text-white hover:bg-red-700 cursor-pointer">Confirm Delete</button>
                </>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 cursor-pointer">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [filter, setFilter] = React.useState<OrderStatus | "all">("all");

  React.useEffect(() => {
    setOrders(getOrders());
  }, []);

  const refresh = () => setOrders(getOrders());

  const handleStatusChange = (id: string, status: OrderStatus) => {
    updateOrderStatus(id, status);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteOrder(id);
    refresh();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-semibold tracking-widest uppercase text-sm">Upryze Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">
              ← Store
            </Link>
            <button
              onClick={() => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); }}
              className="text-xs tracking-widest uppercase text-neutral-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Orders", value: String(orders.length), icon: ShoppingBag, sub: "All time" },
            { label: "Revenue", value: formatPrice(totalRevenue), icon: TrendingUp, sub: "Excl. cancelled" },
            { label: "Pending", value: String(pendingCount), icon: Clock, sub: "Need action" },
            { label: "Delivered", value: String(deliveredCount), icon: CheckCircle, sub: "Completed" },
          ].map(({ label, value, icon: Icon, sub }) => (
            <div key={label} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">{label}</p>
                  <p className="text-2xl font-semibold mt-2 tabular-nums">{value}</p>
                  <p className="text-xs text-neutral-400 mt-1">{sub}</p>
                </div>
                <Icon className="h-5 w-5 text-neutral-300 dark:text-neutral-700 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {(["all", ...Object.keys(STATUS_CONFIG)] as Array<"all" | OrderStatus>).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 border transition-colors cursor-pointer ${
                filter === s
                  ? "border-neutral-900 dark:border-neutral-50 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900"
                  : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-50"
              }`}
            >
              {s === "all" ? `All (${orders.length})` : `${STATUS_CONFIG[s].label} (${orders.filter((o) => o.status === s).length})`}
            </button>
          ))}
          <button onClick={refresh} className="text-xs px-3 py-1.5 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-50 ml-auto cursor-pointer transition-colors">
            ↻ Refresh
          </button>
        </div>

        {/* Orders list */}
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-16 text-center">
            <BarChart3 className="h-10 w-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {orders.length === 0 ? "No orders yet. Share your store link to start selling!" : "No orders match this filter."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard
                key={order.orderId}
                order={order}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPage() {
  const [authed, setAuthed] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
  }, []);

  if (!authed) return <PinScreen onAuth={() => setAuthed(true)} />;
  return <Dashboard />;
}
