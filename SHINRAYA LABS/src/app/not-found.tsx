import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-[75vh] flex items-center justify-center py-32 px-6 overflow-hidden bg-[#090909] text-[#f2eee7]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d6b799]/5 blur-[160px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 max-w-xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#302e2a] bg-[#111110] text-xs font-mono text-[#d6b799] tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dd3044]" />
          HTTP 404 — Route Unmapped
        </div>

        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-[#f2eee7]">
          An unexplored path.
        </h1>

        <p className="text-base text-[#aaa69e] font-light leading-relaxed">
          The requested coordinate does not point to an active research program, publication, or software repository. The verified evidence archive is located at the home base.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#d6b799] text-[#090909] font-medium text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-[#d6b799]/10"
          >
            Return to the Laboratory <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
