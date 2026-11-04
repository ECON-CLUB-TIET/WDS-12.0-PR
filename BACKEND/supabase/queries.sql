-- Handy read-only views for organisers. Run in the SQL editor (needs
-- dashboard / service role; not exposed to the public key).

-- One line per team
select team_name,
       count(*)                                          as members,
       max(member_name) filter (where is_leader)         as leader,
       max(phone)       filter (where is_leader)         as leader_phone,
       min(created_at)                                   as registered_at
from public.registrations
group by team_id, team_name
order by registered_at;
