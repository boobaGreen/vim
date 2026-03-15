import { Info, AlertTriangle, Lightbulb, CheckCircle, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useProgressStore } from '../../store/useProgressStore';

export const Kbd = ({ children }) => (
  <kbd className="inline-flex items-center justify-center min-w-[28px] px-1.5 py-0.5 font-mono text-[11px] font-black text-brand-primary bg-brand-primary/10 border border-brand-primary/30 rounded shadow-[0_3px_0_0_rgba(45,212,191,0.2)] mx-1 transform -translate-y-[2px] hover:-translate-y-[1px] hover:shadow-[0_2px_0_0_rgba(45,212,191,0.2)] transition-all cursor-default select-none">
    {children}
  </kbd>
);

export const InfoBox = ({ children, type = 'info', title }) => {
  const styles = {
    info: { bg: 'bg-brand-primary/5', border: 'border-brand-primary/20', icon: Info, color: 'text-brand-primary' },
    tip: { bg: 'bg-brand-primary/5', border: 'border-brand-primary/20', icon: Lightbulb, color: 'text-brand-primary' },
    warning: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', icon: AlertTriangle, color: 'text-orange-400' },
    success: { bg: 'bg-green-500/5', border: 'border-green-500/20', icon: CheckCircle, color: 'text-green-400' },
  };

  const { bg, border, icon: Icon, color } = styles[type] || styles.info;

  return (
    <div className={`${bg} ${border} border rounded-2xl p-8 mb-10 neo-shadow relative overflow-hidden group hover:scale-[1.01] transition-transform`}>
      <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity`}>
        <Icon size={120} />
      </div>
      <div className="flex items-start space-x-5">
        <div className={`${color} mt-1.5 bg-white/5 p-2 rounded-xl`}>
          <Icon size={20} />
        </div>
        <div className="space-y-2">
          {title && <h5 className={`${color} font-display font-black uppercase tracking-[0.2em] italic text-xs`}>{title}</h5>}
          <div className="text-white/70 text-[15px] leading-relaxed font-sans">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const CommandTable = ({ data, headers }) => (
  <div className="glass-morphism rounded-2xl overflow-hidden mb-10 border-white/5 bg-white/[0.01]">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-white/[0.03]">
          {headers.map(h => (
            <th key={h} className="text-[10px] font-display font-black uppercase tracking-[0.3em] text-white/30 p-5 text-left border-b border-white/10 italic">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-brand-primary/[0.03] transition-colors group">
            {row.map((cell, j) => (
              <td key={j} className={`p-5 text-sm font-medium ${j === 0 ? 'text-brand-primary font-mono font-black' : 'text-white/60 group-hover:text-white font-sans italic'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const Step = ({ number, title, children }) => (
  <div className="flex items-start space-x-8 mb-12 group">
    <div className="relative shrink-0">
      <div className="w-14 h-14 rounded-2xl glass-morphism border-brand-primary/20 flex items-center justify-center text-brand-primary font-display font-black text-xl italic group-hover:bg-brand-primary group-hover:text-brand-bg transition-all shadow-[0_0_30px_rgba(45,212,191,0.15)]">
        {number}
      </div>
    </div>
    <div className="space-y-2 pt-1.5">
      <h4 className="text-2xl font-display font-black uppercase italic tracking-tighter text-white group-hover:text-brand-primary transition-colors leading-[0.9]">{title}</h4>
      <div className="text-[15px] text-white/50 leading-relaxed max-w-2xl font-sans">{children}</div>
    </div>
  </div>
);

export const DirectionalGrid = () => {
  const language = useProgressStore((state) => state.language);
  
  const labels = {
    it: { up: 'SU', left: 'SINISTRA', down: 'GIÙ', right: 'DESTRA' },
    en: { up: 'UP', left: 'LEFT', down: 'DOWN', right: 'RIGHT' }
  };

  const currentLabels = labels[language] || labels.en;

  const details = {
    it: [
      { key: 'h', label: 'Sinistra', mantra: 'Indietro nel tempo' },
      { key: 'j', label: 'Giù', mantra: 'Verso la terra' },
      { key: 'k', label: 'Su', mantra: 'Verso il cielo' },
      { key: 'l', label: 'Destra', mantra: 'Avanti nel futuro' }
    ],
    en: [
      { key: 'h', label: 'Left', mantra: 'Backward in time' },
      { key: 'j', label: 'Down', mantra: 'Towards the earth' },
      { key: 'k', label: 'Up', mantra: 'Towards the sky' },
      { key: 'l', label: 'Right', mantra: 'Forward into the future' }
    ]
  };

  const currentDetails = details[language] || details.en;

  return (
    <div className="flex flex-col items-center justify-center py-10 mb-10 glass-morphism rounded-3xl border-white/5 bg-white/[0.01]">
      <div className="grid grid-cols-3 gap-4">
        <div />
        <div className="flex flex-col items-center space-y-2">
          <Kbd>k</Kbd>
          <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">{currentLabels.up}</span>
        </div>
        <div />
        
        <div className="flex flex-col items-center space-y-2">
          <Kbd>h</Kbd>
          <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">{currentLabels.left}</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Kbd>j</Kbd>
          <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">{currentLabels.down}</span>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Kbd>l</Kbd>
          <span className="text-[8px] font-black uppercase text-brand-primary tracking-widest">{currentLabels.right}</span>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 px-10">
        {currentDetails.map(item => (
          <div key={item.key} className="text-center space-y-1">
            <div className="text-[10px] font-display font-black text-brand-primary uppercase tracking-tighter italic">{item.label}</div>
            <div className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{item.mantra}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ShortcutGrid = ({ data }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
    {data.map((item, i) => (
      <div key={i} className="glass-morphism p-6 rounded-2xl border-white/5 hover:border-brand-primary/20 transition-all group flex items-center space-x-6">
        <div className="shrink-0 flex items-center justify-center">
          <Kbd>{item.key}</Kbd>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-display font-black uppercase text-white group-hover:text-brand-primary transition-colors">{item.label}</div>
          <p className="text-[11px] text-white/40 font-medium italic leading-tight">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

export const Simulation = ({ title, desc, steps }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-green-400" size={20} />;
      case 'error': return <XCircle className="text-red-400" size={20} />;
      case 'warning': return <AlertTriangle className="text-orange-400" size={20} />;
      default: return <ArrowRight className="text-brand-primary" size={20} />;
    }
  };

  const getBorderInfo = (type) => {
    switch (type) {
      case 'success': return 'border-green-500/30 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]';
      case 'error': return 'border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
      case 'warning': return 'border-orange-500/30 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)]';
      default: return 'border-brand-primary/20 bg-brand-primary/5';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-100';
      case 'error': return 'text-red-100';
      case 'warning': return 'text-orange-100';
      default: return 'text-white/90';
    }
  };

  return (
    <div className="glass-morphism rounded-2xl p-6 md:p-8 mb-10 border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <Lightbulb size={120} />
      </div>
      <div className="relative z-10">
        {title && <h4 className="text-brand-primary font-display font-black uppercase tracking-tighter mb-3 italic text-xl">{title}</h4>}
        {desc && <p className="text-white/70 text-[15px] mb-6 font-sans max-w-2xl">{desc}</p>}
        
        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border ${getBorderInfo(step.type)} transition-colors backdrop-blur-sm`}>
              {step.command && (
                <div className="shrink-0 flex items-center">
                  {typeof step.command === 'string' ? <Kbd>{step.command}</Kbd> : step.command}
                </div>
              )}
              <div className="hidden sm:flex shrink-0 items-center justify-center bg-white/5 w-8 h-8 rounded-full border border-white/10">
                 {getIcon(step.type)}
              </div>
              <div className={`${getTextColor(step.type)} text-[14px] sm:text-[15px] font-sans flex-1 leading-snug`}>
                <div className="flex items-center gap-2 sm:hidden mb-2">
                  {getIcon(step.type)}
                </div>
                {step.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const GrammarFormula = () => {
  const language = useProgressStore((state) => state.language);
  const content = {
    it: {
      verb: { title: 'VERBO', desc: 'Cosa vuoi fare?', ex: 'per Delete', key: 'd' },
      count: { title: 'CONTEGGIO', desc: 'Quante volte?', ex: 'volte', key: '2' },
      motion: { title: 'MOVIMENTO', desc: 'Dove vuoi farlo?', ex: 'per Word', key: 'w' },
      exampleTitle: 'Esempio:',
      exampleParsed: (
        <>
          <span className="text-brand-primary font-bold">Cancella (d)</span> le prossime <span className="text-blue-400 font-bold">due (2)</span> <span className="text-purple-400 font-bold">parole (w)</span>.
        </>
      )
    },
    en: {
      verb: { title: 'VERB', desc: 'What to do?', ex: 'for Delete', key: 'd' },
      count: { title: 'COUNT', desc: 'How many times?', ex: 'times', key: '2' },
      motion: { title: 'MOTION', desc: 'Where to do it?', ex: 'for Word', key: 'w' },
      exampleTitle: 'Example:',
      exampleParsed: (
        <>
          <span className="text-brand-primary font-bold">Delete (d)</span> the next <span className="text-blue-400 font-bold">two (2)</span> <span className="text-purple-400 font-bold">words (w)</span>.
        </>
      )
    }
  };

  const t = content[language] || content.en;

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-8">
        <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl p-3 sm:p-5 text-center w-full sm:flex-1 shadow-[0_0_15px_rgba(45,212,191,0.1)]">
          <div className="text-brand-primary font-display font-black uppercase text-sm sm:text-base tracking-widest italic">{t.verb.title}</div>
        </div>
        <div className="text-white/30 font-black rotate-90 sm:rotate-0">+</div>
        <div className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-3 sm:p-5 text-center w-full sm:flex-1 shadow-[0_0_15px_rgba(96,165,250,0.1)]">
          <div className="text-blue-400 font-display font-black uppercase text-sm sm:text-base tracking-widest italic">{t.count.title}</div>
        </div>
        <div className="text-white/30 font-black rotate-90 sm:rotate-0">+</div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 sm:p-5 text-center w-full sm:flex-1 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <div className="text-purple-400 font-display font-black uppercase text-sm sm:text-base tracking-widest italic">{t.motion.title}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-morphism rounded-xl p-5 border-brand-primary/20 relative overflow-hidden group hover:border-brand-primary/40 transition-colors">
          <div className="text-brand-primary font-display font-black text-[11px] sm:text-xs uppercase tracking-widest mb-2 italic">1. {t.verb.title}</div>
          <div className="text-white/80 text-[14px] sm:text-[15px] mb-2 font-sans">{t.verb.desc}</div>
          <div className="text-white/40 text-[12px] sm:text-[13px] flex items-center gap-1.5"><span className="italic">es.</span><Kbd>{t.verb.key}</Kbd> <span>{t.verb.ex}</span></div>
        </div>
        <div className="glass-morphism rounded-xl p-5 border-blue-400/20 relative overflow-hidden group hover:border-blue-400/40 transition-colors">
          <div className="text-blue-400 font-display font-black text-[11px] sm:text-xs uppercase tracking-widest mb-2 italic">2. {t.count.title}</div>
          <div className="text-white/80 text-[14px] sm:text-[15px] mb-2 font-sans">{t.count.desc}</div>
          <div className="text-white/40 text-[12px] sm:text-[13px] flex items-center gap-1.5"><span className="italic">es.</span><Kbd>{t.count.key}</Kbd> <span>{t.count.ex}</span></div>
        </div>
        <div className="glass-morphism rounded-xl p-5 border-purple-500/20 relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="text-purple-400 font-display font-black text-[11px] sm:text-xs uppercase tracking-widest mb-2 italic">3. {t.motion.title}</div>
          <div className="text-white/80 text-[14px] sm:text-[15px] mb-2 font-sans">{t.motion.desc}</div>
          <div className="text-white/40 text-[12px] sm:text-[13px] flex items-center gap-1.5"><span className="italic">es.</span><Kbd>{t.motion.key}</Kbd> <span>{t.motion.ex}</span></div>
        </div>
      </div>

      <div className="glass-morphism border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-blue-400/5 to-purple-500/5 opacity-50 pointer-events-none" />
        <div className="shrink-0 flex items-center space-x-0.5 p-3 sm:p-4 bg-black/40 rounded-xl relative z-10 border border-white/5 shadow-inner">
          <span className="text-brand-primary font-mono text-xl sm:text-2xl font-black">d</span>
          <span className="text-blue-400 font-mono text-xl sm:text-2xl font-black">2</span>
          <span className="text-purple-400 font-mono text-xl sm:text-2xl font-black">w</span>
        </div>
        <div className="text-center sm:text-left relative z-10 flex-1">
          <div className="text-white/40 text-[11px] sm:text-xs uppercase tracking-widest font-black mb-1.5 italic">{t.exampleTitle}</div>
          <div className="text-white/90 text-[14px] sm:text-[15px] font-sans leading-relaxed">
            {t.exampleParsed}
          </div>
        </div>
      </div>
    </div>
  );
};
