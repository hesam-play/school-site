'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  desc: string;
  image?: string;
}

const defaultNews: NewsItem[] = [
  { id:'1', title:'جشن روز دانش‌آموز با شور و نشاط برگزار شد', desc:'مراسم باشکوه روز دانش‌آموز با برنامه‌های متنوع فرهنگی و هنری در حیاط مدرسه برگزار شد. دانش‌آموزان عزیزمان با اجرای سرود و نمایش، لحظات شادی‌بخشی را برای حاضران رقم زدند.', image:'' },
  { id:'2', title:'موفقیت دانش‌آموزان در المپیاد ریاضی استان', desc:'دانش‌آموزان ما با کسب مقام برتر در المپیاد ریاضی استانی افتخارآفرینی کردند. این موفقیت ثمره تلاش بی‌وقفه دانش‌آموزان و زحمات اساتید عزیزمان است.', image:'' },
  { id:'3', title:'ثبت‌نام سال تحصیلی جدید آغاز شد', desc:'ثبت‌نام پایه اول و انتقالی از سایر مدارس برای سال تحصیلی آینده آغاز شده است. متقاضیان می‌توانند با مراجعه به دفتر مدرسه ثبت‌نام نمایند.', image:'' },
  { id:'4', title:'کارگاه خلاقیت و نقاشی برای دانش‌آموزان', desc:'کارگاه هنری ویژه با حضور هنرمند ارزنده به مدت دو روز برگزار شد. دانش‌آموزان با تکنیک‌های نوین نقاشی آشنا شدند.', image:'' },
];

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>(defaultNews);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('school_news');
    if (stored) { try { const d = JSON.parse(stored); if (d.length > 0) setNews(d); } catch {} }
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.news-reveal').forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [news]);

  return (
    <div style={{ fontFamily:'Vazirmatn, sans-serif', direction:'rtl' }}>
      <style>{`
        .news-reveal { opacity:0; transform:translateY(36px); transition:opacity .6s ease,transform .6s ease; }
        .news-reveal.visible { opacity:1; transform:translateY(0); }
        .news-card { cursor:pointer; border-radius:20px; overflow:hidden; background:var(--bg-card); border:1px solid var(--border-color); transition:transform .3s,box-shadow .3s; }
        .news-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.15); }
        .news-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:2rem; }
        @media(max-width:680px){ .news-grid{ grid-template-columns:1fr; } }
        .modal-ov { position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:1rem;animation:mfade .2s ease; }
        @keyframes mfade{from{opacity:0}to{opacity:1}}
        .modal-box { background:var(--bg-card);border-radius:24px;max-width:660px;width:100%;max-height:90vh;overflow-y:auto;animation:mslide .28s ease;border:1px solid var(--border-color); }
        @keyframes mslide{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}
      `}</style>

      <section style={{ background:'var(--hero-bg)', padding:'6rem 1.5rem 5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        {['📰','🗞️','✏️','📌'].map((e,i)=>(
          <span key={i} style={{ position:'absolute', top:`${12+i*18}%`, [i%2===0?'right':'left']:`${6+i*8}%`, fontSize:`${1.8+i*.3}rem`, opacity:.18, pointerEvents:'none' }}>{e}</span>
        ))}
        <div className="fade-in-up" style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>📰</div>
          <h1 style={{ fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, color:'var(--text-primary)', marginBottom:'.75rem' }}>
            اخبار <span className="gradient-text">مدرسه</span>
          </h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'1rem' }}>جدیدترین رویدادها و اطلاعیه‌های دبستان فرهنگیان ۳</p>
        </div>
      </section>

      <section style={{ padding:'5rem 1.5rem', background:'var(--bg-secondary)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          {news.length === 0 ? (
            <div style={{ textAlign:'center', color:'var(--text-secondary)', padding:'4rem' }}>
              <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>📭</div>هنوز خبری اضافه نشده
            </div>
          ) : (
            <div className="news-grid">
              {news.map((n, i) => (
                <div key={n.id} className="news-reveal news-card" style={{ transitionDelay:`${i*.08}s` }} onClick={() => setSelected(n)}>
                  {n.image
                    ? <img src={n.image} alt={n.title} style={{ width:'100%', height:'240px', objectFit:'cover', display:'block' }} />
                    : <div style={{ width:'100%', height:'200px', background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'5rem' }}>📰</div>
                  }
                  <div style={{ padding:'1.5rem' }}>
                    <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'var(--text-primary)', lineHeight:1.6, marginBottom:'.6rem' }}>{n.title}</h3>
                    <p style={{ fontSize:'.85rem', color:'var(--text-secondary)', lineHeight:1.8, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{n.desc}</p>
                    <div style={{ marginTop:'1rem', color:'var(--accent)', fontWeight:700, fontSize:'.85rem' }}>بیشتر بخوانید ←</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="modal-ov" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            {selected.image
              ? <img src={selected.image} alt={selected.title} style={{ width:'100%', height:'320px', objectFit:'cover', borderRadius:'24px 24px 0 0', display:'block' }} />
              : <div style={{ height:'130px', background:'var(--accent-light)', borderRadius:'24px 24px 0 0', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'4rem' }}>📰</div>
            }
            <div style={{ padding:'2rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1rem' }}>
                <h2 style={{ fontSize:'1.2rem', fontWeight:900, color:'var(--text-primary)', lineHeight:1.6, flex:1, marginLeft:'1rem' }}>{selected.title}</h2>
                <button onClick={() => setSelected(null)} style={{ background:'var(--bg-secondary)', border:'none', borderRadius:'50%', width:'36px', height:'36px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-secondary)', flexShrink:0 }}>
                  <X size={18}/>
                </button>
              </div>
              <p style={{ fontSize:'.95rem', color:'var(--text-secondary)', lineHeight:2 }}>{selected.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
