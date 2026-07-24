import React from 'react';

interface BhaoGaugeProps {
  position: number; // 0 to 100
  showLabels?: boolean;
}

export const BhaoGauge: React.FC<BhaoGaugeProps> = ({ position, showLabels = true }) => {
  const safePos = Math.max(5, Math.min(95, position));

  return (
    <div className="w-full my-2">
      {/* Gauge Spectrum Bar */}
      <div className="w-full h-2.5 rounded-full bg-gray-200 flex overflow-hidden relative shadow-inner">
        {/* Cheap Zone (Light Blue) */}
        <div className="w-1/3 h-full bg-sky-200" />
        {/* Fair Zone (Safety Green) */}
        <div className="w-1/3 h-full bg-emerald-300 border-x border-white" />
        {/* High Zone (Alert Red) */}
        <div className="w-1/3 h-full bg-rose-200" />

        {/* Pointer Needle */}
        <div
          className="absolute top-0 bottom-0 w-1.5 bg-[#0f172a] -ml-0.75 shadow-md transition-all duration-300 rounded-full"
          style={{ left: `${safePos}%` }}
        />
      </div>

      {/* Labels */}
      {showLabels && (
        <div className="flex justify-between text-[11px] font-semibold text-gray-500 mt-1 px-1">
          <span>Cheap</span>
          <span className="text-emerald-700 font-bold">Fair Market</span>
          <span>High / Scam</span>
        </div>
      )}
    </div>
  );
};
