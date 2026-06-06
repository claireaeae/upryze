import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { Order, OrderStatus } from "@/lib/orders";
import { useI18n } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { formatPrice, getProducts } from "@/lib/products";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track Order — Upryze" }] }),
  component: TrackPage,
});

const STATUS_CONFIG: Record<OrderStatus, { label: string; labelVi: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", labelVi: "Chờ xử lý", color: "text-amber-600 dark:text-amber-400", icon: Clock },
  processing: { label: "Processing", labelVi: "Đang xử lý", color: "text-blue-600 dark:text-blue-400", icon: Package },
  shipped: { label: "Shipped", labelVi: "Đã giao vận", color: "text-purple-600 dark:text-purple-400", icon: Truck },
  delivered: { label: "Delivered", labelVi: "Đã giao hàng", color: "text-emerald-600 dark:text-emerald-400", icon: CheckCircle },
  cancelled: { label: "Cancelled", labelVi: "Đã huỷ", color: "text-red-600 dark:text-red-400", icon: XCircle },
};

function TrackPage() {
  const { lang, t } = useI18n();
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: getProducts });
  const [orderId, setOrderId] = React.useState("");
  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    
    setLoading(true);
    setError("");
    setOrder(null);

    const { data, error: dbError } = await supabase
      .from("orders")
      .select("*")
      .eq("orderId", orderId.trim())
      .single();

    setLoading(false);

    if (dbError || !data) {
      setError(lang === "vi" ? "Không tìm thấy đơn hàng với mã này." : "No order found with this ID.");
    } else {
      setOrder({
        orderId: data.orderId,
        createdAt: data.createdAt,
        customer: {
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone,
          address: data.customerAddress,
          city: data.customerCity,
          note: data.customerNote,
        },
        items: data.items,
        total: data.total,
        paymentMethod: data.paymentMethod,
        status: data.status as OrderStatus,
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
          {lang === "vi" ? "Tra cứu đơn hàng" : "Track Your Order"}
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {lang === "vi" ? "Nhập mã đơn hàng của bạn (VD: UPR-12345...) để xem tình trạng mới nhất." : "Enter your order ID (e.g. UPR-12345...) to see its current status."}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto mb-16">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder={lang === "vi" ? "Mã đơn hàng..." : "Order ID..."}
          className="flex-1 bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !orderId.trim()}
          className="bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer flex items-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">{lang === "vi" ? "Đang tìm..." : "Searching..."}</span>
          ) : (
            <>
              <Search className="h-4 w-4" />
              {lang === "vi" ? "Tra cứu" : "Track"}
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 text-center text-sm border border-red-100 dark:border-red-900/50">
          {error}
        </div>
      )}

      {order && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-1">{lang === "vi" ? "Mã đơn hàng" : "Order ID"}</p>
              <p className="text-lg font-mono font-medium">{order.orderId}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-US", {
                  year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                })}
              </p>
            </div>
            
            {/* Status Indicator */}
            <div className="bg-neutral-50 dark:bg-neutral-950 px-5 py-4 border border-neutral-100 dark:border-neutral-800 flex items-center gap-4">
              {React.createElement(STATUS_CONFIG[order.status].icon, { className: `h-8 w-8 ${STATUS_CONFIG[order.status].color}` })}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">{lang === "vi" ? "Tình trạng" : "Status"}</p>
                <p className={`text-base font-semibold ${STATUS_CONFIG[order.status].color}`}>
                  {lang === "vi" ? STATUS_CONFIG[order.status].labelVi : STATUS_CONFIG[order.status].label}
                </p>
              </div>
            </div>
          </div>

          <div className="py-6 space-y-6">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-4">{lang === "vi" ? "Thông tin giao hàng" : "Shipping Information"}</p>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">{order.customer.name}</span></p>
                <p className="text-neutral-600 dark:text-neutral-400">{order.customer.phone}</p>
                <p className="text-neutral-600 dark:text-neutral-400">{order.customer.address}, {order.customer.city}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 mb-4">{lang === "vi" ? "Sản phẩm" : "Items"}</p>
              <ul className="space-y-4">
                {order.items.map((item, i) => {
                  const product = products.find((p) => p.id === item.id);
                  if (!product) return null;
                  return (
                    <li key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 bg-neutral-100 dark:bg-neutral-950 flex-shrink-0">
                        <img src={product.image} alt={product[lang].name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{product[lang].name}</p>
                        <p className="text-xs text-neutral-500 mt-1">× {item.qty}</p>
                      </div>
                      <p className="text-sm tabular-nums flex-shrink-0">{formatPrice(product.price * item.qty, lang)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <p className="text-sm font-medium uppercase tracking-widest">{lang === "vi" ? "Tổng cộng" : "Total"}</p>
            <p className="text-xl font-semibold tabular-nums">{formatPrice(order.total, lang)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
