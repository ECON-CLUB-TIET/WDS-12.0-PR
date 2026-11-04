import heistBg from '../assets/new-bg.jpg';

const timelineEvents = [
  {
    id: 1,
    phase: 'PHASE 01',
    time: '10/11/2026',
    title: 'REGISTRATION',
    subtitle: 'THE BLUEPRINT & RECRUITMENT',
    description: 'Every heist begins with a plan. Assemble your crew, secure your clearance, and study the target. Once the clock starts ticking, there is no turning back.',
  },
  {
    id: 2,
    phase: 'PHASE 02',
    time: '18/11/2026',
    title: 'SPEAKER SESSION',
    subtitle: 'INSIDE INTEL & MASTERMIND BRIEFING',
    description: 'Infiltrate the vault of knowledge. Listen closely to the Mastermind as we decode market vulnerabilities and sharp-tune our strategy before stepping onto the floor.',
  },
  {
    id: 3,
    phase: 'PHASE 03',
    time: '21/11/2026',
    title: 'MAIN TRADING DAY',
    subtitle: 'EXECUTION & THE DALAL STREET HEIST',
    description: 'The alarm sounds. The trading floor opens. Navigate real-time market chaos, execute high-stakes trades, survive unexpected curveballs, and escape with the ultimate prize.',
  },
];

export default function Timeline() {
  return (
    <section 
      className="relative w-full min-h-screen py-24 px-5 bg-cover bg-center bg-fixed text-white overflow-hidden" 
      style={{ backgroundImage: `url(${heistBg})` }}
      id="timeline"
    >
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Main Section Title */}
        <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl tracking-wider mb-16 uppercase text-center drop-shadow-[0_4px_8px_rgba(0,0,0,1)]">
          <span className="text-white mr-3">EVENT</span>
          <span className="text-[#e32636] [text-shadow:_0_0_18px_rgba(227,38,54,0.8)]">TIMELINE</span>
        </h2>

        {/* Central Vertical Timeline */}
        <div className="relative w-full max-w-4xl">
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[2px] bg-gradient-to-b from-[#e32636] via-[#e32636] to-transparent -translate-x-1/2 shadow-[0_0_15px_rgba(227,38,54,1)]" />

          {timelineEvents.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={item.id}
                className={`relative w-full md:w-1/2 mb-12 pl-12 md:pl-0 ${
                  isEven
                    ? 'md:left-0 md:pr-12 md:text-right'
                    : 'md:left-1/2 md:pl-12 md:text-left'
                }`}
              >
                {/* Center Node Dot */}
                <div
                  className={`absolute top-6 w-4 h-4 bg-[#e32636] border-2 border-black rounded-full z-20 shadow-[0_0_15px_#e32636] left-[12px] -translate-x-1/2 ${
                    isEven
                      ? 'md:left-auto md:right-0 md:translate-x-1/2'
                      : 'md:left-0 md:-translate-x-1/2'
                  }`}
                />

                {/* Translucent Card */}
                <div className="bg-black/85 backdrop-blur-md border border-[#e32636]/60 rounded-md p-6 shadow-[0_8px_30px_rgb(0,0,0,0.85)] transition-all duration-300 hover:border-[#e32636] hover:shadow-[0_0_30px_rgba(227,38,54,0.5)] hover:-translate-y-1">
                  <div className={`flex justify-between items-center mb-2 pb-2 border-b border-white/10 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <span className="font-['Bebas_Neue'] text-lg text-[#e32636] tracking-wider uppercase">
                      {item.phase}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">
                      {item.time}
                    </span>
                  </div>

                  {/* Main Title */}
                  <h3 className="font-['Bebas_Neue'] text-3xl md:text-4xl tracking-wide text-white mb-1">
                    {item.title}
                  </h3>

                  {/* Subtitle (Smaller Heist-styled text) */}
                  <div className="font-['Bebas_Neue'] text-sm tracking-widest text-[#e32636] mb-3 uppercase">
                    {item.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Accent Line */}
        <div className="w-full max-w-4xl flex items-center justify-center gap-6 mt-12 text-xs tracking-[3px] text-zinc-300 uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#e32636]/60 to-transparent" />
          <span className="font-['Bebas_Neue'] text-lg tracking-widest">WOLF OF DALAL STREET</span>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#e32636]/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}