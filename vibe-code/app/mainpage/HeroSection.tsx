"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import VibeFlowBackground from '@/app/components/VibeFlowBackground';

const ActionButton = ({ children, onClick, primary = true }: { children: React.ReactNode, onClick?: () => void, primary?: boolean }) => {
  const primaryClasses = `bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/30`;
  const secondaryClasses = `bg-black/30 text-sky-300 border border-sky-500/50 hover:bg-sky-500/10`;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative z-10 flex h-12 items-center justify-center whitespace-nowrap rounded-lg 
                 px-6 text-base font-semibold ring-1 ring-white/20 transition-colors
                 ${primary ? primaryClasses : secondaryClasses}`}
    >
      <span className="truncate">{children}</span>
    </motion.button>
  );
};

const HeroSection = () => {
  const heroContent = {
    title: "VibeHub: Your Developer Playground",
    subtitle: "From side projects and gear reviews to coding tips. Share your developer journey and get inspired.",
    primaryButtonText: "Showcase Your Project",
    secondaryButtonText: "Explore Projects",
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="p-4 @container md:p-6 lg:p-8 
                    bg-gradient-to-br from-[#0a192f] via-[#0f2747] to-[#0a192f]">
      <div className="relative flex min-h-[500px] flex-col items-start justify-end gap-8
                      overflow-hidden rounded-xl p-8 shadow-2xl shadow-blue-500/20">
        
        {/* Three.js Canvas Background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            dpr={[1, 2]}
            style={{ background: 'radial-gradient(circle at center, #0a192f, #000)' }}
          >
            <Suspense fallback={null}>
              <VibeFlowBackground
                lineColor="#38bdf8"
                nodeColor="#0ea5e9"
                trailColor="#3b82f6"
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-4 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold leading-tight text-sky-200 drop-shadow-[0_0_12px_#38bdf8] @[480px]:text-5xl"
          >
            {heroContent.title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl text-base text-blue-200 drop-shadow @[480px]:text-lg"
          >
            {heroContent.subtitle}
          </motion.h2>
        </div>
        
        {/* Call-to-action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex flex-col gap-4 @[480px]:flex-row"
        >
          <ActionButton onClick={() => handleNavigation('/projects/create')}>{heroContent.primaryButtonText}</ActionButton>
          <ActionButton onClick={() => handleNavigation('/projects')} primary={false}>{heroContent.secondaryButtonText}</ActionButton>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
