'use client';

import React, { Suspense, useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useTranslations } from '../../hooks/useTranslations';
import * as THREE from 'three';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import AdComponent from '../../components/AdComponent';

// ActionButton Component (from HeroSection)
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

// 3D Particles Component (from HeroSection)
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

const AboutUsPage = () => {
  const { t } = useTranslations();
  const [authChecked, setAuthChecked] = useState(false);
  const [redirectPath, setRedirectPath] = useState('/login');

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      // If user is already authenticated, redirect to home instead of login
      if (session) {
        setRedirectPath('/');
      }
      
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  // Hero section content for About page
  const heroContent = {
    title: t('policy.aboutUs.title', 'About Vibe Hub'),
    subtitle: t('policy.aboutUs.headline', 'Discover and share innovative projects, reviews, and insights in modern AI-assisted development. Connect with fellow developers and explore the vibe of coding.'),
    primaryButtonText: t('policy.aboutUs.joinUsButton', 'Join Community'),
    secondaryButtonText: t('mainpage.hero.secondaryButtonText', 'Learn More'),
  };

  const handleNavigation = () => {
    // Only navigate if auth has been checked
    if (authChecked) {
      window.location.href = redirectPath;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
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
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(0,255,255,0.5)] text-center leading-tight"
            >
              {heroContent.title}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-4 text-base sm:text-lg md:text-xl text-blue-200/80 text-center leading-relaxed px-4"
            >
              {heroContent.subtitle}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex flex-col items-center justify-center gap-4"
            >
              <ActionButton onClick={handleNavigation}>
                {t('policy.aboutUs.joinUsButton', 'Join Community')}
              </ActionButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 mt-20 bg-gray-900">
        {/* Mission Section */}
        <motion.section 
          className="my-16 text-center bg-white p-6 sm:p-8 md:p-10 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">{t('Vibe Hub')}</h2>
          <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto text-gray-700 px-4 leading-relaxed">
            {t('policy.aboutUs.missionText', 'Our mission is to create a vibrant community where developers can share their experiences, exchange knowledge, and connect with others who share their passion for coding.')}
          </p>
        </motion.section>

        {/* What We Offer Section */}
        <motion.section 
          className="my-20 bg-white p-6 sm:p-8 md:p-10 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900">{t('policy.aboutUs.whatWeOffer')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-4xl sm:text-5xl text-cyan-600 mx-auto mb-3 sm:mb-4">💻</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{t('policy.aboutUs.projectShowcases')}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">{t('policy.aboutUs.projectShowcasesText', 'Share your projects and discover what others are building.')}</p>
            </div>
            <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-4xl sm:text-5xl text-purple-600 mx-auto mb-3 sm:mb-4">👥</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{t('policy.aboutUs.communityLounge')}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">{t('policy.aboutUs.communityLoungeText', 'Connect with fellow developers in our community lounge.')}</p>
            </div>
            <div className="text-center p-4 sm:p-5 md:p-6 bg-gray-50 rounded-xl shadow-lg">
              <div className="text-4xl sm:text-5xl text-green-600 mx-auto mb-3 sm:mb-4">🛠️</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900">{t('policy.aboutUs.gearReviews')}</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">{t('policy.aboutUs.gearReviewsText', 'Review and discover the tools and technologies that power development.')}</p>
            </div>
          </div>
        </motion.section>

        {/* Our Team Section */}
        <motion.section 
          className="my-20 bg-white p-6 sm:p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-900">{t('policy.aboutUs.ourTeam')}</h2>
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <img 
              src="/images/200.svg" 
              alt="Team" 
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-md border-2 border-cyan-500"
              width={112}
              height={112}
            />
            <div className="max-w-2xl px-4">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                {t('policy.aboutUs.ourTeamText', 'We are passionate developers and designers who believe in the power of community. Our team works tirelessly to create a space where developers can thrive and share their experiences.')}
              </p>
              <p className="font-semibold text-base sm:text-lg text-cyan-700">Jason, Founder & Lead Developer</p>
            </div>
          </div>
        </motion.section>

        {/* Contact Us Section */}
        <motion.section 
          className="text-center my-16 bg-white p-6 sm:p-8 md:p-10 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-cyan-700">{t('policy.aboutUs.contactUs')}</h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-700 mb-6 sm:mb-8 px-4 leading-relaxed">
            {t('policy.aboutUs.contactUsText') === 'policy.aboutUs.contactUsText' 
              ? 'Have questions or feedback? We\'d love to hear from you!' 
              : t('policy.aboutUs.contactUsText')}
          </p>
          <Link href="/community" className="inline-block">
            <ActionButton primary={false}>
              {t('policy.aboutUs.contactUsButton') === 'policy.aboutUs.contactUsButton' 
                ? (t('policy.aboutUs.contactUs') === 'policy.aboutUs.contactUs' 
                  ? 'Contact Us' 
                  : t('policy.aboutUs.contactUs'))
                : t('policy.aboutUs.contactUsButton')}
            </ActionButton>
          </Link>
        </motion.section>
        
        {/* Ad Component */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-gray-100 p-4 rounded-xl text-center">
            <AdComponent 
              adSlot="7287287287"  // This is a placeholder slot ID
              adFormat="auto"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;