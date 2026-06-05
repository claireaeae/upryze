# 🎬 KỊCH BẢN QUAY VIDEO CÁCH SỬ DỤNG TÀI LIỆU ĐỂ SỬA CODE

**Mục tiêu video:** Chỉ cho các bạn trong nhóm (và cho giáo viên thấy) hệ thống tài liệu cực kỳ dễ hiểu của nhóm. Bất kỳ ai, dù không rành code, chỉ cần biết "Đọc và Làm Theo" là có thể tự sửa được website.
**Thời lượng dự kiến:** 3 phút.
**Chuẩn bị:** Mở VS Code (bật sẵn danh sách file bên trái), và mở trình duyệt web chạy `http://localhost:5173`.

---

## 🎬 CẢNH 1: GIỚI THIỆU HỆ THỐNG "PHAOCỨU SINH" (45 giây)

**(Mở VS Code, trỏ chuột vào file `DANH_SACH_FILE_GIAO_DIEN.md` ở cột bên trái và bấm mở nó ra)**
🗣️ **Thoại:** 
> "Chào mọi người. Để giải quyết bài toán tự xây dựng code 100% nhưng vẫn phải đảm bảo tính dễ sử dụng (như kéo thả Wix), nhóm mình đã viết ra một bộ tài liệu hướng dẫn cực kỳ chi tiết, nhúng thẳng vào trong mã nguồn. 
> Khi mở VS Code, mọi người sẽ thấy ngay file `DANH_SACH_FILE_GIAO_DIEN.md`. File này chính là một 'Bản đồ'. Nó chỉ đích danh muốn sửa chỗ nào thì mở đúng file đó. Ví dụ: Sửa chữ thì mở `i18n.tsx`, sửa thẻ sản phẩm thì mở `ProductCard.tsx`. Không cần phải mò mẫm!"

---

## 🎬 CẢNH 2: THỰC HÀNH 1 - DÙNG BẢN ĐỒ ĐỂ SỬA CHỮ VÀ MÀU SẮC (1.5 phút)

**(Vẫn ở màn hình VS Code)**
🗣️ **Thoại:** 
> "Bây giờ mình sẽ thực hành mẫu. Giả sử giáo viên yêu cầu đổi tên Logo và màu sắc của thanh Menu trên cùng."

👉 **Hành động & Thoại tiếp:** 
1. "Theo bản đồ, để sửa Menu thì mình cần mở file `Navbar.tsx`. Mình bấm vào thư mục `src` -> `components` -> `Navbar.tsx`."
2. *(Mở file Navbar.tsx lên, lướt chuột xuống dòng chữ xanh lá `// 👉 ĐỔI TÊN LOGO Ở ĐÂY`)*. "Ngay trong code, nhóm mình đã để sẵn các biển báo hướng dẫn bằng Tiếng Việt. Ở đây có hướng dẫn đổi tên Logo. Mình sẽ đổi chữ `UPRYZE` thành `DEMO STORE`." *(Gõ chữ DEMO STORE)*.
3. *(Lướt xuống dòng chữ xanh lá `// 👉 ĐỔI MÀU CHỮ MENU Ở ĐÂY`)*. "Và đây là hướng dẫn đổi màu chữ. Mình sẽ đổi `text-neutral-600` thành `text-red-500` để các bạn dễ thấy." *(Sửa chữ và bấm Ctrl + S để lưu)*.

**(Mở trình duyệt `localhost:5173` lên để xem kết quả)**
🗣️ **Thoại:** 
> "Mình bật trình duyệt lên. Vì web dùng công nghệ Hot Reload, mọi thứ tự cập nhật. Logo đã biến thành `DEMO STORE` và chữ trên menu đã chuyển sang màu đỏ mà không cần tải lại trang."

---

## 🎬 CẢNH 3: GIỚI THIỆU BÍ KÍP THÊM TRANG MỚI VÀ KẾT THÚC (45 giây)

**(Mở VS Code, bấm vào file `HUONG_DAN_THEM_TRANG_NHANH.md`)**
🗣️ **Thoại:** 
> "Chưa hết, nếu có bài test bất ngờ yêu cầu tạo hẳn một trang web mới tinh (ví dụ trang About Us) thì sao? Nhóm mình cũng đã chuẩn bị sẵn file `HUONG_DAN_THEM_TRANG_NHANH.md`. 
> Trong này có sẵn đoạn code mẫu. Chỉ cần tạo file `about.tsx`, copy-paste đoạn code này vào, rồi copy 1 dòng duy nhất dán lên `Navbar.tsx` là xong toàn bộ quá trình, mất chưa tới 30 giây."

**(Chỉ chuột vào khu vực Terminal dưới cùng của VS Code)**
🗣️ **Thoại kết thúc:** 
> "Sau khi sửa xong, mình chỉ việc gõ lệnh `git push` ở dưới Terminal này, toàn bộ sửa đổi sẽ được đưa lên GitHub và Vercel sẽ tự động xuất bản lên mạng cho khách hàng. Hệ thống này giúp team hoàn toàn làm chủ website với chi phí 0 đồng mà vẫn cực kỳ dễ quản lý. Cảm ơn mọi người đã theo dõi!"
