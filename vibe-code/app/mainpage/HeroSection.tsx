"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import VibeFlowBackground from '@/app/components/VibeFlowBackground';

const ActionButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative z-10 flex h-12 items-center justify-center whitespace-nowrap rounded-lg 
                 bg-gradient-to-r from-sky-500 to-blue-600
                 px-6 text-base font-semibold text-white shadow-lg shadow-blue-500/30 
                 ring-1 ring-white/20 transition-colors hover:opacity-90"
    >
      <span className="truncate">{children}</span>
    </motion.button>
  );
};

const HeroSection = () => {
  const heroContent = {
    title: "Your Code, Your Vibe.",
    subtitle: "A futuristic hub for coders to share, connect, and inspire.",
    buttonText: "Share My Vibe",
  };

  const handleExploreClick = () => {
    window.location.href = '/projects';
  };

  return (
    <div className="p-4 @container md:p-6 lg:p-8 
                    bg-gradient-to-br from-[#0a192f] via-[#0f2747] to-[#0a192f]">
      <div className="relative flex min-h-[500px] flex-col items-start justify-end gap-6 
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
                lineColor="#38bdf8"   // 밝은 하늘색 라인
                nodeColor="#0ea5e9"   // 블루톤 노드
                trailColor="#3b82f6"  // 푸른 꼬리
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
            className="text-4xl font-extrabold text-sky-200 drop-shadow-[0_0_12px_#38bdf8] @[480px]:text-5xl"
          >
            {heroContent.title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-xl text-base text-blue-200 drop-shadow @[480px]:text-lg"
          >
            {heroContent.subtitle}
          </motion.h2>
        </div>
        
        {/* Call-to-action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ActionButton onClick={handleExploreClick}>{heroContent.buttonText}</ActionButton>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;