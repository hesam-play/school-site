# 🎓 دبستان فرهنگیان — سایت مدرسه

یک سایت زیبا و کامل برای دبستان دخترانه، ساخته‌شده با **Next.js 14** + **TypeScript** + **Tailwind CSS**.

---

## 🚀 نصب و راه‌اندازی

### ۱. نصب پکیج‌ها
```bash
npm install
```

### ۲. اجرا در حالت توسعه
```bash
npm run dev
```

سایت روی `http://localhost:3000` باز می‌شه.

### ۳. بیلد برای پروداکشن
```bash
npm run build
npm start
```

---

## 🎨 سیستم تم

### انتخاب اولیه
وقتی کاربر اولین بار سایت رو باز می‌کنه، یه **پاپ‌آپ** نشون داده می‌شه که ازش می‌خواد:
1. **حالت روشن ☀️ یا تاریک 🌙** انتخاب کنه
2. **رنگ اصلی** دلخواه از ۵ گزینه انتخاب کنه

### تغییر تم بعداً
دکمه 🎨 پایین صفحه (سمت چپ) همیشه در دسترسه برای تغییر تم.

### تم‌های رنگی موجود
| رنگ     | روشن          | تاریک         |
|---------|---------------|---------------|
| بنفش   | `theme-purple` | `theme-purple` |
| آبی    | `theme-sky`    | `theme-sky`    |
| گلبهی  | `theme-rose`   | `theme-rose`   |
| سبز    | `theme-emerald`| `theme-emerald`|
| طلایی  | `theme-amber`  | `theme-amber`  |

---

## 📁 ساختار پروژه

```
src/
├── app/
│   ├── layout.tsx          # لایه اصلی + فونت Vazirmatn
│   ├── globals.css         # تمام متغیرهای CSS تم
│   ├── page.tsx            # صفحه اصلی (خانه)
│   ├── about/page.tsx      # درباره ما
│   ├── news/page.tsx       # اخبار
│   ├── gallery/page.tsx    # گالری
│   ├── teachers/page.tsx   # معلمان
│   └── contact/page.tsx    # تماس
└── components/
    ├── ThemeProvider.tsx   # مدیریت state تم (Context)
    ├── ThemePicker.tsx     # پاپ‌آپ انتخاب تم + دکمه FAB
    ├── Navbar.tsx          # منوی بالا (ریسپانسیو)
    └── Footer.tsx          # فوتر
```

---

## ✏️ تغییر اطلاعات مدرسه

برای شخصی‌سازی:
- **نام مدرسه**: در `Navbar.tsx` و `Footer.tsx`
- **اطلاعات تماس**: در `contact/page.tsx`
- **معلمان**: در `teachers/page.tsx`
- **اخبار**: در `news/page.tsx`

---

## 📦 وابستگی‌ها

- `next` 14
- `react` 18
- `framer-motion` (برای انیمیشن)
- `lucide-react` (آیکون‌ها)
- `tailwindcss`
- `typescript`
"# school-site" 
"# school-site" 
