'use client';

import { useTheme, BaseTheme, AccentTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';
import { Sun, Moon, X } from 'lucide-react';

const accents: { id: AccentTheme; label: string; color: string }[] = [
  { id: 'purple', label: 'بنفش', color: '#7c3aed' },
  { id: 'sky',    label: 'آبی',   color: '#0284c7' },
  { id: 'rose',   label: 'گلبهی', color: '#e11d48' },
  { id: 'emerald',label: 'سبز',  color: '#059669' },
  { id: 'amber',  label: 'طلایی', color: '#d97706' },
];

export default function ThemePicker() {
  const { base, accent, setBase, setAccent } = useTheme();
  const [open, setOpen] = useState(false);

  // Show on first load if no preference saved
  useEffect(() => {
    const saved = localStorage.getItem('theme-base');
    if (!saved) setOpen(true);
  }, []);

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="تنظیم تم"
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '2rem',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'var(--gradient)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          fontSize: '1.4rem',
        }}
      >
        🎨
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            padding: '2rem',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            border: '1px solid var(--border-color)',
            fontFamily: 'Vazirmatn, sans-serif',
            direction: 'rtl',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>🎨 انتخاب تم</h2>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px' }}>
                <X size={22} />
              </button>
            </div>

            {/* Step 1: Base */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                ۱. حالت روشن یا تاریک؟
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {(['light', 'dark'] as BaseTheme[]).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBase(b)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      borderRadius: '14px',
                      border: base === b ? '3px solid var(--accent)' : '2px solid var(--border-color)',
                      background: b === 'light' ? '#fff' : '#0f0f1a',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {b === 'light'
                      ? <Sun size={28} color="#d97706" />
                      : <Moon size={28} color="#a78bfa" />}
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: b === 'light' ? '#1a1a2e' : '#f0f0ff' }}>
                      {b === 'light' ? 'روشن ☀️' : 'تاریک 🌙'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Accent */}
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                ۲. رنگ اصلی دلخواهت؟
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {accents.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAccent(a.id)}
                    title={a.label}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: a.color,
                      border: accent === a.id ? '4px solid var(--text-primary)' : '3px solid transparent',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      transform: accent === a.id ? 'scale(1.15)' : 'scale(1)',
                      outline: accent === a.id ? `3px solid ${a.color}` : 'none',
                      outlineOffset: '3px',
                    }}
                    aria-label={a.label}
                  />
                ))}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                انتخاب فعلی: <strong style={{ color: 'var(--accent)' }}>{accents.find(a => a.id === accent)?.label}</strong>
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="btn-accent"
              style={{ width: '100%', justifyContent: 'center', fontSize: '1rem' }}
            >
              ✅ تأیید و ادامه
            </button>
          </div>
        </div>
      )}
    </>
  );
}
