'use client';
import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import Link from 'next/link';

const links = [
  { href:'/',             label:'🏠 خانه' },
  { href:'/about',        label:'🏫 درباره ما' },
  { href:'/news',         label:'📰 اخبار' },
  { href:'/gallery',      label:'🖼️ گالری' },
  { href:'/top-students', label:'🏆 دانش‌آموزان برتر' },
  { href:'/teachers',     label:'👩‍🏫 معلمان' },
  { href:'/contact',      label:'📞 تماس' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{position:'fixed',top:0,right:0,left:0,zIndex:999,background:'var(--nav-bg)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--border-color)',direction:'rtl',fontFamily:'Vazirmatn, sans-serif'}}>
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between',height:'68px'}}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
          <div style={{width:'42px',height:'42px',borderRadius:'12px',background:'var(--gradient)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <GraduationCap size={22} color="white"/>
          </div>
          <div>
            <div style={{fontSize:'1rem',fontWeight:900,color:'var(--text-primary)',lineHeight:1.2}}>دبستان فرهنگیان ۳</div>
            <div style={{fontSize:'.7rem',color:'var(--text-secondary)'}}>دوره ابتدایی دخترانه</div>
          </div>
        </Link>

        <div style={{display:'flex',gap:'2px'}} className="desk-nav">
          {links.map(l=>(
            <Link key={l.href} href={l.href} style={{padding:'7px 11px',borderRadius:'10px',textDecoration:'none',color:'var(--text-primary)',fontSize:'.82rem',fontWeight:600,transition:'background .2s,color .2s',whiteSpace:'nowrap'}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--accent-light)';(e.currentTarget as HTMLElement).style.color='var(--accent)';}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='transparent';(e.currentTarget as HTMLElement).style.color='var(--text-primary)';}}>
              {l.label}
            </Link>
          ))}
        </div>

        <button onClick={()=>setOpen(!open)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-primary)',display:'none'}} className="ham">
          {open?<X size={26}/>:<Menu size={26}/>}
        </button>
      </div>

      {open&&(
        <div style={{padding:'1rem 1.5rem 1.5rem',display:'flex',flexDirection:'column',gap:'8px',borderTop:'1px solid var(--border-color)',background:'var(--nav-bg)'}}>
          {links.map(l=>(
            <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} style={{padding:'12px 16px',borderRadius:'12px',textDecoration:'none',color:'var(--text-primary)',fontSize:'1rem',fontWeight:600,background:'var(--bg-secondary)'}}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`@media(max-width:900px){.desk-nav{display:none!important;}.ham{display:flex!important;}}`}</style>
    </nav>
  );
}
