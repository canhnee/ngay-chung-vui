export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-white/60 text-sm tracking-[0.3em] animate-pulse">
          LOADING...
        </div>
      </div>
    </div>
  );
}
