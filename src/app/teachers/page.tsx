'use client';
import { useEffect, useState } from 'react';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  exp: string;
  photo?: string;
  emoji: string;
}

const defaultTeachers: Teacher[] = [
  {id:'1', name:'خانم احمدی', subject:'ریاضی و علوم', exp:'۱۵ سال', emoji:'🔢'},
  {id:'2', name:'خانم رضایی', subject:'فارسی و انشا', exp:'۱۲ سال', emoji:'📝'},
  {id:'3', name:'خانم کریمی', subject:'هنر و خلاقیت', exp:'۱۰ سال', emoji:'🎨'},
  {id:'4', name:'خانم محمدی', subject:'ورزش و بازی',  exp:'۸ سال',  emoji:'⚽'},
  {id:'5', name:'خانم حسینی', subject:'قرآن و دینی',  exp:'۱۸ سال', emoji:'📖'},
  {id:'6', name:'خانم صادقی', subject:'علوم اجتماعی', exp:'۱۱ سال', emoji:'🌍'},
];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [siteTexts, setSiteTexts] = useState<Record<string,string>>({});

  useEffect(() => {
    // Load custom teachers from admin panel
    const stored = localStorage.getItem('school_teachers');
    if (stored) { try { const d = JSON.parse(stored); if (d.length > 0) setTeachers(d); } catch {} }
    // Load site texts
    const t = localStorage.getItem('school_site_texts');
    if (t) { try { setSiteTexts(JSON.parse(t)); } catch {} }
  }, []);

  const tx = (k: string, d: string) => siteTexts[`teachers_${k}`] || d;

  return (
    <div style={{ fontFamily: 'Vazirmatn, sans-serif', direction: 'rtl' }}>
      <style>{`
        .tch-card { border-radius:20px; overflow:hidden; transition:transform .3s,box-shadow .3s; background:var(--bg-card); border:1px solid var(--border-color); position:relative; }
        .tch-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(0,0,0,.14); }
        .tch-card::before { content:''; position:absolute; top:0;left:0;right:0; height:4px; background:var(--gradient); }
        .tch-avatar { width:90px;height:90px;border-radius:50%;margin:0 auto .9rem;overflow:hidden;border:4px solid white;box-shadow:0 6px 20px rgba(0,0,0,.12); }
      `}</style>

      <section style={{ background:'var(--hero-bg)', padding:'5rem 1.5rem 4rem', textAlign:'center' }}>
        <div style={{ fontSize:'3.5rem', marginBottom:'1rem' }}>👩‍🏫</div>
        <h1 style={{ fontSize:'clamp(2rem,5vw,3rem)', fontWeight:900, color:'var(--text-primary)', marginBottom:'.75rem' }}>
          تیم <span className="gradient-text">{tx('title','آموزشی')}</span>
        </h1>
        <p style={{ color:'var(--text-secondary)', fontSize:'1rem' }}>
          {tx('subtitle','معلمان دلسوز و متخصص دبستان فرهنگیان ۳')}
        </p>
      </section>

      <section style={{ padding:'5rem 1.5rem' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.5rem' }}>
          {teachers.map((t) => (
            <div key={t.id} className="tch-card" style={{ padding:'2rem 1.5rem', textAlign:'center' }}>
              <div className="tch-avatar" style={{ background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2.4rem' }}>
                {t.photo
                  ? <img src={t.photo} alt={t.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  : t.emoji
                }
              </div>
              <h3 style={{ fontSize:'1.1rem', fontWeight:800, color:'var(--text-primary)', marginBottom:'.35rem' }}>{t.name}</h3>
              <p style={{ color:'var(--accent)', fontSize:'.88rem', fontWeight:600, marginBottom:'.35rem' }}>{t.subject}</p>
              <p style={{ color:'var(--text-secondary)', fontSize:'.8rem' }}>⏳ {t.exp} سابقه تدریس</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
