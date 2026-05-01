import React from 'react';

export default function SectionLoader() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 gap-6">
      <div className="relative">
        <div className="w-12 h-12 border-px border-gold/10 rounded-full"></div>
        <div className="absolute inset-0 w-12 h-12 border-t-px border-gold rounded-full animate-spin"></div>
      </div>
      <span className="text-[8px] font-black uppercase tracking-[0.6em] text-gold/40 animate-pulse">Initializing Archive</span>
    </div>
  );
}
