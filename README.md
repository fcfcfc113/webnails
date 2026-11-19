# Petal & Polish — Nail Studio landing page

Vue 3 + Vite, phục vụ bằng Nginx trong Docker.

## Chạy nhanh

```bash
# Dev (hot reload) → http://localhost:5173
npm install
npm run dev

# Build tĩnh → thư mục dist/
npm run build

# Docker → http://localhost:8080
docker compose up -d --build
```

## Sửa nội dung

Tất cả nội dung mẫu nằm trong **`src/data.js`**:

| Mục | Biến |
|---|---|
| Tên tiệm, SĐT, địa chỉ, giờ mở cửa | `salon` |
| Bảng giá dịch vụ | `menu` |
| Mẫu nail trong gallery | `designs` |
| Khung giờ trống (demo tự sinh) | `upcomingSlots()` |

> Tên tiệm, giá, địa chỉ, SĐT, giờ mở cửa đều là **dữ liệu mẫu**: thay bằng thông tin thật trước khi public.

## Ảnh, video, reels (src/media.js)

- `PHOTOS`: ảnh dùng toàn trang (đang là ảnh stock Unsplash, cần thay bằng ảnh thật của tiệm).
- `COVERS`: 4 ảnh slideshow bìa cho từng mùa.
- `TOUR`: video giới thiệu tiệm (mp4 + poster).
- `REELS`: dán link bài thật vào `embed` (TikTok /video/…, Instagram /reel/…, Facebook video, YouTube /shorts/…) là tự nhúng player chính chủ; để trống thì phát clip mẫu.
- `SOCIALS`: link và tên tài khoản 4 nền tảng.
- `GALLERY`: ảnh trong carousel Fresh sets.

## Concept theo mùa

Trang có 10 "số tạp chí" (thêm **Winter** tháng 1) (`src/seasons.js`): **Signature**, **Valentine's**, **Spring & Easter**,
**Prom & Wedding**, **Summer & 4th of July**, **Fall / Autumn**, **Halloween**, **Thanksgiving**,
**Winter**, **Christmas & NYE**. Mỗi mùa đổi: bảng màu (`src/palettes.js`), ảnh bìa, tiêu đề, 8 mẫu nail,
sticker + hạt rơi + dây trang trí (`src/decor.js`), món đặc biệt trong bảng giá, câu chốt ở footer.

- **Auto** (mặc định): tự chọn mùa theo tháng hiện tại.
- Khách đổi bằng nút **Season** trên header; lựa chọn được nhớ (localStorage).
- Link thẳng tới một mùa: `/?season=halloween` (id: `signature, valentine, spring, prom, summer, fall, halloween, thanksgiving, christmas`).
- Thêm/sửa mùa: chỉnh object trong `SEASONS`. Mẫu nail dùng `bg` (CSS background) và `motif` (heart, star, ghost, web, drip, leaf, snowflake, bunny, bow, daisy, cat, pumpkin, sparkle).
- Đổi tháng ↔ mùa ở `BY_MONTH` cuối file.

## Đặt lịch

Form ở `src/components/BookTicket.vue` hiện chỉ giả lập gửi (`submit()`).
Nối vào backend thật bằng cách thay đoạn `await new Promise(...)` bằng `fetch('/api/bookings', { method: 'POST', body: ... })`.

## Cấu trúc

```
src/
  App.vue                 # ghép các section
  styles.css              # màu mực Riso, font, nút, mẫu móng CSS
  data.js / store.js      # nội dung + state đặt lịch
  components/
    SiteHeader.vue        # logo con dấu + menu
    HeroFlyer.vue         # tờ rơi + dải tab xé = giờ trống
    TipRail.vue           # gallery mẫu nail
    PriceMenu.vue         # bảng giá
    BookTicket.vue        # vé đặt lịch (form)
    VisitUs.vue           # địa chỉ, giờ, liên hệ
    SiteFooter.vue
    MobileBookBar.vue     # thanh "Book now" cố định trên mobile
Dockerfile, nginx.conf, docker-compose.yml
```
