# 🎨 BẢN ĐỒ CÁC FILE GIAO DIỆN CHÍNH (UI MAP)

Khi giáo viên yêu cầu: *"Đổi màu chỗ này, sửa chữ chỗ kia"* hoặc bạn muốn tự thay đổi diện mạo trang web, bạn không cần phải dò dẫm trong mớ code. Chỉ cần đối chiếu xem khu vực cần sửa nằm ở đâu trên web, sau đó mở ĐÚNG FILE tương ứng dưới đây để sửa!

---

## 1. MỤC "BỘ NÃO" (SỬA CHỮ TRÊN TOÀN WEB)
Nếu bạn chỉ muốn sửa chữ, đổi tên nút bấm, sửa thông báo... mà không cần đổi màu sắc hay hình ảnh, thì chỉ cần mở đúng 1 file duy nhất này:
- 📄 **File:** `src/lib/i18n.tsx`
- 🎯 **Chức năng:** Chứa toàn bộ các câu chữ Tiếng Việt và Tiếng Anh của toàn hệ thống (Từ chữ "Trang chủ" trên Menu, chữ "Mua ngay" trong nút bấm, cho đến thông báo "Thanh toán thành công").
- 💡 **Mẹo:** Bên trong file này đã có ghi chú Tiếng Việt hướng dẫn cách đổi chữ. Cứ gõ `Ctrl + F` tìm chữ đang hiện trên web rồi đổi nó trong ngoặc kép là xong.

---

## 2. MỤC "KHUNG XƯƠNG" (GIAO DIỆN CHUNG MỌI TRANG)
Đây là những phần luôn xuất hiện dù bạn đang đứng ở trang nào đi chăng nữa.
- 📄 **File Thanh Menu:** `src/components/Navbar.tsx`
  - *Dùng để:* Đổi tên Logo (UPRYZE), đổi màu thanh điều hướng ngang ở trên cùng, sửa icon Giỏ hàng.
- 📄 **File Chân trang:** `src/components/Footer.tsx`
  - *Dùng để:* Sửa số điện thoại, sửa email (`upryze.hcm@gmail.com`), thay đổi địa chỉ công ty và sửa các link ở dưới cùng của website.

---

## 3. MỤC "TRANG CHÍNH" (CÁC MÀN HÌNH LỚN)
Tùy vào việc bạn đang xem trang nào trên web mà mở file đó:
- 📄 **File Trang Chủ:** `src/routes/index.tsx`
  - *Dùng để:* Thay đổi ảnh Banner to đùng lúc mới vào web, đổi nội dung phần "Câu chuyện Upryze", và phần bộ câu hỏi trắc nghiệm Chấm điểm Công thái học.
- 📄 **File Trang Danh sách Sản phẩm:** `src/routes/products.index.tsx`
  - *Dùng để:* Sửa màu sắc của danh sách bộ lọc bên trái (Theo giá, Theo danh mục) và bố cục hiển thị lưới sản phẩm.
- 📄 **File Trang Chi tiết 1 Sản phẩm:** `src/routes/products.$id.tsx`
  - *Dùng để:* Chỉnh sửa cách hiển thị ảnh sản phẩm to, màu sắc nút bấm "Thêm vào giỏ", và khu vực hiển thị Đánh giá/Bình luận (Reviews) của khách hàng.
- 📄 **File Trang Thanh Toán:** `src/routes/checkout.tsx`
  - *Dùng để:* Chỉnh sửa giao diện Form điền Họ tên, Số điện thoại, Địa chỉ giao hàng.

---

## 4. MỤC "LINH KIỆN NHỎ" (THẺ SẢN PHẨM)
- 📄 **File Thẻ Sản Phẩm:** `src/components/ProductCard.tsx`
  - *Dùng để:* Chỉnh sửa cái Thẻ hình vuông chứa Ảnh + Giá tiền sản phẩm. Bất cứ khi nào bạn thấy thẻ sản phẩm này xuất hiện (Ở trang chủ hay ở Trang danh sách), nó đều dùng chung file này. Nếu bạn đổi nền thẻ thành màu Đỏ trong file này, thì mọi thẻ sản phẩm trên toàn website đều biến thành màu đỏ!

---

> **⭐ Tóm lại:** 
> - Sửa chữ -> `i18n.tsx`
> - Sửa Menu trên cùng -> `Navbar.tsx`
> - Sửa ảnh/chữ bự ở Trang chủ -> `routes/index.tsx`
> - Sửa màu cái thẻ sản phẩm -> `ProductCard.tsx`
