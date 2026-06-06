import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Minus, Star, ThumbsUp, Check, Package, User, ChevronRight } from "lucide-react";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { getReviews, submitReview, updateHelpful, type Review } from "@/lib/reviews";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetail,
});

const SEED_VI = [
  { name: "Minh T.", body: "Thay đổi hoàn toàn những phiên code dài — hết đau cổ sau 1 tuần.", rating: 5, helpful: 12 },
  { name: "Linh P.", body: "Chất lượng hoàn thiện cực tốt. Đáng từng đồng.", rating: 5, helpful: 8 },
  { name: "Alex K.", body: "Tối giản, chắc chắn, đẹp mắt. Đúng thứ mình cần.", rating: 4, helpful: 3 },
];

const SEED_EN = [
  { name: "Minh T.", body: "Completely changed long coding sessions — no more neck pain after a week.", rating: 5, helpful: 12 },
  { name: "Linh P.", body: "Excellent build quality. Worth every penny.", rating: 5, helpful: 8 },
  { name: "Alex K.", body: "Minimalist, sturdy, beautiful. Exactly what I needed.", rating: 4, helpful: 3 },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} ${i < rating ? "fill-current text-amber-400" : "opacity-20"}`} />
      ))}
    </div>
  );
}

function ProductDetail() {
  const { id } = Route.useParams();
  const productId = Number(id);
  const qc = useQueryClient();
  const { data: product, isLoading } = useQuery({ queryKey: ["product", productId], queryFn: () => getProduct(productId) });
  const { data: dbReviews = [], isLoading: loadingReviews } = useQuery({ queryKey: ["reviews", productId], queryFn: () => getReviews(productId) });
  
  const { add, setOpen } = useCart();
  const { t, lang } = useI18n();
  const [qty, setQty] = React.useState(1);
  const [helpfulOn, setHelpfulOn] = React.useState<Record<number, boolean>>({});
  const [showForm, setShowForm] = React.useState(false);
  const [draft, setDraft] = React.useState({ name: "", body: "", rating: 5 });
  const [hoverStar, setHoverStar] = React.useState(0);
  const [justPosted, setJustPosted] = React.useState(false);
  const [addedAnim, setAddedAnim] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setHelpfulOn({});
  }, [lang, id]);

  const seedReviews = lang === "vi" ? SEED_VI : SEED_EN;
  const reviews = [...dbReviews, ...seedReviews];

  const toggleHelpful = async (r: any, idx: number) => {
    const isLocalSeed = !r.id;
    if (isLocalSeed) return; // Cannot update seed data
    
    const currentlyOn = helpfulOn[r.id];
    setHelpfulOn((s) => ({ ...s, [r.id]: !currentlyOn }));
    try {
      await updateHelpful(r.id, r.helpful, !currentlyOn);
      qc.invalidateQueries({ queryKey: ["reviews", productId] });
    } catch (e) {
      setHelpfulOn((s) => ({ ...s, [r.id]: currentlyOn }));
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = draft.name.trim().slice(0, 60);
    const body = draft.body.trim().slice(0, 500);
    if (!name || !body) return;
    
    setIsSubmitting(true);
    try {
      await submitReview(productId, { name, body, rating: draft.rating });
      qc.invalidateQueries({ queryKey: ["reviews", productId] });
      setDraft({ name: "", body: "", rating: 5 });
      setShowForm(false);
      setJustPosted(true);
      setTimeout(() => setJustPosted(false), 2500);
    } catch (error) {
      alert("Error posting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    add(product!.id, qty);
    setAddedAnim(true);
    setTimeout(() => { setAddedAnim(false); setOpen(true); }, 600);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <p className="text-sm text-neutral-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <p className="text-sm">Product not found.</p>
        <Link to="/products" className="underline text-sm">{t("back")}</Link>
      </div>
    );
  }

  const data = product[lang];
  const avgRating = reviews.length > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 5;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-8">
        <Link to="/" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/products" className="hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors">{t("nav_products")}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900 dark:text-neutral-50 truncate max-w-[200px]">{data.name}</span>
      </nav>

      {/* Main product grid */}
      <div className="grid md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
        {/* Image */}
        <div className="bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden">
          <img src={product.image} alt={data.name} className="w-full h-full object-cover aspect-square hover:scale-[1.02] transition-transform duration-700" />
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-4 left-4 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 text-[10px] tracking-widest uppercase px-2.5 py-1">
              Sale
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="bg-neutral-50 dark:bg-neutral-950 p-8 md:p-12 flex flex-col">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">{data.categoryLabel}</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{data.name}</h1>

          {/* Rating summary */}
          <div className="mt-3 flex items-center gap-2">
            <StarRating rating={Math.round(avgRating)} size="sm" />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{avgRating.toFixed(1)} ({reviews.length} {lang === "vi" ? "đánh giá" : "reviews"})</span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-2xl tabular-nums font-semibold">{formatPrice(product.price, lang)}</p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-base text-neutral-400 dark:text-neutral-500 line-through tabular-nums">{formatPrice(product.originalPrice, lang)}</p>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="mt-5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{data.description}</p>

          {/* Colors (Removed for DB simplicity) */}

          {/* Qty + Add to cart */}
          <div className="mt-auto pt-8 space-y-4">
            <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400">{t("qty")}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-neutral-200 dark:border-neutral-800">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors" aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-5 text-sm tabular-nums min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors" aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm tracking-wider uppercase transition-all cursor-pointer ${
                  addedAnim
                    ? "bg-emerald-600 text-white"
                    : "bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:opacity-90"
                }`}
              >
                {addedAnim ? <><Check className="h-4 w-4" /> {lang === "vi" ? "Đã thêm!" : "Added!"}</> : t("btn_add")}
              </button>
            </div>

            {/* Quick links */}
            <div className="flex gap-4 pt-2">
              <Link
                to="/checkout"
                className="flex-1 border border-neutral-200 dark:border-neutral-800 py-3 text-sm tracking-wider uppercase text-center hover:border-neutral-900 dark:hover:border-neutral-50 transition-colors"
                onClick={() => { add(product!.id, qty); }}
              >
                {lang === "vi" ? "Mua ngay" : "Buy Now"}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <Package className="h-3.5 w-3.5" />
                {lang === "vi" ? "Giao hàng toàn quốc" : "Nationwide shipping"}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                <Check className="h-3.5 w-3.5" />
                {lang === "vi" ? "Đổi trả 30 ngày" : "30-day returns"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rich content sections */}
      <div className="mt-12 grid md:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
        {/* Features */}
        <div className="bg-neutral-50 dark:bg-neutral-950 p-8 md:col-span-2">
          <p className="text-xs tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400 mb-6">
            {lang === "vi" ? "Tính năng nổi bật" : "Key Features"}
          </p>
          <ul className="space-y-3">
            {data.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="mt-0.5 h-5 w-5 flex-shrink-0 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 flex items-center justify-center text-[10px] font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* What's in the box (Removed for DB simplicity) */}
      </div>

      {/* Who it's for (Removed for DB simplicity) */}

      {/* Reviews */}
      <section className="mt-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{t("reviews_title")}</h2>
            <div className="flex items-center gap-2 mt-2">
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className="text-sm text-neutral-500 dark:text-neutral-400">{avgRating.toFixed(1)} / 5</span>
            </div>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="text-xs tracking-widest uppercase border border-neutral-200 dark:border-neutral-800 px-4 py-2 hover:border-neutral-900 dark:hover:border-neutral-50 cursor-pointer transition-colors"
          >
            {showForm ? t("review_cancel") : t("write_review")}
          </button>
        </div>

        {justPosted && (
          <p className="mb-6 text-xs tracking-widest uppercase text-emerald-600 dark:text-emerald-400">{t("review_thanks")}</p>
        )}

        {showForm && (
          <form onSubmit={handleSubmitReview} className="mb-8 border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 space-y-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-2">{t("review_rating")}</p>
              <div className="flex gap-1" onMouseLeave={() => setHoverStar(0)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHoverStar(n)}
                    onClick={() => setDraft((d) => ({ ...d, rating: n }))}
                    className="p-1 cursor-pointer"
                    aria-label={`${n} star`}
                  >
                    <Star className={`h-5 w-5 ${n <= (hoverStar || draft.rating) ? "fill-current text-amber-400" : "opacity-30"}`} />
                  </button>
                ))}
              </div>
            </div>
            <input
              required maxLength={60} value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              placeholder={t("review_name")}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <textarea
              required maxLength={500} rows={4} value={draft.body}
              onChange={(e) => setDraft((d) => ({ ...d, body: e.target.value }))}
              placeholder={t("review_body")}
              className="w-full bg-transparent border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-50"
            />
            <button type="submit" disabled={isSubmitting} className="bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 px-6 py-2.5 text-xs tracking-widest uppercase hover:opacity-90 disabled:opacity-50">
              {isSubmitting ? "Posting..." : t("review_submit")}
            </button>
          </form>
        )}
        {loadingReviews ? (
          <div className="py-12 text-center text-sm text-neutral-500 animate-pulse">Loading reviews...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            {reviews.map((r, i) => (
              <div key={r.id || i} className="pb-6 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-sm">{r.name}</span>
                  <StarRating rating={r.rating} size="sm" />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">{r.body}</p>
                {r.id ? (
                  <button
                    onClick={() => toggleHelpful(r, i)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                      helpfulOn[r.id] ? "text-neutral-900 dark:text-neutral-50" : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50"
                    }`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {t("review_helpful")} ({r.helpful})
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {t("review_helpful")} ({r.helpful})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}