'use client';
import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

interface Student { id:string; name:string; grade:string; className:string; photo?:string; emoji:string; }

const defaultStudents: Student[] = [
  {id:'1',name:'فاطمه احمدی', grade:'پایه پنجم', className:'۵-الف',emoji:'🥇'},
  {id:'2',name:'زهرا محمدی',  grade:'پایه ششم',  className:'۶-ب',  emoji:'⭐'},
  {id:'3',name:'مریم کریمی',  grade:'پایه چهارم',className:'۴-الف',emoji:'🎨'},
  {id:'4',name:'سارا رضایی',  grade:'پایه سوم',  className:'۳-ب',  emoji:'✏️'},
  {id:'5',name:'نگار حسینی',  grade:'پایه ششم',  className:'۶-الف',emoji:'🏆'},
  {id:'6',name:'ریحانه عباسی',grade:'پایه پنجم', className:'۵-ب',  emoji:'📖'},
];
const cardColors=[
  {bg:'#fce7f3',border:'#f9a8d4'},{bg:'#ede9fe',border:'#c4b5fd'},
  {bg:'#e0f2fe',border:'#7dd3fc'},{bg:'#d1fae5',border:'#6ee7b7'},
  {bg:'#fef3c7',border:'#fcd34d'},{bg:'#fee2e2',border:'#fca5a5'},
];

export default function TopStudentsPage() {
  const [students, setStudents] = useState<Student[]>(defaultStudents);
  useEffect(() => {
    const s=localStorage.getItem('school_top_students');
    if(s){ try{const d=JSON.parse(s);if(d.length>0)setStudents(d);}catch{} }
  },[]);

  return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl'}}>
      <style>{`
        .st-card { border-radius:22px;background:var(--bg-card);position:relative;transition:transform .35s,box-shadow .35s; }
        .st-card:hover { transform:translateY(-8px);box-shadow:0 20px 50px rgba(0,0,0,.15); }
        .st-card::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:var(--gradient);border-radius:22px 22px 0 0;}
        .st-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.75rem;}
        @media(max-width:560px){.st-grid{grid-template-columns:1fr 1fr;gap:1rem;}}
      `}</style>

      <section style={{background:'var(--hero-bg)',padding:'6rem 1.5rem 5rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        {['🌟','🏆','⭐','🥇','🎓','💫'].map((e,i)=>(
          <span key={i} style={{position:'absolute',top:`${8+i*13}%`,[i%2===0?'right':'left']:`${4+i*7}%`,fontSize:`${1.6+i*.25}rem`,opacity:.18,pointerEvents:'none'}}>{e}</span>
        ))}
        <div className="fade-in-up" style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>🏆</div>
          <h1 style={{fontSize:'clamp(2rem,5vw,3rem)',fontWeight:900,color:'var(--text-primary)',marginBottom:'.75rem'}}>
            دانش‌آموزان <span className="gradient-text">برتر</span>
          </h1>
          <p style={{color:'var(--text-secondary)',fontSize:'1rem',maxWidth:'460px',margin:'0 auto',lineHeight:1.8}}>
            ستاره‌های درخشان دبستان فرهنگیان ۳
          </p>
        </div>
      </section>

      <section style={{padding:'5rem 1.5rem',background:'var(--bg-secondary)'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          {students.length===0?(
            <div style={{textAlign:'center',color:'var(--text-secondary)',padding:'4rem'}}>
              <div style={{fontSize:'4rem',marginBottom:'1rem'}}>🌱</div>هنوز دانش‌آموزی اضافه نشده
            </div>
          ):(
            <div className="st-grid">
              {students.map((s,i)=>{
                const c=cardColors[i%cardColors.length];
                return (
                  <div key={s.id} className="st-card" style={{border:`2px solid ${c.border}`}}>
                    <div style={{padding:'2rem 1.5rem',textAlign:'center'}}>
                      <div style={{width:'88px',height:'88px',borderRadius:'50%',background:c.bg,margin:'0 auto 1rem',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.6rem',border:'4px solid white',boxShadow:'0 6px 20px rgba(0,0,0,.1)',overflow:'hidden'}}>
                        {s.photo?<img src={s.photo} alt={s.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:s.emoji}
                      </div>
                      <h3 style={{fontSize:'1.05rem',fontWeight:900,color:'var(--text-primary)',marginBottom:'.65rem'}}>{s.name}</h3>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',fontSize:'.82rem',color:'var(--text-secondary)'}}>
                        <BookOpen size={13}/>
                        <span style={{fontWeight:700}}>{s.grade}</span>
                        <span>—</span>
                        <span>کلاس {s.className}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
