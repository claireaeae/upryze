# 🎬 KỊCH BẢN QUAY VIDEO HƯỚNG DẪN TEAM SỬA CODE (INTERNAL)

**Mục tiêu:** Video nội bộ gửi cho các bạn trong nhóm (những bạn không biết code) xem để tự biết cách mở VS Code lên, tự sửa chữ, sửa màu và tự đẩy lên mạng.
**Giọng điệu:** Bạn bè, siêu chậm, siêu dễ hiểu. Chỉ đâu bấm đó.
**Thời lượng:** Khoảng 3 - 4 phút.
**Chuẩn bị:** Mở sẵn VS Code (bên trái là danh sách file), Mở sẵn trình duyệt web chạy `http://localhost:5173`.

---

## 🎬 BƯỚC 1: GIỚI THIỆU 2 TÀI LIỆU "CỨU MẠNG" (45 giây)

**(Mở VS Code lên, phóng to cột chứa file bên trái)**
🗣️ **Thoại:** 
> "Hello mọi người. Nhóm mình code web bằng React nghe có vẻ đáng sợ, nhưng thực ra sửa nó cực kỳ dễ như xài Word thôi. Để mọi người ai cũng sửa được lúc lên thuyết trình, tui đã chuẩn bị sẵn 2 file Bí Kíp nằm ngay ngoài cùng của VS Code đây:
> 
> 1. File thứ nhất là `DANH_SACH_FILE_GIAO_DIEN.md`: Chứa bản đồ chỉ đường. Mọi người muốn sửa chữ, sửa ảnh hay sửa màu ở khúc nào trên web thì cứ mở file này lên, nó sẽ bảo mọi người bấm vào file code nào.
> 2. File thứ hai là `HUONG_DAN_THEM_TRANG_NHANH.md`: Cái này để phòng hờ cô bắt tạo thêm 1 trang web mới tinh. Trong này tui viết sẵn code rồi, tí nữa tui sẽ làm mẫu cách copy-paste."

---

## 🎬 BƯỚC 2: THỰC HÀNH SỬA CHỮ VÀ MÀU SẮC (1.5 phút)

**(Vẫn ở màn hình VS Code)**
🗣️ **Thoại:** 
> "Bây giờ tui làm mẫu sửa giao diện nha. Giả sử cô giáo kêu 'Đổi màu nút Thanh toán trong Giỏ hàng đi'.
> Theo cái 'bản đồ' lúc nãy, để sửa Giỏ hàng thì mình phải mở thư mục `src`, vào thư mục `components`, rồi bấm đúp chuột vào file `CartDrawer.tsx`."

👉 **Hành động & Thoại tiếp:** 
1. *(Mở file CartDrawer.tsx lên, cuộn chuột từ từ xuống dưới cùng)*. "Mọi người cứ kéo từ từ xuống. Thấy không? Tui đã rải sẵn ghi chú Tiếng Việt màu xanh lá cây: `👉 ĐỔI MÀU NÚT THANH TOÁN (CHECKOUT) TRONG GIỎ HÀNG`. Mọi người KHÔNG CẦN hiểu code, cô bảo sao sửa vậy."
2. "Ở dòng ngay bên dưới, tui sẽ đổi chữ `bg-neutral-900` thành `bg-green-600` (Màu xanh lá cây) nha. Rồi bấm `Ctrl + S` trên bàn phím để lưu lại."

**(Chuyển qua cửa sổ trình duyệt đang mở web)**
🗣️ **Thoại:** 
> "Giờ bật web lên coi thử nè. Bấm vào icon Giỏ hàng một phát! Bùm! Nút Thanh toán đã chuyển sang màu xanh lá cây cái rụp mà không cần F5 tải lại trang gì hết á."

---

## 🎬 BƯỚC 3: COPY-PASTE ĐỂ TẠO TRANG MỚI (1 phút)

**(Quay lại VS Code, mở file `HUONG_DAN_THEM_TRANG_NHANH.md` ra)**
🗣️ **Thoại:** 
> "Lỡ mà cô bắt tạo một trang mới thì sao? Đừng hoảng. Mọi người mở cái file `HUONG_DAN_THEM_TRANG_NHANH.md` này lên. Trong này có 3 bước siêu ngắn:
> Đầu tiên là tạo file `about.tsx` trong thư mục `src/routes/`. Rồi bôi đen toàn bộ đoạn code mẫu tui để sẵn, Copy, rồi Paste vô file `about.tsx` vừa tạo. Nhớ bấm `Ctrl + S`.
> Xong rồi copy cái dòng số 2 dán vô file `Navbar.tsx` để nó hiện lên Menu. Bấm `Ctrl + S`. Vậy là xong! Mọi người cứ làm y chang như tui gõ là ăn điểm tuyệt đối." *(Vừa nói vừa làm mẫu thật nhanh thao tác copy-paste)*.

---

## 🎬 BƯỚC 4: LƯU LÊN MẠNG CHO CÔ XEM (30 giây)

**(Chỉ chuột vào khu vực Terminal đen đen ở dưới cùng VS Code)**
🗣️ **Thoại kết thúc:** 
> "Sau khi sửa web trên máy tính mình xong và thấy ưng ý rồi, bước cuối cùng là đẩy nó lên mạng thật để cô chấm điểm.
> Mọi người nhìn xuống cái bảng đen đen tên là Terminal ở dưới này nè. Mọi người gõ lần lượt 3 câu thần chú này rồi Enter là xong:
> - Đầu tiên gõ: `git add .` (Nhớ có dấu chấm nha)
> - Tiếp theo gõ: `git commit -m "Sửa bài cho cô xem"`
> - Cuối cùng gõ: `git push`
> Đợi xíu cho nó chạy xong là mọi người có thể tự tin mở trang web thật của nhóm mình lên, bấm F5 là mọi thứ đã cập nhật y chang! Dễ ẹc đúng không? Chúc mấy bà / mấy ông tự tin thuyết trình nha!"
