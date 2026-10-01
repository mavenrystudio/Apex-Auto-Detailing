import { useEffect, useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { PACKAGES, SERVICES, SIZES } from './data'

export type Pref = { service?: string; pkg?: string; size?: string; n: number }
const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const EMPTY = { service: '', pkg: '', make: '', size: '', date: '', time: '', name: '', email: '', phone: '' }
type F = typeof EMPTY
const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
const LIVE = Boolean(URL && KEY)

function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {}
  if (!f.service && !f.pkg) e.service = 'Choose a service or a package.'
  if (f.make.trim().length < 2) e.make = 'Enter your vehicle make and model.'
  if (!f.size) e.size = 'Select a vehicle size.'
  if (!f.date) e.date = 'Pick a date.'
  else if (f.date < new Date().toISOString().slice(0, 10)) e.date = 'Pick a date that is not in the past.'
  if (!f.time) e.time = 'Pick a time.'
  if (f.name.trim().length < 2) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (f.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone number.'
  return e
}

export default function Booking({ pref }: { pref: Pref }) {
  const [f, setF] = useState<F>(EMPTY)
  const [err, setErr] = useState<Partial<Record<keyof F, string>>>({})
  const [st, setSt] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (pref.n) setF((p) => ({ ...p, service: pref.service ?? p.service, pkg: pref.pkg ?? p.pkg, size: pref.size ?? p.size }))
  }, [pref])

  const set = (k: keyof F) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value }))

  async function submit(ev: FormEvent) {
    ev.preventDefault()
    const v = validate(f)
    setErr(v)
    if (Object.keys(v).length) return
    setSt('loading')
    try {
      if (LIVE) {
        const r = await fetch(`${URL}/rest/v1/apex_bookings`, {
          method: 'POST',
          headers: { apikey: KEY!, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ service: f.service, package: f.pkg, vehicle: f.make, size: f.size, date: f.date, time: f.time, name: f.name, email: f.email, phone: f.phone }),
        })
        if (!r.ok) throw new Error(String(r.status))
      } else await new Promise((r) => setTimeout(r, 900))
      setSt('success')
      setF(EMPTY)
    } catch {
      setSt('error')
    }
  }

  const Err = ({ k }: { k: keyof F }) => (err[k] ? <p role="alert" className="mt-1 text-sm text-red-hi">{err[k]}</p> : null)
  const label = 'mb-1 block text-sm font-bold text-white/80'

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 bg-graphite p-6 md:grid-cols-2 md:p-10">
      {!LIVE && <p className="md:col-span-2 border border-red/60 bg-red/10 p-3 text-sm">Demo mode: no backend is configured, so this form sends nothing and no appointment is booked. See the README to connect Supabase.</p>}
      <div><label className={label} htmlFor="service">Service</label>
        <select id="service" className="field" value={f.service} onChange={set('service')}><option value="">Select a service</option>{SERVICES.map((s) => <option key={s.id}>{s.id}</option>)}</select><Err k="service" /></div>
      <div><label className={label} htmlFor="pkg">Package (optional)</label>
        <select id="pkg" className="field" value={f.pkg} onChange={set('pkg')}><option value="">No package</option>{PACKAGES.map((p) => <option key={p.id}>{p.id}</option>)}</select></div>
      <div><label className={label} htmlFor="make">Vehicle make and model</label><input id="make" className="field" value={f.make} onChange={set('make')} placeholder="e.g. Porsche 911" /><Err k="make" /></div>
      <div><label className={label} htmlFor="size">Vehicle size</label>
        <select id="size" className="field" value={f.size} onChange={set('size')}><option value="">Select size</option>{SIZES.map((s) => <option key={s}>{s}</option>)}</select><Err k="size" /></div>
      <div><label className={label} htmlFor="date">Preferred date</label><input id="date" type="date" className="field" value={f.date} onChange={set('date')} min={new Date().toISOString().slice(0, 10)} /><Err k="date" /></div>
      <div><label className={label} htmlFor="time">Preferred time</label>
        <select id="time" className="field" value={f.time} onChange={set('time')}><option value="">Select time</option>{SLOTS.map((s) => <option key={s}>{s}</option>)}</select><Err k="time" /></div>
      <div><label className={label} htmlFor="name">Name</label><input id="name" autoComplete="name" className="field" value={f.name} onChange={set('name')} /><Err k="name" /></div>
      <div><label className={label} htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" className="field" value={f.email} onChange={set('email')} /><Err k="email" /></div>
      <div className="md:col-span-2"><label className={label} htmlFor="phone">Phone</label><input id="phone" type="tel" autoComplete="tel" className="field" value={f.phone} onChange={set('phone')} /><Err k="phone" /></div>
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button className="btn disabled:opacity-60" disabled={st === 'loading'}>{st === 'loading' ? <><Loader2 className="animate-spin" size={18} />Sending</> : 'Request appointment'}</button>
        <div aria-live="polite" className="text-sm">
          {st === 'success' && <p className="flex items-center gap-2 text-green-400"><CheckCircle2 size={18} />{LIVE ? 'Request received. We will contact you to confirm the slot. It is not confirmed yet.' : 'Demo only: nothing was sent and no appointment was booked.'}</p>}
          {st === 'error' && <p className="flex items-center gap-2 text-red-hi"><AlertCircle size={18} />We could not send your request. Check your connection and try again, or call us.</p>}
        </div>
      </div>
    </form>
  )
}
