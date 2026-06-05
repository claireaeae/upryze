import * as React from "react";
import type { Lang } from "./products";

const DICT = {
  // 🌍 [HƯỚNG DẪN THAY ĐỔI VĂN BẢN (TEXT) TRÊN TOÀN BỘ WEBSITE]
  // Đây là bộ từ điển của trang web. 
  // Muốn sửa bất kỳ chữ gì trên web (Tiếng Anh hay Tiếng Việt), bạn chỉ cần tìm đúng chữ đó ở dưới và sửa chữ ở trong ngoặc kép ("").
  // Tuyệt đối KHÔNG SỬA các chữ ở bên trái dấu hai chấm (ví dụ: nav_home).
  en: {
    nav_home: "Home", nav_products: "Products", nav_faq: "FAQ", nav_track: "Track Order",
    btn_add: "Add to Cart", btn_checkout: "Checkout", btn_submit: "Submit",
    btn_shop: "Shop Now", btn_view_all: "View all", btn_place_order: "Place Order",
    cart: "Cart", cart_empty: "Your cart is empty.", subtotal: "Subtotal", remove: "Remove",
    hero_title: "Protect your health.\nElevate your focus.",
    hero_sub: "Engineered ergonomic gear for Deep Work — built for students, engineers, and freelancers.",
    stories_kicker: "Our Story",
    stories_title: "Why Upryze exists.",
    stories_body: "We founded Upryze to aggressively bridge the gap between high-performance work and physical well-being. We engineer environments that sustain your focus.",
    sc_kicker: "Interactive",
    sc_title: "Workspace Setup Scorecard",
    sc_sub: "Discover your ergonomic score.",
    sc_q1: "Screen position?", sc_q1a: "Directly on desk", sc_q1b: "Elevated to eye-level",
    sc_q2: "Chair type?", sc_q2a: "Dining / Hard chair", sc_q2b: "Standard office chair", sc_q2c: "Ergonomic chair",
    sc_q3: "Do you experience neck/eye pain?", sc_q3a: "Frequently", sc_q3b: "Rarely / Never",
    sc_result: "Your Score", sc_fixes: "Recommended fixes:", sc_vuln: "Vulnerabilities",
    sc_restart: "Restart",
    featured: "Featured",
    products_title: "All Products",
    p_categories: "Categories", p_price: "Price",
    cat_all: "All", cat_posture: "Posture", cat_sensory: "Sensory", cat_care: "Care",
    price_under: "Under 500k", price_mid: "500k - 2M", price_over: "Over 2M",
    no_match: "No products match the selected filters.",
    reviews_title: "Customer Reviews", write_review: "Write a review",
    review_name: "Your name", review_body: "Share your experience",
    review_rating: "Rating", review_submit: "Post review",
    review_cancel: "Cancel", review_helpful: "Helpful",
    review_thanks: "Thanks for your review!",
    back: "← Back",
    qty: "Quantity",
    faq_title: "Frequently Asked Questions",
    feedback_title: "Send us Questions",
    feedback_sub: "We'd love to hear from you.",
    f_name: "Name", f_email: "Email", f_message: "Message",
    feedback_thanks: "Thanks — we'll get back to you soon.",
    checkout_title: "Checkout", contact_info: "Contact information",
    shipping: "Shipping address", payment: "Payment",
    full_name: "Full name", address: "Address", city: "City", phone: "Phone",
    order_summary: "Order summary", total: "Total",
    success_title: "Order placed.", success_sub: "Thank you for choosing Upryze. A confirmation has been sent to your email.",
    back_home: "Back to home",
    footer_tag: "Protect your health. Elevate your focus.",
    f_shop: "Shop", f_policies: "Policies", f_contact: "Contact",
    f_terms: "Terms of Use", f_privacy: "Privacy Policy", f_ship: "Shipping & Returns", f_warranty: "Warranty",
    address_label: "Address", facebook: "Facebook",
  },
  vi: {
    nav_home: "Trang chủ", nav_products: "Sản phẩm", nav_faq: "FAQ", nav_track: "Tra cứu",
    btn_add: "Thêm vào giỏ", btn_checkout: "Thanh toán", btn_submit: "Gửi",
    btn_shop: "Mua ngay", btn_view_all: "Xem tất cả", btn_place_order: "Đặt hàng",
    cart: "Giỏ hàng", cart_empty: "Giỏ hàng của bạn đang trống.", subtotal: "Tạm tính", remove: "Xoá",
    hero_title: "Bảo vệ sức khỏe.\nNâng tầm tập trung.",
    hero_sub: "Thiết bị công thái học cho Deep Work — dành cho sinh viên, lập trình viên và freelancer.",
    stories_kicker: "Câu chuyện",
    stories_title: "Vì sao Upryze tồn tại.",
    stories_body: "Chúng tôi thành lập Upryze để xóa bỏ khoảng cách giữa hiệu suất và sức khỏe. Chúng tôi kiến tạo môi trường duy trì sự tập trung của bạn.",
    sc_kicker: "Tương tác",
    sc_title: "Chấm điểm Không gian làm việc",
    sc_sub: "Khám phá điểm số công thái học của bạn.",
    sc_q1: "Vị trí màn hình?", sc_q1a: "Đặt trực tiếp trên bàn", sc_q1b: "Kê cao ngang tầm mắt",
    sc_q2: "Loại ghế?", sc_q2a: "Ghế ăn / Ghế cứng", sc_q2b: "Ghế văn phòng xoay", sc_q2c: "Ghế công thái học",
    sc_q3: "Bạn có bị đau mỏi cổ/mắt không?", sc_q3a: "Rất thường xuyên", sc_q3b: "Hiếm khi / Không",
    sc_result: "Điểm của bạn", sc_fixes: "Giải pháp đề xuất:", sc_vuln: "Điểm yếu",
    sc_restart: "Làm lại",
    featured: "Nổi bật",
    products_title: "Tất cả sản phẩm",
    p_categories: "Danh mục", p_price: "Mức giá",
    cat_all: "Tất cả", cat_posture: "Tư thế", cat_sensory: "Giác quan", cat_care: "Chăm sóc",
    price_under: "Dưới 500k", price_mid: "500k - 2Tr", price_over: "Trên 2Tr",
    no_match: "Không có sản phẩm phù hợp.",
    reviews_title: "Đánh giá từ khách hàng", write_review: "Viết đánh giá",
    review_name: "Tên của bạn", review_body: "Chia sẻ trải nghiệm",
    review_rating: "Đánh giá", review_submit: "Đăng đánh giá",
    review_cancel: "Huỷ", review_helpful: "Hữu ích",
    review_thanks: "Cảm ơn đánh giá của bạn!",
    back: "← Quay lại",
    qty: "Số lượng",
    faq_title: "Câu hỏi thường gặp",
    feedback_title: "Gửi câu hỏi",
    feedback_sub: "Chúng tôi luôn lắng nghe bạn.",
    f_name: "Họ tên", f_email: "Email", f_message: "Nội dung",
    feedback_thanks: "Cảm ơn — chúng tôi sẽ phản hồi sớm.",
    checkout_title: "Thanh toán", contact_info: "Thông tin liên hệ",
    shipping: "Địa chỉ giao hàng", payment: "Thanh toán",
    full_name: "Họ và tên", address: "Địa chỉ", city: "Thành phố", phone: "Số điện thoại",
    order_summary: "Tóm tắt đơn hàng", total: "Tổng",
    success_title: "Đặt hàng thành công.", success_sub: "Cảm ơn bạn đã lựa chọn Upryze. Email xác nhận đã được gửi.",
    back_home: "Về trang chủ",
    footer_tag: "Bảo vệ sức khỏe. Nâng tầm tập trung.",
    f_shop: "Mua sắm", f_policies: "Chính sách", f_contact: "Liên hệ",
    f_terms: "Điều khoản", f_privacy: "Bảo mật", f_ship: "Vận chuyển & Đổi trả", f_warranty: "Bảo hành",
    address_label: "Địa chỉ", facebook: "Facebook",
  },
} as const;

export type DictKey = keyof typeof DICT["en"];

type Ctx = { lang: Lang; toggle: () => void; t: (k: DictKey) => string };
const I18nCtx = React.createContext<Ctx | null>(null);
const KEY = "upryze_lang";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>("en");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === "en" || saved === "vi") setLang(saved);
    } catch {}
  }, []);

  React.useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch {}
  }, [lang]);

  const t = React.useCallback((k: DictKey) => DICT[lang][k] ?? k, [lang]);

  return (
    <I18nCtx.Provider value={{ lang, toggle: () => setLang((l) => (l === "en" ? "vi" : "en")), t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const c = React.useContext(I18nCtx);
  if (!c) throw new Error("useI18n must be used within I18nProvider");
  return c;
}