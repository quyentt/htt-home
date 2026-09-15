# CLAUDE.md

## 1. Mục tiêu

Chuyển file thiết kế được cung cấp thành giao diện HTML/CSS có độ chính xác cao so với thiết kế gốc.

Người dùng có thể cung cấp:

- File thiết kế.
- Thư mục `data/` chứa các file export từ thiết kế.
- Bootstrap.
- Font Awesome.
- Font chữ.
- Hình ảnh.
- Background.
- Logo.
- Icon.
- Các asset khác.

Mục tiêu:

- Bám sát thiết kế.
- HTML có cấu trúc rõ ràng.
- CSS sạch.
- CSS có khả năng tái sử dụng.
- Responsive tốt.
- Asset được chuẩn hóa.
- Tên section và class có ý nghĩa.
- Không tạo CSS dư thừa.
- Không comment bừa bãi.

---

# 2. Quy trình bắt buộc

Trước khi code phải:

1. Kiểm tra cấu trúc project.
2. Đọc và phân tích file thiết kế.
3. Kiểm tra thư mục `data/`.
4. Kiểm tra toàn bộ asset trong `data/`.
5. Xác định Bootstrap và version.
6. Xác định Font Awesome và version.
7. Xác định font.
8. Đối chiếu thiết kế với asset.
9. Xác định asset nào được sử dụng.
10. Xác định section nào full-width.
11. Xác định section nào sử dụng container 1280px.
12. Phân tích typography.
13. Phân tích spacing.
14. Phân tích layout.
15. Phân tích responsive.
16. Xác định CSS có thể tái sử dụng.
17. Xác định component có thể tái sử dụng.
18. Xác định đơn vị đo phù hợp.
19. Tạo implementation plan.
20. Chờ người dùng xác nhận.
21. Sau khi xác nhận mới implement.
22. Kiểm tra kết quả sau khi implement.
23. Đối chiếu lại với thiết kế.
24. Tự sửa các lỗi có thể xác định.

Không tự ý implement trước khi có implementation plan và người dùng xác nhận, trừ khi người dùng yêu cầu trực tiếp bỏ qua bước plan.

---

# 3. Thiết kế là nguồn tham chiếu cao nhất

Thiết kế được cung cấp là nguồn tham chiếu chính.

Không tự ý:

- Đổi màu.
- Đổi font.
- Đổi icon.
- Đổi hình ảnh.
- Đổi spacing.
- Đổi layout.
- Thêm thành phần.
- Xóa thành phần.
- Thay đổi kích thước quan trọng.

Nếu thiết kế không rõ, chọn phương án gần nhất và báo lại.

Không để Bootstrap hoặc framework tự quyết định layout thay cho thiết kế.

**Ngoại lệ: hiệu ứng và animation** — xem §48 và §49.

Thiết kế mô tả **trạng thái tĩnh** (rest state). Hiệu ứng chỉ bổ sung chuyển động, không được thay đổi màu, font, spacing, layout ở trạng thái tĩnh.

---

# 4. Container 1280px

Chiều rộng content desktop mặc định:

```text
1280px
```

Sử dụng:

```css
.container-custom {
    width: 1280px;
    max-width: calc(100% - 40px);
    margin-left: auto;
    margin-right: auto;
}
```

Không tự ý thay 1280px bằng:

```text
1140px
1200px
1320px
```

nếu thiết kế không yêu cầu.

---

# 5. Section Full Width

Một số section có thể full-width.

Ví dụ:

```html
<section class="section section-full">
    <div class="container-custom">
        ...
    </div>
</section>
```

Section full-width phải:

- Có width 100%.
- Background có thể chạy toàn bộ viewport.
- Nội dung bên trong có thể sử dụng container 1280px.

Ví dụ:

```css
.section-full {
    width: 100%;
}
```

Nếu thiết kế thể hiện background full-width thì background không được giới hạn trong 1280px.

---

# 6. Section thông thường

Cấu trúc mặc định:

```html
<section class="section">
    <div class="container-custom">
        ...
    </div>
</section>
```

Section có:

```css
width: 100%;
```

Content được giới hạn bởi:

```css
.container-custom
```

---

# 7. Quy tắc đặt tên Section

Tên section phải bằng **tiếng Anh** và phản ánh đúng nội dung hoặc mục đích của section.

Không sử dụng:

```text
section-1
section-2
section-a
box-1
content-1
block-1
```

Ví dụ tốt:

```text
hero-section
about-section
features-section
services-section
student-management-section
teacher-management-section
statistics-section
customer-testimonials-section
contact-section
footer-section
```

Không đặt tên theo thứ tự xuất hiện.

Tên phải:

- Có ý nghĩa.
- Ngắn gọn.
- Dễ đọc.
- Dễ tìm kiếm.
- Phản ánh nội dung.
- Nhất quán.

---

# 8. Quy tắc đặt tên Class

Class phải bằng tiếng Anh và phản ánh đúng vai trò của element.

Không sử dụng:

```text
box1
box2
item1
item2
div1
abc
test
temp
left-box
right-box
```

Không đặt tên class chỉ dựa trên vị trí.

Không đặt tên theo màu sắc nếu màu sắc không phải bản chất của component:

```text
red-box
blue-title
green-button
```

Ưu tiên:

```text
service-card
service-icon
service-title
service-description
service-link
```

---

# 9. Class phải có tính tái sử dụng

Trước khi tạo class mới phải kiểm tra class tương tự đã tồn tại chưa.

Nếu nhiều element có cùng:

- Layout.
- Typography.
- Spacing.
- Button style.
- Card style.
- Heading style.
- Container.
- Grid.
- Flex alignment.

phải tái sử dụng class hiện có.

Không tạo CSS trùng lặp chỉ vì component có tên khác nhau.

---

# 10. Base Class + Modifier

Khi các component có cùng nền tảng nhưng khác một vài thuộc tính, sử dụng base class và modifier.

Ví dụ:

```html
<a class="button button-primary">
    Learn More
</a>

<a class="button button-secondary">
    Contact Us
</a>
```

```css
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    border-radius: 6px;
}

.button-primary {
    ...
}

.button-secondary {
    ...
}
```

Không tạo nhiều class độc lập nếu có thể dùng base class + modifier.

---

# 11. Tối ưu CSS dùng lại

Trước khi viết CSS mới phải kiểm tra:

1. Class tương tự đã tồn tại chưa?
2. Có thể sử dụng class hiện tại không?
3. Có thể mở rộng class hiện tại không?
4. Có thể tạo base class dùng chung không?
5. Có thể dùng modifier không?
6. CSS mới có trùng với CSS hiện tại không?
7. Class mới có thực sự cần thiết không?

Ưu tiên reuse.

Không hy sinh khả năng đọc code chỉ để giảm vài dòng CSS.

---

# 12. Card dùng chung

Không tạo CSS trùng:

```css
.service-card {
    padding: 30px;
    border-radius: 12px;
}

.product-card {
    padding: 30px;
    border-radius: 12px;
}

.news-card {
    padding: 30px;
    border-radius: 12px;
}
```

Nên:

```css
.content-card {
    padding: 30px;
    border-radius: 12px;
}
```

Sau đó:

```html
<article class="content-card service-card">
```

```html
<article class="content-card product-card">
```

Class chung chứa style chung.

Class riêng chỉ chứa phần khác biệt.

---

# 13. Typography dùng chung

Nếu nhiều title có cùng style, sử dụng class chung.

Ví dụ:

```css
.content-title {
    font-size: 24px;
    font-weight: 700;
}
```

Không tạo:

```css
.service-title {
    font-size: 24px;
}

.product-title {
    font-size: 24px;
}

.news-title {
    font-size: 24px;
}
```

nếu thực tế chúng có cùng style.

---

# 14. Không over-engineering

Không tạo hệ thống class quá trừu tượng chỉ để giảm CSS.

Ưu tiên:

```text
Dễ đọc
+
Dễ bảo trì
+
Tái sử dụng
+
Bám sát thiết kế
```

Nếu hai component khác nhau về bản chất, không ép chúng dùng chung class chỉ vì có vài thuộc tính giống nhau.

---

# 15. Không hardcode vị trí

Không xây dựng layout bằng:

```css
left: 137px;
top: 243px;
```

chỉ để khớp desktop.

Ưu tiên:

```text
Flexbox
Grid
Bootstrap Grid
gap
margin
padding
alignment
container
```

`position: absolute` chỉ dùng cho:

- Decorative element.
- Overlay.
- Badge.
- Floating element.
- Icon.
- Thành phần thực sự cần định vị tuyệt đối.

---

# 16. Bootstrap

Nếu project đã cung cấp Bootstrap:

- Sử dụng Bootstrap hiện tại.
- Không tải Bootstrap từ CDN.
- Không cài thêm Bootstrap version khác.
- Không tự ý thay version.

Có thể sử dụng:

```text
container
row
col-*
d-flex
align-items-*
justify-content-*
gap-*
```

khi phù hợp.

Nếu Bootstrap không thể tạo layout chính xác, sử dụng custom CSS.

---

# 17. Font Awesome

Nếu Font Awesome được cung cấp:

- Sử dụng Font Awesome local.
- Không tải icon library khác.
- Không dùng emoji thay icon.
- Kiểm tra đúng version.
- Sử dụng icon tương ứng với thiết kế.

---

# 18. Font chữ

Phải sử dụng font được cung cấp trong `data/` nếu font đó là font của thiết kế.

Kiểm tra:

```text
Font family
Font weight
Font style
Font file
```

Sử dụng `@font-face` khi cần.

Không dùng Google Fonts hoặc font online nếu font thiết kế đã được cung cấp.

---

# 19. CSS File Structure

Chỉ sử dụng **2 file CSS custom chính**:

```text
styles.css
responsive.css
```

Không tự ý tạo thêm:

```text
header.css
hero.css
footer.css
button.css
mobile.css
tablet.css
animations.css
```

trừ khi người dùng yêu cầu.

CSS hiệu ứng nằm trong `styles.css`, không tách file riêng.

File CSS của thư viện bên thứ ba (Bootstrap, Font Awesome, AOS, Swiper…) không tính vào giới hạn này vì là file gốc của thư viện, không phải CSS custom.

---

# 20. styles.css

`styles.css` chứa:

- Variables.
- Reset cần thiết.
- Font.
- Typography.
- Container.
- Header.
- Navigation.
- Hero.
- Section.
- Card.
- Button.
- Form.
- Footer.
- Desktop layout.
- Style dùng chung.

Không đặt media query responsive trong `styles.css`.

---

# 21. responsive.css

`responsive.css` chỉ chứa responsive CSS.

Toàn bộ:

```css
@media
```

phải nằm trong `responsive.css`.

Không copy toàn bộ CSS từ `styles.css` sang `responsive.css`.

Chỉ ghi những thuộc tính thực sự thay đổi theo viewport.

---

# 22. CSS Load Order

Load:

```html
<link rel="stylesheet" href="bootstrap.css">
<link rel="stylesheet" href="font-awesome.css">
<link rel="stylesheet" href="vendor/aos/aos.css">
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="responsive.css">
```

CSS thư viện hiệu ứng load **trước** `styles.css` để có thể override.

`responsive.css` phải được load sau `styles.css`.

JS load ở cuối `<body>`:

```html
<script src="vendor/aos/aos.js"></script>
<script src="main.js"></script>
```

`main.js` phải load sau toàn bộ thư viện.

---

# 23. Quy tắc đơn vị đo

Không sử dụng một đơn vị duy nhất cho toàn bộ project.

## px

Ưu tiên `px` cho kích thước lấy trực tiếp từ thiết kế:

- Container.
- Font size.
- Padding.
- Margin.
- Gap.
- Border.
- Border radius.
- Icon size.
- Width/height cố định.
- Breakpoint.

Ví dụ:

```css
.container-custom {
    width: 1280px;
}

.hero-title {
    font-size: 48px;
}

.hero {
    padding: 80px 0;
}

.content-grid {
    gap: 24px;
}

.button {
    min-height: 48px;
    padding: 12px 24px;
}
```

## %

Dùng `%` cho kích thước co giãn:

```css
width: 100%;
max-width: 100%;
```

## vw / vh

Chỉ sử dụng khi kích thước thực sự phụ thuộc viewport.

```css
.hero {
    min-height: 100vh;
}
```

Không dùng `vw`/`vh` chỉ để thay thế `px`.

## rem

Có thể sử dụng `rem` khi cần scale theo root font-size.

Tuy nhiên, với thiết kế pixel-perfect, ưu tiên `px` khi thiết kế cung cấp kích thước cụ thể.

Không tự ý chuyển toàn bộ `px` sang `rem`.

## clamp()

Có thể dùng `clamp()` cho giá trị responsive thực sự cần co giãn.

Không sử dụng `clamp()` nếu `px` hoặc media query đơn giản phù hợp hơn.

---

# 24. Responsive

Desktop 1280px là kích thước tham chiếu chính.

Container:

```css
.container-custom {
    width: 1280px;
    max-width: calc(100% - 40px);
    margin: 0 auto;
}
```

Khi viewport nhỏ hơn 1280px:

```css
.container-custom {
    width: 100%;
}
```

Phải kiểm tra tối thiểu:

```text
Desktop
Tablet
Mobile
```

Có thể sử dụng breakpoint:

```text
1200px
992px
768px
576px
```

nhưng phải dựa trên thiết kế thực tế.

Không để horizontal scrollbar ngoài ý muốn.

---

# 25. Thư mục data

Người dùng sẽ cung cấp:

```text
data/
```

Đây là **source asset directory**.

`data/` có thể chứa:

```text
Images
Backgrounds
SVG
Icons
Logos
Fonts
Other exported assets
```

Tên file có thể không có ý nghĩa:

```text
Rectangle 123.png
Rectangle 456.png
Group 12.svg
Frame 45.png
image_01.jpg
```

Không yêu cầu người dùng đổi tên.

Claude Code phải tự xử lý.

---

# 26. Không sửa thư mục data

`data/` là source.

Không:

- Rename.
- Delete.
- Move.
- Overwrite.
- Modify.
- Compress.

asset trong `data/`.

Thay vào đó phải copy asset cần thiết sang thư mục asset của project.

---

# 27. Tự tạo thư mục Asset

Nếu project chưa có thư mục asset phù hợp, Claude Code tự tạo:

```text
assets/
├── css/
│   ├── styles.css
│   └── responsive.css
├── js/
│   └── main.js
├── images/
├── backgrounds/
├── icons/
├── logos/
├── fonts/
└── vendor/
```

`vendor/` chứa thư viện bên thứ ba tải về local, xem §49.

Nếu project đã có cấu trúc asset riêng thì phải sử dụng cấu trúc đó.

Không tạo cấu trúc mới nếu không cần thiết.

---

# 28. Quy trình xử lý Asset

Bắt buộc:

```text
Design
↓
Inspect data/
↓
Phân tích asset
↓
Đối chiếu với Design
↓
Xác định asset
↓
Xác định ngữ cảnh
↓
Đặt tên semantic
↓
Copy asset
↓
Đưa vào project assets
↓
HTML/CSS sử dụng asset mới
```

---

# 29. Không dựa vào tên file export

Không được xác định asset chỉ dựa trên tên:

```text
Rectangle 123.png
```

Phải kiểm tra:

- Nội dung.
- Hình ảnh.
- Kích thước.
- Tỷ lệ.
- Màu sắc.
- Context.
- Vị trí trong thiết kế.

Ví dụ:

```text
Rectangle 123.png
```

nếu thực tế là background Hero thì copy thành:

```text
hero-background.png
```

---

# 30. Semantic Asset Naming

Tên asset phải:

- Tiếng Anh.
- Chữ thường.
- Dùng `-`.
- Không có khoảng trắng.
- Không có ký tự đặc biệt.
- Có ý nghĩa.
- Phản ánh nội dung hoặc mục đích.

Ví dụ:

```text
hero-background.webp
school-management.webp
student-management.webp
teacher-management.webp
parent-management.webp
school-logo.svg
footer-background.webp
testimonial-avatar-01.webp
```

Không:

```text
image1.png
image2.png
rectangle123.png
group456.svg
asset01.png
```

nếu có thể xác định ngữ cảnh.

---

# 31. Copy Asset, không Rename Source

Ví dụ:

```text
data/
└── Rectangle 123.png
```

Không rename trực tiếp.

Phải copy:

```text
data/Rectangle 123.png
```

thành:

```text
assets/backgrounds/hero-background.png
```

File source vẫn giữ nguyên.

---

# 32. Asset Mapping

Phải mapping:

| Design | Source | New Asset | Usage |
|---|---|---|---|
| Hero background | `Rectangle 123.png` | `hero-background.png` | Hero |
| Student image | `Rectangle 456.png` | `student-management.png` | Student section |
| Teacher image | `image_01.jpg` | `teacher-management.jpg` | Teacher section |
| Logo | `Group 12.svg` | `school-logo.svg` | Header |

Mapping phải dựa trên nội dung thực tế.

---

# 33. Không copy toàn bộ data máy móc

Không mặc định copy toàn bộ `data/` sang `assets/`.

Chỉ copy asset cần thiết.

Tuy nhiên phải kiểm tra toàn bộ `data/` trước khi quyết định asset nào không sử dụng.

---

# 34. Asset Unmapped

Nếu chưa xác định được asset:

```text
Unmapped
```

Không tự ý đặt tên semantic sai.

Không xóa asset.

---

# 35. Missing Asset

Nếu thiết kế có asset nhưng không tìm thấy trong `data/`:

Không được:

- Tải ảnh Internet.
- Dùng ảnh stock khác.
- Dùng placeholder.
- Tạo ảnh giả.

Phải báo:

```text
Missing asset:
Hero image shown in design has no matching asset in data/.
```

---

# 36. Font trong data

Nếu `data/` có font:

```text
Font-Regular.ttf
Font-Medium.ttf
Font-Bold.ttf
```

phải tự copy sang:

```text
assets/fonts/
```

và cấu hình `@font-face`.

Ví dụ:

```css
@font-face {
    font-family: 'CustomFont';
    src: url('../assets/fonts/custom-font-regular.ttf') format('truetype');
    font-weight: 400;
}
```

---

# 37. Desktop / Mobile Asset

Nếu thiết kế desktop và mobile dùng hình ảnh khác nhau:

```text
hero-background-desktop.webp
hero-background-mobile.webp
```

Nếu cùng một asset:

```text
hero-background.webp
```

Không tạo bản mobile nếu không cần.

---

# 38. Không Duplicate Asset

Trước khi copy phải kiểm tra asset tương đương đã tồn tại chưa.

Không tạo nhiều bản sao của cùng một asset chỉ vì sử dụng ở nhiều section.

Ví dụ chỉ cần:

```text
school-logo.svg
```

không cần:

```text
header-logo.svg
footer-logo.svg
mobile-logo.svg
```

nếu chúng là cùng một file.

---

# 39. Background

Phải xác định:

```text
background-image
background-position
background-size
background-repeat
overlay
opacity
gradient
```

Không mặc định dùng `cover` nếu làm sai thiết kế.

Nếu là background decorative thì ưu tiên CSS background.

---

# 40. Image Crop

Nếu tỷ lệ asset khác với thiết kế, xác định cách crop.

Có thể sử dụng:

```css
object-fit: cover;
```

hoặc:

```css
background-size: cover;
```

khi phù hợp.

Không làm méo hình bằng cách ép width/height không giữ tỷ lệ.

---

# 41. HTML Structure

Mỗi section phải có cấu trúc rõ ràng:

```html
<section class="section services-section">
    <div class="container-custom">
        ...
    </div>
</section>
```

Không sử dụng tên class vô nghĩa.

---

# 42. Layout

Ưu tiên:

```text
Flexbox
CSS Grid
Bootstrap Grid
```

Không sử dụng absolute positioning để xây dựng toàn bộ layout.

---

# 43. Comment

**Không comment bừa bãi.**

Không comment những thứ đã rõ ràng từ code.

Không sử dụng:

```html
<!-- Header -->
<!-- Hero -->
<!-- Content -->
<!-- Footer -->
```

chỉ để đánh dấu section.

Không comment từng dòng CSS.

Chỉ comment khi cần giải thích:

- Logic phức tạp.
- Workaround.
- Hành vi không hiển nhiên.
- Lý do kỹ thuật đặc biệt.
- TODO thực sự cần xử lý.

Nguyên tắc:

**Nếu code có thể hiểu rõ mà không cần comment thì không viết comment.**

---

# 44. Không tạo Utility Class dư thừa

Không tạo hàng loạt:

```text
margin-top-10
margin-top-20
padding-left-15
font-size-18
color-blue
```

trừ khi project đã có utility system rõ ràng.

---

# 45. Kiểm tra sau khi implement

Sau khi code phải kiểm tra:

- HTML.
- CSS.
- Asset path.
- Font.
- Icon.
- Background.
- Console error.
- Responsive.
- Horizontal overflow.
- Image crop.
- Container width.
- Section height.
- Typography.
- Spacing.
- Alignment.
- Hiệu ứng hover.
- Scroll reveal.
- Không có element bị kẹt ở `opacity: 0`.
- Không giật khi scroll.
- `prefers-reduced-motion`.

Sau đó đối chiếu:

```text
Design
vs
Rendered HTML
```

và tự sửa các sai lệch rõ ràng.

---

# 46. Implementation Plan

Trước khi code phải đưa ra:

```text
1. Cấu trúc trang
2. Danh sách section
3. Section full-width
4. Section container 1280px
5. Asset mapping
6. Font mapping
7. Bootstrap
8. Font Awesome
9. HTML structure
10. styles.css structure
11. responsive.css structure
12. Responsive strategy
13. Asset copy/rename plan
14. Reusable components
15. Reusable CSS
16. Danh sách hiệu ứng cho từng section
17. Thư viện hiệu ứng cần tải (nếu có)
18. main.js structure
19. Files sẽ tạo/sửa
```

Sau khi người dùng xác nhận mới implement.

---

# 47. Task mặc định

Khi người dùng cung cấp thiết kế và thư mục `data/`:

```text
1. Inspect project.
2. Inspect design.
3. Inspect data/.
4. Inspect all assets.
5. Identify Bootstrap.
6. Identify Font Awesome.
7. Identify fonts.
8. Map design → asset.
9. Identify 1280px sections.
10. Identify full-width sections.
11. Analyze responsive behavior.
12. Identify reusable components.
13. Identify reusable CSS.
14. Determine CSS units.
15. Create asset mapping.
16. Plan effects per section.
17. Identify effect libraries to download.
18. Create implementation plan.
19. Wait for confirmation.
20. Create required asset directories.
21. Copy required assets from data/.
22. Rename assets semantically.
23. Download effect libraries into assets/vendor/.
24. Implement HTML.
25. Implement styles.css.
26. Implement responsive.css.
27. Implement main.js.
28. Test.
29. Compare rendered result with design.
30. Test effects and reduced motion.
31. Fix discrepancies.
32. Report changed files and downloaded libraries.
```

---

# 48. Hiệu ứng và Animation

Website phải có hiệu ứng **hiện đại, mượt, tinh tế**.

Nguyên tắc nền tảng:

```text
Thiết kế  = trạng thái tĩnh
Hiệu ứng  = chuyển động bổ sung
```

Hiệu ứng không được làm sai lệch thiết kế ở trạng thái tĩnh.

## 48.1 Hiệu ứng bắt buộc

- Scroll reveal cho section và card (fade-up, fade-in).
- Hover cho button, link, card, icon, image.
- Transition cho mọi trạng thái tương tác.
- Smooth scroll cho anchor link.
- Header sticky, có thay đổi trạng thái khi scroll.
- Counter animation cho số liệu thống kê.
- Fade-in khi ảnh load xong.
- Back to top button.
- Focus state rõ ràng cho element tương tác.

## 48.2 Hiệu ứng nên có

Chỉ thêm khi phù hợp với thiết kế:

- Parallax nhẹ cho background.
- Image zoom trong khung `overflow: hidden`.
- Gradient border hoặc glow khi hover card.
- Marquee cho logo đối tác.
- Slider / carousel.
- Accordion / tab.
- Text gradient.
- Underline animation cho link.
- Icon micro-interaction.

## 48.3 Timing chuẩn

```css
:root {
    --transition-fast: 0.2s;
    --transition-base: 0.3s;
    --transition-slow: 0.6s;
    --easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Quy ước:

```text
Hover / focus       : 200ms - 300ms
Scroll reveal       : 400ms - 800ms
Stagger giữa item   : 80ms - 120ms
Khoảng dịch fade-up : 20px - 40px
```

Không dùng `linear` cho chuyển động UI.

Không dùng hiệu ứng dài hơn `1s`.

## 48.4 Chỉ animate thuộc tính rẻ

Chỉ animate:

```text
transform
opacity
filter
```

Không animate:

```text
width
height
top
left
margin
padding
box-shadow trực tiếp trên element lớn
```

vì gây reflow và giật.

Ví dụ đúng:

```css
.content-card {
    transition: transform var(--transition-base) var(--easing),
                box-shadow var(--transition-base) var(--easing);
}

.content-card:hover {
    transform: translateY(-6px);
}
```

Với element animate liên tục, thêm:

```css
will-change: transform;
```

Không đặt `will-change` cho toàn bộ element.

## 48.5 Không lạm dụng

Không sử dụng:

- Bounce, flip, rotate, zoom mạnh.
- Animation lặp vô hạn gây phân tâm.
- Hiệu ứng che nội dung khi đang đọc.
- Nhiều hiệu ứng chồng nhau trên cùng một element.
- Hiệu ứng làm nội dung nhảy vị trí.
- Preloader không cần thiết.

Hiệu ứng phải phục vụ nội dung, không thay thế nội dung.

## 48.6 Hiệu ứng trên mobile

Trên mobile:

- Giảm hoặc tắt parallax.
- Giảm duration.
- Bỏ hiệu ứng hover không dùng được trên touch.
- Không tải thư viện nặng chỉ để chạy hiệu ứng trang trí.

Hover state phải luôn có tương đương ở trạng thái mặc định trên touch device.

## 48.7 Accessibility

Bắt buộc:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

Nội dung phải hiển thị đầy đủ kể cả khi JavaScript bị lỗi hoặc chưa chạy.

Không để element ở `opacity: 0` vĩnh viễn nếu scroll reveal không kích hoạt.

---

# 49. Thư viện hiệu ứng

Được phép **tải thư viện hiệu ứng về local** khi cần thiết.

## 49.1 Thứ tự ưu tiên

```text
1. CSS thuần
2. JavaScript thuần
3. Thư viện bên ngoài
```

Chỉ tải thư viện khi CSS và JS thuần không giải quyết được, hoặc chi phí tự viết quá lớn.

Không tải thư viện chỉ để làm một hiệu ứng đơn giản.

## 49.2 Thư viện khuyến nghị

| Nhu cầu | Thư viện |
|---|---|
| Scroll reveal | AOS |
| Slider / carousel | Swiper |
| Animation timeline phức tạp | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Counter số liệu | CountUp.js |
| Animation vector | Lottie |

Không dùng nhiều thư viện làm cùng một việc.

## 49.3 Bắt buộc dùng bản local

Không sử dụng CDN.

Không dùng `npm` hoặc `node_modules` cho project HTML tĩnh.

Quy trình:

```text
Xác định nhu cầu
↓
Kiểm tra CSS/JS thuần có làm được không
↓
Chọn thư viện
↓
Tải file build (.min.css / .min.js)
↓
assets/vendor/<library>/
↓
Link bằng đường dẫn local
↓
Báo lại cho người dùng
```

Cấu trúc:

```text
assets/
└── vendor/
    ├── aos/
    │   ├── aos.css
    │   └── aos.js
    └── swiper/
        ├── swiper-bundle.min.css
        └── swiper-bundle.min.js
```

## 49.4 Báo cáo thư viện

Sau khi tải phải báo:

```text
Library : AOS
Version : 2.3.4
Size    : 14 KB
Path    : assets/vendor/aos/
Usage   : Scroll reveal cho section và card
```

Không tự ý thêm thư viện mà không báo.

---

# 50. File JavaScript

Chỉ sử dụng **1 file JS custom**:

```text
main.js
```

Không tạo thêm:

```text
header.js
slider.js
animation.js
counter.js
```

trừ khi người dùng yêu cầu.

`main.js` chứa:

- Khởi tạo thư viện hiệu ứng.
- Sticky header.
- Mobile menu toggle.
- Smooth scroll.
- Counter.
- Back to top.
- Scroll reveal nếu tự viết.

Yêu cầu:

- Không dùng inline `onclick` trong HTML.
- Không dùng jQuery nếu không có sẵn trong project.
- Kiểm tra element tồn tại trước khi gán event.
- Dùng `IntersectionObserver` thay cho lắng nghe `scroll` liên tục.
- Nếu bắt buộc lắng nghe `scroll`, phải throttle bằng `requestAnimationFrame`.

Ví dụ:

```js
const header = document.querySelector('.site-header');

if (header) {
    const observer = new IntersectionObserver(
        ([entry]) => header.classList.toggle('is-scrolled', !entry.isIntersecting)
    );

    observer.observe(document.querySelector('.header-sentinel'));
}
```

---

# 51. Nguyên tắc cuối cùng

```text
Design
    ↓
Analyze
    ↓
data/
    ↓
Identify assets
    ↓
Semantic asset naming
    ↓
Copy assets
    ↓
HTML
    ↓
styles.css
    ↓
responsive.css
    ↓
Effects
    ↓
main.js
    ↓
Test
    ↓
Compare with Design
    ↓
Fix
```

Các nguyên tắc ưu tiên:

1. Bám sát thiết kế.
2. Không tự ý thay đổi thiết kế.
3. `data/` là source asset.
4. Claude Code tự phân tích và copy asset.
5. Không sửa asset gốc.
6. Asset phải được đặt tên semantic.
7. Section và class phải đặt tên tiếng Anh theo nội dung.
8. CSS phải ưu tiên tái sử dụng.
9. Chỉ sử dụng `styles.css` và `responsive.css`.
10. Container desktop mặc định 1280px.
11. Section có thể full-width khi thiết kế yêu cầu.
12. `px` là đơn vị chính cho kích thước lấy trực tiếp từ thiết kế.
13. Responsive phải được xử lý riêng trong `responsive.css`.
14. Không hardcode vị trí nếu Flexbox/Grid có thể giải quyết.
15. Không comment bừa bãi.
16. Không tạo CSS hoặc asset duplicate.
17. Không sử dụng asset online khi asset tương ứng đã có trong `data/`.
18. Không tự ý tạo placeholder khi thiếu asset.
19. Luôn kiểm tra kết quả render so với thiết kế.
20. Ưu tiên code sạch, dễ hiểu, dễ bảo trì và tái sử dụng.
21. Hiệu ứng phải hiện đại, mượt và tinh tế.
22. Hiệu ứng không được làm sai lệch thiết kế ở trạng thái tĩnh.
23. Chỉ animate `transform` và `opacity`.
24. Ưu tiên CSS thuần trước khi dùng thư viện.
25. Thư viện hiệu ứng phải tải về local, không dùng CDN.
26. Luôn hỗ trợ `prefers-reduced-motion`.
27. Nội dung phải đọc được kể cả khi JavaScript không chạy.