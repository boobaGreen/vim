import React from 'react';
import { Info, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

export const Kbd = ({ children }) => (
  <kbd className="inline-block px-2 py-0.5 font-mono text-xs font-black text-brand-primary bg-brand-primary/10 border border-brand-primary/30 rounded shadow-[0_2px_0_0_rgba(45,212,191,0.2)] mx-1 transform -translate-y-0.5">
    {children}
  </kbd>
);

export const InfoBox = ({ children, type = 'info', title }) => {
  const styles = {
    info: { bg: 'bg-blue-500/5', border: 'border-blue-500/20', icon: Info, color: 'text-blue-400' },
    tip: { bg: 'bg-brand-primary/5', border: 'border-brand-primary/20', icon: Lightbulb, color: 'text-brand-primary' },
    warning: { bg: 'bg-orange-500/5', border: 'border-orange-500/20', icon: AlertTriangle, color: 'text-orange-400' },
    success: { bg: 'bg-green-500/5', border: 'border-green-500/20', icon: CheckCircle, color: 'text-green-400' },
  };

  const { bg, border, icon: Icon, color } = styles[type] || styles.info;

  return (
    <div className={`${bg} ${border} border rounded-xl p-6 mb-8 neo-shadow relative overflow-hidden group`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${bg.replace('/5', '')}`} />
      <div className="flex items-start space-x-4">
        <div className={`${color} mt-1 group-hover:scale-110 transition-transform`}>
          <Icon size={20} />
        </div>
        <div className="space-y-1">
          {title && <h5 className={`${color} font-black uppercase tracking-widest text-[10px]`}>{title}</h5>}
          <div className="text-white/70 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const CommandTable = ({ data, headers }) => (
  <div className="glass-morphism rounded-xl overflow-hidden mb-8 border-white/5">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-white/5">
          {headers.map(h => (
            <th key={h} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 p-4 text-left border-b border-white/10">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {data.map((row, i) => (
          <tr key={i} className="hover:bg-brand-primary/5 transition-colors group">
            {row.map((cell, j) => (
              <td key={j} className={`p-4 text-sm font-medium ${j === 0 ? 'text-brand-primary font-mono font-black' : 'text-white/60 group-hover:text-white'}`}>
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
  <div className="flex items-start space-x-6 mb-8 group">
    <div className="relative">
      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary font-black italic group-hover:bg-brand-primary group-hover:text-brand-bg transition-all drop-shadow-lg">
        {number}
      </div>
      {/* Connector line could go here if in a list */}
    </div>
    <div className="space-y-2 pt-1">
      <h4 className="text-lg font-black uppercase italic tracking-tighter text-white group-hover:text-brand-primary transition-colors">{title}</h4>
      <div className="text-sm text-white/60 leading-relaxed">{children}</div>
    </div>
  </div>
);
