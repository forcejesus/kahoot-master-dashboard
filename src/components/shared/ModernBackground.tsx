
export function ModernBackground() {
  return (
    <>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full -translate-y-48 translate-x-48 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-pink-400/20 to-indigo-500/20 rounded-full translate-y-36 -translate-x-36 blur-2xl animate-float"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-blue-500/10 rounded-full -translate-x-32 -translate-y-32 animate-pulse"></div>
      
      {/* Floating Sparkles */}
      <div className="absolute top-20 left-20 opacity-30 animate-float">
        <div className="w-6 h-6 bg-yellow-300/60 rounded-full blur-sm"></div>
      </div>
      <div className="absolute top-40 right-32 opacity-20 animate-pulse-slow">
        <div className="w-8 h-8 bg-pink-300/60 rounded-full blur-sm"></div>
      </div>
      <div className="absolute bottom-32 right-20 opacity-25 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-5 h-5 bg-blue-300/60 rounded-full blur-sm"></div>
      </div>
    </>
  );
}
