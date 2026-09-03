# WEDDING INVITATION — VIBE CODING MASTER PLAN

## 0. MỤC TIÊU

Xây dựng một website thiệp cưới cinematic, hiện đại, cực kỳ đẹp và có cảm giác như một mini interactive wedding experience.

Website cần:
- Chạy hoàn toàn bằng React + TypeScript.
- Deploy trực tiếp lên Vercel.
- Không dùng Java/Spring Boot/MySQL.
- Dùng Supabase làm Backend-as-a-Service.
- Có trang public cho khách xem thiệp.
- Có trang Admin để nhập/chỉnh sửa thông tin.
- Dữ liệu thay đổi trong Admin phải cập nhật lên thiệp mà không cần deploy lại.
- Có nhạc nền, video, 28 ảnh cưới, hiệu ứng cinematic và anime wedding.
- UX phải có 2 kiểu:
  1. Quick Explore: khách scroll nhanh vẫn thấy toàn bộ nội dung khoảng 20 giây.
  2. Story Mode: khách bấm PLAY OUR STORY và website tự dẫn qua các scene khoảng 60 giây.

---

# 1. TECH STACK

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

## Animation

- GSAP
- GSAP ScrollTrigger
- Lenis smooth scrolling
- Framer Motion chỉ dùng nếu thực sự cần cho UI nhỏ

Không lạm dụng animation library.

## Backend / Data

- Supabase
  - PostgreSQL Database
  - Storage
  - Authentication cho Admin nếu cần
  - Supabase JS SDK

## Media

- Có thể dùng Supabase Storage cho media nhỏ.
- Nếu video/ảnh lớn thì ưu tiên Cloudinary.
- Ảnh nên được tối ưu WebP/AVIF.
- Video nên dùng MP4/H.264.

## Deployment

- Vercel

---

# 2. CORE ARCHITECTURE

```text
src/
├── components/
│   ├── MusicPlayer/
│   ├── LoadingScreen/
│   ├── Envelope/
│   ├── Petals/
│   ├── Cursor/
│   ├── SectionTitle/
│   ├── Countdown/
│   ├── PhotoGallery/
│   ├── Timeline/
│   ├── WeddingLocation/
│   ├── StoryMode/
│   └── VideoSection/
│
├── sections/
│   ├── Opening/
│   ├── Story/
│   ├── Gallery/
│   ├── Anime/
│   ├── Video/
│   ├── WeddingDetails/
│   └── Finale/
│
├── pages/
│   ├── WeddingPage/
│   ├── AdminLogin/
│   └── AdminDashboard/
│
├── hooks/
│   ├── useWedding.ts
│   ├── useMusic.ts
│   ├── useScrollAnimation.ts
│   └── useStoryMode.ts
│
├── lib/
│   ├── supabase.ts
│   └── utils.ts
│
├── types/
│   └── wedding.ts
│
├── data/
│   └── fallbackWedding.ts
│
├── assets/
│   ├── images/
│   ├── videos/
│   ├── music/
│   └── anime/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 3. SUPABASE DATA MODEL

Tạo database để website không hard-code dữ liệu.

## weddings

```text
id
slug
groom_name
bride_name
groom_mother
bride_mother
ceremony_date_lunar
ceremony_date_solar
ceremony_time
party_date
party_time
theme
intro_text
story_text
finale_text
created_at
updated_at
```

## locations

```text
id
wedding_id
type
title
address
maps_url
latitude
longitude
```

`type`:

```text
groom
bride
```

## photos

```text
id
wedding_id
image_url
title
caption
section
sort_order
```

`section` có thể:

```text
opening
story
gallery
anime
finale
```

## videos

```text
id
wedding_id
video_url
thumbnail_url
sort_order
```

## music

```text
id
wedding_id
music_url
title
enabled
```

## timeline_events

```text
id
wedding_id
date
title
description
image_url
sort_order
```

## rsvps

```text
id
wedding_id
guest_name
attendance
message
created_at
```

## wishes

```text
id
wedding_id
guest_name
message
created_at
```

---

# 4. WEDDING DATA HIỆN TẠI

Dùng dữ liệu này làm seed/demo data:

## Groom

```text
Tuấn Anh
Mẹ: Phạm Thị Tuyết
```

## Bride

```text
Phạm Hoà
Mẹ: Phạm Thị Nhâm
```

## Ceremony

```text
10:00
09/09/2026 âm lịch
18/10/2026 dương lịch
```

## Groom location

```text
Thôn Cổ Trai - xã Hồng Minh - tỉnh Hưng Yên
```

## Bride location

```text
Thôn Vạn Xuân - xã Lê Quý Đôn - tỉnh Hưng Yên
```

## Party date

KHÔNG hard-code.

Admin phải nhập/chỉnh sửa được.

---

# 5. PUBLIC URL

Thiết kế URL dạng:

```text
/w/:slug
```

Ví dụ:

```text
/w/pham-hoa-tuan-anh
```

React lấy `slug` → query Supabase → render đúng wedding.

Không hard-code một wedding duy nhất trong component.

---

# 6. ADMIN

Tạo:

```text
/admin
```

Admin có thể:

- Login
- Chỉnh tên cô dâu
- Chỉnh tên chú rể
- Chỉnh tên bố/mẹ
- Chỉnh ngày cưới
- Chỉnh giờ
- Chỉnh ngày tiệc
- Chỉnh địa chỉ
- Chỉnh Google Maps URL
- Upload ảnh
- Sắp xếp ảnh
- Upload video
- Chọn nhạc
- Chỉnh timeline
- Chỉnh text
- Preview wedding
- Publish

Admin thay đổi dữ liệu → Supabase lưu → public page đọc dữ liệu mới.

KHÔNG cần deploy lại Vercel.

---

# 7. OPENING — PHẢI CỰC KỲ ẤN TƯỢNG

Opening là phần quan trọng nhất.

Flow:

```text
Black screen
↓
"A STORY IS ABOUT TO BEGIN"
↓
particles / film grain
↓
PHẠM HOÀ
&
TUẤN ANH
↓
"ARE GETTING MARRIED"
↓
Envelope / Wedding Invitation
↓
TAP TO OPEN
```

Nút:

```text
TAP TO OPEN
```

phải là điểm tương tác đầu tiên.

Khi user TAP TO OPEN:

1. Envelope mở.
2. Transition cinematic.
3. Hero image xuất hiện.
4. Music bắt đầu.
5. Website chuyển sang main experience.

---

# 8. MUSIC REQUIREMENT — CỰC KỲ QUAN TRỌNG

Website có nhạc nền.

Browser thường chặn autoplay audio nếu chưa có user interaction.

Vì vậy:

```text
Page load
↓
NO MUSIC
↓
User TAP TO OPEN
↓
Audio.play()
↓
Music starts
```

Tận dụng chính click `TAP TO OPEN` để kích hoạt audio.

## Volume

Ngay sau khi `TAP TO OPEN`:

```text
audio.volume = 1
```

Tức là volume của HTML Audio phải ở mức tối đa.

## UI Music

KHÔNG hiển thị thanh volume.

Không có slider:

```text
Volume ─────────────
```

Không có volume control.

Chỉ hiển thị một nút nhỏ:

```text
♫
```

hoặc

```text
MUSIC ON
```

để user có thể:

```text
MUSIC ON → MUSIC OFF
```

Nếu music đang chạy:

```text
♫ animated icon
```

Nếu tắt:

```text
♫ muted
```

## Quan trọng

Không cố vượt qua giới hạn âm lượng của hệ điều hành/browser.

`audio.volume = 1` chỉ đặt volume HTML Audio ở mức tối đa; âm lượng thực tế vẫn phụ thuộc thiết bị và trình duyệt.

## Music implementation

Tạo hook:

```text
useMusic()
```

API mong muốn:

```ts
play()
pause()
toggle()
isPlaying
```

Audio nên là một instance duy nhất và được giữ xuyên suốt website.

Không tạo nhiều audio element cho từng section.

---

# 9. HERO

Sau TAP TO OPEN:

```text
Full screen hero
+
couple photo
+
slow zoom
+
film grain
+
particles
+
floating petals
```

Tên:

```text
PHẠM HOÀ
&
TUẤN ANH
```

Subtext:

```text
ARE GETTING MARRIED
```

Animation:

- opacity
- blur → sharp
- scale 1.08 → 1
- letter spacing
- subtle parallax

Không làm animation quá nhanh.

---

# 10. ACT I — THE INVITATION

```text
I.
THE INVITATION
```

Nội dung:

```text
A story is about to begin.
```

Sau đó couple introduction.

Không dùng quá nhiều text.

Thiệp cưới phải ưu tiên:

```text
IMAGE > TYPOGRAPHY > ANIMATION > TEXT
```

---

# 11. ACT II — OUR STORY

Tiêu đề:

```text
II.
OUR STORY
```

Hiển thị 5–8 ảnh đầu tiên.

Mỗi ảnh có thể dùng:

- fade
- scale
- parallax
- blur → sharp
- horizontal movement
- text reveal

Không cho tất cả ảnh chạy cùng một animation.

Tạo cảm giác giống trailer phim.

---

# 12. 28 PHOTOS

KHÔNG hiển thị 28 ảnh thành slideshow đơn giản.

Phân bổ:

```text
Opening       2–3
Story         5–6
Gallery       8–10
Transitions   3–4
Details       2–3
Finale        3–4
```

Tổng khoảng 28 ảnh.

Có thể reuse một số ảnh với crop/animation khác.

---

# 13. PHOTO GALLERY

Gallery phải có cảm giác editorial / luxury wedding.

Không dùng grid đơn giản:

```text
[1][2][3]
[4][5][6]
[7][8][9]
```

Ưu tiên:

- masonry
- overlapping cards
- asymmetric layout
- full-screen image
- horizontal gallery
- image reveal
- parallax

Một số ảnh full-screen.

Một số ảnh nhỏ xếp chồng.

---

# 14. ANIME WEDDING SCENE

Đây là một trong những điểm WOW.

Flow:

```text
REAL PHOTO
↓
zoom into photo
↓
blur
↓
anime wedding scene
↓
wind / flowers / petals
↓
camera movement
↓
transition back
↓
REAL PHOTO
```

Anime image/video có thể được tạo sẵn và đặt trong:

```text
assets/anime/
```

Không cần AI generation runtime.

---

# 15. TIMELINE

Ví dụ:

```text
OUR FIRST CHAPTER

202X
The beginning

202X
A new memory

202X
The proposal

2026
Forever begins
```

Timeline phải dynamic từ Supabase.

Admin có thể thêm/xóa/sửa event.

---

# 16. VIDEO

Video nên ngắn:

```text
10–15 seconds
```

Dùng cinematic transition.

Không tự động phát video có âm thanh khi chưa có interaction.

Sau TAP TO OPEN mới cho phép video play nếu cần.

Ưu tiên:

```text
muted autoplay
loop
playsInline
```

cho background video.

Nếu video có audio riêng thì phải có interaction.

---

# 17. WEDDING DETAILS

Hiển thị:

```text
THE DAY HAS COME
```

Sau đó:

```text
18 · 10 · 2026
10:00
```

Và ceremony:

```text
09 · 09 · 2026
LUNAR CALENDAR
```

Ngày party lấy từ Supabase.

---

# 18. COUNTDOWN

Countdown đến:

```text
party_date + party_time
```

Nếu party date chưa có:

```text
Coming Soon
```

Không crash.

Countdown gồm:

```text
DAYS
HOURS
MINUTES
SECONDS
```

Animation nhẹ.

---

# 19. TWO LOCATIONS

Hiển thị hai card:

```text
GROOM'S HOUSE

Thôn Cổ Trai
xã Hồng Minh
tỉnh Hưng Yên

[VIEW ON GOOGLE MAPS]
```

và:

```text
BRIDE'S HOUSE

Thôn Vạn Xuân
xã Lê Quý Đôn
tỉnh Hưng Yên

[VIEW ON GOOGLE MAPS]
```

Click mở Google Maps ở tab mới.

Google Maps URL phải lấy từ Supabase.

---

# 20. WEDDING JOURNEY

Tạo visual:

```text
GROOM
  ●
  │
  │  wedding journey
  │
  ●
BRIDE
```

Có thể animation đường chạy từ điểm này sang điểm kia.

Không cần map API phức tạp.

---

# 21. STORY MODE

Tạo nút:

```text
▶ PLAY OUR STORY
```

Khi click:

```text
Opening
↓
Hero
↓
Story
↓
Photos
↓
Anime
↓
Video
↓
Wedding details
↓
Finale
```

Tự động chuyển scene.

Mục tiêu:

```text
~60 seconds
```

Nếu user scroll/tương tác:

```text
Story Mode stops gracefully
```

Không khóa người dùng.

---

# 22. QUICK EXPLORE MODE

Nếu user không bấm PLAY:

Website hoạt động như trang bình thường.

User scroll nhanh:

```text
Opening
↓
Story
↓
Gallery
↓
Details
↓
Finale
```

Có thể xem toàn bộ trong khoảng:

```text
~20 seconds
```

Không bắt buộc phải xem animation dài.

---

# 23. FINALE

Finale phải có cảm giác emotional.

Flow:

```text
Final photo
↓
slow zoom out
↓
petals
↓
anime scene
↓
quote
↓
names
↓
date
↓
fade to black
```

Text:

```text
THANK YOU
FOR BEING PART
OF OUR STORY
```

Sau đó:

```text
PHẠM HOÀ
&
TUẤN ANH
```

```text
18 · 10 · 2026
```

Cuối cùng:

```text
∞
```

hoặc fade to black.

Music tiếp tục thêm vài giây rồi fade out.

---

# 24. VISUAL LANGUAGE

Toàn website phải thống nhất.

Phong cách:

```text
Luxury
Cinematic
Romantic
Editorial
Anime-inspired
Elegant
```

Animation chủ đạo:

```text
fade
slow zoom
parallax
blur → sharp
clip-path reveal
mask reveal
text split reveal
floating particles
petals
film grain
```

KHÔNG dùng:

```text
bounce quá nhiều
neon
gradient sặc sỡ
animation random
quá nhiều shadow
UI kiểu dashboard cho public page
```

---

# 25. RESPONSIVE

Bắt buộc:

```text
Desktop
Tablet
Mobile
```

Mobile phải là first-class experience.

Đặc biệt kiểm tra:

```text
375px
390px
430px
768px
1024px
1440px+
```

Không để horizontal overflow.

Touch interaction phải hoạt động tốt.

---

# 26. PERFORMANCE

Website có nhiều ảnh/video nên phải tối ưu.

Yêu cầu:

- Lazy load ảnh ngoài viewport.
- Dùng responsive image sizes.
- WebP/AVIF.
- Không load 28 ảnh full resolution ngay lập tức.
- Video có poster.
- Chỉ load animation nặng khi cần.
- GSAP animation phải được cleanup.
- Không tạo memory leak.
- Respect `prefers-reduced-motion`.

Opening phải load nhanh.

Hero image nên preload.

---

# 27. ACCESSIBILITY

Dù website cinematic, vẫn phải có:

- alt cho ảnh.
- button thật cho interaction.
- keyboard accessibility.
- readable contrast.
- aria-label cho music button.
- không phụ thuộc hoàn toàn vào hover.
- reduced motion fallback.

---

# 28. FALLBACK

Nếu Supabase lỗi:

Không được crash toàn bộ website.

Hiển thị fallback data từ:

```text
src/data/fallbackWedding.ts
```

Nếu music không load:

Website vẫn hoạt động.

Nếu video không load:

Hiển thị poster/image thay thế.

Nếu animation không chạy:

Content vẫn phải xem được.

---

# 29. ERROR BOUNDARIES

Các phần quan trọng nên có defensive programming.

Không để một lỗi ở gallery làm hỏng toàn bộ invitation.

---

# 30. CODE QUALITY

Dùng:

- TypeScript strict.
- Components nhỏ.
- Reusable hooks.
- Không hard-code dữ liệu wedding trong UI.
- Không nhét toàn bộ website vào App.tsx.
- Không duplicate animation logic.
- Không dùng `any` nếu không cần.
- Tách data, UI, animation và Supabase logic.

---

# 31. ENV VARIABLES

Dùng:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

KHÔNG commit secret key/server key.

Chỉ sử dụng public anon key ở frontend với Supabase RLS được cấu hình đúng.

---

# 32. SUPABASE SECURITY

Bật Row Level Security.

Public user:

```text
SELECT published wedding
SELECT published photos
SELECT published locations
SELECT published timeline
```

Admin:

```text
INSERT
UPDATE
DELETE
UPLOAD
```

Không expose service role key ra frontend.

---

# 33. DEPLOYMENT

Vercel:

```text
GitHub repository
↓
Import Project
↓
Vite detected
↓
Add environment variables
↓
Deploy
```

Sau đó:

```text
git push
↓
Vercel automatic deployment
```

Dữ liệu wedding thay đổi:

```text
Admin
↓
Supabase
↓
Public page cập nhật
```

Không cần redeploy.

---

# 34. IMPLEMENTATION ORDER

AI CODE PHẢI LÀM THEO THỨ TỰ NÀY.

## STEP 1

Setup:

```text
Vite
React
TypeScript
Tailwind
GSAP
Lenis
Supabase
```

## STEP 2

Tạo layout + routing.

## STEP 3

Tạo Supabase client.

## STEP 4

Tạo types.

## STEP 5

Tạo database schema.

## STEP 6

Tạo fallback data.

## STEP 7

Làm Opening.

## STEP 8

Làm TAP TO OPEN + Music.

## STEP 9

Làm Hero.

## STEP 10

Làm Story.

## STEP 11

Làm Gallery.

## STEP 12

Làm Anime transition.

## STEP 13

Làm Video.

## STEP 14

Làm Wedding Details.

## STEP 15

Làm Countdown.

## STEP 16

Làm Locations + Google Maps.

## STEP 17

Làm Finale.

## STEP 18

Làm Story Mode.

## STEP 19

Làm Admin.

## STEP 20

Kết nối toàn bộ với Supabase.

## STEP 21

Responsive.

## STEP 22

Performance optimization.

## STEP 23

Deploy Vercel.

---

# 35. RULES CHO AI CODE

AI phải tuân thủ:

1. Không tự ý thêm Java/Spring Boot.
2. Không thêm backend server riêng.
3. Không thêm Docker.
4. Không thêm MySQL.
5. Không over-engineer.
6. Ưu tiên UX và visual quality.
7. Không tạo animation chỉ để cho có.
8. Animation phải phục vụ storytelling.
9. Không hard-code wedding data trong components.
10. Data phải có thể lấy từ Supabase.
11. Luôn có fallback data.
12. Mobile phải đẹp.
13. Không autoplay music trước user interaction.
14. Music chỉ bắt đầu sau `TAP TO OPEN`.
15. Sau `TAP TO OPEN`, set HTML Audio volume = `1`.
16. Không hiển thị volume slider.
17. Chỉ có Music ON/OFF control nhỏ.
18. Không vượt qua giới hạn volume của browser/OS.
19. Không để music reset khi chuyển section.
20. Không tạo nhiều audio instance.
21. Không dùng Three.js nếu chưa thực sự cần.
22. Không dùng quá nhiều thư viện.
23. Không phá các component đang hoạt động để sửa một lỗi nhỏ.
24. Mỗi feature phải test được độc lập.
25. Sau mỗi major step phải kiểm tra build.
26. Không tạo lỗi TypeScript.
27. Không dùng secret Supabase key ở frontend.
28. RLS phải được cấu hình.
29. Nếu Supabase chưa setup, dùng fallback data để UI vẫn chạy.
30. Ưu tiên website có cảm giác như một cinematic experience thay vì một dashboard.

---

# 36. DEFINITION OF DONE

Project được coi là hoàn thành khi:

- [ ] `npm run dev` chạy được.
- [ ] `npm run build` không lỗi.
- [ ] Desktop đẹp.
- [ ] Mobile đẹp.
- [ ] Opening cinematic.
- [ ] TAP TO OPEN hoạt động.
- [ ] Music bắt đầu đúng sau TAP TO OPEN.
- [ ] Music volume HTML Audio = 1.
- [ ] Không có volume slider.
- [ ] Có Music ON/OFF.
- [ ] 28 ảnh được sử dụng hợp lý.
- [ ] Có anime wedding transition.
- [ ] Có video.
- [ ] Có countdown.
- [ ] Có 2 địa điểm.
- [ ] Google Maps hoạt động.
- [ ] Story Mode khoảng 60 giây.
- [ ] Quick Explore khoảng 20 giây.
- [ ] Finale có emotional ending.
- [ ] Admin có thể chỉnh wedding information.
- [ ] Admin có thể thay đổi party date.
- [ ] Public page lấy dữ liệu từ Supabase.
- [ ] Dữ liệu thay đổi không cần deploy lại.
- [ ] Deploy thành công trên Vercel.

---

# 37. PROMPT CHO AI CODE

Bạn là senior frontend engineer + creative developer.

Hãy xây dựng project theo MASTER PLAN này.

Mục tiêu không phải chỉ làm một website CRUD, mà là tạo một cinematic interactive wedding invitation có chất lượng portfolio.

Ưu tiên theo thứ tự:

1. Visual quality
2. User experience
3. Animation quality
4. Performance
5. Responsive
6. Maintainable architecture
7. Supabase integration

Đừng viết toàn bộ project trong một lần.

Hãy triển khai từng STEP theo Implementation Order.

Sau mỗi STEP:
- kiểm tra TypeScript
- kiểm tra build
- kiểm tra responsive
- giải thích file nào được tạo/thay đổi
- chỉ tiếp tục STEP tiếp theo khi STEP hiện tại ổn

Không tự ý thay đổi tech stack.

Không dùng Java/Spring Boot/MySQL.

Không thêm backend server riêng.

Dùng Supabase làm BaaS.

Đặc biệt chú ý MUSIC FLOW:

```text
Initial Load
    ↓
No Music
    ↓
User taps "TAP TO OPEN"
    ↓
Envelope animation
    ↓
audio.play()
    ↓
audio.volume = 1
    ↓
Music continues globally
```

Không hiển thị volume slider.

Chỉ cho phép Music ON/OFF.

Music phải là một global audio instance duy nhất.

Hãy tạo architecture sạch, animation cinematic, mobile-first và đủ đẹp để đưa lên portfolio.

---

# 38. FINAL EXPERIENCE

Khách mở link:

```text
        BLACK SCREEN

   A STORY IS ABOUT TO BEGIN

            ↓

       PHẠM HOÀ
           &
       TUẤN ANH

      ARE GETTING MARRIED

            ↓

       💌 TAP TO OPEN

            ↓

      🎵 MUSIC STARTS

            ↓

         HERO PHOTO

            ↓

        OUR STORY

            ↓

          GALLERY

            ↓

       ANIME SCENE

            ↓

           VIDEO

            ↓

      THE WEDDING DAY

            ↓

        COUNTDOWN

            ↓

      GROOM'S HOUSE
             +
       BRIDE'S HOUSE

            ↓

          FINALE

            ↓

   THANK YOU FOR BEING
   PART OF OUR STORY

            ↓

       PHẠM HOÀ & TUẤN ANH

            ↓

             ∞
```

Mục tiêu cuối cùng:

> Người xem không có cảm giác đang xem một "website thiệp cưới".
>
> Họ phải có cảm giác đang bước vào một câu chuyện tình yêu ngắn, được kể bằng ảnh, âm nhạc, chuyển động và ký ức.
