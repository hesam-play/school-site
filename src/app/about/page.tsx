'use client';
import { useEffect, useState } from 'react';

const defaultValues=[
  {emoji:'💜',title:'محبت و احترام',desc:'فضایی گرم و صمیمی که هر دانش‌آموز احساس ارزشمندی می‌کنه'},
  {emoji:'🌟',title:'تعالی علمی',desc:'استانداردهای بالای آموزشی با رویکردهای نوین تدریس'},
  {emoji:'🤝',title:'مشارکت خانواده',desc:'همکاری نزدیک با والدین در مسیر رشد و پیشرفت'},
  {emoji:'🌈',title:'تنوع و خلاقیت',desc:'پرورش توانایی‌های منحصربه‌فرد هر دانش‌آموز'},
];

export default function AboutPage() {
  const [t,setT]=useState<Record<string,string>>({});
  useEffect(()=>{ const s=localStorage.getItem('school_site_texts'); if(s){try{setT(JSON.parse(s));}catch{}} },[]);
  const tx=(k:string,d:string)=>t[`about_${k}`]||d;

  return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl'}}>
      <section style={{background:'var(--hero-bg)',padding:'5rem 1.5rem 4rem',textAlign:'center'}}>
        <div style={{maxWidth:'700px',margin:'0 auto'}}>
          <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🏫</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,color:'var(--text-primary)',marginBottom:'1rem'}}>
            درباره <span className="gradient-text">{tx('title','دبستان فرهنگیان ۳')}</span>
          </h1>
          <p style={{color:'var(--text-secondary)',fontSize:'1.05rem',lineHeight:1.9}}>
            {tx('subtitle','بیش از دو دهه افتخار آموزش نسلی از دختران پرانگیزه و خلاق ایران زمین')}
          </p>
        </div>
      </section>

      <section style={{padding:'5rem 1.5rem'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'3rem',alignItems:'center'}}>
          <div>
            <p style={{color:'var(--accent)',fontWeight:700,fontSize:'.9rem',marginBottom:'.5rem'}}>📖 داستان ما</p>
            <h2 style={{fontSize:'1.8rem',fontWeight:900,color:'var(--text-primary)',marginBottom:'1.25rem'}}>{tx('story_title','تاریخچه مدرسه')}</h2>
            <p style={{color:'var(--text-secondary)',lineHeight:1.9,marginBottom:'1rem',fontSize:'.95rem'}}>
              {tx('story_p1','دبستان فرهنگیان ۳ با هدف ارائه آموزش باکیفیت و پرورش استعدادهای درخشان دختران ایرانی تأسیس شد. در طول این سال‌ها، صدها دانش‌آموز موفق از این مدرسه فارغ‌التحصیل شده‌اند.')}
            </p>
            <p style={{color:'var(--text-secondary)',lineHeight:1.9,fontSize:'.95rem'}}>
              {tx('story_p2','تیم آموزشی ما متشکل از معلمان متخصص و دلسوز است که با روش‌های نوین تدریس، محیطی شاد و انگیزه‌بخش برای یادگیری فراهم می‌کنند.')}
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
            {[{n:'۵۰۰+',l:'دانش‌آموز'},{n:'۳۰+',l:'معلم'},{n:'۲۰+',l:'سال سابقه'},{n:'۱۰۰٪',l:'تعهد'}].map(s=>(
              <div key={s.l} className="glass-card" style={{padding:'1.5rem',textAlign:'center'}}>
                <div className="gradient-text" style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'Vazirmatn, sans-serif'}}>{s.n}</div>
                <div style={{color:'var(--text-secondary)',fontSize:'.85rem'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'5rem 1.5rem',background:'var(--bg-secondary)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <h2 className="section-title" style={{marginBottom:'3rem'}}>ارزش‌های <span className="gradient-text">ما</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'1.5rem'}}>
            {defaultValues.map((v,i)=>(
              <div key={i} className="glass-card" style={{padding:'2rem',textAlign:'center'}}>
                <div style={{fontSize:'2.5rem',marginBottom:'.75rem'}}>{v.emoji}</div>
                <h3 style={{fontSize:'1.05rem',fontWeight:800,color:'var(--text-primary)',marginBottom:'.5rem'}}>{tx(`val_${i}_title`,v.title)}</h3>
                <p style={{color:'var(--text-secondary)',fontSize:'.88rem',lineHeight:1.7}}>{tx(`val_${i}_desc`,v.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
