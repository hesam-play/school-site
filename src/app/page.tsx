'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Sparkles } from 'lucide-react';

const defaultStats = [
  {value:'۵۰۰+',label:'دانش‌آموز',emoji:'👩‍🎓'},
  {value:'۳۰+',label:'معلم متخصص',emoji:'👩‍🏫'},
  {value:'۲۰+',label:'سال سابقه',emoji:'🏆'},
  {value:'۹۵٪',label:'رضایت والدین',emoji:'💜'},
];
const defaultFeatures = [
  {emoji:'📚',title:'آموزش خلاق',desc:'روش‌های نوین یادگیری که درس‌خواندن رو به یه ماجراجویی تبدیل می‌کنه'},
  {emoji:'🎨',title:'هنر و خلاقیت',desc:'کلاس‌های نقاشی، موسیقی و صنایع‌دستی برای پرورش استعدادهای خاص هر دانش‌آموز'},
  {emoji:'🌱',title:'پرورش شخصیت',desc:'برنامه‌های ویژه برای تقویت اعتماد به نفس و مهارت‌های اجتماعی'},
  {emoji:'💻',title:'فناوری آموزشی',desc:'استفاده از تابلوی هوشمند و ابزارهای دیجیتال در تمام کلاس‌ها'},
  {emoji:'⚽',title:'ورزش و شادابی',desc:'زنگ ورزش پرنشاط، بازی‌های گروهی و مسابقات دانش‌آموزی'},
  {emoji:'🤝',title:'ارتباط با خانواده',desc:'سیستم اطلاع‌رسانی منظم و جلسات مستمر با والدین عزیز'},
];

interface NewsItem { id:string; title:string; desc:string; image?:string; }

function RevealSection({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el=ref.current; if(!el)return;
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){el.style.transitionDelay=`${delay}ms`;el.classList.add('visible');} },{threshold:.08});
    obs.observe(el); return()=>obs.disconnect();
  },[delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [siteTexts, setSiteTexts] = useState<Record<string,string>>({});

  useEffect(()=>{
    const n=localStorage.getItem('school_news');
    if(n){ try{ const d=JSON.parse(n); if(d.length>0) setNews(d.slice(0,3)); }catch{} }
    const t=localStorage.getItem('school_site_texts');
    if(t){ try{ setSiteTexts(JSON.parse(t)); }catch{} }
  },[]);

  const txt=(key:string,def:string)=>siteTexts[`home_${key}`]||def;

  return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl'}}>
      {/* HERO */}
      <section style={{background:'var(--hero-bg)',minHeight:'92vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'4rem 1.5rem',position:'relative',overflow:'hidden',textAlign:'center'}}>
        {['🌸','⭐','🦋','🌈','💫','🎀'].map((e,i)=>(
          <div key={i} className={`float-${(i%3)+1}`} style={{position:'absolute',top:`${10+i*13}%`,[i%2===0?'right':'left']:`${4+i*7}%`,fontSize:`${2.2+i*.3}rem`,opacity:.2,pointerEvents:'none'}}>{e}</div>
        ))}
        {[...Array(10)].map((_,i)=>(
          <div key={i} className="dot-particle" style={{position:'absolute',top:`${8+(i*9)%82}%`,left:`${4+(i*14)%92}%`,animationDelay:`${i*.3}s`,opacity:.25}}/>
        ))}
        <div style={{maxWidth:'780px',position:'relative',zIndex:1}} className="fade-in-up">
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'var(--accent-light)',color:'var(--accent)',padding:'8px 20px',borderRadius:'50px',fontSize:'.88rem',fontWeight:700,marginBottom:'1.5rem'}} className="badge-pulse">
            <Sparkles size={16} className="sparkle"/>
            {txt('welcome_badge','خوش اومدید به دبستان فرهنگیان ۳')}
          </div>
          <h1 style={{fontSize:'clamp(2.2rem,6vw,4rem)',fontWeight:900,lineHeight:1.3,color:'var(--text-primary)',marginBottom:'1.25rem'}}>
            {txt('hero_title1','جایی که')}{' '}
            <span className="gradient-text-animated">{txt('hero_title2','رویاها')}</span>
            {' '}{txt('hero_title3','شروع می‌شن')} 🌟
          </h1>
          <p style={{fontSize:'clamp(1rem,2.5vw,1.2rem)',color:'var(--text-secondary)',lineHeight:1.9,marginBottom:'2.5rem',maxWidth:'600px',margin:'0 auto 2.5rem'}}>
            {txt('hero_desc','ما باور داریم هر دختر کوچولویی یه ستاره‌ی درخشان توی خودشه. اینجا یاد می‌گیریم، می‌خندیم و با هم رشد می‌کنیم 🌺')}
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/about"><button className="btn-accent" style={{fontSize:'1rem',padding:'14px 32px'}}>بیشتر بدون 🎓</button></Link>
            <Link href="/contact"><button style={{background:'var(--bg-card)',color:'var(--text-primary)',border:'2px solid var(--border-color)',padding:'12px 28px',borderRadius:'50px',fontFamily:'Vazirmatn, sans-serif',fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>📞 تماس با ما</button></Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{padding:'4rem 1.5rem',background:'var(--bg-secondary)'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1.5rem'}}>
          {defaultStats.map((s,i)=>(
            <RevealSection key={s.label} delay={i*100}>
              <div className="glass-card" style={{padding:'1.5rem',textAlign:'center'}}>
                <div style={{fontSize:'2.5rem',marginBottom:'.5rem'}}>{s.emoji}</div>
                <div className="gradient-text" style={{fontSize:'2rem',fontWeight:900,fontFamily:'Vazirmatn, sans-serif'}}>{txt(`stat_${i}_val`,s.value)}</div>
                <div style={{color:'var(--text-secondary)',fontSize:'.9rem',fontWeight:600}}>{txt(`stat_${i}_label`,s.label)}</div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:'5rem 1.5rem'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <RevealSection>
            <p style={{textAlign:'center',color:'var(--accent)',fontWeight:700,fontSize:'.9rem',marginBottom:'.5rem'}}>✨ چرا ما؟</p>
            <h2 className="section-title" style={{marginBottom:'.75rem'}}>ویژگی‌های <span className="gradient-text">مدرسه ما</span></h2>
            <p style={{textAlign:'center',color:'var(--text-secondary)',marginBottom:'3rem',maxWidth:'500px',margin:'0 auto 3rem',fontSize:'.95rem'}}>
              {txt('features_desc','برنامه‌های متنوع و محیط شاد برای رشد همه‌جانبه دانش‌آموزان')}
            </p>
          </RevealSection>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.5rem'}}>
            {defaultFeatures.map((f,i)=>(
              <RevealSection key={f.title} delay={i*80}>
                <div className="glass-card" style={{padding:'1.75rem',display:'flex',gap:'1rem',height:'100%'}}>
                  <div style={{width:'52px',height:'52px',borderRadius:'14px',background:'var(--accent-light)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem'}}>{f.emoji}</div>
                  <div>
                    <h3 style={{fontSize:'1rem',fontWeight:800,color:'var(--text-primary)',marginBottom:'.4rem'}}>{txt(`feature_${i}_title`,f.title)}</h3>
                    <p style={{fontSize:'.85rem',color:'var(--text-secondary)',lineHeight:1.7}}>{txt(`feature_${i}_desc`,f.desc)}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section style={{padding:'5rem 1.5rem',background:'var(--bg-secondary)'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <RevealSection>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <div>
                <p style={{color:'var(--accent)',fontWeight:700,fontSize:'.9rem',marginBottom:'.25rem'}}>📰 آخرین خبرها</p>
                <h2 style={{fontSize:'1.8rem',fontWeight:900,color:'var(--text-primary)'}}>اخبار مدرسه</h2>
              </div>
              <Link href="/news">
                <button className="btn-accent" style={{padding:'10px 22px',fontSize:'.9rem',display:'flex',alignItems:'center',gap:'6px'}}>
                  همه اخبار <ChevronLeft size={16}/>
                </button>
              </Link>
            </div>
          </RevealSection>

          {news.length===0?(
            <RevealSection>
              <div style={{textAlign:'center',color:'var(--text-secondary)',padding:'3rem',background:'var(--bg-card)',borderRadius:'20px',border:'1px solid var(--border-color)'}}>
                <div style={{fontSize:'3rem',marginBottom:'1rem'}}>📭</div>
                <p style={{fontWeight:700}}>هنوز خبری منتشر نشده</p>
                <p style={{fontSize:'.85rem',marginTop:'.5rem'}}>اخبار را از پنل مدیریت اضافه کنید</p>
              </div>
            </RevealSection>
          ):(
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1.5rem'}}>
              {news.map((n,i)=>(
                <RevealSection key={n.id} delay={i*100}>
                  <Link href="/news" style={{textDecoration:'none'}}>
                    <div className="glass-card" style={{overflow:'hidden',cursor:'pointer',transition:'transform .3s,box-shadow .3s'}}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-5px)';(e.currentTarget as HTMLElement).style.boxShadow='0 16px 40px rgba(0,0,0,.14)';}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='';(e.currentTarget as HTMLElement).style.boxShadow='';}}>
                      {n.image
                        ? <img src={n.image} alt={n.title} style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
                        : <div style={{width:'100%',height:'130px',background:'var(--accent-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'3.5rem'}}>📰</div>
                      }
                      <div style={{padding:'1.25rem'}}>
                        <h3 style={{fontSize:'.92rem',fontWeight:800,color:'var(--text-primary)',lineHeight:1.6,marginBottom:'.5rem',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{n.title}</h3>
                        <div style={{color:'var(--accent)',fontWeight:700,fontSize:'.8rem',display:'flex',alignItems:'center',gap:'4px'}}>بیشتر <ChevronLeft size={13}/></div>
                      </div>
                    </div>
                  </Link>
                </RevealSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
