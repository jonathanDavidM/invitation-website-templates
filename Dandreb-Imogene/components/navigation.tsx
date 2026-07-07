"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Menu } from "lucide-react";
import { couple } from "@/content/couple";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Gallery", href: "#gallery" },
  { label: "Schedule", href: "#schedule" },
  { label: "Venue", href: "#venues" },
  { label: "Attire", href: "#dress-code" },
  { label: "FAQ", href: "#faq" },
] as const;

const RSVP_LINK = { label: "RSVP", href: "#rsvp" } as const;

const SECTION_IDS = [...NAV_LINKS, RSVP_LINK].map((link) =>
  link.href.slice(1),
);

/**
 * Floating glass navigation: transparent over the dark hero, frosted ivory
 * once scrolled, with a 2px gold scroll-progress hairline across the top.
 */
export function Navigation() {
  const reduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("hero");

  // Glass state flips once the hero (~80% of the viewport) is scrolled past.
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > window.innerHeight * 0.8);
  });

  // Handle loading mid-page (e.g. arriving via a #hash link).
  React.useEffect(() => {
    setScrolled(window.scrollY > window.innerHeight * 0.8);
  }, []);

  // Passive active-section tracking for the desktop links.
  React.useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // If the viewport grows past md while the drawer is open, close it.
  React.useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  // Close the drawer first, then scroll — Radix's scroll lock would swallow
  // the anchor jump if we let the default navigation run while it's open.
  const handleDrawerNav = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      setOpen(false);
      window.setTimeout(() => {
        document
          .querySelector(href)
          ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        window.history.replaceState(null, "", href);
      }, 250);
    },
    [reduceMotion],
  );

  // The global focus ring is deep green — invisible over the dark hero.
  const focusRing = scrolled
    ? "focus-visible:outline-ring"
    : "focus-visible:outline-forest-foreground";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 text-foreground shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-forest-foreground",
      )}
    >
      {/* Gold scroll-progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
      />

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-8">
        {/* Monogram — back to top */}
        <a
          href="#hero"
          className={cn(
            "flex min-h-11 items-center focus-visible:outline-2 focus-visible:outline-offset-2",
            focusRing,
          )}
        >
          <Image
            src="/images/monogram.png"
            alt=""
            width={487}
            height={440}
            priority
            className={cn(
              "h-12 w-auto transition duration-300 md:h-16",
              // Black line-art: invert to cream over the dark hero, natural on the frosted nav.
              !scrolled && "invert",
            )}
          />
          <span className="sr-only">{couple.shortNames} — back to top</span>
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href.slice(1) ? "true" : undefined}
              className={cn(
                "px-1 py-2 text-caption font-semibold tracking-wide decoration-accent decoration-1 underline-offset-8 transition-colors duration-200 hover:underline",
                active === href.slice(1) && "underline",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                focusRing,
              )}
            >
              {label}
            </a>
          ))}
          <a
            href={RSVP_LINK.href}
            className={cn(
              buttonVariants({
                variant: scrolled ? "gold" : "outline-light",
                size: "sm",
              }),
              "rounded-full",
            )}
          >
            {RSVP_LINK.label}
          </a>
        </nav>

        {/* Mobile drawer */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors duration-200 md:hidden",
                scrolled ? "hover:bg-secondary" : "hover:bg-forest-foreground/10",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                focusRing,
              )}
            >
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </DialogTrigger>

          <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
              aria-describedby={undefined}
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col bg-forest text-forest-foreground shadow-lg outline-none sm:max-w-sm sm:border-l sm:border-forest-foreground/10",
                "data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=open]:duration-300",
                "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=closed]:duration-200",
              )}
            >
              <DialogTitle className="sr-only">
                Menu — {couple.shortNames}
              </DialogTitle>
              <DialogCloseButton />

              <div className="flex h-16 items-center px-6">
                {/* On the dark forest drawer, invert the black art to cream. */}
                <Image
                  src="/images/monogram.png"
                  alt=""
                  width={487}
                  height={440}
                  className="h-14 w-auto invert"
                />
              </div>

              <motion.nav
                aria-label="Menu"
                variants={staggerContainer(0.06, 0.1)}
                initial={reduceMotion ? false : "hidden"}
                animate="visible"
                className="flex flex-1 flex-col justify-center gap-2 px-8"
              >
                {[...NAV_LINKS, RSVP_LINK].map(({ label, href }) => (
                  <motion.a
                    key={href}
                    variants={fadeUp}
                    href={href}
                    onClick={(event) => handleDrawerNav(event, href)}
                    className={cn(
                      "flex min-h-11 items-center font-serif text-title font-semibold transition-colors duration-200 hover:text-accent",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-foreground",
                      href === RSVP_LINK.href
                        ? "text-accent"
                        : "text-forest-foreground",
                    )}
                  >
                    {label}
                  </motion.a>
                ))}
              </motion.nav>

              <div className="space-y-4 px-8 pb-10">
                <div aria-hidden="true" className="hairline-gold w-16" />
                <p className="text-caption text-forest-muted">
                  {couple.dateLabel} · {couple.location}
                </p>
                <p className="text-caption uppercase tracking-[0.25em] text-accent">
                  {couple.hashtag}
                </p>
              </div>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
      </div>
    </header>
  );
}
