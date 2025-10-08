'use client';

import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useTranslations } from '@/app/hooks/useTranslations';
import * as THREE from 'three';

// ActionButton Component
const ActionButton = ({ children, onClick, primary = true }: { children: React.ReactNode, onClick?: () => void, primary?: boolean }) => {
  const primaryClasses = `bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/30`;
  const secondaryClasses = `bg-white/10 backdrop-blur-sm text-cyan-200 border border-cyan-500/50 hover:bg-cyan-500/20`;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative z-10 flex h-12 items-center justify-center whitespace-nowrap rounded-lg 
                 px-8 text-base font-bold transition-all duration-300
                 ${primary ? primaryClasses : secondaryClasses}`}
    >
      <span className="truncate">{children}</span>
    </motion.button>
  );
};

// 3D Particles Component
const Particles = ({ count = 5000 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(state => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </instancedMesh>
  );
};

// Main Hero Section Component
const HeroSection = () => {
  const { t } = useTranslations();
  const heroContent = {
    title: t('mainpage.hero.title', 'Vibe Hub: The Developer Community for Creative Coding'),
    subtitle: t('mainpage.hero.subtitle', 'Discover and share innovative projects, reviews, and insights in modern AI-assisted development. Connect with fellow developers and explore the \'vibe\' of coding.'),
    primaryButtonText: t('mainpage.hero.primaryButtonText', 'Explore Projects'),
    secondaryButtonText: t('mainpage.hero.secondaryButtonText', 'Learn More'),
  };

  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="relative w-full h-[600px] bg-[#0a192f] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <div className="bg-black/20 backdrop-blur-md p-8 rounded-2xl max-w-4xl w-full shadow-2xl shadow-cyan-500/10 border border-white/10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            {heroContent.title}
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-blue-200/80"
          >
            {heroContent.subtitle}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ActionButton onClick={() => handleNavigation('/projects')}>{heroContent.primaryButtonText}</ActionButton>
            <ActionButton onClick={() => handleNavigation('/google/about')} primary={false}>{heroContent.secondaryButtonText}</ActionButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
