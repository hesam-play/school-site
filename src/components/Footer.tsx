import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 1.5rem 2rem',
      direction: 'rtl',
      fontFamily: 'Vazirmatn, sans-serif',
      marginTop: '4rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              🎓 دبستان فرهنگیان ۳
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              آموزش با عشق، پرورش با امید<br />
              دوره ابتدایی دخترانه
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>دسترسی سریع</h4>
            {[
  {
    name :'خانه',
    link_nav:'/'
  },
  {
    name :'درباره ما',
    link_nav:'/about'
  },
  {
    name :'اخبار',
    link_nav:'/news'
  },
  {
    name :'گالری',
    link_nav:'/gallery'
  },
  {
    name :'تماس',
    link_nav:'/contact'
  },
].map(item => (
              <div key={item.name} style={{ marginBottom: '6px' }}>
                <Link href={item.link_nav} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.88rem' }}>
                  ← {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>اطلاعات تماس</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
              📍 آدرس مدرسه : چابهار، منطقه آزاد چابهار، زیباشهر خیابان الهیه 7 نبش معراج 4 آموزشگاه دخترانه فرهنگیان3<br />
              📞 شماره تماس : 09021959677<br />
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
        }}>
          © ۱۴۰۵ دبستان فرهنگیان ۳ — تمامی حقوق محفوظ است 💜
        </div>
      </div>
    </footer>
  );
}