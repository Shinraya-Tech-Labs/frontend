import fs from "node:fs";
const dest = "src/components/approved";
fs.mkdirSync(dest, { recursive: true });
fs.mkdirSync("licenses", { recursive: true });
const license = JSON.parse(
  fs.readFileSync("research-sources/license.json", "utf8"),
);
fs.writeFileSync(
  "licenses/REACT-BITS.txt",
  Buffer.from(license.content, "base64"),
);
for (const name of [
  "SpotlightCard.tsx",
  "SpotlightCard.css",
  "PillNav.tsx",
  "PillNav.css",
])
  fs.copyFileSync(`research-sources/${name}`, `${dest}/${name}`);
let nav = fs.readFileSync(`${dest}/PillNav.tsx`, "utf8");
nav = nav.replace(
  "import { Link } from 'react-router-dom';",
  "import Link from 'next/link';\nimport Image from 'next/image';\nconst reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;",
);
nav = nav
  .replaceAll("to={", "href={")
  .replaceAll('role="menuitem"', "")
  .replaceAll('role="menubar"', "")
  .replaceAll('role="none"', "");
nav = nav
  .replace(/  const logoImgRef = .*\n/, "")
  .replace(/  const logoTweenRef = .*\n/, "");
nav = nav.replace(/  const handleLogoEnter = \(\) => \{[\s\S]*?\n  \};\n/, "");
nav = nav.replaceAll("onMouseEnter={handleLogoEnter}", "");
nav = nav.replaceAll(
  "<img src={logo} alt={logoAlt} ref={logoImgRef} />",
  '<Image src={logo} alt="" width={50} height={50} priority /><span className="nav-wordmark">SHINRAYA <small>TECH LABS</small></span>',
);
nav = nav.replaceAll('aria-label="Home"', "aria-label={`${logoAlt} home`}");
nav = nav.replace(
  /duration: (\d*\.?\d+)/g,
  "duration: reduceMotion() ? 0 : $1",
);
nav = nav.replaceAll(
  "onMouseEnter={() => handleEnter(i)}",
  "onMouseEnter={() => handleEnter(i)}\n                    onFocus={() => handleEnter(i)}\n                    onBlur={() => handleLeave(i)}",
);
nav = nav.replaceAll(
  "aria-label={item.ariaLabel || item.label}",
  "aria-label={item.ariaLabel || item.label}\n                    aria-current={activeHref === item.href ? 'page' : undefined}",
);
nav = nav.replace(
  "    const layout = () => {",
  "    const timelines = tlRefs.current;\n    const tweens = activeTweenRefs.current;\n    const layout = () => {",
);
nav = nav.replace(
  "return () => window.removeEventListener('resize', onResize);",
  `return () => {
      window.removeEventListener('resize', onResize);
      timelines.forEach(t => t?.kill());
      tweens.forEach(t => t?.kill());
      if (menu) gsap.killTweensOf(menu);
    };`,
);
nav = nav.replace(
  '<div className="pill-nav-container">',
  `<div className="pill-nav-container" onKeyDown={event => {
      if (event.key === 'Escape' && isMobileMenuOpen) { toggleMobileMenu(); hamburgerRef.current?.focus(); }
    }}>`,
);
nav = nav.replace(
  'aria-label="Toggle menu"',
  `aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"`,
);
nav = nav.replace(
  '<div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>',
  '<div id="mobile-navigation" className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars} inert={!isMobileMenuOpen} aria-hidden={!isMobileMenuOpen}>',
);
nav = nav.replaceAll(
  "onClick={() => setIsMobileMenuOpen(false)}",
  "aria-current={activeHref === item.href ? 'page' : undefined}\n                  onClick={toggleMobileMenu}",
);
nav = nav.replace(
  "      const lines = hamburger.querySelectorAll('.hamburger-line');",
  "      const lines = hamburger.querySelectorAll('.hamburger-line');\n      gsap.killTweensOf(lines);",
);
nav = nav.replace(
  "    if (menu) {\n      if (newState)",
  "    if (menu) {\n      gsap.killTweensOf(menu);\n      if (newState)",
);
nav = nav.replaceAll("768px", "1050px");
fs.writeFileSync(`${dest}/PillNav.tsx`, nav);
let css = fs
  .readFileSync(`${dest}/PillNav.css`, "utf8")
  .replaceAll("768px", "1050px");
css += `\n/* Shinraya brand adaptation. Source behavior is retained. */
.pill-nav-container { position:relative; top:auto; width:100%; left:auto; }
.pill-nav { width:100%; justify-content:space-between; --nav-h:46px; --pill-pad-x:16px; }
.pill-logo { width:auto; height:58px; border-radius:0; background:transparent; padding:0; gap:12px; flex-shrink:0; overflow:visible; }
.pill-logo img { width:50px; height:50px; object-fit:contain; }
.nav-wordmark { font-size:18px; letter-spacing:4px; color:var(--text); line-height:1.1; }
.nav-wordmark small { display:block; font-size:8px; letter-spacing:4px; margin-top:7px; color:var(--muted); }
.pill-nav-items { background:transparent; }
.pill { font-size:12px; font-weight:400; text-transform:none; letter-spacing:0; }
.pill.is-active { color:var(--champagne); }
.pill.is-active::after { width:4px; height:4px; bottom:5px; background:var(--champagne); }
.pill-label-hover { opacity:0; }
.mobile-menu-popover { top:70px; left:0; right:0; border:1px solid var(--border); background:var(--surface); border-radius:4px; }
.mobile-menu-popover .mobile-menu-link { border-radius:2px; padding:15px 20px; }
.mobile-menu-popover .mobile-menu-link.is-active { color:var(--champagne); }
.mobile-menu-button { border-radius:2px; }
@media(max-width:1050px) { .pill-nav { padding:0; } }
@media(prefers-reduced-motion:reduce) { .pill *, .mobile-menu-popover *, .hamburger-line { transition:none!important; } }
`;
fs.writeFileSync(`${dest}/PillNav.css`, css);
// The official component already handles reduced motion; disable interaction entirely
// when the preference is active to avoid pointer-follow effects as well.
let card = fs.readFileSync(`${dest}/SpotlightCard.tsx`, "utf8");
card = card
  .replace("  settingsRef.current = settings;", "")
  .replace(
    "    wakeRef.current?.();",
    "    settingsRef.current = settings;\n    wakeRef.current?.();",
  );
card = card.replace(
  "if (!root || !light || !noise || !edge) return undefined;",
  "if (!root || !light || !noise || !edge) return undefined;\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;",
);
fs.writeFileSync(`${dest}/SpotlightCard.tsx`, card);
