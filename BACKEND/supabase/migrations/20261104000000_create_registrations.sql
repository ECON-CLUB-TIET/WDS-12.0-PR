-- One row per team member.
-- Members of the same team share team_id + team_name. Teams have 1-4 members.

create extension if not exists pgcrypto;

create table public.registrations (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  team_id      uuid not null,
  team_name    text not null check (char_length(btrim(team_name)) between 2 and 60),
  member_name  text not null check (char_length(btrim(member_name)) between 2 and 100),
  phone        text not null check (phone ~ '^[0-9+\-\s]{10,15}$'),
  roll_no      text not null check (char_length(btrim(roll_no)) between 1 and 40),
  is_leader    boolean not null default false
);

comment on table public.registrations is
  'Event registrations. One row per member; rows with the same team_id form a team (max 4).';

create index registrations_team_id_idx on public.registrations (team_id);

-- A person can only be registered once (roll number is globally unique).
create unique index registrations_roll_no_key
  on public.registrations (upper(btrim(roll_no)));

-- Exactly one leader per team.
create unique index registrations_one_leader_per_team
  on public.registrations (team_id) where is_leader;

-- ---------------------------------------------------------------
-- Rules that need to look at other rows: team size <= 4, and a
-- team name belongs to exactly one team. Runs as definer so it can
-- read the table even though public visitors have no SELECT access.
-- ---------------------------------------------------------------
create or replace function public.enforce_team_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- serialise concurrent inserts for the same team name / team
  perform pg_advisory_xact_lock(hashtext(lower(btrim(new.team_name))));

  if (select count(*) from public.registrations where team_id = new.team_id) >= 4 then
    raise exception 'TEAM_FULL' using errcode = 'P0001';
  end if;

  if exists (
    select 1 from public.registrations
    where lower(btrim(team_name)) = lower(btrim(new.team_name))
      and team_id <> new.team_id
  ) then
    raise exception 'TEAM_NAME_TAKEN' using errcode = 'P0001';
  end if;

  new.team_name   := btrim(new.team_name);
  new.member_name := btrim(new.member_name);
  new.roll_no     := upper(btrim(new.roll_no));
  new.phone       := btrim(new.phone);
  return new;
end;
$$;

create trigger registrations_enforce_team_rules
  before insert on public.registrations
  for each row execute function public.enforce_team_rules();

-- ---------------------------------------------------------------
-- Row level security: the public (anon) key may only INSERT.
-- Reading registrations is only possible with the service role /
-- dashboard.
-- ---------------------------------------------------------------
alter table public.registrations enable row level security;

create policy "public can register"
  on public.registrations for insert
  to anon
  with check (true);

revoke all on public.registrations from anon, authenticated;
grant insert on public.registrations to anon;
