
export function PlanificationBackground() {
  return (
    <>
      {/* Motifs de fond paisibles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200/25 to-teal-200/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-slate-100/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-teal-100/25 to-blue-100/25 rounded-full blur-2xl"></div>
      </div>

      {/* Motif géométrique subtil */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(71, 85, 105) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Lignes ondulées */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,15 Q25,8 50,15 T100,15 L100,0 L0,0 Z" fill="currentColor" className="text-teal-300"/>
          <path d="M0,85 Q25,78 50,85 T100,85 L100,100 L0,100 Z" fill="currentColor" className="text-blue-300"/>
        </svg>
      </div>
    </>
  );
}
