/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface PageTearTransitionProps {
  transitionKey: string; // Changes when page or diagram changes (e.g. pageId or diagramFilename)
  isDark?: boolean;
}

export const PageTearTransition: React.FC<PageTearTransitionProps> = ({
  transitionKey,
  isDark = true,
}) => {
  const [isTearing, setIsTearing] = useState(false);
  const [tearStep, setTearStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    // Trigger tear transition on key change
    setIsTearing(true);
    setTearStep(1);

    const stepTimer = setTimeout(() => {
      setTearStep(2);
    }, 280);

    const endTimer = setTimeout(() => {
      setIsTearing(false);
      setTearStep(0);
    }, 550);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(endTimer);
    };
  }, [transitionKey]);

  if (!isTearing) return null;

  return (
    <div
      className="absolute inset-0 z-40 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Torn Top Sheet Peeling and Tearing Away */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
          tearStep === 2
            ? '-translate-y-full rotate-2 opacity-0'
            : '-translate-y-4 rotate-0.5 opacity-90'
        }`}
        style={{
          transformOrigin: 'bottom left',
          filter: 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.45))',
        }}
      >
        {/* Paper Sheet background */}
        <div
          className={`w-full h-full relative ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-slate-400'
              : 'bg-gradient-to-br from-amber-50 via-slate-100 to-white text-slate-500'
          }`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 40px), 96% calc(100% - 25px), 92% calc(100% - 38px), 88% calc(100% - 22px), 84% calc(100% - 35px), 80% calc(100% - 20px), 75% calc(100% - 32px), 70% calc(100% - 18px), 65% calc(100% - 30px), 60% calc(100% - 16px), 55% calc(100% - 28px), 50% calc(100% - 14px), 45% calc(100% - 26px), 40% calc(100% - 15px), 35% calc(100% - 28px), 30% calc(100% - 16px), 25% calc(100% - 30px), 20% calc(100% - 18px), 15% calc(100% - 32px), 10% calc(100% - 20px), 5% calc(100% - 36px), 0% calc(100% - 24px))',
          }}
        >
          {/* Subtle paper fiber grid */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Torn Edge White Fiber Trim */}
          <div
            className="absolute bottom-0 left-0 right-0 h-4 bg-white/25 blur-[0.5px]"
            style={{
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 96% 60%, 92% 20%, 88% 70%, 84% 30%, 80% 80%, 75% 35%, 70% 85%, 65% 40%, 60% 90%, 55% 45%, 50% 92%, 45% 45%, 40% 88%, 35% 40%, 30% 85%, 25% 35%, 20% 80%, 15% 30%, 10% 75%, 5% 20%, 0% 60%)',
            }}
          />

          {/* Quick Tear Banner Label */}
          <div className="absolute bottom-12 right-12 flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/20 border border-blue-400/30 text-[11px] font-mono font-bold tracking-wider uppercase text-blue-300">
            <span>Tearing to New Sheet...</span>
          </div>
        </div>
      </div>

      {/* Ripping Tear Flash / Paper Shadow Along the rip line */}
      <div
        className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none transition-opacity duration-300 ${
          tearStep === 1 ? 'opacity-80' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
        }}
      />
    </div>
  );
};
