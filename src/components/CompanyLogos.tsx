import React from 'react';

export const MoxLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <div className={`inline-flex items-center justify-center rounded-lg border border-[#DEDBD2] bg-[#FCFBF8] p-1.5 shadow-xs ${className}`} title="Mox">
    <svg viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20" />
      <path d="M10 9l2 12 2-12" />
    </svg>
  </div>
);

export const SpcLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <div className={`inline-flex items-center justify-center rounded-lg border border-[#DEDBD2] bg-[#FCFBF8] p-1.5 shadow-xs ${className}`} title="South Park Commons">
    <svg viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
    </svg>
  </div>
);

export const FoundersIncLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <div className={`inline-flex items-center justify-center rounded-lg bg-[#111111] p-1.5 shadow-xs ${className}`} title="Founders Inc">
    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
      <path d="M15.5 4.5L7.5 12l8 7.5V4.5z" />
    </svg>
  </div>
);
