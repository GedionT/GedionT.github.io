import React, { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp } from "lucide-react";

import Dock from "./components/magicui/Dock";
import { SmoothCursor } from "./components/magicui/SmoothCursor";
import { DotPattern } from "./components/magicui/DotPattern";

import StructuredData from "./components/StructuredData";
import { routes } from "./routes";

const ParticlesBackground = React.lazy(() => import("./components/magicui/ParticlesBackground"));

type SectionRoute = {
  path: string;
  label: string;
};

type ScrollTarget = "top" | "bottom";

type RouteTransitionState = {
  routeDirection?: number;
};

const SECTION_ROUTES: SectionRoute[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Work" },
  { path: "/blogs", label: "Logs" },
  { path: "/contact", label: "Connect" },
];

const getSectionIndex = (pathname: string) =>
  SECTION_ROUTES.findIndex((section) => section.path === pathname);

const RouteScrollAligner: React.FC<{
  onRouteReady: () => void | (() => void);
}> = ({ onRouteReady }) => {
  useLayoutEffect(() => onRouteReady(), [onRouteReady]);
  return null;
};

function AnimatedRoutes({ onRouteReady }: { onRouteReady: () => void | (() => void) }) {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const routeState = location.state as RouteTransitionState | null;
  const routeDirection = routeState?.routeDirection ?? 1;

  const pageVariants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? 34 : -34,
      rotateX: direction > 0 ? 8 : -8,
      scale: 0.96,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    }),
    in: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" },
    out: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? -34 : 34,
      rotateX: direction > 0 ? -8 : 8,
      scale: 0.96,
      filter: prefersReducedMotion ? "blur(0px)" : "blur(10px)",
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={routeDirection}>
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                custom={routeDirection}
                variants={pageVariants}
                transition={{
                  type: "spring",
                  duration: prefersReducedMotion ? 0.01 : 0.8,
                  bounce: prefersReducedMotion ? 0 : 0.1,
                }}
                className="w-full flex justify-center"
              >
                <RouteScrollAligner onRouteReady={onRouteReady} />
                <Suspense fallback={null}>{element}</Suspense>
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

const RouteJumpControls: React.FC<{
  previousSection: SectionRoute | null;
  nextSection: SectionRoute | null;
  onNavigate: (section: SectionRoute, target: ScrollTarget) => void;
}> = ({ previousSection, nextSection, onNavigate }) => {
  if (!previousSection && !nextSection) return null;

  return (
    <div className="fixed right-4 sm:right-6 bottom-32 sm:bottom-36 z-40 flex flex-col gap-2 pointer-events-none">
      {previousSection && (
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate(previousSection, "bottom")}
          className="pointer-events-auto inline-flex items-center justify-center sm:justify-start gap-2 min-h-11 rounded-full border border-slate-200 bg-white/85 px-3 sm:px-4 text-[10px] font-black uppercase tracking-widest text-slate-600 shadow-xl shadow-slate-200/40 backdrop-blur-2xl transition-colors hover:border-blue-200 hover:text-blue-600"
          aria-label={`Previous page: ${previousSection.label}`}
          title={`Previous: ${previousSection.label}`}
        >
          <ArrowUp size={15} />
          <span className="hidden sm:inline">Prev: {previousSection.label}</span>
        </motion.button>
      )}

      {nextSection && (
        <motion.button
          type="button"
          whileHover={{ y: 2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onNavigate(nextSection, "top")}
          className="pointer-events-auto inline-flex items-center justify-center sm:justify-start gap-2 min-h-11 rounded-full border border-slate-900 bg-slate-900 px-3 sm:px-4 text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/20 backdrop-blur-2xl transition-colors hover:bg-blue-600 hover:border-blue-600"
          aria-label={`Next page: ${nextSection.label}`}
          title={`Next: ${nextSection.label}`}
        >
          <ArrowDown size={15} />
          <span className="hidden sm:inline">Next: {nextSection.label}</span>
        </motion.button>
      )}
    </div>
  );
};

const PortfolioFrame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const pendingScrollTargetRef = useRef<ScrollTarget>("top");
  const scrollAlignmentIdRef = useRef(0);
  const lastBoundaryNavigationAtRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const activeSectionIndex = useMemo(() => getSectionIndex(location.pathname), [location.pathname]);
  const previousSection = activeSectionIndex > 0 ? SECTION_ROUTES[activeSectionIndex - 1] : null;
  const nextSection =
    activeSectionIndex >= 0 && activeSectionIndex < SECTION_ROUTES.length - 1
      ? SECTION_ROUTES[activeSectionIndex + 1]
      : null;

  const alignRouteScroll = useCallback(() => {
    const main = mainRef.current;
    if (!main) return;

    const alignmentId = scrollAlignmentIdRef.current + 1;
    scrollAlignmentIdRef.current = alignmentId;
    const scrollTarget = pendingScrollTargetRef.current;

    const alignRoute = () => {
      main.scrollTop = scrollTarget === "bottom"
        ? Math.max(main.scrollHeight - main.clientHeight, 0)
        : 0;
    };

    alignRoute();
    const frameId = window.requestAnimationFrame(alignRoute);
    const timeoutId = window.setTimeout(alignRoute, 250);
    const resetId = window.setTimeout(() => {
      if (scrollAlignmentIdRef.current === alignmentId) {
        pendingScrollTargetRef.current = "top";
      }
    }, 900);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(resetId);
    };
  }, []);

  const navigateToSection = useCallback(
    (section: SectionRoute, target: ScrollTarget) => {
      const main = mainRef.current;

      if (section.path === location.pathname) {
        main?.scrollTo({
          top: target === "bottom" ? Math.max(main.scrollHeight - main.clientHeight, 0) : 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }

      const destinationIndex = getSectionIndex(section.path);
      const routeDirection =
        activeSectionIndex >= 0 && destinationIndex >= 0 && destinationIndex < activeSectionIndex
          ? -1
          : 1;

      pendingScrollTargetRef.current = target;
      navigate(section.path, { state: { routeDirection } });
    },
    [activeSectionIndex, location.pathname, navigate, prefersReducedMotion],
  );

  const triggerBoundaryNavigation = useCallback(
    (section: SectionRoute | null, target: ScrollTarget) => {
      if (!section) return false;

      const now = window.performance.now();
      if (now - lastBoundaryNavigationAtRef.current < 950) return false;

      lastBoundaryNavigationAtRef.current = now;
      navigateToSection(section, target);
      return true;
    },
    [navigateToSection],
  );

  useEffect(() => {
    const main = mainRef.current;
    if (!main || activeSectionIndex === -1) return;

    const edgeEpsilon = 8;
    const wheelThreshold = 18;

    const handleWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      const scrollableDistance = Math.max(main.scrollHeight - main.clientHeight, 0);
      const atTop = main.scrollTop <= edgeEpsilon;
      const atBottom = scrollableDistance - main.scrollTop <= edgeEpsilon;

      if (event.deltaY > wheelThreshold && atBottom) {
        if (triggerBoundaryNavigation(nextSection, "top")) event.preventDefault();
        return;
      }

      if (event.deltaY < -wheelThreshold && atTop) {
        if (triggerBoundaryNavigation(previousSection, "bottom")) event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY;
      touchStartYRef.current = null;

      if (startY === null || endY === undefined) return;

      const deltaY = startY - endY;
      if (Math.abs(deltaY) < 70) return;

      const scrollableDistance = Math.max(main.scrollHeight - main.clientHeight, 0);
      const atTop = main.scrollTop <= edgeEpsilon;
      const atBottom = scrollableDistance - main.scrollTop <= edgeEpsilon;

      if (deltaY > 0 && atBottom) {
        triggerBoundaryNavigation(nextSection, "top");
      }

      if (deltaY < 0 && atTop) {
        triggerBoundaryNavigation(previousSection, "bottom");
      }
    };

    main.addEventListener("wheel", handleWheel, { passive: false });
    main.addEventListener("touchstart", handleTouchStart, { passive: true });
    main.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      main.removeEventListener("wheel", handleWheel);
      main.removeEventListener("touchstart", handleTouchStart);
      main.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeSectionIndex, nextSection, previousSection, triggerBoundaryNavigation]);

  return (
    <>
      <main
        ref={mainRef}
        className="relative z-10 w-full h-full pt-12 pb-32 overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-center min-h-[85vh] items-center">
          <AnimatedRoutes onRouteReady={alignRouteScroll} />
        </div>
      </main>

      <RouteJumpControls
        previousSection={previousSection}
        nextSection={nextSection}
        onNavigate={navigateToSection}
      />
    </>
  );
};

// ---- Main App ----
function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;

  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <div className="relative w-full h-screen perspective-container selection:bg-blue-500/30 bg-[#030712]">
          <StructuredData />
          <SmoothCursor />

          {/* Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          </div>

          <Suspense fallback={null}>
            <ParticlesBackground />
          </Suspense>

          <PortfolioFrame />

          {/* Dock stays global */}
          <Dock />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
