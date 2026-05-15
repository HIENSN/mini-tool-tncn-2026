# Mini Tool Tính Thuế TNCN 2026

Bộ công cụ web gồm **3 trang** phục vụ tra cứu và tính **Thuế Thu nhập Cá nhân (TNCN)** theo **Luật số 109/2025/QH15** và **Nghị quyết 110/2025/UBTVQH15**, áp dụng từ **01/01/2026**.

> 🌐 **Demo trực tuyến:** https://hiensn.github.io/mini-tool-tncn-2026/

> Frontend tĩnh (HTML/CSS/JS thuần) + database **Supabase** (Postgres + Realtime) cho dữ liệu mục luật. Tự fallback sang `localStorage` nếu chưa cấu hình Supabase.

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
- Đọc dữ liệu trực tiếp từ Supabase (do Admin chỉnh sửa) — tự cập nhật realtime khi admin sửa ở tab khác

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

### Cách 1: Mở trực tiếp (chế độ offline — localStorage)
```bash
git clone https://github.com/HIENSN/mini-tool-tncn-2026.git
cd mini-tool-tncn-2026
cp supabase-config.example.js supabase-config.js
# Mở index.html bằng trình duyệt — vì chưa điền key nên dùng localStorage
```

### Cách 2: Truy cập bản đã deploy
👉 https://hiensn.github.io/mini-tool-tncn-2026/

### Cách 3: Tự deploy + kết nối Supabase
1. Fork repo này về tài khoản của bạn
2. Tạo Supabase project và bảng (xem [Setup Supabase](#setup-supabase) bên dưới)
3. Copy `supabase-config.example.js` thành `supabase-config.js`, điền URL + anon key
4. Vào **Settings → Pages**, chọn branch `main` + folder `/ (root)` → **Save**
5. Sau vài giây sẽ có URL dạng `https://<username>.github.io/<repo>/`

> ⚠️ File `supabase-config.js` **đã được gitignore** để khỏi push key lên GitHub. Khi deploy GitHub Pages, bạn cần commit phiên bản chứa key thật vào branch riêng (vd `gh-pages`) hoặc dùng GitHub Actions ghi file lúc build.

## Setup Supabase

### 1. Tạo project
- Vào https://supabase.com → New project (chọn region Singapore cho gần VN)

### 2. Tạo bảng `law_sections`
Mở **SQL Editor** → chạy đoạn SQL sau:
```sql
create table law_sections (
  id text primary key,
  title text not null,
  content text not null,
  position int not null default 0,
  updated_at timestamptz not null default now()
);
alter table law_sections enable row level security;
create policy "Anyone can read" on law_sections for select using (true);
create policy "Anyone can write" on law_sections for all using (true) with check (true);
alter publication supabase_realtime add table law_sections;
```

### 3. Lấy URL + anon key
**Project Settings → API** → copy **Project URL** và **anon public** key → dán vào `supabase-config.js`.

### 4. Khởi tạo dữ liệu
Mở `admin.html` lần đầu → đăng nhập (mật khẩu `admin123`) → tool tự đẩy 9 mục mặc định lên Supabase.

## Lưu trữ dữ liệu (Database)

- **Khi đã cấu hình Supabase**: dữ liệu lưu trên cloud, đồng bộ giữa mọi thiết bị, realtime giữa các tab.
- **Khi chưa cấu hình** (`supabase-config.js` còn placeholder hoặc thiếu): tự fallback sang `localStorage` của trình duyệt (key `tncn_law_sections_v1`).
- Nút **Xuất / Nhập JSON** trong admin vẫn hoạt động để backup hoặc migrate dữ liệu.

> ⚠️ **Lưu ý bảo mật**: policy `"Anyone can write"` cho phép ai có anon key đều có thể sửa DB. Phù hợp cho bài tập/demo. Production thật nên dùng Supabase Auth + RLS theo user role.

## Stack

- HTML / CSS / Vanilla JavaScript — không framework, không build step
- Font: Inter (Google Fonts)
- Database: **Supabase** (`@supabase/supabase-js` qua CDN) — Postgres + Realtime + Row-Level Security
- Fallback: `localStorage` khi chưa cấu hình Supabase

## Cấu trúc thư mục

```
.
├── index.html                      # Trang tính thuế (chính)
├── luat.html                       # Trang tổng hợp luật TNCN (đọc Supabase)
├── admin.html                      # Trang quản trị (ghi Supabase)
├── supabase-config.example.js      # File mẫu cấu hình Supabase
├── supabase-config.js              # (gitignored) Cấu hình thật — tự tạo từ .example
├── README.md                       # File này
├── LICENSE                         # MIT License
├── .gitignore                      # Loại trừ file IDE/OS/env/config
└── claude-code-history.txt         # Lịch sử trò chuyện với Claude Code
```

## License

[MIT](LICENSE)

## Ghi chú pháp lý

Tool có tính chất **tham khảo phục vụ học tập**. Số thuế thực tế phụ thuộc vào hồ sơ cụ thể (giảm trừ khác, thu nhập từ nhiều nguồn có cách tính khác nhau, quyết toán cuối năm…). Vui lòng đối chiếu với cơ quan thuế hoặc kế toán khi cần con số chính thức.
