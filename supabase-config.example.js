// =====================================================
// CẤU HÌNH SUPABASE — FILE MẪU
// =====================================================
// HƯỚNG DẪN:
//   1. Copy file này thành "supabase-config.js" (cùng thư mục)
//   2. Điền 2 giá trị URL và anonKey từ Supabase project của bạn
//   3. File supabase-config.js đã được liệt kê trong .gitignore
//      nên KHÔNG bị push lên GitHub — mỗi máy/host tự tạo riêng.
//
// Cách lấy URL và anon key:
//   - Vào https://supabase.com/dashboard → mở project
//   - Settings (bánh răng) → API
//   - Copy "Project URL" và "anon public" key
//
// Cách tạo bảng:
//   - Vào SQL Editor → New query → chạy SQL sau:
/*
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
*/
//
// Nếu để nguyên YOUR_... web sẽ chạy bằng localStorage (offline mode).
window.SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_ANON_KEY'
};
