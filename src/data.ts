export const SIZES = ['Compact', 'Sedan / Coupe', 'SUV / Large'] as const
export const SERVICES = [
  { id: 'Exterior Detailing', icon: 'Droplets', text: 'Foam wash, decontamination, clay treatment and a hand-applied sealant for a deep, lasting gloss.' },
  { id: 'Interior Detailing', icon: 'Armchair', text: 'Steam cleaning, leather conditioning and fine-detail work on every panel, seam and vent.' },
  { id: 'Paint Correction', icon: 'Sparkles', text: 'Multi-stage machine polishing that removes swirls, haze and light scratches to restore true depth.' },
  { id: 'Ceramic Coating', icon: 'ShieldCheck', text: 'Professional-grade coatings that bond to the paint for hydrophobic protection and lasting shine.' },
  { id: 'Paint Protection Film', icon: 'Layers', text: 'Self-healing clear film fitted to high-impact areas or the full body against chips and scratches.' },
] as const
export const PACKAGES = [
  { id: 'Essential', price: [60, 75, 90], tag: 'Full clean and protect', items: ['Foam wash and decontamination', 'Interior vacuum and wipe-down', 'Wheels, tyres and glass', '3-month sealant'] },
  { id: 'Signature', price: [180, 220, 260], tag: 'Most requested', hot: true, items: ['Everything in Essential', 'Single-stage paint enhancement', 'Steam interior and leather care', '12-month ceramic spray coating'] },
  { id: 'Ultimate', price: [650, 780, 920], tag: 'Full restoration', items: ['Everything in Signature', 'Multi-stage paint correction', '5-year ceramic coating', 'Wheel, glass and trim coating', 'Free 6-month care check'] },
] as const
export const CATS = ['All', 'Ceramic Coating', 'Paint Correction', 'Interior', 'PPF'] as const
export const WORK = [
  { id: 'g1', cat: 'Ceramic Coating', title: 'Sports coupe, 5-year coating' },
  { id: 'g2', cat: 'Paint Correction', title: 'Black sedan, two-stage correction' },
  { id: 'g3', cat: 'Interior', title: 'Leather restoration and steam clean' },
  { id: 'g4', cat: 'PPF', title: 'Full-front PPF on an SUV' },
  { id: 'g5', cat: 'Ceramic Coating', title: 'Wheel and trim coating' },
  { id: 'g6', cat: 'Paint Correction', title: 'Swirl removal under LED light' },
  { id: 'g7', cat: 'Interior', title: 'Cabin detail, grand tourer' },
  { id: 'g8', cat: 'PPF', title: 'Satin wrap-edge finishing' },
] as const
export const REVIEWS = [
  { name: 'Demo reviewer A.', car: 'Sports coupe', text: 'The paint looks deeper than the day I picked the car up. Every panel was checked under light before handover.' },
  { name: 'Demo reviewer B.', car: 'Executive sedan', text: 'Clear communication, no upselling, and the interior looks new. The coating beads water like glass.' },
  { name: 'Demo reviewer C.', car: 'Large SUV', text: 'They fitted PPF on the front end and the finish is invisible. Careful, quiet and very professional.' },
] as const
export const FAQS = [
  ['How long does a ceramic coating last?', 'Depending on the coating, 2 to 5 years with proper care. Maintenance washes every few weeks keep it performing.'],
  ['How long will my car be in the studio?', 'Essential takes about 4 hours, Signature 1 to 2 days, and Ultimate 3 to 5 days including curing time.'],
  ['How is pricing decided?', 'Prices depend on package and vehicle size. Heavily damaged paint or extra-large vehicles may need a quote after inspection. Prices on this page are demo values.'],
  ['How should I prepare my vehicle?', 'Remove personal items and let us know about existing damage. Do not wax or polish beforehand; we start from bare paint.'],
] as const
