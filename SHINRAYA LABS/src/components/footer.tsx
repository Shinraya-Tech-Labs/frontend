import Link from "next/link";
import Image from "next/image";
import { navigation } from "@/lib/site";
import { github } from "@/lib/projects";
export function Footer() {
  return (
    <footer className="site-footer shell">
      <div className="footer-main">
        <Link href="/" className="footer-brand">
          <Image src="/brand-mark.webp" alt="" width={48} height={48} />
          <span>
            SHINRAYA <small>TECH LABS</small>
          </span>
        </Link>
        <p>
          Independent inquiry.
          <br />
          Open engineering.
        </p>
        <nav aria-label="Footer">
          {navigation.slice(1).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Shinraya Tech Labs</span>
        <span>Research Beyond Assumptions.</span>
        <a href={github}>GitHub ↗</a>
      </div>
    </footer>
  );
}
