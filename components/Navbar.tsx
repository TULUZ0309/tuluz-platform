'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import type { User } from '@supabase/supabase-js'

/* ── Design tokens (Luxury Premium Brand — UI/UX Pro Max) ── */
const NAV_CREAM  = '#FDFAF4'
const GOLD       = '#C4893A'
const GOLD_DK    = '#9E6A24'
const BROWN      = '#2D1E0F'
const MID        = '#7A5430'
const BORDER     = '#EAD9BC'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useLanguage()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then((res: { data: { user: User | null } }) => setUser(res.data.user))
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: string, session: import('@supabase/supabase-js').Session | null) => {
        setUser(session?.user ?? null)
      }
    )
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? `rgba(253,250,244,.97)` : NAV_CREAM,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? BORDER : 'rgba(234,217,188,.5)'}`,
      transition: 'box-shadow .3s, border-color .3s',
      boxShadow: scrolled ? '0 1px 24px rgba(45,30,15,.07)' : 'none',
    }}>
      <nav style={{
        maxWidth: '72rem', margin: '0 auto',
        padding: '0 2rem', height: '4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: '2rem',
      }}>

        {/* ── Wordmark logo ──────────────────────────────────────────────────
            Using text instead of the raster PNG to avoid background box issues.
            Matches Playfair Display italic which defines the Tu Luz brand voice.
            Replace with transparent-bg SVG/PNG when available from client. */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'baseline', gap: '1px' }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.6rem',
            fontStyle: 'italic',
            fontWeight: 700,
            color: BROWN,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>Tu luz</span>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.6rem',
            fontWeight: 700,
            color: GOLD,
            lineHeight: 1,
          }}>.</span>
        </Link>

        {/* ── Desktop links ───────────────────────────────────────────────── */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'center' }}>
          {([
            { href: '/marketplace', label: t.nav.marketplace },
            { href: '/courses', label: t.nav.courses },
            { href: '/blog', label: t.nav.blog },
          ] as const).map(({ href, label }) => (
            <Link key={href} href={href}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.875rem', fontWeight: 500,
                color: MID, textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = MID)}>
              {label}
            </Link>
          ))}
        </div>

        {/* ── Desktop: lang + auth ────────────────────────────────────────── */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          {/* Language pill */}
          <div style={{ display: 'flex', background: '#EDE3CE', borderRadius: '20px', padding: '3px', gap: '2px' }}>
            {(['es', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.2rem .65rem', borderRadius: '16px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em',
                background: locale === lang ? GOLD : 'transparent',
                color: locale === lang ? '#fff' : MID,
                transition: 'all .2s',
              }}>
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {user ? (
            <Link href="/dashboard" style={{
              padding: '.5rem 1.25rem', borderRadius: '10px',
              background: GOLD, color: '#fff',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 600, fontSize: '.85rem', textDecoration: 'none',
              transition: 'background .2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = GOLD_DK)}
              onMouseLeave={e => (e.currentTarget.style.background = GOLD)}>
              {t.nav.dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.875rem', fontWeight: 500, color: MID, textDecoration: 'none', transition: 'color .2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={e => (e.currentTarget.style.color = MID)}>
                {t.nav.login}
              </Link>
              <Link href="/register" style={{
                padding: '.5rem 1.25rem', borderRadius: '10px',
                background: GOLD, color: '#fff',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 600, fontSize: '.85rem', textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(196,137,58,.28)',
                transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD_DK; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = 'translateY(0)' }}>
                {t.nav.register}
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────────────────── */}
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="menu" className="nav-mobile-btn"
          style={{ display: 'none', padding: '.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: GOLD }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
            {menuOpen
              ? <path fillRule="evenodd" clipRule="evenodd" d="M5.3 5.3a1 1 0 011.4 0L11 9.6l4.3-4.3a1 1 0 111.4 1.4L12.4 11l4.3 4.3a1 1 0 01-1.4 1.4L11 12.4l-4.3 4.3a1 1 0 01-1.4-1.4L9.6 11 5.3 6.7a1 1 0 010-1.4z" />
              : <path fillRule="evenodd" clipRule="evenodd" d="M3 6a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h14a1 1 0 110 2H4a1 1 0 01-1-1z" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: NAV_CREAM, borderTop: `1px solid ${BORDER}`, padding: '1.25rem 1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {([
            { href: '/marketplace', label: t.nav.marketplace },
            { href: '/courses', label: t.nav.courses },
            { href: '/blog', label: t.nav.blog },
          ] as const).map(({ href, label }) => (
            <Link key={href} href={href} style={{ color: MID, textDecoration: 'none', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" }} onClick={() => setMenuOpen(false)}>{label}</Link>
          ))}
          <hr style={{ border: 'none', borderTop: `1px solid ${BORDER}` }} />
          <div style={{ display: 'flex', gap: '.5rem' }}>
            {(['es', 'en'] as const).map(lang => (
              <button key={lang} onClick={() => setLocale(lang)} style={{
                padding: '.35rem .875rem', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '.75rem', fontWeight: 700,
                background: locale === lang ? GOLD : '#EDE3CE',
                color: locale === lang ? '#fff' : MID,
              }}>{lang.toUpperCase()}</button>
            ))}
          </div>
          {user ? (
            <Link href="/dashboard" style={{ padding: '.75rem', borderRadius: '10px', textAlign: 'center', background: GOLD, color: '#fff', fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', system-ui, sans-serif" }} onClick={() => setMenuOpen(false)}>{t.nav.dashboard}</Link>
          ) : (
            <>
              <Link href="/login" style={{ color: MID, textDecoration: 'none', fontWeight: 500, fontFamily: "'Inter', system-ui, sans-serif" }} onClick={() => setMenuOpen(false)}>{t.nav.login}</Link>
              <Link href="/register" style={{ padding: '.75rem', borderRadius: '10px', textAlign: 'center', background: GOLD, color: '#fff', fontWeight: 600, textDecoration: 'none', fontFamily: "'Inter', system-ui, sans-serif" }} onClick={() => setMenuOpen(false)}>{t.nav.register}</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
