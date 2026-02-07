import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import ParticlesBackground from "./components/ParticlesBackground";
import Dock from "./components/Dock";
import HomeView from "./components/views/HomeView";
import AboutView from "./components/views/AboutView";
import ProjectsView from "./components/views/ProjectsView";
import BlogsView from "./components/views/BlogsView";
import ContactView from "./components/views/ContactView";
import StructuredData from "./components/StructuredData";
import { Tab } from "./types";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const titles: Record<Tab, string> = {
      [Tab.Home]: "Software Architect & AI Engineer",
      [Tab.About]: "About | Gedion Teshome Disassa",
      [Tab.Projects]: "Work & Systems | Gedion Disassa",
      [Tab.Blogs]: "Logs & Research | Gedion Disassa",
      [Tab.Contact]: "Connect | Protocol Initiation"
    };
    document.title = `Gedion Disassa | ${titles[activeTab]}`;
  }, [activeTab]);


  const pageVariants = {
    initial: { opacity: 0, y: 30, rotateX: 10, scale: 0.95, filter: "blur(10px)" },
    in: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" },
    out: { opacity: 0, y: -30, rotateX: -10, scale: 0.95, filter: "blur(10px)" },
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home: return <HomeView onChangeTab={setActiveTab} />;
      case Tab.About: return <AboutView />;
      case Tab.Projects: return <ProjectsView />;
      case Tab.Blogs: return <BlogsView />;
      case Tab.Contact: return <ContactView />;
      default: return <HomeView onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="relative w-full h-screen perspective-container selection:bg-blue-500/30 bg-[#030712]">
      <StructuredData />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 z-[100] origin-left shadow-[0_0_20px_rgba(59,130,246,0.6)]"
        style={{ scaleX }}
      />

      <ParticlesBackground />

      <main className="relative z-10 w-full h-full pt-12 pb-32 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="max-w-7xl mx-auto px-6 flex justify-center min-h-[85vh] items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={{ type: "spring", duration: 0.8, bounce: 0.1 }}
              className="w-full flex justify-center"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Dock activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;