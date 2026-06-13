'use client';
import { useState, useEffect, useRef } from 'react';
import { LogOut, Plus, Trash2, Edit3, Save, X, Eye, EyeOff, Upload, Image as ImgIcon, ChevronDown, ChevronUp } from 'lucide-react';

/* ─── Types ─── */
interface NewsItem  { id:string; title:string; desc:string; image?:string; }
interface GalleryItem { id:string; src:string; caption:string; category:string; }
interface Student { id:string; name:string; grade:string; className:string; photo?:string; emoji:string; }
interface Teacher { id:string; name:string; subject:string; exp:string; photo?:string; emoji:string; }

const defaultTeachers: Teacher[] = [
  {id:'1', name:'خانم احمدی', subject:'ریاضی و علوم', exp:'۱۵ سال', emoji:'🔢'},
  {id:'2', name:'خانم رضایی', subject:'فارسی و انشا', exp:'۱۲ سال', emoji:'📝'},
  {id:'3', name:'خانم کریمی', subject:'هنر و خلاقیت', exp:'۱۰ سال', emoji:'🎨'},
  {id:'4', name:'خانم محمدی', subject:'ورزش و بازی',  exp:'۸ سال',  emoji:'⚽'},
  {id:'5', name:'خانم حسینی', subject:'قرآن و دینی',  exp:'۱۸ سال', emoji:'📖'},
  {id:'6', name:'خانم صادقی', subject:'علوم اجتماعی', exp:'۱۱ سال', emoji:'🌍'},
];

const ADMIN_USER='admin'; const ADMIN_PASS='school1234';
function uid(){ return Date.now().toString(36)+Math.random().toString(36).slice(2); }

/* ─── Helpers ─── */
function fileToB64(file:File):Promise<string>{
  return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result as string);r.onerror=rej;r.readAsDataURL(file);});
}
function ImgUpload({value,onChange,label}:{value?:string;onChange:(v:string)=>void;label:string}){
  const ref=useRef<HTMLInputElement>(null);
  return(
    <div>
      <label style={LS}>{label}</label>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
        <button type="button" onClick={()=>ref.current?.click()} style={{...BTN_SEC,display:'flex',alignItems:'center',gap:'6px',fontSize:'.82rem',padding:'8px 14px'}}>
          <Upload size={13}/> آپلود عکس
        </button>
        {value&&(
          <div style={{position:'relative',display:'inline-block'}}>
            <img src={value} alt="" style={{height:'56px',width:'72px',objectFit:'cover',borderRadius:'8px',border:'1px solid var(--border-color)'}}/>
            <button type="button" onClick={()=>onChange('')} style={{position:'absolute',top:'-8px',left:'-8px',background:'#ef4444',border:'none',borderRadius:'50%',width:'20px',height:'20px',cursor:'pointer',color:'white',fontSize:'10px',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
          </div>
        )}
        <input ref={ref} type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;onChange(await fileToB64(f));}}/>
      </div>
    </div>
  );
}

/* ─── Style consts ─── */
const IS:React.CSSProperties={width:'100%',padding:'10px 14px',borderRadius:'10px',border:'1.5px solid var(--border-color)',background:'var(--bg-secondary)',color:'var(--text-primary)',fontFamily:'Vazirmatn, sans-serif',fontSize:'.9rem',outline:'none',direction:'rtl'};
const LS:React.CSSProperties={display:'block',marginBottom:'5px',fontSize:'.8rem',fontWeight:700,color:'var(--text-secondary)'};
const BTN_PRI:React.CSSProperties={padding:'10px 20px',borderRadius:'10px',background:'var(--gradient)',color:'white',border:'none',cursor:'pointer',fontFamily:'Vazirmatn, sans-serif',fontWeight:700,fontSize:'.88rem',display:'inline-flex',alignItems:'center',gap:'6px'};
const BTN_SEC:React.CSSProperties={padding:'9px 16px',borderRadius:'10px',background:'var(--bg-secondary)',color:'var(--text-primary)',border:'1.5px solid var(--border-color)',cursor:'pointer',fontFamily:'Vazirmatn, sans-serif',fontWeight:700,fontSize:'.86rem',display:'inline-flex',alignItems:'center',gap:'6px'};
const BTN_DEL:React.CSSProperties={padding:'7px 12px',borderRadius:'8px',background:'#fee2e2',color:'#dc2626',border:'none',cursor:'pointer',fontFamily:'Vazirmatn, sans-serif',fontWeight:700,fontSize:'.78rem',display:'inline-flex',alignItems:'center',gap:'4px'};
const BTN_EDIT:React.CSSProperties={padding:'7px 12px',borderRadius:'8px',background:'var(--accent-light)',color:'var(--accent)',border:'none',cursor:'pointer',fontFamily:'Vazirmatn, sans-serif',fontWeight:700,fontSize:'.78rem',display:'inline-flex',alignItems:'center',gap:'4px'};
const CARD:React.CSSProperties={background:'var(--bg-card)',border:'1px solid var(--border-color)',borderRadius:'14px',padding:'1.1rem',marginBottom:'.9rem'};

const gradeOptions=['پایه اول','پایه دوم','پایه سوم','پایه چهارم','پایه پنجم','پایه ششم'];
const emojiOptions=['🥇','⭐','🏆','🎖️','🎗️','📖','🎨','✏️','🔬','🎵','⚽','💻'];

/* ──────────────────────────────────────────────────────────────────
   Page text definitions — every piece of editable text on the site
────────────────────────────────────────────────────────────────── */
const PAGE_TEXTS:{page:string;label:string;keys:{key:string;label:string;multiline?:boolean}[]}[] = [
  {
    page:'صفحه اصلی',
    label:'home',
    keys:[
      {key:'home_welcome_badge',  label:'نوشته Badge خوشامدگویی'},
      {key:'home_hero_title1',    label:'عنوان اصلی — بخش اول'},
      {key:'home_hero_title2',    label:'عنوان اصلی — کلمه رنگی'},
      {key:'home_hero_title3',    label:'عنوان اصلی — بخش سوم'},
      {key:'home_hero_desc',      label:'متن زیر عنوان اصلی', multiline:true},
      {key:'home_features_desc',  label:'توضیح بخش ویژگی‌ها', multiline:true},
      {key:'home_stat_0_val',     label:'آمار ۱ — عدد (مثلاً ۵۰۰+)'},
      {key:'home_stat_0_label',   label:'آمار ۱ — برچسب'},
      {key:'home_stat_1_val',     label:'آمار ۲ — عدد'},
      {key:'home_stat_1_label',   label:'آمار ۲ — برچسب'},
      {key:'home_stat_2_val',     label:'آمار ۳ — عدد'},
      {key:'home_stat_2_label',   label:'آمار ۳ — برچسب'},
      {key:'home_stat_3_val',     label:'آمار ۴ — عدد'},
      {key:'home_stat_3_label',   label:'آمار ۴ — برچسب'},
      {key:'home_feature_0_title',label:'ویژگی ۱ — عنوان'},
      {key:'home_feature_0_desc', label:'ویژگی ۱ — توضیح',multiline:true},
      {key:'home_feature_1_title',label:'ویژگی ۲ — عنوان'},
      {key:'home_feature_1_desc', label:'ویژگی ۲ — توضیح',multiline:true},
      {key:'home_feature_2_title',label:'ویژگی ۳ — عنوان'},
      {key:'home_feature_2_desc', label:'ویژگی ۳ — توضیح',multiline:true},
      {key:'home_feature_3_title',label:'ویژگی ۴ — عنوان'},
      {key:'home_feature_3_desc', label:'ویژگی ۴ — توضیح',multiline:true},
      {key:'home_feature_4_title',label:'ویژگی ۵ — عنوان'},
      {key:'home_feature_4_desc', label:'ویژگی ۵ — توضیح',multiline:true},
      {key:'home_feature_5_title',label:'ویژگی ۶ — عنوان'},
      {key:'home_feature_5_desc', label:'ویژگی ۶ — توضیح',multiline:true},
    ]
  },
  {
    page:'درباره ما',
    label:'about',
    keys:[
      {key:'about_title',       label:'عنوان صفحه'},
      {key:'about_subtitle',    label:'زیرعنوان صفحه', multiline:true},
      {key:'about_story_title', label:'عنوان بخش تاریخچه'},
      {key:'about_story_p1',    label:'پاراگراف اول تاریخچه', multiline:true},
      {key:'about_story_p2',    label:'پاراگراف دوم تاریخچه', multiline:true},
      {key:'about_val_0_title', label:'ارزش ۱ — عنوان'},{key:'about_val_0_desc',label:'ارزش ۱ — توضیح',multiline:true},
      {key:'about_val_1_title', label:'ارزش ۲ — عنوان'},{key:'about_val_1_desc',label:'ارزش ۲ — توضیح',multiline:true},
      {key:'about_val_2_title', label:'ارزش ۳ — عنوان'},{key:'about_val_2_desc',label:'ارزش ۳ — توضیح',multiline:true},
      {key:'about_val_3_title', label:'ارزش ۴ — عنوان'},{key:'about_val_3_desc',label:'ارزش ۴ — توضیح',multiline:true},
    ]
  },
  {
    page:'تماس با ما',
    label:'contact',
    keys:[
      {key:'contact_address', label:'آدرس مدرسه', multiline:true},
      {key:'contact_phone',   label:'شماره تلفن'},
      {key:'contact_email',   label:'ایمیل'},
      {key:'contact_hours',   label:'ساعات کاری'},
    ]
  },
  {
    page:'معلمان',
    label:'teachers',
    keys:[
      {key:'teachers_title',    label:'عنوان صفحه'},
      {key:'teachers_subtitle', label:'زیرعنوان صفحه'},
      {key:'teacher_0_name',    label:'معلم ۱ — نام'},{key:'teacher_0_subject',label:'معلم ۱ — درس'},{key:'teacher_0_exp',label:'معلم ۱ — سابقه'},
      {key:'teacher_1_name',    label:'معلم ۲ — نام'},{key:'teacher_1_subject',label:'معلم ۲ — درس'},{key:'teacher_1_exp',label:'معلم ۲ — سابقه'},
      {key:'teacher_2_name',    label:'معلم ۳ — نام'},{key:'teacher_2_subject',label:'معلم ۳ — درس'},{key:'teacher_2_exp',label:'معلم ۳ — سابقه'},
      {key:'teacher_3_name',    label:'معلم ۴ — نام'},{key:'teacher_3_subject',label:'معلم ۴ — درس'},{key:'teacher_3_exp',label:'معلم ۴ — سابقه'},
      {key:'teacher_4_name',    label:'معلم ۵ — نام'},{key:'teacher_4_subject',label:'معلم ۵ — درس'},{key:'teacher_4_exp',label:'معلم ۵ — سابقه'},
      {key:'teacher_5_name',    label:'معلم ۶ — نام'},{key:'teacher_5_subject',label:'معلم ۶ — درس'},{key:'teacher_5_exp',label:'معلم ۶ — سابقه'},
    ]
  },
];

/* ── Main Component ── */
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(''); const [pass, setPass] = useState(''); const [showPass, setShowPass] = useState(false); const [loginErr, setLoginErr] = useState('');
  const [tab, setTab] = useState<'news'|'gallery'|'students'|'teachers'|'texts'|'settings'>('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>(defaultTeachers);
  const [siteTexts, setSiteTexts] = useState<Record<string,string>>({});
  const [contactInfo, setContactInfo] = useState({address:'',phone:'',email:'',hours:''});

  /* editing states */
  const [editNews, setEditNews] = useState<NewsItem|null>(null);
  const [newNewsOpen, setNewNewsOpen] = useState(false);
  const [nf, setNf] = useState<Partial<NewsItem>>({});
  const [editStudent, setEditStudent] = useState<Student|null>(null);
  const [newStuOpen, setNewStuOpen] = useState(false);
  const [sf, setSf] = useState<Partial<Student>>({grade:'پایه اول',emoji:'🥇'});
  const [newGalOpen, setNewGalOpen] = useState(false);
  const [gf, setGf] = useState<Partial<GalleryItem>>({});
  const [editTeacher, setEditTeacher] = useState<Teacher|null>(null);
  const [newTchOpen, setNewTchOpen] = useState(false);
  const [tf, setTf] = useState<Partial<Teacher>>({emoji:'👩‍🏫'});
  const [openPage, setOpenPage] = useState<string|null>(null);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(()=>{ if(sessionStorage.getItem('admin_logged')==='true') setLoggedIn(true); },[]);
  useEffect(()=>{
    if(!loggedIn) return;
    const load=(k:string,def:any)=>{ const v=localStorage.getItem(k); if(v){try{return JSON.parse(v);}catch{}} return def; };
    setNews(load('school_news',[]));
    setGallery(load('school_gallery',[]));
    setStudents(load('school_top_students',[]));
    setTeachers(load('school_teachers', defaultTeachers));
    setSiteTexts(load('school_site_texts',{}));
    const ci=load('school_contact_info',{address:'',phone:'',email:'',hours:''});
    setContactInfo(ci);
  },[loggedIn]);

  function saveNews(d:NewsItem[]){setNews(d);localStorage.setItem('school_news',JSON.stringify(d));}
  function saveGallery(d:GalleryItem[]){setGallery(d);localStorage.setItem('school_gallery',JSON.stringify(d));}
  function saveStudents(d:Student[]){setStudents(d);localStorage.setItem('school_top_students',JSON.stringify(d));}
  function saveTeachers(d:Teacher[]){setTeachers(d);localStorage.setItem('school_teachers',JSON.stringify(d));}
  function saveTexts(d:Record<string,string>){setSiteTexts(d);localStorage.setItem('school_site_texts',JSON.stringify(d));}
  function showSaved(){ setSavedMsg('✅ ذخیره شد!'); setTimeout(()=>setSavedMsg(''),2500); }

  function handleLogin(){ if(user===ADMIN_USER&&pass===ADMIN_PASS){setLoggedIn(true);sessionStorage.setItem('admin_logged','true');}else setLoginErr('نام کاربری یا رمز عبور اشتباه است'); }
  function handleLogout(){ setLoggedIn(false); sessionStorage.removeItem('admin_logged'); }

  /* ── Login ── */
  if(!loggedIn) return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--hero-bg)',padding:'1.5rem'}}>
      <style>{`.ai:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px var(--accent-light);}`}</style>
      <div style={{background:'var(--bg-card)',borderRadius:'24px',padding:'2.5rem 2rem',width:'100%',maxWidth:'400px',boxShadow:'0 24px 80px rgba(0,0,0,.15)',border:'1px solid var(--border-color)'}}>
        <div style={{textAlign:'center',marginBottom:'2rem'}}>
          <div style={{fontSize:'3rem',marginBottom:'.75rem'}}>🔐</div>
          <h1 style={{fontSize:'1.5rem',fontWeight:900,color:'var(--text-primary)'}}>پنل مدیریت</h1>
          <p style={{color:'var(--text-secondary)',fontSize:'.86rem',marginTop:'.4rem'}}>دبستان فرهنگیان ۳</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div><label style={LS}>نام کاربری</label><input className="ai" style={IS} value={user} onChange={e=>setUser(e.target.value)} placeholder="admin" onKeyDown={e=>e.key==='Enter'&&handleLogin()}/></div>
          <div><label style={LS}>رمز عبور</label>
            <div style={{position:'relative'}}>
              <input className="ai" style={{...IS,paddingLeft:'42px'}} type={showPass?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••" onKeyDown={e=>e.key==='Enter'&&handleLogin()}/>
              <button type="button" onClick={()=>setShowPass(!showPass)} style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--text-secondary)'}}>
                {showPass?<EyeOff size={15}/>:<Eye size={15}/>}
              </button>
            </div>
          </div>
          {loginErr&&<p style={{color:'#ef4444',fontSize:'.83rem',fontWeight:700}}>❌ {loginErr}</p>}
          <button style={{...BTN_PRI,width:'100%',justifyContent:'center',padding:'13px',fontSize:'1rem',marginTop:'.5rem'}} onClick={handleLogin}>ورود به پنل</button>
        </div>
      </div>
    </div>
  );

  /* ── Panel ── */
  const tabs=[
    {id:'news',label:'📰 اخبار'},
    {id:'gallery',label:'🖼️ گالری'},
    {id:'students',label:'🏆 دانش‌آموزان'},
    {id:'teachers',label:'👩‍🏫 معلمان'},
    {id:'texts',label:'✏️ متون سایت'},
    {id:'settings',label:'⚙️ تنظیمات'},
  ];

  return (
    <div style={{fontFamily:'Vazirmatn, sans-serif',direction:'rtl',minHeight:'100vh',background:'var(--bg-secondary)'}}>
      <style>{`
        .ai:focus{border-color:var(--accent)!important;outline:none;box-shadow:0 0 0 3px var(--accent-light);}
        .a-tab{padding:9px 16px;border-radius:10px;border:none;background:transparent;color:var(--text-secondary);font-family:Vazirmatn,sans-serif;font-weight:700;font-size:.85rem;cursor:pointer;transition:all .2s;}
        .a-tab:hover,.a-tab.act{background:var(--accent-light);color:var(--accent);}
        .fr{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        @media(max-width:600px){.fr{grid-template-columns:1fr;}}
        select{appearance:none;}
        .item-row{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;background:var(--bg-card);border:1px solid var(--border-color);border-radius:12px;padding:1rem;margin-bottom:.75rem;}
        .saved-toast{position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--accent);color:white;padding:10px 24px;border-radius:50px;font-family:Vazirmatn,sans-serif;font-weight:700;font-size:.9rem;z-index:9999;animation:toastIn .3s ease;}
        @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        .page-sec{border-radius:14px;border:1px solid var(--border-color);overflow:hidden;margin-bottom:1rem;}
        .page-sec-hd{display:flex;justify-content:space-between;align-items:center;padding:1rem 1.25rem;background:var(--bg-card);cursor:pointer;font-weight:800;color:var(--text-primary);font-size:.95rem;}
        .page-sec-hd:hover{background:var(--accent-light);}
        .page-sec-body{padding:1.25rem;background:var(--bg-card);border-top:1px solid var(--border-color);}
        .txt-row{margin-bottom:.9rem;}
      `}</style>

      {/* Topbar */}
      <div style={{background:'var(--bg-card)',borderBottom:'1px solid var(--border-color)',padding:'0 1.5rem',position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:'1200px',margin:'0 auto',height:'62px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'var(--gradient)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem'}}>🎓</div>
            <div><div style={{fontWeight:900,fontSize:'.9rem',color:'var(--text-primary)'}}>پنل مدیریت</div><div style={{fontSize:'.68rem',color:'var(--text-secondary)'}}>دبستان فرهنگیان ۳</div></div>
          </div>
          <button onClick={handleLogout} style={{...BTN_SEC,color:'#ef4444',borderColor:'#fca5a5',padding:'8px 14px',fontSize:'.8rem'}}>
            <LogOut size={14}/> خروج
          </button>
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        {/* Tabs */}
        <div style={{display:'flex',gap:'6px',marginBottom:'2rem',background:'var(--bg-card)',padding:'7px',borderRadius:'14px',border:'1px solid var(--border-color)',flexWrap:'wrap'}}>
          {tabs.map(t=>(
            <button key={t.id} className={`a-tab${tab===t.id?' act':''}`} onClick={()=>setTab(t.id as any)}>{t.label}</button>
          ))}
        </div>

        {/* ═══ NEWS ═══ */}
        {tab==='news'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)'}}>📰 مدیریت اخبار</h2>
              <button style={BTN_PRI} onClick={()=>{setNf({});setNewNewsOpen(true);setEditNews(null);}}>
                <Plus size={15}/> خبر جدید
              </button>
            </div>

            {/* Form */}
            {(newNewsOpen||editNews)&&(
              <div style={{...CARD,borderColor:'var(--accent)',marginBottom:'1.5rem'}}>
                <h3 style={{fontWeight:800,color:'var(--text-primary)',marginBottom:'1.1rem',fontSize:'.95rem'}}>{editNews?'✏️ ویرایش خبر':'➕ افزودن خبر'}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div><label style={LS}>عنوان *</label><input className="ai" style={IS} value={nf.title||''} onChange={e=>setNf({...nf,title:e.target.value})} placeholder="عنوان خبر"/></div>
                  <div><label style={LS}>متن خبر *</label><textarea className="ai" style={{...IS,minHeight:'80px',resize:'vertical'}} value={nf.desc||''} onChange={e=>setNf({...nf,desc:e.target.value})} placeholder="توضیحات کامل خبر..."/></div>
                  <ImgUpload value={nf.image} onChange={v=>setNf({...nf,image:v})} label="عکس خبر"/>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                    <button style={BTN_PRI} onClick={()=>{
                      if(!nf.title||!nf.desc){alert('عنوان و متن الزامی است');return;}
                      if(editNews) saveNews(news.map(n=>n.id===editNews.id?{...editNews,...nf}as NewsItem:n));
                      else saveNews([{id:uid(),...nf}as NewsItem,...news]);
                      setEditNews(null);setNewNewsOpen(false);setNf({});
                    }}><Save size={14}/> ذخیره</button>
                    <button style={BTN_SEC} onClick={()=>{setEditNews(null);setNewNewsOpen(false);setNf({});}}><X size={14}/> لغو</button>
                  </div>
                </div>
              </div>
            )}

            {news.length===0&&<div style={{textAlign:'center',color:'var(--text-secondary)',padding:'3rem',background:'var(--bg-card)',borderRadius:'14px',border:'1px solid var(--border-color)'}}>📭 خبری وجود ندارد</div>}
            {news.map(n=>(
              <div key={n.id} className="item-row">
                <div style={{width:'56px',height:'56px',borderRadius:'12px',background:'var(--accent-light)',flexShrink:0,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.8rem'}}>
                  {n.image?<img src={n.image} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:'📰'}
                </div>
                <div style={{flex:1,minWidth:'160px'}}>
                  <p style={{fontWeight:800,color:'var(--text-primary)',fontSize:'.9rem',marginBottom:'3px'}}>{n.title}</p>
                  <p style={{fontSize:'.78rem',color:'var(--text-secondary)',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden',lineHeight:1.5}}>{n.desc}</p>
                </div>
                <div style={{display:'flex',gap:'7px',flexShrink:0}}>
                  <button style={BTN_EDIT} onClick={()=>{setNf(n);setEditNews(n);setNewNewsOpen(false);}}>
                    <Edit3 size={13}/> ویرایش
                  </button>
                  <button style={BTN_DEL} onClick={()=>{if(confirm('این خبر حذف شود؟'))saveNews(news.filter(x=>x.id!==n.id));}}>
                    <Trash2 size={13}/> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ GALLERY ═══ */}
        {tab==='gallery'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)'}}>🖼️ مدیریت گالری</h2>
              <button style={BTN_PRI} onClick={()=>{setGf({});setNewGalOpen(true);}}>
                <Plus size={15}/> تصویر جدید
              </button>
            </div>

            {newGalOpen&&(
              <div style={{...CARD,borderColor:'var(--accent)',marginBottom:'1.5rem'}}>
                <h3 style={{fontWeight:800,color:'var(--text-primary)',marginBottom:'1.1rem',fontSize:'.95rem'}}>➕ افزودن تصویر</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <ImgUpload value={gf.src} onChange={v=>setGf({...gf,src:v})} label="تصویر *"/>
                  <div><label style={LS}>توضیح (اختیاری)</label><input className="ai" style={IS} value={gf.caption||''} onChange={e=>setGf({...gf,caption:e.target.value})} placeholder="مثلاً: کارگاه نقاشی"/></div>
                  <div style={{display:'flex',gap:'10px'}}>
                    <button style={BTN_PRI} onClick={()=>{
                      saveGallery([...gallery,{id:uid(),src:gf.src||'',caption:gf.caption||'',category:''}]);
                      setGf({});setNewGalOpen(false);
                    }}><Save size={14}/> ذخیره</button>
                    <button style={BTN_SEC} onClick={()=>setNewGalOpen(false)}><X size={14}/> لغو</button>
                  </div>
                </div>
              </div>
            )}

            {gallery.length===0&&<div style={{textAlign:'center',color:'var(--text-secondary)',padding:'3rem',background:'var(--bg-card)',borderRadius:'14px',border:'1px solid var(--border-color)'}}>📷 گالری خالی است</div>}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:'1rem'}}>
              {gallery.map((g,idx)=>(
                <div key={g.id} style={{borderRadius:'12px',overflow:'hidden',border:'1px solid var(--border-color)',background:'var(--bg-card)'}}>
                  {g.src
                    ?<img src={g.src} alt="" style={{width:'100%',height:'130px',objectFit:'cover',display:'block'}}/>
                    :<div style={{height:'130px',background:'var(--accent-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem'}}>📷</div>
                  }
                  <div style={{padding:'.75rem'}}>
                    <p style={{fontSize:'.8rem',color:'var(--text-secondary)',marginBottom:'7px',direction:'rtl'}}>{g.caption||`تصویر ${idx+1}`}</p>
                    <button style={{...BTN_DEL,width:'100%',justifyContent:'center'}} onClick={()=>{if(confirm('این تصویر حذف شود؟'))saveGallery(gallery.filter(x=>x.id!==g.id));}}>
                      <Trash2 size={12}/> حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STUDENTS ═══ */}
        {tab==='students'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)'}}>🏆 دانش‌آموزان برتر</h2>
              <button style={BTN_PRI} onClick={()=>{setSf({grade:'پایه اول',emoji:'🥇'});setNewStuOpen(true);setEditStudent(null);}}>
                <Plus size={15}/> دانش‌آموز جدید
              </button>
            </div>

            {(newStuOpen||editStudent)&&(
              <div style={{...CARD,borderColor:'var(--accent)',marginBottom:'1.5rem'}}>
                <h3 style={{fontWeight:800,color:'var(--text-primary)',marginBottom:'1.1rem',fontSize:'.95rem'}}>{editStudent?'✏️ ویرایش':'➕ افزودن دانش‌آموز'}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div className="fr">
                    <div><label style={LS}>نام و نام خانوادگی *</label><input className="ai" style={IS} value={sf.name||''} onChange={e=>setSf({...sf,name:e.target.value})} placeholder="نام دانش‌آموز"/></div>
                    <div><label style={LS}>پایه تحصیلی *</label>
                      <select className="ai" style={{...IS,cursor:'pointer'}} value={sf.grade||'پایه اول'} onChange={e=>setSf({...sf,grade:e.target.value})}>
                        {gradeOptions.map(g=><option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="fr">
                    <div><label style={LS}>نام کلاس *</label><input className="ai" style={IS} value={sf.className||''} onChange={e=>setSf({...sf,className:e.target.value})} placeholder="مثلاً: ۵-الف"/></div>
                    <div><label style={LS}>ایموجی</label>
                      <select className="ai" style={{...IS,cursor:'pointer',fontSize:'1.1rem'}} value={sf.emoji||'🥇'} onChange={e=>setSf({...sf,emoji:e.target.value})}>
                        {emojiOptions.map(e=><option key={e}>{e}</option>)}
                      </select>
                    </div>
                  </div>
                  <ImgUpload value={sf.photo} onChange={v=>setSf({...sf,photo:v})} label="عکس دانش‌آموز (اختیاری)"/>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                    <button style={BTN_PRI} onClick={()=>{
                      if(!sf.name||!sf.grade||!sf.className){alert('نام، پایه و کلاس الزامی است');return;}
                      if(editStudent) saveStudents(students.map(s=>s.id===editStudent.id?{...editStudent,...sf}as Student:s));
                      else saveStudents([...students,{id:uid(),...sf}as Student]);
                      setEditStudent(null);setNewStuOpen(false);setSf({grade:'پایه اول',emoji:'🥇'});
                    }}><Save size={14}/> ذخیره</button>
                    <button style={BTN_SEC} onClick={()=>{setEditStudent(null);setNewStuOpen(false);}}><X size={14}/> لغو</button>
                  </div>
                </div>
              </div>
            )}

            {students.length===0&&<div style={{textAlign:'center',color:'var(--text-secondary)',padding:'3rem',background:'var(--bg-card)',borderRadius:'14px',border:'1px solid var(--border-color)'}}>🌱 دانش‌آموزی اضافه نشده</div>}
            {students.map(s=>(
              <div key={s.id} className="item-row">
                <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'var(--accent-light)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',overflow:'hidden'}}>
                  {s.photo?<img src={s.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:s.emoji}
                </div>
                <div style={{flex:1,minWidth:'160px'}}>
                  <p style={{fontWeight:800,color:'var(--text-primary)',fontSize:'.9rem'}}>{s.name}</p>
                  <p style={{fontSize:'.78rem',color:'var(--text-secondary)'}}>{s.grade} — کلاس {s.className}</p>
                </div>
                <div style={{display:'flex',gap:'7px',flexShrink:0}}>
                  <button style={BTN_EDIT} onClick={()=>{setSf(s);setEditStudent(s);setNewStuOpen(false);}}>
                    <Edit3 size={13}/> ویرایش
                  </button>
                  <button style={BTN_DEL} onClick={()=>{if(confirm('این دانش‌آموز حذف شود؟'))saveStudents(students.filter(x=>x.id!==s.id));}}>
                    <Trash2 size={13}/> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ TEACHERS ═══ */}
        {tab==='teachers'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)'}}>👩‍🏫 مدیریت معلمان</h2>
              <button style={BTN_PRI} onClick={()=>{setTf({emoji:'👩‍🏫'});setNewTchOpen(true);setEditTeacher(null);}}>
                <Plus size={15}/> معلم جدید
              </button>
            </div>

            {(newTchOpen||editTeacher)&&(
              <div style={{...CARD,borderColor:'var(--accent)',marginBottom:'1.5rem'}}>
                <h3 style={{fontWeight:800,color:'var(--text-primary)',marginBottom:'1.1rem',fontSize:'.95rem'}}>{editTeacher?'✏️ ویرایش معلم':'➕ افزودن معلم'}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <div className="fr">
                    <div><label style={LS}>نام معلم *</label><input className="ai" style={IS} value={tf.name||''} onChange={e=>setTf({...tf,name:e.target.value})} placeholder="نام و نام خانوادگی"/></div>
                    <div><label style={LS}>درس تدریسی *</label><input className="ai" style={IS} value={tf.subject||''} onChange={e=>setTf({...tf,subject:e.target.value})} placeholder="مثلاً: ریاضی و علوم"/></div>
                  </div>
                  <div className="fr">
                    <div><label style={LS}>سابقه تدریس</label><input className="ai" style={IS} value={tf.exp||''} onChange={e=>setTf({...tf,exp:e.target.value})} placeholder="مثلاً: ۱۰ سال"/></div>
                    <div><label style={LS}>ایموجی (اگه عکس نداشت)</label>
                      <select className="ai" style={{...IS,cursor:'pointer',fontSize:'1.1rem'}} value={tf.emoji||'👩‍🏫'} onChange={e=>setTf({...tf,emoji:e.target.value})}>
                        {['👩‍🏫','👩‍🔬','👩‍🎨','👩‍💻','📚','🎓','✏️','🔢','📝','🎨','⚽','📖','🌍'].map(e=><option key={e}>{e}</option>)}
                      </select>
                    </div>
                  </div>
                  <ImgUpload value={tf.photo} onChange={v=>setTf({...tf,photo:v})} label="عکس معلم (نمایش در دایره)"/>
                  <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                    <button style={BTN_PRI} onClick={()=>{
                      if(!tf.name||!tf.subject){alert('نام و درس الزامی است');return;}
                      if(editTeacher) saveTeachers(teachers.map(t=>t.id===editTeacher.id?{...editTeacher,...tf}as Teacher:t));
                      else saveTeachers([...teachers,{id:uid(),...tf}as Teacher]);
                      setEditTeacher(null);setNewTchOpen(false);setTf({emoji:'👩‍🏫'});
                    }}><Save size={14}/> ذخیره</button>
                    <button style={BTN_SEC} onClick={()=>{setEditTeacher(null);setNewTchOpen(false);setTf({emoji:'👩‍🏫'});}}><X size={14}/> لغو</button>
                  </div>
                </div>
              </div>
            )}

            {teachers.length===0&&<div style={{textAlign:'center',color:'var(--text-secondary)',padding:'3rem',background:'var(--bg-card)',borderRadius:'14px',border:'1px solid var(--border-color)'}}>👩‍🏫 معلمی اضافه نشده</div>}
            {teachers.map(t=>(
              <div key={t.id} className="item-row">
                <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'var(--accent-light)',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.6rem',overflow:'hidden',border:'2px solid var(--border-color)'}}>
                  {t.photo?<img src={t.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>:t.emoji}
                </div>
                <div style={{flex:1,minWidth:'160px'}}>
                  <p style={{fontWeight:800,color:'var(--text-primary)',fontSize:'.9rem'}}>{t.name}</p>
                  <p style={{fontSize:'.78rem',color:'var(--text-secondary)'}}>{t.subject}{t.exp?` — ${t.exp} سابقه`:''}</p>
                </div>
                <div style={{display:'flex',gap:'7px',flexShrink:0}}>
                  <button style={BTN_EDIT} onClick={()=>{setTf(t);setEditTeacher(t);setNewTchOpen(false);}}>
                    <Edit3 size={13}/> ویرایش
                  </button>
                  <button style={BTN_DEL} onClick={()=>{if(confirm('این معلم حذف شود؟'))saveTeachers(teachers.filter(x=>x.id!==t.id));}}>
                    <Trash2 size={13}/> حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ TEXTS ═══ */}
        {tab==='texts'&&(
          <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)'}}>✏️ ویرایش متون سایت</h2>
              <p style={{fontSize:'.82rem',color:'var(--text-secondary)'}}>برای ذخیره هر بخش دکمه ذخیره را بزنید</p>
            </div>
            {PAGE_TEXTS.map(pg=>(
              <div key={pg.label} className="page-sec">
                <div className="page-sec-hd" onClick={()=>setOpenPage(openPage===pg.label?null:pg.label)}>
                  <span>{pg.page}</span>
                  {openPage===pg.label?<ChevronUp size={18}/>:<ChevronDown size={18}/>}
                </div>
                {openPage===pg.label&&(
                  <div className="page-sec-body">
                    {pg.keys.map(k=>(
                      <div key={k.key} className="txt-row">
                        <label style={LS}>{k.label}</label>
                        {k.multiline
                          ?<textarea className="ai" style={{...IS,minHeight:'70px',resize:'vertical'}} value={siteTexts[k.key]||''} onChange={e=>setSiteTexts({...siteTexts,[k.key]:e.target.value})} placeholder={`پیش‌فرض...`}/>
                          :<input className="ai" style={IS} value={siteTexts[k.key]||''} onChange={e=>setSiteTexts({...siteTexts,[k.key]:e.target.value})} placeholder="پیش‌فرض..."/>
                        }
                      </div>
                    ))}
                    <div style={{marginTop:'1rem',display:'flex',gap:'10px',alignItems:'center'}}>
                      <button style={BTN_PRI} onClick={()=>{saveTexts({...siteTexts});showSaved();}}>
                        <Save size={14}/> ذخیره این بخش
                      </button>
                      <button style={BTN_SEC} onClick={()=>{
                        if(!confirm('متون پیش‌فرض این بخش بازگردانده شود؟'))return;
                        const copy={...siteTexts};
                        pg.keys.forEach(k=>delete copy[k.key]);
                        saveTexts(copy);showSaved();
                      }}>بازگشت به پیش‌فرض</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══ SETTINGS ═══ */}
        {tab==='settings'&&(
          <div>
            <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'var(--text-primary)',marginBottom:'1.5rem'}}>⚙️ تنظیمات</h2>
            {/* Contact info */}
            <div style={{...CARD,marginBottom:'1.5rem'}}>
              <h3 style={{fontWeight:800,fontSize:'.95rem',color:'var(--text-primary)',marginBottom:'1rem'}}>📞 اطلاعات تماس</h3>
              <div style={{display:'flex',flexDirection:'column',gap:'.9rem'}}>
                <div><label style={LS}>آدرس</label><textarea className="ai" style={{...IS,minHeight:'60px',resize:'vertical'}} value={contactInfo.address} onChange={e=>setContactInfo({...contactInfo,address:e.target.value})}/></div>
                <div className="fr">
                  <div><label style={LS}>تلفن</label><input className="ai" style={IS} value={contactInfo.phone} onChange={e=>setContactInfo({...contactInfo,phone:e.target.value})}/></div>
                  <div><label style={LS}>ایمیل</label><input className="ai" style={IS} value={contactInfo.email} onChange={e=>setContactInfo({...contactInfo,email:e.target.value})}/></div>
                </div>
                <div><label style={LS}>ساعات کاری</label><input className="ai" style={IS} value={contactInfo.hours} onChange={e=>setContactInfo({...contactInfo,hours:e.target.value})}/></div>
                <button style={BTN_PRI} onClick={()=>{localStorage.setItem('school_contact_info',JSON.stringify(contactInfo));showSaved();}}>
                  <Save size={14}/> ذخیره اطلاعات تماس
                </button>
              </div>
            </div>
            {/* Clear data */}
            <div style={{...CARD,background:'#fff1f2',borderColor:'#fca5a5'}}>
              <h3 style={{fontWeight:800,color:'#dc2626',marginBottom:'.75rem',fontSize:'.95rem'}}>⚠️ پاک کردن داده‌ها</h3>
              <p style={{fontSize:'.8rem',color:'#6b7280',marginBottom:'1rem'}}>این عمل غیرقابل بازگشت است.</p>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                {[
                  {l:'اخبار',fn:()=>{saveNews([]);}},
                  {l:'گالری',fn:()=>{saveGallery([]);}},
                  {l:'دانش‌آموزان',fn:()=>{saveStudents([]);}},
                  {l:'معلمان',fn:()=>{saveTeachers(defaultTeachers);}},
                  {l:'متون ویرایش‌شده',fn:()=>{saveTexts({});}},
                ].map(x=>(
                  <button key={x.l} style={BTN_DEL} onClick={()=>{if(confirm(`پاک کردن ${x.l}؟`)){x.fn();showSaved();}}}>
                    <Trash2 size={12}/> {x.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {savedMsg&&<div className="saved-toast">{savedMsg}</div>}
    </div>
  );
}
