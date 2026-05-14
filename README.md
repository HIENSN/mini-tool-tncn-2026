# Mini Tool Tính Thuế TNCN 2026

Bộ công cụ web gồm **3 trang** phục vụ tra cứu và tính **Thuế Thu nhập Cá nhân (TNCN)** theo **Luật số 109/2025/QH15** và **Nghị quyết 110/2025/UBTVQH15**, áp dụng từ **01/01/2026**.

> 🌐 **Demo trực tuyến:** https://hiensn.github.io/mini-tool-tncn-2026/

> Chạy hoàn toàn trên trình duyệt — không cần backend, dữ liệu admin lưu trong `localStorage`.

## Các trang trong sản phẩm

| Trang | File | Chức năng |
|-------|------|-----------|
| **Tính thuế** | `index.html` | Tính thuế TNCN năm theo biểu lũy tiến 5 bậc |
| **Luật TNCN** | `luat.html` | Tổng hợp các quy định luật cho người dùng tra cứu |
| **Admin** | `admin.html` | Trang quản trị: thêm/sửa/xoá/sắp xếp các điều luật |

Cả ba trang dùng chung thanh điều hướng — di chuyển qua lại bằng menu trên cùng.

## Tính năng chính

### 🧮 Trang tính thuế (`index.html`)
- Nhập **nhiều nguồn thu nhập** (lương, thưởng, hợp đồng dịch vụ…) — tự cộng tổng
- Nhập **bảo hiểm bắt buộc** (BHXH/BHYT/BHTN) đã đóng trong năm
- Tự tính **giảm trừ gia cảnh**: 186.000.000đ/năm bản thân + 74.400.000đ/năm/người phụ thuộc
- Tính **thuế TNCN năm** theo biểu lũy tiến **5 bậc** mới
- Hiển thị **breakdown chi tiết theo từng bậc thuế** và **thuế suất hiệu dụng**
- Tính **thu nhập sau thuế (net)**

### 📖 Trang luật (`luat.html`)
- Hiển thị **9 mục luật mặc định** (cơ sở pháp lý, đối tượng, biểu thuế, giảm trừ, miễn thuế, quyết toán...)
- **Mục lục** điều hướng nhanh trong trang
- **Tìm kiếm** trong nội dung các điều khoản
- Đọc dữ liệu trực tiếp từ `localStorage` (do Admin chỉnh sửa)

### 🔐 Trang admin (`admin.html`)
- **Đăng nhập** bằng mật khẩu (mặc định: `admin123`, đổi tại biến `ADMIN_PASSWORD` trong file)
- **CRUD đầy đủ**: thêm mục mới, sửa tiêu đề & nội dung, xoá, sắp xếp lên/xuống
- Hỗ trợ **soạn thảo HTML** (h3, p, ul/ol, table, blockquote, b…) cho mỗi mục
- **Xuất / Nhập JSON** — sao lưu hoặc chuyển dữ liệu sang máy khác
- **Khôi phục mặc định** chỉ với một nút bấm

## Biểu thuế lũy tiến 5 bậc (áp dụng từ 2026)

| Bậc | Thu nhập tính thuế / năm | Thuế suất |
|-----|-------------------------|-----------|
| 1   | Đến 120 triệu           | 5%        |
| 2   | Trên 120 – 360 triệu    | 10%       |
| 3   | Trên 360 – 720 triệu    | 20%       |
| 4   | Trên 720 – 1.200 triệu  | 30%       |
| 5   | Trên 1.200 triệu        | 35%       |

## Cách dùng

### Cách 1: Mở trực tiếp
```bash
git clone https://github.com/HIENSN/mini-tool-tncn-2026.git
cd mini-tool-tncn-2026
# Mở index.html bằng trình duyệt
```

### Cách 2: Truy cập bản đã deploy
👉 https://hiensn.github.io/mini-tool-tncn-2026/

### Cách 3: Tự deploy lên GitHub Pages
1. Fork repo này về tài khoản của bạn
2. Vào **Settings → Pages**
3. Tại **Source**, chọn branch `main` + folder `/ (root)` → **Save**
4. Sau vài giây sẽ có URL dạng `https://<username>.github.io/<repo>/`

## Lưu trữ dữ liệu (Database)

Toàn bộ nội dung mục luật được lưu trong **`localStorage`** của trình duyệt người dùng, key `tncn_law_sections_v1`. Nghĩa là:

- Mỗi trình duyệt giữ một bản sao riêng — chỉnh sửa của admin trên máy A không ảnh hưởng đến máy B.
- Phù hợp với phạm vi bài tập / demo cá nhân (không cần dựng server).
- Muốn đồng bộ giữa nhiều máy: dùng nút **Xuất JSON** → gửi file qua máy khác → **Nhập JSON**.

## Stack

- HTML / CSS / Vanilla JavaScript — không framework, không build step
- Font: Inter (Google Fonts)
- 3 file HTML độc lập, dễ host trên bất kỳ static hosting nào

## Cấu trúc thư mục

```
.
├── index.html                # Trang tính thuế (chính)
├── luat.html                 # Trang tổng hợp luật TNCN
├── admin.html                # Trang quản trị nội dung luật
├── README.md                 # File này
├── LICENSE                   # MIT License
├── .gitignore                # Loại trừ file IDE/OS/env
└── claude-code-history.txt   # Lịch sử trò chuyện với Claude Code
```

## License

[MIT](LICENSE)

## Ghi chú pháp lý

Tool có tính chất **tham khảo phục vụ học tập**. Số thuế thực tế phụ thuộc vào hồ sơ cụ thể (giảm trừ khác, thu nhập từ nhiều nguồn có cách tính khác nhau, quyết toán cuối năm…). Vui lòng đối chiếu với cơ quan thuế hoặc kế toán khi cần con số chính thức.
