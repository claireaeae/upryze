import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getOrders, updateOrderStatus, deleteOrder, type Order, type OrderStatus } from "@/lib/orders";
import { getProducts, addProduct, updateProduct, deleteProduct, formatPrice, type Product } from "@/lib/products";
import { getQuestions, markQuestionAsRead, deleteQuestion, type Question } from "@/lib/questions";
import { getCategories, saveCategory, deleteCategory, type CategoryData } from "@/lib/categories";
import { getAllReviews, deleteReview } from "@/lib/reviews";
import { getFaqs, saveFaq, deleteFaq, type FaqData } from "@/lib/faqs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingBag, Clock, Truck, CheckCircle, XCircle, Package, Trash2, Eye, EyeOff, TrendingUp, BarChart3, Plus, Edit2, Save, X, Image as ImageIcon, MessageSquare, MailOpen, Star } from "lucide-react";

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

function OrderCard({ order, onStatusChange, onDelete, products }: {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
  products: Product[];
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const total = formatPrice(order.total);
  const date = new Date(order.createdAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
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
                const product = products.find((p) => p.id === item.id);
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

function ProductManager({ products }: { products: Product[] }) {
  const qc = useQueryClient();
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  
  const [editingId, setEditingId] = React.useState<number | "new" | null>(null);
  
  const initialForm = {
    category: "",
    price: 0,
    originalPrice: 0,
    en_name: "",
    vi_name: "",
    en_label: "",
    vi_label: "",
    en_desc: "",
    vi_desc: "",
  };
  
  const [form, setForm] = React.useState(initialForm);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState(false);

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      en_name: p.en.name,
      vi_name: p.vi.name,
      en_label: p.en.categoryLabel,
      vi_label: p.vi.categoryLabel,
      en_desc: p.en.description,
      vi_desc: p.vi.description,
    });
    setImagePreview(p.image);
    setImageFile(null);
  };

  const startNew = () => {
    setEditingId("new");
    setForm(initialForm);
    setImagePreview("");
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: Omit<Product, "id"> = {
        category: form.category as any,
        price: form.price,
        originalPrice: form.originalPrice || null,
        image: imagePreview, // Will be overridden if imageFile is present
        en: { name: form.en_name, categoryLabel: form.en_label, description: form.en_desc, features: [] },
        vi: { name: form.vi_name, categoryLabel: form.vi_label, description: form.vi_desc, features: [] },
      };

      if (editingId === "new") {
        await addProduct(payload, imageFile || undefined);
      } else if (typeof editingId === "number") {
        await updateProduct(editingId, payload, imageFile || undefined);
      }
      await qc.invalidateQueries({ queryKey: ["products"] });
      setEditingId(null);
    } catch (err) {
      alert("Error saving product: " + (err as any).message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      await qc.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      alert("Error deleting product.");
    }
  };

  if (editingId !== null) {
    return (
      <form onSubmit={handleSave} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{editingId === "new" ? "Add New Product" : "Edit Product"}</h3>
          <button type="button" onClick={cancelEdit} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Image Upload</label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover border border-neutral-200 dark:border-neutral-800" />
                ) : (
                  <div className="h-16 w-16 border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-neutral-300" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs" required={editingId === "new"} />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm">
                <option value="" disabled>Select category</option>
                {categories.map(c => (
                  <option key={c.slug} value={c.slug}>{c.name_en} ({c.name_vi})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Price (VND)</label>
                <input type="number" required value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Original Price (VND)</label>
                <input type="number" value={form.originalPrice} onChange={e => setForm({...form, originalPrice: Number(e.target.value)})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Name (English / Vietnamese)</label>
              <div className="grid grid-cols-2 gap-2">
                <input required placeholder="English name" value={form.en_name} onChange={e => setForm({...form, en_name: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
                <input required placeholder="Tên tiếng Việt" value={form.vi_name} onChange={e => setForm({...form, vi_name: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Label (English / Vietnamese)</label>
              <div className="grid grid-cols-2 gap-2">
                <input required placeholder="e.g. Posture" value={form.en_label} onChange={e => setForm({...form, en_label: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
                <input required placeholder="VD: Tư thế" value={form.vi_label} onChange={e => setForm({...form, vi_label: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Description (English / Vietnamese)</label>
              <div className="space-y-2">
                <textarea required placeholder="English description" value={form.en_desc} onChange={e => setForm({...form, en_desc: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" rows={2} />
                <textarea required placeholder="Mô tả tiếng Việt" value={form.vi_desc} onChange={e => setForm({...form, vi_desc: e.target.value})} className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm" rows={2} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <button disabled={isSaving} type="submit" className="flex items-center gap-2 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-6 py-2.5 text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50">
            <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={startNew} className="flex items-center gap-2 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-4 py-2 text-sm tracking-widest uppercase hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-xs tracking-widest uppercase text-neutral-500">
            <tr>
              <th className="px-5 py-3 font-medium">Image</th>
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Price</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {products.map(p => (
              <tr key={p.id}>
                <td className="px-5 py-3"><img src={p.image} alt={p.en.name} loading="lazy" className="h-10 w-10 object-cover" /></td>
                <td className="px-5 py-3 font-medium">{p.en.name}</td>
                <td className="px-5 py-3 tabular-nums">{formatPrice(p.price)}</td>
                <td className="px-5 py-3 text-right space-x-2">
                  <button onClick={() => startEdit(p)} className="p-1.5 text-neutral-500 hover:text-blue-500 transition-colors"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-neutral-500 hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={4} className="px-5 py-10 text-center text-neutral-500">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuestionManager() {
  const qc = useQueryClient();
  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: getQuestions,
  });

  const handleMarkAsRead = async (id: number) => {
    try {
      await markQuestionAsRead(id);
      qc.invalidateQueries({ queryKey: ["questions"] });
    } catch (error) {
      alert("Error updating status");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteQuestion(id);
      qc.invalidateQueries({ queryKey: ["questions"] });
    } catch (error) {
      alert("Error deleting message");
    }
  };

  if (isLoading) {
    return <div className="text-sm text-neutral-500 py-10 text-center animate-pulse">Loading messages...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-16 text-center">
        <MessageSquare className="h-10 w-10 text-neutral-300 dark:text-neutral-700 mx-auto mb-4" />
        <p className="text-sm text-neutral-500 dark:text-neutral-400">No customer questions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div key={q.id} className={`bg-white dark:bg-neutral-900 border ${q.status === 'unread' ? 'border-blue-300 dark:border-blue-800' : 'border-neutral-200 dark:border-neutral-800'} p-5`}>
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{q.name}</span>
                {q.status === 'unread' && <span className="bg-blue-100 text-blue-800 text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm font-semibold">New</span>}
              </div>
              <a href={`mailto:${q.email}`} className="text-xs text-blue-600 hover:underline">{q.email}</a>
              <span className="text-xs text-neutral-400 ml-3">
                {new Date(q.created_at).toLocaleString('vi-VN')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {q.status === 'unread' && (
                <button onClick={() => handleMarkAsRead(q.id)} className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors tooltip" title="Mark as Read">
                  <MailOpen className="h-4 w-4" />
                </button>
              )}
              <button onClick={() => handleDelete(q.id)} className="p-1.5 text-neutral-500 hover:text-red-500 transition-colors" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="text-sm bg-neutral-50 dark:bg-neutral-950 p-4 border border-neutral-100 dark:border-neutral-800 whitespace-pre-wrap text-neutral-700 dark:text-neutral-300">
            {q.message}
          </div>
        </div>
      ))}
    </div>
  );
}

function CategoryManager() {
  const qc = useQueryClient();
  const { data: categories = [], isLoading } = useQuery({ queryKey: ["categories"], queryFn: getCategories });
  const [form, setForm] = React.useState<CategoryData | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await saveCategory(form);
    qc.invalidateQueries({ queryKey: ["categories"] });
    setForm(null);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this category?")) return;
    await deleteCategory(slug);
    qc.invalidateQueries({ queryKey: ["categories"] });
  };

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading...</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setForm({ slug: "", name_en: "", name_vi: "" })} className="flex items-center gap-2 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-4 py-2 text-sm tracking-widest uppercase hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {form && (
        <form onSubmit={handleSave} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm tracking-widest uppercase font-medium">{form.slug ? "Edit Category" : "New Category"}</h3>
            <button type="button" onClick={() => setForm(null)} className="text-neutral-500 hover:text-neutral-900"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Slug</label>
              <input required value={form.slug} disabled={!!categories.find(c => c.slug === form.slug)} onChange={e => setForm({...form, slug: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" placeholder="e.g. ergonomic" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Name (EN)</label>
              <input required value={form.name_en} onChange={e => setForm({...form, name_en: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-1">Name (VI)</label>
              <input required value={form.name_vi} onChange={e => setForm({...form, name_vi: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" />
            </div>
          </div>
          <button type="submit" className="bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-6 py-2 text-sm uppercase">Save</button>
        </form>
      )}

      <table className="w-full text-left text-sm bg-white dark:bg-neutral-900 border">
        <thead className="bg-neutral-50 border-b text-xs uppercase text-neutral-500">
          <tr><th className="px-5 py-3">Slug</th><th className="px-5 py-3">English</th><th className="px-5 py-3">Vietnamese</th><th className="px-5 py-3 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y">
          {categories.map(c => (
            <tr key={c.slug}>
              <td className="px-5 py-3 font-mono">{c.slug}</td>
              <td className="px-5 py-3">{c.name_en}</td>
              <td className="px-5 py-3">{c.name_vi}</td>
              <td className="px-5 py-3 text-right space-x-2">
                <button onClick={() => setForm(c)} className="text-neutral-500 hover:text-blue-500"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(c.slug)} className="text-neutral-500 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewManager() {
  const qc = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({ queryKey: ["admin_reviews"], queryFn: getAllReviews });

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this review?")) return;
    await deleteReview(id);
    qc.invalidateQueries({ queryKey: ["admin_reviews"] });
  };

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading...</div>;

  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div key={r.id} className="bg-white dark:bg-neutral-900 border p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{r.name}</span>
              <div className="flex text-amber-400"><Star className="h-3 w-3 fill-current" /> {r.rating}</div>
              <span className="text-xs text-neutral-400">ProductID: {r.product_id}</span>
            </div>
            <p className="text-sm">{r.body}</p>
          </div>
          <button onClick={() => handleDelete(r.id)} className="text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
      {reviews.length === 0 && <div className="p-10 text-center text-neutral-500">No reviews found.</div>}
    </div>
  );
}

function FaqManager() {
  const qc = useQueryClient();
  const { data: faqs = [], isLoading } = useQuery({ queryKey: ["faqs"], queryFn: getFaqs });
  const [form, setForm] = React.useState<FaqData | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    await saveFaq(form);
    qc.invalidateQueries({ queryKey: ["faqs"] });
    setForm(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this FAQ?")) return;
    await deleteFaq(id);
    qc.invalidateQueries({ queryKey: ["faqs"] });
  };

  if (isLoading) return <div className="p-10 text-center animate-pulse">Loading...</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setForm({ q_en: "", a_en: "", q_vi: "", a_vi: "", sort_order: 0 })} className="flex items-center gap-2 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-4 py-2 text-sm uppercase">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      {form && (
        <form onSubmit={handleSave} className="bg-white dark:bg-neutral-900 border p-6 mb-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm uppercase font-medium">{form.id ? "Edit FAQ" : "New FAQ"}</h3>
            <button type="button" onClick={() => setForm(null)} className="text-neutral-500"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="block text-xs uppercase text-neutral-500 mb-1">Question (EN)</label><input required value={form.q_en} onChange={e => setForm({...form, q_en: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs uppercase text-neutral-500 mb-1">Question (VI)</label><input required value={form.q_vi} onChange={e => setForm({...form, q_vi: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" /></div>
            <div><label className="block text-xs uppercase text-neutral-500 mb-1">Answer (EN)</label><textarea required value={form.a_en} onChange={e => setForm({...form, a_en: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" rows={3}/></div>
            <div><label className="block text-xs uppercase text-neutral-500 mb-1">Answer (VI)</label><textarea required value={form.a_vi} onChange={e => setForm({...form, a_vi: e.target.value})} className="w-full bg-transparent border px-3 py-2 text-sm" rows={3}/></div>
          </div>
          <div><label className="block text-xs uppercase text-neutral-500 mb-1">Sort Order</label><input type="number" required value={form.sort_order} onChange={e => setForm({...form, sort_order: Number(e.target.value)})} className="bg-transparent border px-3 py-2 text-sm w-32" /></div>
          <button type="submit" className="bg-neutral-900 text-white px-6 py-2 text-sm uppercase">Save</button>
        </form>
      )}

      <div className="space-y-4">
        {faqs.map(f => (
          <div key={f.id} className="bg-white border p-5">
            <div className="flex justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm text-blue-600 mb-1">EN: {f.q_en}</p>
                <p className="text-xs text-neutral-600 mb-3">{f.a_en}</p>
                <p className="font-medium text-sm text-red-600 mb-1">VI: {f.q_vi}</p>
                <p className="text-xs text-neutral-600">{f.a_vi}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-[10px] uppercase text-neutral-400">Order: {f.sort_order}</span>
                <div className="space-x-2">
                  <button onClick={() => setForm(f)} className="text-neutral-400 hover:text-blue-500"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(f.id!)} className="text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = React.useState<"orders" | "products" | "categories" | "reviews" | "faqs" | "questions">("orders");
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [filter, setFilter] = React.useState<OrderStatus | "all">("all");
  const [loading, setLoading] = React.useState(true);

  const { data: products = [], isLoading: productsLoading } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  React.useEffect(() => { fetchOrders(); }, []);
  const refresh = () => fetchOrders();

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };
  const handleDelete = async (id: string) => {
    await deleteOrder(id);
    fetchOrders();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const totalRevenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
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
        <div className="flex items-center gap-8 border-b border-neutral-200 dark:border-neutral-800 mb-8 overflow-x-auto whitespace-nowrap">
          {["orders", "products", "categories", "reviews", "faqs", "questions"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 text-sm font-medium tracking-widest uppercase transition-colors border-b-2 ${activeTab === tab ? "border-neutral-900 dark:border-neutral-50 text-neutral-900 dark:text-neutral-50" : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "questions" && <QuestionManager />}
        {activeTab === "products" && <ProductManager products={products} />}
        {activeTab === "categories" && <CategoryManager />}
        {activeTab === "reviews" && <ReviewManager />}
        {activeTab === "faqs" && <FaqManager />}

        {activeTab === "orders" && (
          <>
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

            {loading ? (
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-16 text-center">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">Loading orders from Supabase...</p>
              </div>
            ) : filtered.length === 0 ? (
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
                    products={products}
                  />
                ))}
              </div>
            )}
          </>
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
