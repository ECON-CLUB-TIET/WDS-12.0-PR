import { useState } from "react";
import "./Register.css";
import wdsLogo from "../assets/wdslogo.png";
import econLogo from "../assets/Econ(White).png";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const MAX_MEMBERS = 4;
const blankMember = () => ({ member_name: "", phone: "", roll_no: "" });

function validate(teamName, members) {
  const e = { members: members.map(() => ({})) };
  if (teamName.trim().length < 2) e.team_name = "Enter a team name (min 2 characters).";
  const seen = new Map();
  members.forEach((m, i) => {
    if (m.member_name.trim().length < 2) e.members[i].member_name = "Enter the member's name.";
    if (!/^[0-9+\-\s]{10,15}$/.test(m.phone.trim())) e.members[i].phone = "Enter a valid phone number.";
    const roll = m.roll_no.trim().toUpperCase();
    if (!roll) e.members[i].roll_no = "Enter the roll number.";
    else if (seen.has(roll)) e.members[i].roll_no = `Same roll number as member ${seen.get(roll) + 1}.`;
    else seen.set(roll, i);
  });
  const ok = !e.team_name && e.members.every((m) => Object.keys(m).length === 0);
  return { e, ok };
}

export default function Register() {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([blankMember()]);
  const [errors, setErrors] = useState({ members: [] });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMsg, setServerMsg] = useState("");

  const setSize = (n) => {
    setMembers((prev) =>
      n > prev.length
        ? [...prev, ...Array.from({ length: n - prev.length }, blankMember)]
        : prev.slice(0, n)
    );
    setErrors({ members: [] });
  };

  const setMember = (i, name, value) => {
    setMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, [name]: value } : m)));
    setErrors((p) => {
      if (!p.members?.[i]?.[name]) return p;
      const next = { ...p, members: p.members.map((m, idx) => (idx === i ? { ...m, [name]: undefined } : m)) };
      return next;
    });
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const { e, ok } = validate(teamName, members);
    setErrors(e);
    if (!ok) return;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setStatus("error");
      setServerMsg("Registration is not configured yet. Please contact the organisers.");
      return;
    }

    setStatus("loading");
    setServerMsg("");

    const team_id = crypto.randomUUID();
    // One row per member; sent as a single request so it is all-or-nothing.
    const rows = members.map((m, i) => ({
      team_id,
      team_name: teamName.trim(),
      member_name: m.member_name.trim(),
      phone: m.phone.trim(),
      roll_no: m.roll_no.trim().toUpperCase(),
      is_leader: i === 0,
    }));

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(rows),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      let body = {};
      try { body = await res.json(); } catch { /* ignore */ }
      const text = `${body.message || ""} ${body.details || ""}`;
      let msg = "Something went wrong. Please try again.";
      if (text.includes("TEAM_NAME_TAKEN")) msg = "That team name is already taken. Pick another one.";
      else if (text.includes("TEAM_FULL")) msg = "A team can have at most 4 members.";
      else if (text.includes("roll_no")) msg = "One or more roll numbers are already registered.";
      setStatus("error");
      setServerMsg(msg);
    } catch {
      setStatus("error");
      setServerMsg("Network error. Check your connection and try again.");
    }
  };
  return (
    <div className="reg-page">
      <header className="reg-top">
        <div className="logo-group">
          <a href="#" className="logo logo-econ" aria-label="Back to home">
            <img src={econLogo} alt="ECON Club Logo" />
          </a>
          <span className="logo-divider" aria-hidden="true" />
          <a href="#" className="logo" aria-label="Back to home">
            <img src={wdsLogo} alt="Wolf of Dalal Street" />
          </a>
        </div>
        <a href="#" className="reg-back">← BACK TO SITE</a>
      </header>

      <main className="reg-main">
        <div className="reg-heading">
          <p className="reg-eyebrow"><span /> ECON PRESENTS <span /></p>
          <h1>JOIN THE <b>HEIST</b></h1>
          <p className="reg-sub">Assemble your crew and secure your spot on the trading floor.</p>
        </div>

        <div className="reg-card">
          {status === "success" ? (
            <div className="reg-success" role="status">
              <div className="reg-check">✓</div>
              <h2>YOU'RE IN.</h2>
              <p>Team <strong>{teamName.trim()}</strong> is registered with {members.length} member{members.length > 1 ? "s" : ""}. We'll reach out to the team leader on <strong>{members[0].phone}</strong>. Welcome to the crew.</p>
              <a href="#" className="reg-btn">BACK TO HOME</a>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className={`reg-field ${errors.team_name ? "has-error" : ""}`}>
                <label htmlFor="team_name">TEAM NAME</label>
                <input
                  id="team_name"
                  value={teamName}
                  onChange={(e) => { setTeamName(e.target.value); setErrors((p) => ({ ...p, team_name: undefined })); }}
                  placeholder="The Professors"
                  maxLength={60}
                />
                {errors.team_name && <span className="reg-error">{errors.team_name}</span>}
              </div>

              <div className="reg-field reg-size">
                <label id="size-label">TEAM SIZE</label>
                <div className="reg-seg" role="group" aria-labelledby="size-label">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      type="button"
                      key={n}
                      className={members.length === n ? "active" : ""}
                      aria-pressed={members.length === n}
                      onClick={() => setSize(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="reg-members">
                {members.map((m, i) => {
                  const err = errors.members?.[i] || {};
                  return (
                    <fieldset className="reg-member" key={i}>
                      <legend>
                        <span className="reg-num">{String(i + 1).padStart(2, "0")}</span>
                        {i === 0 ? "TEAM LEADER" : `MEMBER ${i + 1}`}
                      </legend>
                      <div className="reg-grid">
                        <div className={`reg-field wide ${err.member_name ? "has-error" : ""}`}>
                          <label htmlFor={`name-${i}`}>FULL NAME</label>
                          <input id={`name-${i}`} value={m.member_name} autoComplete="off"
                            onChange={(e) => setMember(i, "member_name", e.target.value)} placeholder="Full name" />
                          {err.member_name && <span className="reg-error">{err.member_name}</span>}
                        </div>
                        <div className={`reg-field ${err.phone ? "has-error" : ""}`}>
                          <label htmlFor={`phone-${i}`}>PHONE</label>
                          <input id={`phone-${i}`} type="tel" inputMode="tel" value={m.phone} autoComplete="off"
                            onChange={(e) => setMember(i, "phone", e.target.value)} placeholder="+91 98765 43210" />
                          {err.phone && <span className="reg-error">{err.phone}</span>}
                        </div>
                        <div className={`reg-field ${err.roll_no ? "has-error" : ""}`}>
                          <label htmlFor={`roll-${i}`}>ROLL NO</label>
                          <input id={`roll-${i}`} value={m.roll_no} autoComplete="off"
                            onChange={(e) => setMember(i, "roll_no", e.target.value)} placeholder="102XXXXXX" />
                          {err.roll_no && <span className="reg-error">{err.roll_no}</span>}
                        </div>
                      </div>
                    </fieldset>
                  );
                })}
              </div>

              {status === "error" && <div className="reg-alert" role="alert">{serverMsg}</div>}

              <button className="reg-btn reg-submit" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "SENDING..." : "REGISTER TEAM"}
              </button>
              <p className="reg-fine">The first member is the team leader and our point of contact.</p>
            </form>
          )}
        </div>
      </main>

      <footer className="reg-footer">© 2026 ECON Club. All rights reserved.</footer>
    </div>
  );
}
