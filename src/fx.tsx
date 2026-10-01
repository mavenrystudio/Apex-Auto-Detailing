import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { SERVICES } from './data'
import { Photo } from './ui'

export function ScrollBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-red-hi" />
}

export function Spotlight() {
  const x = useMotionValue(-999), y = useMotionValue(-999)
  const sx = useSpring(x, { stiffness: 140, damping: 22 }), sy = useSpring(y, { stiffness: 140, damping: 22 })
  useEffect(() => {
    const m = (e: PointerEvent) => { x.set(e.clientX - 200); y.set(e.clientY - 200) }
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m)
  }, [x, y])
  return <motion.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,59,71,.16),transparent_65%)] mix-blend-screen [@media(hover:hover)]:block" />
}

export function Marquee() {
  const row = SERVICES.map((s) => s.id)
  return (
    <div aria-hidden className="overflow-hidden border-y border-steel bg-graphite py-5">
      <div className="marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {[...row, ...row].map((t, i) => <span key={i} className="h-display flex items-center gap-8 pr-8 text-4xl text-white/80 md:text-6xl">{t}<span className="text-red-hi">✦</span></span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Tilt({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const rx = useSpring(0, { stiffness: 200, damping: 18 }), ry = useSpring(0, { stiffness: 200, damping: 18 })
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 10); rx.set((0.5 - py) * 10)
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`); e.currentTarget.style.setProperty('--my', `${py * 100}%`)
  }
  return (
    <motion.div className={`tilt ${className}`} style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }} onMouseMove={move} onMouseLeave={() => { rx.set(0); ry.set(0) }}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

export function Band() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const x = useTransform(scrollYProgress, [0, 1], ['10%', '-22%'])
  return (
    <section ref={ref} aria-label="Notice every reflection" className="relative h-[70svh] min-h-[420px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] -bottom-[15%]">
        <Photo name="hero-m" alt="Black sports car in a dark garage with its headlights on" className="h-full w-full object-[50%_68%]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/25 to-ink/80" />
      <motion.p style={{ x }} aria-hidden className="h-display absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(4rem,14vw,12rem)] text-transparent [-webkit-text-stroke:2px_#ffffffcc]">Notice every reflection</motion.p>
    </section>
  )
}
