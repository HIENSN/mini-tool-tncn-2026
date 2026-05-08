# Mini Tool Tính Thuế TNCN 2026

Công cụ web tính **Thuế Thu nhập Cá nhân (TNCN)** theo **Luật Thuế TNCN số 109/2025/QH15** và **Nghị quyết 110/2025/UBTVQH15**, áp dụng từ **01/01/2026**.

> Chạy hoàn toàn trên trình duyệt — không cần backend, không lưu dữ liệu, không cần hosting phức tạp.

## Tính năng

- Nhập **nhiều nguồn thu nhập** (lương, thưởng, hợp đồng dịch vụ…) — tự cộng tổng
- Nhập **bảo hiểm bắt buộc** (BHXH/BHYT/BHTN) đã đóng trong năm
- Tự tính **giảm trừ gia cảnh**: 186.000.000đ/năm bản thân + 74.400.000đ/năm/người phụ thuộc
- Tính **thuế TNCN năm** theo biểu lũy tiến **5 bậc** mới
- Hiển thị **breakdown chi tiết theo từng bậc thuế** và **thuế suất hiệu dụng**
- Tính **thu nhập sau thuế (net)**
- Tự format số tiền theo định dạng Việt Nam (`1.000.000`)
- Responsive — chạy mượt trên mobile

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
Tải repo về và mở `index.html` bằng trình duyệt — xong.

### Cách 2: Demo online (GitHub Pages)
Truy cập: `https://<username>.github.io/<ten-repo>/`

## Stack

- HTML / CSS / Vanilla JavaScript — không framework, không build step
- Font: Inter (Google Fonts)
- 1 file duy nhất (`index.html`) — gọn, dễ deploy

## Cấu trúc

```
.
├── index.html              # Toàn bộ tool (HTML + CSS + JS)
├── README.md               # File này
└── claude-code-history.txt # Lịch sử trò chuyện với Claude Code
```

## Ghi chú pháp lý

Tool có tính chất **tham khảo**. Số thuế thực tế phụ thuộc vào hồ sơ cụ thể (giảm trừ khác, thu nhập từ nhiều nguồn có cách tính khác nhau, quyết toán cuối năm…). Vui lòng đối chiếu với cơ quan thuế hoặc kế toán khi cần con số chính thức.
