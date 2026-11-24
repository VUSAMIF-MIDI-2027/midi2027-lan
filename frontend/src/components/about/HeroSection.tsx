import { Link } from 'react-router'
import { useLang } from '../../i18n/LanguageContext'
import { wrap } from '../../styles/layout'
import { useEffect, useRef } from 'react'

const heroBg = `${import.meta.env.BASE_URL}gallery/hero-bg.webp`

export default function HeroSection() {
  const tr = useLang()
  const heroRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    function updateOpacity() {
      frame = 0
      if (!heroRef.current || !backgroundRef.current) return
      const progress = Math.min(window.scrollY / (heroRef.current.offsetHeight * 0.6), 1)
      backgroundRef.current.style.opacity = String(1 - progress)
    }
    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateOpacity)
    }
    updateOpacity()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
      <section className="home-hero" ref={heroRef} style={{
        position: 'relative', display: 'flex', alignItems: 'center',
        minHeight: 'clamp(620px, 100svh, 900px)', padding: '96px 0 88px',
        overflow: 'hidden', isolation: 'isolate', background: '#050506',
      }}>
        <div ref={backgroundRef} style={{ position: 'absolute', inset: 0, zIndex: -2, transition: 'opacity 0.05s linear', backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'linear-gradient(180deg, rgba(5,5,6,0.08) 0%, rgba(5,5,6,0.04) 38%, rgba(5,5,6,0.76) 78%, #050506 100%), linear-gradient(90deg, rgba(3,3,4,0.94) 0%, rgba(3,3,4,0.6) 58%, rgba(0,117,181,0.16) 100%)' }} />
        <div style={wrap}>
          <h1 className="home-hero-title" style={{ margin: 0, fontWeight: 800, fontSize: 'clamp(80px, 8.6vw, 136px)', lineHeight: 0.93, letterSpacing: '0.005em' }}>
            <span style={{ display: 'block', animation: 'rise 0.7s cubic-bezier(0.2,0.7,0.2,1) both' }}>MIDI</span>
            <span style={{ display: 'block', animation: 'rise 0.7s cubic-bezier(0.2,0.7,0.2,1) 0.12s both' }}>LAN</span>
            <span className="home-hero-title-accent" style={{ display: 'block', animation: 'rise 0.7s cubic-bezier(0.2,0.7,0.2,1) 0.24s both' }}>Party</span>
          </h1>
          <p style={{ maxWidth: 480, margin: '30px 0 38px', color: 'rgba(255,255,255,0.76)', fontSize: 18, lineHeight: 1.7 }}>
            {tr.heroDesc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link className="home-button home-button--solid" to="/register">{tr.registerInterest}</Link>
            <Link className="home-button home-button--line" to="/details">{tr.eventDetails}</Link>
          </div>
        </div>
      </section>

  )
}
