# 🚀 BÍ KÍP "GIẢ VỜ" CODE NHANH KHI BỊ GIÁO VIÊN BẮT BẺ

Nếu giáo viên nói: *"Bây giờ em thử tạo cho cô một trang 'Giới thiệu' (About Us) mới hoàn toàn và gắn lên thanh Menu xem nào?"*

Đừng hoảng, hãy làm đúng theo các bước copy-paste dưới đây. Bạn sẽ tạo xong trang web mới chỉ trong 30 giây!

---

## BƯỚC 1: TẠO FILE TRANG MỚI
1. Trong VS Code, mở thư mục `src/routes/`.
2. Bấm chuột phải, chọn **New File**. Đặt tên file là `about.tsx`.
3. Copy và Paste toàn bộ đoạn code dưới đây vào file `about.tsx`:

```tsx
import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-32 text-center">
      <h1 className="text-5xl font-bold mb-6">Về Chúng Tôi</h1>
      <p className="text-lg text-neutral-500">
        Upryze ra đời với sứ mệnh mang lại không gian làm việc khoẻ mạnh nhất cho người Việt.
        Chúng tôi tự hào là đơn vị tiên phong về Ergonomic (Công thái học).
      </p>
    </div>
  );
}
```
*(Bấm `Ctrl + S` để lưu lại)*.

---

## BƯỚC 2: GẮN TRANG VỪA TẠO LÊN THANH MENU
1. Mở file `src/components/Navbar.tsx`.
2. Kéo xuống dòng số 12, bạn sẽ thấy danh sách `const NAV = [...]`.
3. Thêm dòng này vào cuối danh sách đó:

```tsx
    { to: "/about" as const, label: "Giới thiệu", exact: false },
```
*(Bấm `Ctrl + S` để lưu lại)*.

---

## BƯỚC 3: SHOW KẾT QUẢ
1. Mở trình duyệt đang chạy `http://localhost:5173`.
2. Bạn sẽ thấy chữ **"Giới thiệu"** đã xuất hiện trên thanh Menu.
3. Bấm vào chữ "Giới thiệu", trang web sẽ ngay lập tức chuyển sang giao diện bạn vừa tạo! 

**Chúc bạn lấy trọn điểm 10 thực hành!**
