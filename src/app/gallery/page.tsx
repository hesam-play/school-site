'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem { id:string; src:string; caption:string; category:string; }

const defaultItems: GalleryItem[] = [
  {id:'1',src:'',caption:'کارگاه هنری',category:'هنر'},
  {id:'2',src:'',caption:'ورزش صبحگاهی',category:'ورزش'},
  {id:'3',src:'',caption:'کتابخانه',category:'آموزشی'},
  {id:'4',src:'',caption:'آزمایشگاه',category:'آموزشی'},
  {id:'5',src:'',caption:'جشن مهرگان',category:'مراسم'},
  {id:'6',src:'',caption:'مراسم صبحگاه',category:'مراسم'},
  {id:'7',src:'',caption:'باغچه مدرسه',category:'محیط'},
  {id:'8',src:'',caption:'کلاس رایانه',category:'آموزشی'},
  {id:'9',src:'',caption:'موسیقی',category:'هنر'},
];
const ph_colors=['#f5f3ff','#e0f2fe','#fce7f3','#d1fae5','#fef3c7','#ffe4e6','#ecfdf5','#cffafe','#fff1f2'];
const ph_emojis=['🎨','⚽','📚','🔬','🎭','🎤','🌱','💻','🎵','🎓','📖','🏆'];

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(defaultItems);
  const [lb, setLb] = useState<number|null>(null);

  useEffect(() => {
    const s = localStorage.getItem('school_gallery');
    if (s) { try { const d=JSON.parse(s); if(d.length>0) setItems(d); } catch {} }
  }, []);

  const goPrev = useCallback(() => { if(lb===null)return; setLb((lb-1+items.length)%items.length); },[lb,items.length]);
  const goNext = useCallback(() => { if(lb===null)return; setLb((lb+1)%items.length); },[lb,items.length]);

  useEffect(() => {
    const h=(e:KeyboardEvent)=>{ if(lb===null)return; if(e.key==='Escape')setLb(null); if(e.key==='ArrowLeft')goNext(); if(e.key==='ArrowRight')goPrev(); };
    window.addEventListener('keydown',h); return ()=>window.removeEventListener('keydown',h);
  },[lb,goPrev,goNext]);

  return (
    <div style={{ fontFamily:'Vazirmatn, sans-serif', direction:'rtl' }}>
      <style>{`
        .g-item { border-radius:14px; overflow:hidden; cursor:pointer; aspect-ratio:1; background:var(--bg-card); border:1px solid var(--border-color); transition:transform .3s,box-shadow .3s; }
        .g-item:hover { transform:scale(1.04); box-shadow:0 16px 40px rgba(0,0,0,.18); }
        .g-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:1.1rem; }
        @media(max-width:560px){ .g-grid{ grid-template-columns:repeat(2,1fr); gap:.75rem; } }
        .lb-ov { position:fixed;inset:0;background:rgba(0,0,0,.95);z-index:9999;display:flex;align-items:center;justify-content:center;animation:lbf .2s ease; }
        @keyframes lbf{from{opacity:0}to{opacity:1}}
        .lb-img { max-width:88vw;max-height:82vh;border-radius:12px;object-fit:contain;animation:lbs .22s ease;box-shadow:0 24px 80px rgba(0,0,0,.6); }
        @keyframes lbs{from{transform:scale(.88);opacity:0}to{transform:scale(1);opacity:1}}
        .lb-btn { position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.13);border:none;border-radius:50%;width:52px;height:52px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:white;backdrop-filter:blur(4px);transition:background .2s;z-index:10001; }
        .lb-btn:hover{background:rgba(255,255,255,.25);}
        .lb-close{position:fixed;top:1.5rem;left:1.5rem;background:rgba(255,255,255,.13);border:none;border-radius:50%;width:44px;height:44px;cursor:pointer;color:white;display:flex;align-items:center;justify-content:center;z-index:10001;}
        .lb-num{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:rgba(255,255,255,.13);color:white;padding:7px 18px;border-radius:50px;font-family:Vazirmatn,sans-serif;font-size:.9rem;font-weight:700;z-index:10001;}
      `}</style>

      <section style={{ background:'var(--hero-bg)', padding:'6rem 1.5rem 5rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
        {['📸','🖼️','✨','🌟'].map((e,i)=>(
          <span key={i} style={{position:'absolute',top:`${10+i*20}%`,[i%2===0?'right':'left']:`${5+i*8}%`,fontSize:`${2+i*.4}rem`,opacity:.18,pointerEvents:'none'}}>{e}</span>
        ))}
        <div className="fade-in-up" style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>🖼️</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,color:'var(--text-primary)',marginBottom:'.75rem'}}>
            گالری <span className="gradient-text">تصاویر</span>
          </h1>
          <p style={{color:'var(--text-secondary)',fontSize:'1rem'}}>لحظه‌های شاد و خاطره‌انگیز دبستان فرهنگیان ۳</p>
        </div>
      </section>

      <section style={{padding:'4rem 1.5rem 5rem',background:'var(--bg-secondary)'}}>
        <div style={{maxWidth:'1200px',margin:'0 auto'}}>
          <div className="g-grid">
            {items.map((item,idx)=>(
              <div key={item.id} className="g-item" onClick={()=>setLb(idx)}>
                {item.src
                  ? <img src={item.src} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                  : <div style={{width:'100%',height:'100%',background:ph_colors[idx%ph_colors.length],display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.8rem'}}>
                      {ph_emojis[idx%ph_emojis.length]}
                    </div>
                }
              </div>
            ))}
          </div>
        </div>
      </section>

      {lb!==null&&(
        <div className="lb-ov" onClick={()=>setLb(null)}>
          <button className="lb-close" onClick={()=>setLb(null)}><X size={20}/></button>
          <button className="lb-btn" style={{right:'1rem'}} onClick={e=>{e.stopPropagation();goPrev();}}><ChevronRight size={24}/></button>
          {items[lb].src
            ? <img src={items[lb].src} alt="" className="lb-img" onClick={e=>e.stopPropagation()}/>
            : <div onClick={e=>e.stopPropagation()} style={{width:'min(360px,85vw)',height:'min(360px,72vh)',background:ph_colors[lb%ph_colors.length],borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'5.5rem'}}>
                {ph_emojis[lb%ph_emojis.length]}
              </div>
          }
          <button className="lb-btn" style={{left:'1rem'}} onClick={e=>{e.stopPropagation();goNext();}}><ChevronLeft size={24}/></button>
          <div className="lb-num">{lb+1} از {items.length}</div>
        </div>
      )}
    </div>
  );
}
