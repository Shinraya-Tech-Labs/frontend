"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
import { gsap } from "gsap";
import "./PillNav.css";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#120F17",
  hoveredPillTextColor = "#120F17",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    const timelines = tlRefs.current;
    const tweens = activeTweenRefs.current;
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          {
            scale: 1.2,
            xPercent: -50,
            duration: reduceMotion() ? 0 : 2,
            ease,
            overwrite: "auto",
          },
          0,
        );

        if (label) {
          tl.to(
            label,
            {
              y: -(h + 8),
              duration: reduceMotion() ? 0 : 2,
              ease,
              overwrite: "auto",
            },
            0,
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            {
              y: 0,
              opacity: 1,
              duration: reduceMotion() ? 0 : 2,
              ease,
              overwrite: "auto",
            },
            0,
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: reduceMotion() ? 0 : 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, {
          width: "auto",
          duration: reduceMotion() ? 0 : 0.6,
          ease,
        });
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
      timelines.forEach((t) => t?.kill());
      tweens.forEach((t) => t?.kill());
      if (menu) gsap.killTweensOf(menu);
    };
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: reduceMotion() ? 0 : 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: reduceMotion() ? 0 : 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      gsap.killTweensOf(lines);
      if (newState) {
        gsap.to(lines[0], {
          rotation: 45,
          y: 3,
          duration: reduceMotion() ? 0 : 0.3,
          ease,
        });
        gsap.to(lines[1], {
          rotation: -45,
          y: -3,
          duration: reduceMotion() ? 0 : 0.3,
          ease,
        });
      } else {
        gsap.to(lines[0], {
          rotation: 0,
          y: 0,
          duration: reduceMotion() ? 0 : 0.3,
          ease,
        });
        gsap.to(lines[1], {
          rotation: 0,
          y: 0,
          duration: reduceMotion() ? 0 : 0.3,
          ease,
        });
      }
    }

    if (menu) {
      gsap.killTweensOf(menu);
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: reduceMotion() ? 0 : 0.3,
            ease,
            transformOrigin: "top center",
          },
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: reduceMotion() ? 0 : 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div
      className="pill-nav-container"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMobileMenuOpen) {
          toggleMobileMenu();
          hamburgerRef.current?.focus();
        }
      }}
    >
      <nav
        className={`pill-nav ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        {isRouterLink(items?.[0]?.href) ? (
          <Link
            className="pill-logo"
            href={items[0].href}
            aria-label={`${logoAlt} home`}

            ref={(el) => {
              logoRef.current = el;
            }}
          >
            <Image src={logo} alt="" aria-hidden="true" width={50} height={50} priority />
            <span className="nav-wordmark">
              SHINRAYA <small>TECH LABS</small>
            </span>
          </Link>
        ) : (
          <a
            className="pill-logo"
            href={items?.[0]?.href || "#"}
            aria-label={`${logoAlt} home`}

            ref={(el) => {
              logoRef.current = el;
            }}
          >
            <Image src={logo} alt="" aria-hidden="true" width={50} height={50} priority />
            <span className="nav-wordmark">
              SHINRAYA <small>TECH LABS</small>
            </span>
          </a>
        )}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list">
            {items.map((item, i) => (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={`pill${activeHref === item.href ? " is-active" : ""}`}
                    aria-label={item.ariaLabel || item.label}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    onMouseEnter={() => handleEnter(i)}
                    onFocus={() => handleEnter(i)}
                    onBlur={() => handleLeave(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`pill${activeHref === item.href ? " is-active" : ""}`}
                    aria-label={item.ariaLabel || item.label}
                    aria-current={activeHref === item.href ? "page" : undefined}
                    onMouseEnter={() => handleEnter(i)}
                    onFocus={() => handleEnter(i)}
                    onBlur={() => handleLeave(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle"
                      aria-hidden="true"
                      ref={(el) => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack">
                      <span className="pill-label">{item.label}</span>
                      <span className="pill-label-hover" aria-hidden="true">
                        {item.label}
                      </span>
                    </span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className="mobile-menu-popover mobile-only"
        ref={mobileMenuRef}
        style={cssVars}
        inert={!isMobileMenuOpen}
        aria-hidden={!isMobileMenuOpen}
      >
        <ul className="mobile-menu-list">
          {items.map((item) => (
            <li key={item.href}>
              {isRouterLink(item.href) ? (
                <Link
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                  aria-current={activeHref === item.href ? "page" : undefined}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
