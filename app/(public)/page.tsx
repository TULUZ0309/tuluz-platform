'use client'

/**
 * Tu Luz — Landing Page
 *
 * Design Intelligence Applied (UI/UX Pro Max):
 *   Product type  : Non-profit/Charity → Storytelling-Driven + Trust pattern
 *   Style         : Storytelling-Driven + Organic Biophilic
 *   Typography    : Classic Elegant — Playfair Display (headings) + Inter (body)
 *   Color palette : Luxury/Premium Brand adapted to Tu Luz brand colors
 *   Landing order : Hero → Problem → Solution → How it works → Social Proof → Marketplace → CTA
 *
 * Logo note: navbar uses text wordmark (Playfair italic).
 * The raster logo PNG (cream background) is used only where it sits on
 * a dark/contrasting background so the box is invisible.
 */

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'

/* ── Design tokens ─────────────────────────────────────────────────────────
   Source: UI/UX Pro Max — Luxury/Premium Brand + Organic Biophilic
   --organic-radius : 20px  (biophilic rounded corners)
   --shadow-soft    : 0 8px 32px rgba(0,0,0,0.08)
   --chapter-spacing: 7rem                                                   */
const D = {
  /* Brand */
  gold:      '#C4893A',
  goldDk:    '#9E6A24',
  goldLt:    '#F0D9A8',
  goldPale:  '#FAF1DC',

  /* Backgrounds */
  cream:     '#FDFAF4',   /* main bg */
  soft:      '#F5ECD8',   /* alternating section bg */
  dark:      '#1C1917',   /* luxury near-black (UI/UX Pro Max rec) */
  darkMid:   '#28160A',

  /* Text */
  ink:       '#0C0A09',   /* near-black body text */
  brown:     '#2D1E0F',
  mid:       '#6B4A2A',
  muted:     '#9C7A52',
  border:    '#E5D4B0',
  white:     '#FFFFFF',
}

const serif = "'Playfair Display', Georgia, serif"
const sans  = "'Inter', system-ui, sans-serif"

/* Organic shadow (UI/UX Pro Max biophilic) */
const shadow = '0 8px 32px rgba(0,0,0,0.08)'
const shadowHov = '0 16px 48px rgba(0,0,0,0.14)'

/* ── Reusable atoms ───────────────────────────────────────────────────────── */
function Eyebrow({ label, light }: { label: string; light?: boolean }) {
  return (
    <p style={{
      fontFamily: sans, fontSize: '.72rem', fontWeight: 700,
      letterSpacing: '.14em', textTransform: 'uppercase',
      color: light ? `rgba(240,217,168,.75)` : D.gold,
      marginBottom: '.75rem',
    }}>{label}</p>
  )
}

function Accent({ light }: { light?: boolean }) {
  return <div style={{ width: '36px', height: '2px', background: light ? `rgba(240,217,168,.5)` : D.gold, borderRadius: '2px', marginBottom: '1.75rem' }} />
}

function H2({ children, light, center }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: 'clamp(2rem, 3.5vw, 2.875rem)',
      fontWeight: 700, lineHeight: 1.15,
      letterSpacing: '-0.025em',
      color: light ? D.white : D.brown,
      textAlign: center ? 'center' : 'left',
      marginBottom: 0,
    }}>{children}</h2>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const { t } = useLanguage()

  return (
    <div style={{ fontFamily: sans, color: D.brown, overflowX: 'hidden' }}>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  1. HERO — Full-bleed photo, emotional hook                     ║
          ║     Pattern: Hero-Centric Design (Storytelling-Driven)          ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ position: 'relative', minHeight: 'calc(100vh - 4rem)', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Photo */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/brand/workshop.jpg"
            alt="Tu Luz — Emprendedoras con impacto"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 22%' }}
            priority
          />
          {/* Cinematic gradient — dark left, lighter right for text contrast */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(12,8,4,.94) 0%, rgba(20,13,6,.86) 42%, rgba(30,20,10,.60) 72%, rgba(28,25,23,.35) 100%)' }} />
          {/* Bottom fade into next section */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', background: `linear-gradient(to top, ${D.dark}, transparent)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '72rem', margin: '0 auto', padding: '6rem 2rem 8rem', width: '100%' }}>
          {/* Award pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '.5rem',
            background: 'rgba(196,137,58,.15)', border: '1px solid rgba(240,217,168,.25)',
            borderRadius: '999px', padding: '.35rem 1.1rem', marginBottom: '2.25rem',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: '.85rem' }}>🏆</span>
            <span style={{ fontFamily: sans, fontSize: '.75rem', fontWeight: 600, color: D.goldLt, letterSpacing: '.05em' }}>
              Premio Lidera Mujer 2024
            </span>
          </div>

          {/* Headline — narrative hook */}
          <h1 style={{
            fontFamily: serif,
            fontSize: 'clamp(3rem, 6.5vw, 5.25rem)',
            fontWeight: 700, lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: D.white,
            maxWidth: '720px',
            marginBottom: '1.75rem',
          }}>
            {t.hero.h1a}<br />
            <em style={{ fontStyle: 'italic', color: D.goldLt }}>{t.hero.h1b}</em>
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: sans, fontSize: '1.1rem',
            color: 'rgba(234,217,188,.85)',
            maxWidth: '38rem', lineHeight: 1.85,
            marginBottom: '2.75rem',
          }}>
            {t.hero.sub}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '4.5rem' }}>
            <Link href="/register" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.4rem',
              padding: '1rem 2.5rem', borderRadius: '12px',
              background: D.gold, color: D.white,
              fontFamily: sans, fontWeight: 700, fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(196,137,58,.45)',
              transition: 'all .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 32px rgba(196,137,58,.50)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 24px rgba(196,137,58,.45)' }}>
              {t.hero.cta1}
            </Link>
            <Link href="/marketplace" style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '1rem 2.5rem', borderRadius: '12px',
              border: '1.5px solid rgba(240,217,168,.40)',
              color: D.goldLt, fontFamily: sans, fontWeight: 600, fontSize: '1rem',
              textDecoration: 'none',
              background: 'rgba(255,255,255,.06)',
              backdropFilter: 'blur(10px)',
              transition: 'border-color .2s, background .2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.75)'; el.style.background = 'rgba(255,255,255,.10)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(240,217,168,.40)'; el.style.background = 'rgba(255,255,255,.06)' }}>
              {t.hero.cta2}
            </Link>
          </div>

          {/* Trust strip */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
            {[
              { icon: '🌍', text: 'LATAM & Europa' },
              { icon: '♻️', text: 'Asociación sin fines de lucro' },
              { icon: '✅', text: 'Perfiles certificados y verificados' },
            ].map(item => (
              <div key={item.text} style={{
                display: 'inline-flex', alignItems: 'center', gap: '.45rem',
                background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,.10)',
                borderRadius: '8px', padding: '.4rem .875rem',
              }}>
                <span style={{ fontSize: '.9rem' }}>{item.icon}</span>
                <span style={{ fontFamily: sans, fontSize: '.75rem', color: 'rgba(234,217,188,.85)', fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  2. STATS BAR — dark, Playfair numerals                        ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <div style={{ background: D.dark }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
          {[
            { val: '500+', lbl: t.stats.entrepreneurs },
            { val: '12',   lbl: t.stats.countries },
            { val: '85%',  lbl: t.stats.satisfaction },
            { val: '€2M+', lbl: t.stats.impact },
          ].map(({ val, lbl }, i, arr) => (
            <div key={lbl} style={{
              flex: '1 1 140px', padding: '2.5rem 1.5rem', textAlign: 'center',
              borderRight: i < arr.length - 1 ? '1px solid rgba(240,217,168,.07)' : 'none',
            }}>
              <p style={{ fontFamily: serif, fontSize: '2.75rem', fontWeight: 700, color: D.goldLt, lineHeight: 1, marginBottom: '.4rem' }}>{val}</p>
              <p style={{ fontFamily: sans, fontSize: '.72rem', color: '#9C7A52', fontWeight: 500, letterSpacing: '.09em', textTransform: 'uppercase' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  3. PROBLEM STATEMENT — editorial centered text                 ║
          ║     Storytelling chapter 1: the problem                        ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.cream, textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <Eyebrow label="El problema" />
          <h2 style={{
            fontFamily: serif,
            fontSize: 'clamp(1.85rem, 3.5vw, 2.875rem)',
            fontWeight: 700, lineHeight: 1.25,
            letterSpacing: '-0.025em',
            color: D.brown,
            marginBottom: '1.5rem',
          }}>
            Miles de emprendedoras crean impacto real.<br />
            <em style={{ fontStyle: 'italic', color: D.gold }}>Pero sin visibilidad, son invisibles.</em>
          </h2>
          <p style={{ fontFamily: sans, fontSize: '1.1rem', color: D.mid, lineHeight: 1.9, maxWidth: '42rem', margin: '0 auto 3rem' }}>
            Las empresas con metas ESG buscan activamente emprendedoras sostenibles, pero no tienen cómo encontrarlas ni verificarlas. Tuluz cierra esa brecha — con formación, certificación y conexión directa.
          </p>
          {/* Three pillars — problem/solution bridge */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: D.border, borderRadius: '20px', overflow: 'hidden', boxShadow: shadow }}>
            {[
              { icon: '🎓', problem: 'Sin formación validada', solution: 'Curso con IA + entregables reales' },
              { icon: '🏅', problem: 'Sin certificación reconocida', solution: 'Certificaciones ESG verificables' },
              { icon: '🤝', problem: 'Sin conexión con empresas', solution: 'Marketplace ESG B2B' },
            ].map((item, i) => (
              <div key={i} style={{ background: D.cream, padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{item.icon}</div>
                <p style={{ fontFamily: sans, fontSize: '.8rem', color: D.muted, textDecoration: 'line-through', marginBottom: '.5rem' }}>{item.problem}</p>
                <p style={{ fontFamily: sans, fontSize: '.9rem', fontWeight: 600, color: D.mid }}>{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  4. AI MENTOR — solution detail, white bg                       ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start', marginBottom: '4.5rem' }}>
            <div>
              <Eyebrow label={t.ai.tag} />
              <Accent />
              <H2>{t.ai.h2a}<br /><em style={{ fontStyle: 'italic', color: D.gold }}>{t.ai.h2b}</em></H2>
              <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.9, marginTop: '1.25rem' }}>{t.ai.sub}</p>
            </div>
            {/* Pull quote */}
            <div style={{ borderLeft: `3px solid ${D.gold}`, paddingLeft: '2rem', paddingTop: '.5rem' }}>
              <p style={{ fontFamily: serif, fontSize: '1.4rem', fontStyle: 'italic', color: D.brown, lineHeight: 1.65, marginBottom: '1.25rem' }}>
                &ldquo;No es un chatbot genérico. Recuerda tu negocio, modulo a módulo, y genera un plan completo solo para ti.&rdquo;
              </p>
              <p style={{ fontFamily: sans, fontSize: '.78rem', fontWeight: 700, color: D.muted, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                IA Tutora · Tuluz Platform
              </p>
            </div>
          </div>

          {/* Feature grid — numbered cells separated by 1px border */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: D.border }}>
            {t.ai.features.map(({ icon, title, desc }: { icon: string; title: string; desc: string }, i: number) => (
              <div key={title} style={{
                background: D.white, padding: '2.5rem 2rem',
                transition: 'background .25s',
                cursor: 'default',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = D.soft}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = D.white}>
                {/* Large number — Organic Biophilic decorative element */}
                <p style={{ fontFamily: serif, fontSize: '3rem', fontWeight: 700, color: `rgba(196,137,58,.15)`, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                  0{i + 1}
                </p>
                <div style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: D.brown, marginBottom: '.6rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: D.mid, lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  5. HOW IT WORKS — numbered journey                             ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ marginBottom: '4.5rem' }}>
            <Eyebrow label={t.howItWorks.tag} />
            <Accent />
            <H2>{t.howItWorks.h2a} <em style={{ fontStyle: 'italic', color: D.gold }}>{t.howItWorks.h2b}</em></H2>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.85, maxWidth: '40rem', marginTop: '1.25rem' }}>{t.howItWorks.sub}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {t.howItWorks.steps.map(({ step, icon, title, desc }: { step: string; icon: string; title: string; desc: string }, i: number, arr: unknown[]) => (
              <div key={step} style={{ position: 'relative' }}>
                {/* Connector */}
                {i < arr.length - 1 && (
                  <div className="step-connector" style={{ position: 'absolute', top: '27px', left: 'calc(56px + 1rem)', right: '-1rem', height: '1px', background: D.border, zIndex: 0 }} />
                )}
                {/* Step circle */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: D.white, border: `2px solid ${D.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', marginBottom: '1.25rem', position: 'relative', zIndex: 1,
                  boxShadow: shadow,
                }}>{icon}</div>
                <p style={{ fontFamily: serif, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: D.gold, marginBottom: '.35rem' }}>{step}</p>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: D.brown, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: D.mid, lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  6. COMMUNITY — Full-width photo break                          ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ position: 'relative', height: '560px', overflow: 'hidden' }}>
        <Image
          src="/brand/community.jpg"
          alt="Comunidad Tu Luz"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(12,8,4,.90) 0%, rgba(20,13,6,.70) 50%, rgba(28,18,8,.40) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
            <div style={{ maxWidth: '48rem' }}>
              <Eyebrow label={t.community.tag} light />
              <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.025em', color: D.white, marginBottom: '1.25rem' }}>
                {t.community.h2a}<br />
                <em style={{ fontStyle: 'italic', color: D.goldLt }}>{t.community.h2b}</em>
              </h2>
              <p style={{ fontFamily: sans, fontSize: '1.1rem', color: 'rgba(234,217,188,.82)', lineHeight: 1.85, maxWidth: '36rem', marginBottom: '2.5rem' }}>
                {t.community.sub}
              </p>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '12px',
                background: D.gold, color: D.white,
                fontFamily: sans, fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 24px rgba(196,137,58,.40)',
              }}>
                {t.community.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  7. COURSES — Organic Biophilic cards                           ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <div>
              <Eyebrow label={t.courses.tag} />
              <Accent />
              <H2>{t.courses.h2a}<br /><em style={{ fontStyle: 'italic', color: D.gold }}>{t.courses.h2b}</em></H2>
            </div>
            <Link href="/courses" style={{ fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: D.gold, textDecoration: 'none' }}>{t.courses.viewAll}</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {t.courses.modules.map(({ tag, title, desc, deliverable }: { tag: string; title: string; desc: string; deliverable: string }, i: number) => (
              <div key={title} style={{
                background: D.soft,
                borderRadius: '20px',     /* --organic-radius */
                overflow: 'hidden',
                boxShadow: shadow,
                transition: 'box-shadow .3s, transform .3s',
                border: `1px solid ${D.border}`,
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadowHov; el.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = shadow; el.style.transform = 'translateY(0)' }}>
                {/* Accent bar */}
                <div style={{ height: '3px', background: [D.gold, '#7B5296', '#3D8B6E'][i] }} />
                <div style={{ padding: '2.25rem 2rem' }}>
                  <p style={{ fontFamily: sans, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: D.muted, marginBottom: '1rem' }}>{tag}</p>
                  <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 700, color: D.brown, lineHeight: 1.25, marginBottom: '.875rem' }}>{title}</h3>
                  <p style={{ fontFamily: sans, fontSize: '.875rem', color: D.mid, lineHeight: 1.85, marginBottom: '1.75rem' }}>{desc}</p>
                  <div style={{ borderTop: `1px solid ${D.border}`, paddingTop: '1.1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                    <span style={{ color: D.gold }}>📄</span>
                    <span style={{ fontFamily: sans, fontSize: '.8rem', color: D.muted }}>
                      {t.courses.generates} <strong style={{ color: D.mid, fontWeight: 600 }}>{deliverable}</strong>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  8. SOCIAL PROOF — Award + photos                               ║
          ║     Trust pattern: testimonials/recognition before CTA          ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow label={t.award.tag} />
              <Accent />
              <H2>{t.award.h2a}<br /><em style={{ fontStyle: 'italic', color: D.gold }}>{t.award.h2b}</em></H2>
              <p style={{ fontFamily: sans, fontSize: '1rem', color: D.mid, lineHeight: 1.9, marginTop: '1.25rem', marginBottom: '2rem' }}>{t.award.sub}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {t.award.bullets.map((item: string) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                      background: D.goldPale, border: `1.5px solid ${D.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: sans, fontSize: '.65rem', fontWeight: 700, color: D.gold, marginTop: '2px',
                    }}>✓</div>
                    <span style={{ fontFamily: sans, fontSize: '.95rem', color: D.mid, lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo stack */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ position: 'relative', height: '300px', borderRadius: '20px', overflow: 'hidden', gridColumn: 'span 2', boxShadow: shadow }}>
                <Image src="/brand/award.jpg" alt="Premio Lidera Mujer" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,8,4,.65) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem' }}>
                  <p style={{ fontFamily: sans, fontSize: '.7rem', fontWeight: 700, color: D.goldLt, letterSpacing: '.08em', textTransform: 'uppercase' }}>Premio Lidera Mujer 2024</p>
                </div>
              </div>
              <div style={{ position: 'relative', height: '210px', borderRadius: '16px', overflow: 'hidden', boxShadow: shadow }}>
                <Image src="/brand/session.jpg" alt="Sesión Tu Luz" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'relative', height: '210px', borderRadius: '16px', overflow: 'hidden', boxShadow: shadow }}>
                <Image src="/brand/business.jpg" alt="Tu Luz formación" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  9. MARKETPLACE — ESG bridge                                    ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: D.white }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'start' }}>
            <div>
              <Eyebrow label={t.marketplace.tag} />
              <Accent />
              <H2>{t.marketplace.h2a}<br /><em style={{ fontStyle: 'italic', color: D.gold }}>{t.marketplace.h2b}</em></H2>
              <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.9, marginTop: '1.25rem', marginBottom: '2rem' }}>{t.marketplace.sub}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.875rem', marginBottom: '2.5rem' }}>
                {t.marketplace.features.map((item: string) => (
                  <li key={item} style={{ fontFamily: sans, fontSize: '.95rem', color: D.mid, lineHeight: 1.6 }}>{item}</li>
                ))}
              </ul>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '.9rem 2.25rem', borderRadius: '12px',
                background: D.gold, color: D.white,
                fontFamily: sans, fontWeight: 700, fontSize: '.95rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(196,137,58,.30)',
              }}>
                {t.marketplace.cta}
              </Link>
            </div>

            {/* Sample listings — clean table */}
            <div>
              <p style={{ fontFamily: sans, fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: D.muted, marginBottom: '1.25rem', paddingBottom: '.875rem', borderBottom: `1px solid ${D.border}` }}>
                Emprendedoras verificadas
              </p>
              {[
                { name: 'EcoTela Artesanal', country: 'México', sector: 'Moda sostenible', tags: ['Ambiental', 'Social'], color: '#3D8B6E' },
                { name: 'Raíces Vivas', country: 'Colombia', sector: 'Agroecología', tags: ['Ambiental', 'Económico'], color: D.gold },
                { name: 'Luz Solar Comunitaria', country: 'España', sector: 'Energía renovable', tags: ['Ambiental'], color: '#4A8FB5' },
              ].map((card, i, arr) => (
                <div key={card.name} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.1rem 0',
                  borderBottom: i < arr.length - 1 ? `1px solid ${D.border}` : 'none',
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                    background: `${card.color}14`, border: `1.5px solid ${card.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: serif, fontWeight: 700, fontSize: '1.2rem', color: card.color,
                  }}>{card.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.2rem' }}>
                      <p style={{ fontFamily: sans, fontWeight: 600, fontSize: '.9rem', color: D.brown }}>{card.name}</p>
                      {/* Verified dot */}
                      <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3D8B6E', flexShrink: 0 }} />
                    </div>
                    <p style={{ fontFamily: sans, fontSize: '.78rem', color: D.muted }}>{card.country} · {card.sector}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '.35rem', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '120px' }}>
                    {card.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: sans, fontSize: '.68rem', padding: '.15rem .55rem', background: D.goldPale, color: D.goldDk, borderRadius: '999px', fontWeight: 600, whiteSpace: 'nowrap' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
              <Link href="/marketplace" style={{
                display: 'block', textAlign: 'center', marginTop: '1.25rem',
                padding: '.875rem', borderRadius: '12px', border: `1px solid ${D.border}`,
                fontFamily: sans, fontSize: '.875rem', fontWeight: 600, color: D.mid,
                textDecoration: 'none', transition: 'border-color .2s, color .2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.gold; el.style.color = D.gold }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.border; el.style.color = D.mid }}>
                {t.marketplace.view} todas las emprendedoras →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  10. MISSION — Dark cinematic + values grid                     ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ padding: '7rem 2rem', background: `linear-gradient(155deg, ${D.dark} 0%, ${D.darkMid} 55%, #3A2010 100%)` }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ maxWidth: '52rem', marginBottom: '4.5rem' }}>
            <Eyebrow label={t.mission.tag} light />
            <Accent light />
            <H2 light>
              {t.mission.h2a}<br />
              <em style={{ fontStyle: 'italic', color: D.goldLt }}>{t.mission.h2b}</em>
            </H2>
          </div>

          {/* Values — grid with 1px border separator (Organic Biophilic hover) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(240,217,168,.08)', marginBottom: '5rem' }}>
            {t.mission.values.map(({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
              <div key={title} style={{
                padding: '2.5rem 2rem', background: D.dark,
                transition: 'background .25s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = '#251409'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = D.dark}>
                <div style={{ fontSize: '1.75rem', marginBottom: '1.1rem' }}>{icon}</div>
                <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: '1.1rem', color: D.goldLt, marginBottom: '.5rem' }}>{title}</h3>
                <p style={{ fontFamily: sans, fontSize: '.875rem', color: 'rgba(196,168,122,.70)', lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Editorial pull quote */}
          <div style={{ maxWidth: '44rem', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '36px', height: '2px', background: `rgba(240,217,168,.35)`, borderRadius: '2px', margin: '0 auto 2rem' }} />
            <p style={{ fontFamily: serif, fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontStyle: 'italic', color: `rgba(240,217,168,.82)`, lineHeight: 1.65 }}>
              &ldquo;{t.mission.sub}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  11. CTA — Founder photo split, strong close                    ║
          ║     Climax CTA (Storytelling-Driven pattern)                    ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <section style={{ overflow: 'hidden', background: D.soft }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '520px' }} className="cta-grid">
          {/* Photo */}
          <div style={{ position: 'relative', minHeight: '480px' }}>
            <Image
              src="/brand/founder.jpg"
              alt="Tu Luz — Fundadora"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(245,236,216,.5))' }} />
          </div>
          {/* Text */}
          <div style={{ padding: '5rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Accent />
            <H2>{t.cta.h2a}<br /><em style={{ fontStyle: 'italic', color: D.gold }}>{t.cta.h2b}</em></H2>
            <p style={{ fontFamily: sans, fontSize: '1.05rem', color: D.mid, lineHeight: 1.9, marginTop: '1.25rem', marginBottom: '2.5rem', maxWidth: '30rem' }}>{t.cta.sub}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.875rem' }}>
              <Link href="/register" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '12px',
                background: D.gold, color: D.white,
                fontFamily: sans, fontWeight: 700, fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(196,137,58,.32)',
                transition: 'all .2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.goldDk; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = D.gold; el.style.transform = 'translateY(0)' }}>
                {t.cta.btn1}
              </Link>
              <Link href="/marketplace" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '1rem 2.5rem', borderRadius: '12px',
                border: `1.5px solid ${D.border}`,
                color: D.mid, fontFamily: sans, fontWeight: 600, fontSize: '1rem',
                textDecoration: 'none', background: 'transparent',
                transition: 'border-color .2s, color .2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.gold; el.style.color = D.gold }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = D.border; el.style.color = D.mid }}>
                {t.cta.btn2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .cta-grid { grid-template-columns: 1fr !important; }
          .step-connector { display: none; }
        }
      `}</style>
    </div>
  )
}
