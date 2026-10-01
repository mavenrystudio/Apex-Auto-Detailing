import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Photo({ name, alt, className = '', eager = false, mobile }: { name: string; alt: string; className?: string; eager?: boolean; mobile?: string }) {
  const [ok, setOk] = useState(true)
  if (!ok) return <div role="img" aria-label={alt} className={`bg-[radial-gradient(ellipse_at_30%_20%,#3b3b42,#0b0b0d_70%)] ${className}`} />
  const img = <img src={`/images/${name}.jpg`} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setOk(false)} className={`object-cover ${className}`} />
  return mobile ? <picture className="contents"><source media="(max-aspect-ratio: 1/1)" srcSet={`/images/${mobile}.jpg`} />{img}</picture> : img
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

export function Section({ id, title, children, className = '' }: { id: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-5 py-24 md:py-32 ${className}`}>
      <Reveal><h2 className="h-display mb-12 max-w-3xl text-5xl md:text-7xl">{title}</h2></Reveal>
      <motion.span aria-hidden className="-mt-8 mb-12 block h-1 w-24 origin-left bg-red-hi" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} />
      {children}
    </section>
  )
}
