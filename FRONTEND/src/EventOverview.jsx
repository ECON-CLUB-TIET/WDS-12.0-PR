import { useEffect } from "react";
import "./event-overview.css";

// Wolf of Dalal Street — Event Overview (React / Vite)
// Put heist-bg.jpg in the /public folder and change the CSS url to "/heist-bg.jpg"
export default function EventOverview() {
  useEffect(() => {
    // scroll reveal
    const els = document.querySelectorAll(".wos-event .reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));

    // falling banknotes
    const box = document.querySelector(".wos-event .money");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (box && !reduce && !box.children.length) {
      const count = window.innerWidth < 600 ? 6 : 14;
      for (let i = 0; i < count; i++) {
        const n = document.createElement("div");
        n.className = "note"; n.textContent = "₹";
        n.style.left = Math.random() * 100 + "%";
        n.style.animationDuration = 8 + Math.random() * 10 + "s";
        n.style.animationDelay = -Math.random() * 18 + "s";
        box.appendChild(n);
      }
    }

    return () => io.disconnect();
  }, []);

  return (
    <section className="wos-event" id="event">
      {/* Background layers */}
      <div className="bg-photo"></div>
      <div className="alarm"></div>
      <div className="money"></div>
    
      <div className="container">
    
        {/* Heading */}
        <div className="reveal">
          <div className="eyebrow">The Plan</div>
          <h2 className="title">THE BIGGEST HEIST ON<br /><span className="glitch" data-text="DALAL STREET">DALAL STREET</span></h2>
          <p className="lead">
            <strong>WDS &mdash; The Wolf of Dalal Street</strong> is the grandeur event of <strong>ECON Club</strong>:
            a glimpse of Dalal Street where virtual trading happens right in your hands. It began with one mission &mdash;
            to build an <strong>economic temperament amongst youngsters</strong>. One day. One trading floor. One title.
          </p>
        </div>
    
    
        {/* Phases */}
        <h2 className="sub reveal">HOW THE <span>HEIST</span> UNFOLDS</h2>
        <p className="sub-note reveal">One day. One trading floor. Only one portfolio walks out on top.</p>
    
        <div className="phases">
          <div className="phase reveal">
            <div className="dot">01</div>
            <div className="card">
              <span className="tag">Step 01 · Assemble the Crew</span>
              <h3>THE RECRUITMENT</h3>
              <div className="real">Teams &amp; Portfolios</div>
              <p>Every heist needs a crew. Come with your team or come solo &mdash; our team will put you in a group.
                Each crew is handed its own portfolio before the market opens.</p>
            </div>
          </div>
    
          <div className="phase reveal">
            <div className="dot">02</div>
            <div className="card">
              <span className="tag">Step 02 · The Heist</span>
              <h3>THE TRADING FLOOR</h3>
              <div className="real">Virtual Trading</div>
              <p>The doors of the Mint open. The event recreates the real world of the stock market &mdash; and your crew is
                in the middle of it.</p>
              <ul>
                <li>Every team gets its own portfolio, tracking performance with each trade made</li>
                <li>Real-time price fluctuations shown at every moment</li>
                <li>List your trades through jobbers &mdash; they'll challenge your intellect at every step</li>
              </ul>
            </div>
          </div>
    
          <div className="phase reveal">
            <div className="dot">03</div>
            <div className="card">
              <span className="tag">Step 03 · The Crown</span>
              <h3>WOLF OF DALAL STREET</h3>
              <div className="real">The Winner</div>
              <p>When the market closes, the vault is counted. The portfolio that outshines the rest is crowned with the
                coveted title of <strong style={{ color: "var(--red)" }}>"WOLF OF DALAL STREET"</strong>.</p>
            </div>
          </div>
        </div>
    
        {/* Why join */}
        <h2 className="sub reveal">WHY JOIN THE <span>CREW</span></h2>
        <p className="sub-note reveal">More than a competition &mdash; it's a crash course in thinking like an investor.</p>
    
        <div className="perks">
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>
            <h4>Real Market Feel</h4>
            <p>Realistic stock-market scenarios with prices that move every moment &mdash; no real money at risk.</p>
          </div>
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.2 13.4 7 22l5-3 5 3-1.2-8.6"/></svg>
            <h4>The Coveted Title</h4>
            <p>The best portfolio is crowned "Wolf of Dalal Street" &mdash; bragging rights for the year.</p>
          </div>
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <h4>Come Solo or as a Crew</h4>
            <p>Coming alone? No problem &mdash; our team will put you in a crew for the game.</p>
          </div>
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <h4>Think Like an Investor</h4>
            <p>Build the economic temperament every great investor needs &mdash; patience, nerve and quick judgement.</p>
          </div>
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <h4>Beat the Jobbers</h4>
            <p>Every trade goes through the jobbers &mdash; outthink them to get your deal listed.</p>
          </div>
          <div className="perk reveal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <h4>Free for Thapar Students</h4>
            <p>Every Thapar Institute student can take part &mdash; no registration fee, no finance background needed.</p>
          </div>
        </div>
    
        {/* Rules + details */}
        <div className="dossier reveal">
          <div className="stamp">CLASSIFIED</div>
          <div className="left">
            <h3>THE RULES OF THE HEIST</h3>
            <ol>
              <li>Open to all students of Thapar Institute.</li>
              <li>Come solo or as a team &mdash; solo players are grouped by our team.</li>
              <li>Trading is virtual; each team trades only from its own portfolio.</li>
              <li>All trades must be listed through the jobbers.</li>
              <li>Highest-performing portfolio wins. Judges' decision is final.</li>
            </ol>
          </div>
          <div className="right">
            <h3>MISSION DETAILS</h3>
            <div className="info-row"><span>Venue</span><span>LT 201, TIET Patiala</span></div>
            <div className="info-row"><span>Registration Fee</span><span className="free">FREE</span></div>
            <div className="info-row"><span>Who can join</span><span>All Thapar Students</span></div>
            <div className="info-row"><span>Organised by</span><span>ECON Club, Thapar</span></div>
          </div>
        </div>
    
        <div className="cta reveal">
          <p>THE PLAN IS READY. <span>ARE YOU?</span></p>
        </div>
    
      </div>
    </section>
  );
}
