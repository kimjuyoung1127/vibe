'use client';

import React from 'react';
import HeroSection from './HeroSection';
import LatestProjects from './LatestProjects';
import VibeNews from './VibeNews';
import WeeklyVibeRanking from './WeeklyVibeRanking';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <HeroSection />
      
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              The Premier Platform for Vibe Coding
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              VibeHub is the ultimate destination to explore, share, and promote the revolutionary approach 
              of Vibe Coding - where developers focus on intent and meaning rather than exact syntax.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LatestProjects />
            </div>
            <div className="lg:col-span-1 space-y-8">
              <WeeklyVibeRanking />
              <VibeNews />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Vibe Coding Revolution
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              Discover how Vibe Coding is transforming the developer experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">01</div>
              <h3 className="text-xl font-bold mb-2">Intent-Driven Development</h3>
              <p>Focus on what you want to achieve rather than how to implement it. Let AI handle the detailed implementation.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">02</div>
              <h3 className="text-xl font-bold mb-2">Community Learning</h3>
              <p>Learn from the community's prompt engineering and debugging workflows. Share your experiences to help others grow.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">03</div>
              <h3 className="text-xl font-bold mb-2">AI Partnership</h3>
              <p>Transform your role from code writer to code director. Leverage AI as your pair programmer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Why Vibe Coding Changes Everything
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Join thousands of developers already embracing the future of software development
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl w-48 h-48 flex items-center justify-center">
                  <span className="text-white text-6xl">📊</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  From Syntax to Semantics
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Vibe Coding shifts the focus from getting syntax right to articulating your intent. 
                  Instead of memorizing API calls, you describe what you want to achieve and work 
                  with AI to refine the implementation.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  This approach allows you to learn and build faster while developing stronger 
                  problem-solving skills and better architectural understanding.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-48 h-48 flex items-center justify-center">
                  <span className="text-white text-6xl">🚀</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  Promote Your Vibe Coding Journey
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Share your Vibe Coding experiences, workflows, and projects on VibeHub. 
                  Showcase how you're leveraging AI tools to revolutionize your development process.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  Connect with like-minded developers who are pushing the boundaries of 
                  traditional coding approaches. Build your reputation as a Vibe Coding expert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-r from-cyan-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Vibe Coding Revolution?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Share your projects, discover new tools, and connect with developers reshaping the future of software development
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/projects/create'}
              className="bg-white text-cyan-700 hover:bg-cyan-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Share Your Project
            </button>
            <button 
              onClick={() => window.location.href = '/projects'}
              className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Explore Projects
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;