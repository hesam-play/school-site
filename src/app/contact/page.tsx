'use client';
import { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactInfo { address:string; phone:string; email:string; hours:string; }
const defaultInfo:ContactInfo = { address:'آدرس مدرسه را از پنل مدیریت ویرایش کنید', phone:'۰۲۱-XXXXXXXX', email:'info@farhangian3.ir', hours:'شنبه تا چهارشنبه — ۷:۳۰ تا ۱۳:۳۰' };

export default function ContactPage() {
  const [info, setInfo] = useState<ContactInfo>(defaultInfo);
  useEffect(() => {
    const s=localStorage.getItem('school_contact_info');
    if(s){ try{setInfo(JSON.parse(s));}catch{} }
  },[]);

  const items=[
    {icon:<MapPin size={22}/>,label:'آدرس',val:info.address,href:`https://maps.google.com/?q=${encodeURIComponent(info.address)}`,col:'#e0f2fe',acc:'#0284c7'},
    {icon:<Phone size={22}/>,label:'تلفن',val:info.phone,href:`tel:${info.phone}`,col:'#d1fae5',acc:'#059669'},
    {icon:<Mail size={22}/>,label:'ایمیل',val:info.email,href:`mailto:${info.email}`,col:'#fce7f3',acc:'#db2777'},
    {icon:<Clock size={22}/>,label:'ساعات کاری',val:info.hours,href:undefined,col:'#fef3c7',acc:'#d97706'},
  ];

  return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl'}}>
      <style>{`
        .con-card{border-radius:20px;padding:2rem;display:flex;align-items:center;gap:1.25rem;background:var(--bg-card);border:1px solid var(--border-color);transition:transform .3s,box-shadow .3s;text-decoration:none;color:inherit;}
        .con-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(0,0,0,.12);}
      `}</style>

      <section style={{background:'var(--hero-bg)',padding:'6rem 1.5rem 5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        {['📞','📍','✉️','🕐'].map((e,i)=>(
          <span key={i} style={{position:'absolute',top:`${10+i*20}%`,[i%2===0?'right':'left']:`${6+i*8}%`,fontSize:`${2+i*.3}rem`,opacity:.18,pointerEvents:'none'}}>{e}</span>
        ))}
        <div className="fade-in-up" style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>📞</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,color:'var(--text-primary)',marginBottom:'.75rem'}}>
            تماس <span className="gradient-text">با ما</span>
          </h1>
          <p style={{color:'var(--text-secondary)',fontSize:'1rem'}}>دبستان فرهنگیان ۳ — همیشه در دسترسیم</p>
        </div>
      </section>

      <section style={{padding:'5rem 1.5rem'}}>
        <div style={{maxWidth:'780px',margin:'0 auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'1.25rem',marginBottom:'2.5rem'}}>
            {items.map(c=>(
              c.href?(
                <a key={c.label} href={c.href} className="con-card" target={c.href.startsWith('http')?'_blank':'_self'} rel="noreferrer">
                  <div style={{width:'52px',height:'52px',borderRadius:'14px',background:c.col,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:c.acc}}>{c.icon}</div>
                  <div><div style={{fontSize:'.76rem',color:'var(--text-secondary)',marginBottom:'3px',fontWeight:600}}>{c.label}</div><div style={{fontSize:'1rem',fontWeight:800,color:'var(--text-primary)'}}>{c.val}</div></div>
                </a>
              ):(
                <div key={c.label} className="con-card">
                  <div style={{width:'52px',height:'52px',borderRadius:'14px',background:c.col,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:c.acc}}>{c.icon}</div>
                  <div><div style={{fontSize:'.76rem',color:'var(--text-secondary)',marginBottom:'3px',fontWeight:600}}>{c.label}</div><div style={{fontSize:'1rem',fontWeight:800,color:'var(--text-primary)'}}>{c.val}</div></div>
                </div>
              )
            ))}
          </div>
          <div style={{borderRadius:'20px',overflow:'hidden',border:'1px solid var(--border-color)',height:'300px',background:'var(--bg-secondary)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem'}}>
            <div style={{fontSize:'3.5rem'}}>📍</div>
            <p style={{color:'var(--text-secondary)',fontWeight:700,fontSize:'1rem'}}>موقعیت مدرسه</p>
            <p style={{color:'var(--text-secondary)',fontSize:'.85rem',textAlign:'center',padding:'0 2rem'}}>{info.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
