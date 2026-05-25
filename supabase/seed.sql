-- Run in Supabase SQL Editor

-- Courses (required)
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null check (progress >= 0 and progress <= 100),
  icon_name text not null,
  created_at timestamptz not null default now()
);

-- Student profile (hero + sidebar streak)
create table if not exists public.student_profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  streak_days integer not null default 0,
  focus_score integer not null check (focus_score >= 0 and focus_score <= 100),
  active_courses_count integer not null default 0,
  tagline text,
  created_at timestamptz not null default now()
);

-- Activity stats (heatmap tile)
create table if not exists public.activity_stats (
  id uuid primary key default gen_random_uuid(),
  week_total integer not null default 0,
  consistency_percent integer not null check (consistency_percent >= 0 and consistency_percent <= 100),
  cells jsonb not null default '[]'::jsonb,
  summary text,
  created_at timestamptz not null default now()
);

-- Wins (wins tab)
create table if not exists public.wins (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  achieved_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.student_profile enable row level security;
alter table public.activity_stats enable row level security;
alter table public.wins enable row level security;

create policy "courses_select" on public.courses for select to anon, authenticated using (true);
create policy "student_profile_select" on public.student_profile for select to anon, authenticated using (true);
create policy "activity_stats_select" on public.activity_stats for select to anon, authenticated using (true);
create policy "wins_select" on public.wins for select to anon, authenticated using (true);

-- Student profile: display name shown in hero ("Welcome back, Utkarsh")
insert into public.student_profile (name, streak_days, focus_score, active_courses_count, tagline)
select 'Utkarsh', 18, 92, (select count(*)::int from public.courses),
  'Continue your learning journey and complete your next milestone today.'
where not exists (select 1 from public.student_profile limit 1);

-- Keep name as Utkarsh if the row already exists
update public.student_profile
set
  name = 'Utkarsh',
  active_courses_count = (select count(*)::int from public.courses)
where exists (select 1 from public.student_profile limit 1);

-- Seed activity
insert into public.activity_stats (week_total, consistency_percent, cells, summary)
select 24, 92,
  '[0.2,0.35,0.5,0.7,0.4,0.55,0.8,0.3,0.45,0.6,0.75,0.5,0.65,0.85,0.25,0.4,0.55,0.7,0.35,0.5,0.65,0.8,0.45,0.6,0.75,0.9,0.3,0.5,0.7,0.85,0.4,0.55,0.7,0.8,0.6]'::jsonb,
  'Consistent sessions are pushing your baseline higher every day.'
where not exists (select 1 from public.activity_stats limit 1);

-- Seed wins
insert into public.wins (title, description, achieved_at)
select v.title, v.description, v.achieved_at
from (
  values
    ('7-day streak', 'Completed learning sessions seven days in a row.', now() - interval '2 days'),
    ('Course milestone', 'Finished 75% of React Expert Mastery.', now() - interval '5 days'),
    ('Focus champion', 'Maintained 90%+ focus score for a week.', now() - interval '8 days')
) as v(title, description, achieved_at)
where not exists (select 1 from public.wins limit 1);

-- Sample courses (skip if you already have data)
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Layers'),
  ('UI Motion Design', 90, 'Palette'),
  ('TypeScript Foundations', 60, 'Code2'),
  ('Next.js App Router', 85, 'Rocket')
on conflict do nothing;
