import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import ParticlesBackground from "./components/magicui/ParticlesBackground";

import Dock from "./components/magicui/Dock";
import { SmoothCursor } from "./components/magicui/SmoothCursor";
import { DotPattern } from "./components/magicui/DotPattern";

import StructuredData from "./components/StructuredData";
import { routes } from "./routes";


function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 30, rotateX: 10, scale: 0.95, filter: "blur(10px)" },
    in: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" },
    out: { opacity: 0, y: -30, rotateX: -10, scale: 0.95, filter: "blur(10px)" },
  };

  return (
    <AnimatePresence mode="wait">
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
                variants={pageVariants}
                transition={{ type: "spring", duration: 0.8, bounce: 0.1 }}
                className="w-full flex justify-center"
              >
                {element}
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

// ---- Main App ----
function App() {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="relative w-full h-screen perspective-container selection:bg-blue-500/30 bg-[#030712]">
          <StructuredData />
          <SmoothCursor />

          {/* Background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
          </div>

          <ParticlesBackground />

          {/* Content */}
          <main className="relative z-10 w-full h-full pt-12 pb-32 overflow-y-auto overflow-x-hidden scroll-smooth">
            <div className="max-w-7xl mx-auto px-6 flex justify-center min-h-[85vh] items-center">
              <AnimatedRoutes />
            </div>
          </main>

          {/* Dock stays global */}
          <Dock />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
