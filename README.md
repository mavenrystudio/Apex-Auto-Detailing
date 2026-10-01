# APEX AUTO

React + TypeScript + Tailwind v4 + Framer Motion + Lucide.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Images
Put JPGs in `public/images/`: `hero`, `about`, `before`, `after`, `g1` to `g8` (`.jpg`). Missing images show a dark placeholder. Use optimized files (about 1600px wide, under 300 KB; hero can be 2400px).

## Bookings (Supabase)
Without env vars the form is a labeled demo and sends nothing. To go live, copy `.env.example` to `.env`, fill in your project URL and anon key, then run this in the SQL Editor (new table name, so it does not clash with your existing `reservations`):

```sql
create table apex_bookings (
  id uuid primary key default gen_random_uuid(),
  service text, package text, vehicle text, size text,
  date date, time text, name text, email text, phone text,
  created_at timestamptz default now()
);
alter table apex_bookings enable row level security;
create policy "public can insert bookings" on apex_bookings for insert to anon with check (true);
```
No public select policy: read bookings in the dashboard. Submissions are "requests" until you confirm them with the customer.
