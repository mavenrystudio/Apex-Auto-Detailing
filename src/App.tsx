import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Armchair, Award, Check, ChevronLeft, ChevronRight, Clock, Droplets, Eye, Facebook, HeartHandshake, Instagram, Layers, Mail, MapPin, Menu, Phone, Plus, ShieldCheck, Sparkles, UserCheck, X } from 'lucide-react'
import { CATS, FAQS, PACKAGES, REVIEWS, SERVICES, SIZES, WORK } from './data'
import { Photo, Reveal, Section } from './ui'
import Compare from './Compare'
import { Band, Marquee, ScrollBar, Spotlight, Tilt } from './fx'
import Booking, { type Pref } from './Booking'

const ICONS = { Droplets, Armchair, Sparkles, ShieldCheck, Layers }
const LINKS = [['Home', '#home'], ['Services', '#services'], ['Packages', '#packages'], ['Our Work', '#work'], ['About', '#about'], ['Reviews', '#reviews'], ['Contact', '#contact']]

function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => { const f = () => setSolid(scrollY > 40); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${solid || open ? 'bg-ink/90 backdrop-blur' : ''}`}>
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="h-display text-3xl">APEX<span className="text-red-hi"> AUTO</span></a>
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {LINKS.map(([l, h]) => <li key={h}><a href={h} className="text-white/75 transition hover:text-white">{l}</a></li>)}
          <li><a href="#booking" className="btn !py-2.5">Book Now</a></li>
        </ul>
        <button className="lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-5 lg:hidden">
            {[...LINKS, ['Book Now', '#booking']].map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="h-display block border-t border-steel py-4 text-3xl">{l}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const lines = ['Precision.', 'Protection.', 'Perfection.']
  return (
    <section id="home" ref={ref} className="relative flex h-[100svh] min-h-[620px] items-end overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <motion.div initial={{ scale: 1.25, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }} className="h-full">
          <Photo name="hero" mobile="hero-m" alt="Red sports sedan in a dark studio with light beams" eager className="kenburns h-full w-full" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:pb-24">
        <h1 className="h-display text-[clamp(3rem,9vw,8.5rem)]" aria-label="Precision. Protection. Perfection.">
          {lines.map((t, i) => (
            <span key={t} className="block overflow-hidden" aria-hidden>
              <motion.span className={`block ${i === 2 ? 'text-red-hi' : ''}`} initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}>{t}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }} className="mt-8 flex max-w-xl flex-col gap-6">
          <p className="text-lg text-white/80">Paint correction, ceramic coating and protection film for owners who notice every reflection. Pristina, Kosovo.</p>
          <div><a href="#booking" className="btn glow-pulse">Book Your Detail</a></div>
        </motion.div>
      </div>
      <span aria-hidden className="cue absolute bottom-6 right-6 hidden h-10 w-6 justify-center rounded-full border border-white/40 pt-2 md:flex"><i className="h-2 w-0.5 bg-white" /></span>
    </section>
  )
}

export default function App() {
  const [pref, setPref] = useState<Pref>({ n: 0 })
  const [size, setSize] = useState(1)
  const [cat, setCat] = useState<string>('All')
  const [lb, setLb] = useState<number | null>(null)
  const [rv, setRv] = useState(0)
  const [faq, setFaq] = useState<number | null>(0)
  const pick = (p: Omit<Pref, 'n'>) => setPref((o) => ({ ...p, n: o.n + 1 }))
  const shown = WORK.filter((w) => cat === 'All' || w.cat === cat)

  useEffect(() => {
    if (lb === null) return
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLb(null)
      if (e.key === 'ArrowRight') setLb((i) => (i! + 1) % shown.length)
      if (e.key === 'ArrowLeft') setLb((i) => (i! - 1 + shown.length) % shown.length)
    }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [lb, shown.length])

  return (
    <>
      <ScrollBar /><Spotlight />
      <Nav />
      <main>
        <Hero />
        <Marquee />

        <Section id="about" title="Obsessed with the last 1%">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <Reveal className="space-y-5 text-lg text-white/75">
              <p>APEX AUTO started with one rule: a car leaves only when we would be proud to park it in our own garage. Every vehicle is inspected under studio light before we touch it and again before handover.</p>
              <p>We use the minimum aggressive process needed to get the result, preserving your clear coat while restoring depth and gloss. Then we protect it properly, with coatings and film installed in a controlled, dust-managed bay.</p>
              <p className="text-sm text-white/50">Studio story is sample copy. Replace with your real history.</p>
            </Reveal>
            <Reveal delay={0.1} className="relative pb-10 md:pb-0">
              <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} whileInView={{ clipPath: 'inset(0 0 0% 0)' }} viewport={{ once: true }} transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}>
                <Photo name="about" alt="Detailer polishing a car bonnet" className="aspect-[4/5] w-full" />
              </motion.div>
              <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-2 -left-4 w-2/5 md:-bottom-10 md:-left-10">
                <Photo name="about2" alt="Orbital polisher working on a curved door panel" className="aspect-[3/2] w-full border-4 border-ink shadow-2xl" />
              </motion.div>
            </Reveal>
          </div>
        </Section>

        <Section id="services" title="What we do">
          <div className="grid gap-px bg-steel md:grid-cols-3">
            {SERVICES.map((s, i) => {
              const I = ICONS[s.icon]
              return (
                <Tilt key={s.id} delay={i * 0.05} className="group relative overflow-hidden bg-graphite p-8 transition-colors hover:bg-[#1a1012]">
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-red-hi transition-transform duration-500 group-hover:scale-x-100" />
                  <I className="mb-8 text-red-hi" size={32} />
                  <h3 className="h-display text-3xl">{s.id}</h3>
                  <p className="mt-3 mb-6 text-white/65">{s.text}</p>
                  <a href="#booking" onClick={() => pick({ service: s.id })} className="font-bold text-red-hi">Book this service</a>
                </Tilt>
              )
            })}
          </div>
        </Section>

        <Section id="packages" title="Packages">
          <div role="radiogroup" aria-label="Vehicle size" className="mb-10 inline-flex border border-steel">
            {SIZES.map((s, i) => <button key={s} role="radio" aria-checked={size === i} onClick={() => setSize(i)} className={`px-4 py-2 text-sm font-bold transition ${size === i ? 'bg-red' : 'hover:bg-steel'}`}>{s}</button>)}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <motion.article key={p.id} whileHover={{ y: -8 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`flex flex-col p-8 ${'hot' in p ? 'hot' : 'bg-graphite'}`}>
                <p className="text-sm text-red-hi">{p.tag}</p>
                <h3 className="h-display mt-2 text-5xl">{p.id}</h3>
                <p className="my-6 flex items-baseline gap-2"><AnimatePresence mode="wait"><motion.span key={size} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-display text-6xl">€{p.price[size]}</motion.span></AnimatePresence><span className="text-sm text-white/50">demo price</span></p>
                <ul className="mb-8 flex-1 space-y-3">{p.items.map((it) => <li key={it} className="flex gap-3 text-white/80"><Check size={18} className="mt-1 shrink-0 text-red-hi" />{it}</li>)}</ul>
                <a href="#booking" onClick={() => pick({ pkg: p.id, size: SIZES[size] })} className={`btn justify-center ${'hot' in p ? '' : 'btn-ghost'}`}>Choose {p.id}</a>
              </motion.article>
            ))}
          </div>
        </Section>

        <Band />

        <Section id="compare" title="Before and after">
          <Reveal><Compare /></Reveal>
          <p className="mt-4 text-center text-sm text-white/50">Drag the slider, or use the arrow keys when it is focused.</p>
        </Section>

        <Section id="work" title="Our work">
          <div className="mb-8 flex flex-wrap gap-2">
            {CATS.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => { setCat(c); setLb(null) }} className={`border px-4 py-2 text-sm font-bold transition ${cat === c ? 'border-red bg-red' : 'border-steel hover:border-white/40'}`}>{c}</button>)}
          </div>
          <motion.div layout className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {shown.map((w, i) => (
                <motion.button layout key={w.id} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} onClick={() => setLb(i)} aria-label={`Open ${w.title}`} className="group shine relative aspect-square overflow-hidden">
                  <Photo name={w.id} alt={w.title} className="h-full w-full transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 p-3 text-left text-sm">{w.title}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
          <p className="mt-4 text-sm text-white/50">Replace the gallery images in public/images with photos of your own work.</p>
        </Section>

        <Section id="booking" title="Book your appointment"><Booking pref={pref} /></Section>

        <Section id="why" title="Why APEX AUTO">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[[Eye, 'Attention to detail', 'Every panel inspected under studio light before and after.'], [Award, 'Premium products', 'Professional coatings, compounds and films only.'], [UserCheck, 'Trained specialists', 'Each job is done by a technician trained on that process.'], [HeartHandshake, 'Customer care', 'Clear quotes, honest advice and aftercare guidance.']].map(([I, t, d], i) => {
              const Icon = I as typeof Eye
              return <Reveal key={t as string} delay={i * 0.06} className="border-l-2 border-red pl-5"><Icon className="mb-4 text-red-hi" /><h3 className="h-display text-2xl">{t as string}</h3><p className="mt-2 text-white/65">{d as string}</p></Reveal>
            })}
          </div>
        </Section>

        <Section id="reviews" title="Reviews">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.figure key={rv} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }} className="min-h-48">
                <blockquote className="text-2xl leading-snug md:text-3xl">{REVIEWS[rv].text}</blockquote>
                <figcaption className="mt-5 text-white/60">{REVIEWS[rv].name}, {REVIEWS[rv].car}</figcaption>
              </motion.figure>
            </AnimatePresence>
            <div className="mt-6 flex items-center gap-3">
              <button aria-label="Previous review" onClick={() => setRv((rv + REVIEWS.length - 1) % REVIEWS.length)} className="border border-steel p-3 hover:border-red-hi"><ChevronLeft /></button>
              <button aria-label="Next review" onClick={() => setRv((rv + 1) % REVIEWS.length)} className="border border-steel p-3 hover:border-red-hi"><ChevronRight /></button>
              <span className="text-sm text-white/50">Demo content, not real customer reviews.</span>
            </div>
          </div>
        </Section>

        <Section id="faq" title="Questions">
          <div className="max-w-3xl divide-y divide-steel border-y border-steel">
            {FAQS.map(([q, a], i) => (
              <div key={q}>
                <button aria-expanded={faq === i} aria-controls={`faq-${i}`} onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-bold">
                  {q}<Plus className={`shrink-0 text-red-hi transition-transform ${faq === i ? 'rotate-45' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && <motion.div id={`faq-${i}`} initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden"><p className="pb-5 text-white/70">{a}</p></motion.div>}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Visit the studio">
          <div className="grid gap-10 md:grid-cols-2">
            <ul className="space-y-5 text-lg">
              <li className="flex gap-3"><Phone className="text-red-hi" />+383 44 000 000 <span className="text-sm text-white/40">(demo)</span></li>
              <li className="flex gap-3"><Mail className="text-red-hi" />info@apexauto.example</li>
              <li className="flex gap-3"><MapPin className="text-red-hi" />Rruga Demo 12, Pristina, Kosovo</li>
              <li className="flex gap-3"><Clock className="text-red-hi" />Mon to Sat, 09:00 to 18:00. Closed Sunday.</li>
              <li className="flex gap-4 pt-2"><a href="#" aria-label="Instagram"><Instagram /></a><a href="#" aria-label="Facebook"><Facebook /></a></li>
            </ul>
            <div role="img" aria-label="Map placeholder" className="grid min-h-64 place-items-center border border-steel bg-graphite text-white/50">Map placeholder: embed your Google Maps iframe here</div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-steel bg-graphite">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
          <div><p className="h-display text-3xl">APEX<span className="text-red-hi"> AUTO</span></p><p className="mt-3 text-sm text-white/60">Luxury detailing and ceramic coating in Pristina.</p></div>
          <div><p className="mb-3 font-bold">Navigate</p><ul className="space-y-2 text-sm text-white/65">{LINKS.map(([l, h]) => <li key={h}><a href={h} className="hover:text-white">{l}</a></li>)}</ul></div>
          <div><p className="mb-3 font-bold">Services</p><ul className="space-y-2 text-sm text-white/65">{SERVICES.map((s) => <li key={s.id}>{s.id}</li>)}</ul></div>
          <div><p className="mb-3 font-bold">Contact</p><p className="text-sm text-white/65">+383 44 000 000<br />info@apexauto.example<br />Pristina, Kosovo</p></div>
        </div>
        <p className="border-t border-steel py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} APEX AUTO. Prices, reviews and contact details are demo content.</p>
      </footer>

      <AnimatePresence>
        {lb !== null && shown[lb] && (
          <motion.div role="dialog" aria-modal="true" aria-label={shown[lb].title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)} className="fixed inset-0 z-[60] grid place-items-center bg-black/95 p-4">
            <button autoFocus aria-label="Close" className="absolute right-5 top-5" onClick={() => setLb(null)}><X size={28} /></button>
            <button aria-label="Previous" className="absolute left-3 p-3" onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + shown.length) % shown.length) }}><ChevronLeft size={32} /></button>
            <button aria-label="Next" className="absolute right-3 p-3" onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % shown.length) }}><ChevronRight size={32} /></button>
            <motion.div key={shown[lb].id} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 24 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl"><Photo name={shown[lb].id} alt={shown[lb].title} className="max-h-[80vh] w-full !object-contain" /><p className="mt-3 text-center">{shown[lb].title}</p></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
