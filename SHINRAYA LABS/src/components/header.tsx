"use client";
import { usePathname } from "next/navigation";
import PillNav from "./approved/PillNav";
import { navigation } from "@/lib/site";
export function Header() {
  const pathname = usePathname();
  return (
    <header className="site-header">
      <div className="shell">
        <PillNav
          key={pathname}
          logo="/brand-mark.webp"
          logoAlt="Shinraya Tech Labs"
          items={navigation}
          activeHref={pathname}
          initialLoadAnimation={false}
          baseColor="#d6b799"
          pillColor="#090909"
          pillTextColor="#e7e2da"
          hoveredPillTextColor="#090909"
        />
      </div>
    </header>
  );
}
