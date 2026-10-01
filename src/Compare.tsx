import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Photo } from './ui'

const CASES = [['before', 'after', 'Case 01'], ['before2', 'after2', 'Case 02']] as const

export default function Compare() {
  const [pos, setPos] = useState(50)
  const [c, setC] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.6 })
  const run = useRef<{ stop: () => void }>()
  useEffect(() => {
    if (seen) run.current = animate(50, [50, 8, 92, 50], { duration: 3.6, ease: 'easeInOut', onUpdate: setPos })
    return () => run.current?.stop()
  }, [seen])
  return (
    <div>
      <div className="mb-4 flex justify-center gap-2">
        {CASES.map(([, , l], i) => <button key={l} aria-pressed={c === i} onClick={() => { run.current?.stop(); setC(i); setPos(50) }} className={`border px-4 py-2 text-sm font-bold transition ${c === i ? 'border-red bg-red' : 'border-steel hover:border-white/40'}`}>{l}</button>)}
      </div>
      <div ref={ref} className="relative mx-auto aspect-[16/9] max-w-5xl select-none overflow-hidden bg-graphite">
        <Photo key={CASES[c][1]} name={CASES[c][1]} alt="Finished paint with deep gloss" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Photo key={CASES[c][0]} name={CASES[c][0]} alt="Vehicle before finishing" className="h-full w-full grayscale brightness-75" />
        </div>
        <span className="absolute left-4 top-4 bg-black/70 px-3 py-1 text-sm font-bold">Before</span>
        <span className="absolute right-4 top-4 bg-red px-3 py-1 text-sm font-bold">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_24px_4px_rgba(255,59,71,.6)]" style={{ left: `${pos}%` }}>
          <div className="glow-pulse absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red font-bold">⇔</div>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => { run.current?.stop(); setPos(+e.target.value) }} aria-label="Drag to compare before and after" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
      </div>
    </div>
  )
}
