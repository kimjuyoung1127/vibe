"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import VibeFlowBackground from '@/app/components/VibeFlowBackground';

const ActionButton = ({ children, onClick, primary = true }: { children: React.ReactNode, onClick?: () => void, primary?: boolean }) => {
  const primaryClasses = `bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30`;
  const secondaryClasses = `bg-black/30 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/10`;

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
    title: "VibeHub: The Home of Vibe Coding",
    subtitle: "Discover, promote, and master the revolutionary approach of AI-assisted development where intent drives code rather than syntax.",
    primaryButtonText: "Share Your Vibe Project",
    secondaryButtonText: "Explore Vibe Coding",
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="p-4 bg-gradient-to-br from-[#0a192f] via-[#0f2747] to-[#0a192f] overflow-hidden w-full max-w-full">
      <div className="relative flex min-h-[400px] sm:min-h-[500px] flex-col items-start justify-end gap-6 sm:gap-8
                      overflow-hidden rounded-xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/20 max-w-full w-full">
        
        {/* Three.js Canvas Background */}
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            dpr={[1, 2]}
            style={{ background: 'radial-gradient(circle at center, #0a192f, #000)' }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <VibeFlowBackground
                lineColor="#06b6d4"
                nodeColor="#0ea5e9"
                trailColor="#3b82f6"
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1] w-full h-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4 text-left max-w-full w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-extrabold leading-tight text-cyan-200 drop-shadow-[0_0_12px_#06b6d4] max-w-full break-words"
          >
            {heroContent.title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-full text-sm sm:text-base text-blue-200 drop-shadow max-w-full break-words"
          >
            {heroContent.subtitle}
          </motion.h2>
        </div>
        
        {/* Call-to-action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex flex-col gap-3 sm:gap-4 w-full max-w-xs sm:max-w-full"
        >
          <ActionButton onClick={() => handleNavigation('/projects/create')}>{heroContent.primaryButtonText}</ActionButton>
          <ActionButton onClick={() => handleNavigation('/projects')} primary={false}>{heroContent.secondaryButtonText}</ActionButton>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
