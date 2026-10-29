import Link from "next/link";
import Image from "next/image";
import { navigation, discordUrl } from "@/lib/site";
import { github } from "@/lib/projects";

export function Footer() {
  return (
    <footer className="site-footer shell border-t border-[#302e2a]/60 pt-12 pb-16">
      <div className="footer-main">
        <Link href="/" className="footer-brand flex items-center gap-3">
          <Image src="/brand-mark.webp" alt="" aria-hidden="true" width={44} height={44} />
          <span className="font-mono text-sm tracking-widest text-[#f2eee7]">
            SHINRAYA <small className="text-[#d6b799]">TECH LABS</small>
          </span>
        </Link>
        <p className="text-sm text-[#aaa69e] font-light leading-relaxed">
          Independent inquiry.
          <br />
          Open engineering.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-[#aaa69e]">
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#d6b799] transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[#302e2a]/40 text-xs font-mono text-[#aaa69e]">
        <span>© {new Date().getFullYear()} Shinraya Tech Labs</span>
        <span className="text-[#d6b799]">Research Beyond Assumptions.</span>
        <div className="flex items-center gap-6">
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2eee7] hover:text-[#d6b799] transition-colors inline-flex items-center gap-1"
          >
            Discord (UT9uaeY46e) ↗
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f2eee7] hover:text-[#d6b799] transition-colors inline-flex items-center gap-1"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
