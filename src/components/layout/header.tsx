"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, simpleNav, servicesMegaMenu } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-5"
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-5 py-2.5 transition-all duration-500",
            scrolled
              ? "border-white/[0.07] bg-[#050505]/85 backdrop-blur-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
              : "border-white/[0.05] bg-white/[0.02] backdrop-blur-xl"
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) =>
              item.label === "Services" ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </Link>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-1/2 top-full z-50 mt-4 w-[780px] -translate-x-1/2"
                      >
                        <div className="glass-strong rounded-2xl p-6 shadow-2xl shadow-black/60">
                          <div className="grid grid-cols-4 gap-6">
                            {servicesMegaMenu.map((group) => (
                              <div key={group.id}>
                                <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                                  {group.label}
                                </p>
                                <div className="flex flex-col">
                                  {group.items.map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services#${service.slug}`}
                                      className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-white/50 transition-all duration-150 hover:bg-white/[0.04] hover:text-white"
                                    >
                                      <service.icon className="size-3.5 shrink-0 text-magenta-soft/70" />
                                      <span className="leading-tight">{service.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] px-1 pt-4">
                            <p className="text-xs text-white/25">19 services across 4 practice areas</p>
                            <Link href="/services" className="text-xs font-semibold text-magenta-soft transition-colors hover:text-white">
                              View all services →
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              className="h-9 px-4 text-sm font-medium text-white/50 hover:bg-white/[0.04] hover:text-white"
              asChild
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <Button
              className="h-9 gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 px-5 text-sm font-semibold text-white glow-magenta-sm transition-all duration-300 hover:from-fuchsia-500 hover:to-violet-500"
              asChild
            >
              <Link href="/contact">
                Book a Call
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 rounded-xl text-white/60 hover:bg-white/[0.04] hover:text-white lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full overflow-y-auto border-l border-white/[0.07] bg-[#050505] sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1 px-2">
                {simpleNav.map((item) =>
                  item.label === "Services" ? (
                    <div key={item.href}>
                      <button
                        type="button"
                        onClick={() => setMobileServicesOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                      >
                        Services
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform duration-200",
                            mobileServicesOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-3"
                          >
                            {servicesMegaMenu.map((group) => (
                              <div key={group.id} className="py-2">
                                <p className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                                  {group.label}
                                </p>
                                {group.items.map((service) => (
                                  <SheetClose asChild key={service.slug}>
                                    <Link
                                      href={`/services#${service.slug}`}
                                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white"
                                    >
                                      <service.icon className="size-4 text-magenta-soft/60" />
                                      {service.name}
                                    </Link>
                                  </SheetClose>
                                ))}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-xl px-4 py-3.5 text-base font-semibold text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  )
                )}
              </div>

              <div className="mt-auto flex flex-col gap-3 p-4 pt-8">
                <SheetClose asChild>
                  <Button
                    className="h-12 w-full gap-1.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-sm font-semibold text-white glow-magenta-sm"
                    asChild
                  >
                    <Link href="/contact">
                      Book a Call
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
