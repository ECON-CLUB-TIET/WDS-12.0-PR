# BACKEND

Supabase setup for the Wolf of Dalal Street registration.

```
BACKEND/
  supabase/
    config.toml                    CLI config
    migrations/                    SQL migrations (applied in filename order)
    queries.sql                    handy organiser queries
```

## Data model

`public.registrations` holds **one row per team member**.

| column      | notes                                         |
|-------------|-----------------------------------------------|
| team_id     | shared by all members of a team (uuid)        |
| team_name   | shared by the team; unique across teams        |
| member_name | member's full name                            |
| phone       | 10-15 digits                                  |
| roll_no     | globally unique (stored upper-case)           |
| is_leader   | exactly one per team (first member in form)   |

Enforced in the database: 1-4 members per team, unique team name, one
registration per roll number. Public (anon) key can **insert only**.

## Apply the migration

Option A - Supabase CLI:
```
cd BACKEND
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

Option B - paste `supabase/migrations/20261104000000_create_registrations.sql`
into the dashboard SQL editor and run it.

## Connect the frontend
Put the project URL and **anon** key in `FRONTEND/.env`
(see `FRONTEND/.env.example`). Never use the service-role key in the frontend.
