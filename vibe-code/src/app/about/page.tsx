'use client';

import React from 'react';
import Link from 'next/link';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1122] text-white">
      <main className="flex flex-1 flex-col items-center py-10 px-4 sm:px-10">
        <div className="w-full max-w-5xl">
          <div className="@container">
            <div 
              className="relative flex min-h-[480px] flex-col gap-6 items-center justify-center p-8 rounded-lg overflow-hidden neon-border glass-effect"
              style={{ 
                backgroundImage: 'linear-gradient(rgba(26, 17, 34, 0.8) 0%, rgba(26, 17, 34, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuACT8JuZWcUbUlY4HPM1067Eo4yXxMmcf68wzek7Q3k1t6-qJDxXkluPzuU0NY0RBhRYh4YlhwUf2IpWfeA-NyLy6_iy3uvADh15MOPzgWeR6DQBCTIxJGUR5D93-U2Zb3uiMRQlrb_yHN8Toif7A9D-aN8m1hUVOwRXQVaroNvj709v6qreBVl3KjDhh1JflnvIlD0MnfE8TLHSMlpVA2fHBsQGdogY2a_TWDAVxJKei6dsE20s7lG6h7QYOS4Qu8Q_MW0U9kJmyA")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-[#1a1122] opacity-70"></div>
              <div className="relative flex flex-col gap-6 text-center z-10">
                <h1 className="text-5xl font-black tracking-tighter text-glow cyber-heading">
                  About Vibe Code
                </h1>
                <p className="text-lg font-normal leading-relaxed max-w-2xl mx-auto text-gray-300 font-modern">
                  Vibe Code is a community for developers who appreciate the aesthetic and environment of coding. We share project experiences in a cyberpunk neon retro style,
                  discuss the latest technologies, and connect with like-minded individuals.
                </p>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#8013ec] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#9233ff] transition-all duration-300 self-center mt-4 neon-glow btn-neon font-heading">
                  <span className="truncate">Join the Community</span>
                </button>
              </div>
            </div>
          </div>
          <section className="py-16 px-4">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-4 text-glow cyber-heading">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto font-modern">
              Our mission is to create a vibrant and inspiring space where developers can express their creativity, share their passion for coding, and connect with others who
              share their vision. We believe that the environment in which we code can significantly impact our work and our well-being, and we strive to cultivate a community that
              values both technical excellence and aesthetic appreciation.
            </p>
          </section>
          <section className="py-16 px-4">
            <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-glow cyber-heading">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center gap-4 rounded-lg border border-[#4d3267] bg-[#261933] p-8 transform hover:-translate-y-2 transition-transform duration-300 hover:neon-border glass-effect">
                <div className="text-[#8013ec] mb-4" data-icon="Code" data-size="48px" data-weight="regular">
                  <svg fill="currentColor" height="48px" viewBox="0 0 256 256" width="48px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold cyber-heading">Creativity</h3>
                <p className="text-gray-400 font-modern">From the code we write to the environments we create, we celebrate artistic expression in all its forms.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-4 rounded-lg border border-[#4d3267] bg-[#261933] p-8 transform hover:-translate-y-2 transition-transform duration-300 hover:neon-border glass-effect">
                <div className="text-[#8013ec] mb-4" data-icon="Users" data-size="48px" data-weight="regular">
                  <svg fill="currentColor" height="48px" viewBox="0 0 256 256" width="48px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold cyber-heading">Community</h3>
                <p className="text-gray-400 font-modern">We foster a strong sense of community, where everyone feels welcome, respected, and supported.</p>
              </div>
              <div className="flex flex-col items-center text-center gap-4 rounded-lg border border-[#4d3267] bg-[#261933] p-8 transform hover:-translate-y-2 transition-transform duration-300 hover:neon-border glass-effect">
                <div className="text-[#8013ec] mb-4" data-icon="Lightbulb" data-size="48px" data-weight="regular">
                  <svg fill="currentColor" height="48px" viewBox="0 0 256 256" width="48px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Zm-16,0a72,72,0,0,0-73.74-72c-39,.92-70.47,33.39-70.26,72.39a71.65,71.65,0,0,0,27.64,56.3A32,32,0,0,1,96,186v6h64v-6a32.15,32.15,0,0,1,12.47-25.35A71.65,71.65,0,0,0,200,104Zm-16.11-9.34a57.6,57.6,0,0,0-46.56-46.55,8,8,0,0,0-2.66,15.78c16.57,2.79,30.63,16.85,33.44,33.45A8,8,0,0,0,176,104a9,9,0,0,0,1.35-.11A8,8,0,0,0,183.89,94.66Z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold cyber-heading">Innovation</h3>
                <p className="text-gray-400 font-modern">We embrace innovation, constantly exploring new technologies and ideas to push the boundaries of what's possible.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full border-t border-solid border-[#362348] mt-10">
        <div className="max-w-5xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[#ad92c9] text-sm">© 2024 Vibe Code. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm">
            <Link href="/terms" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Terms of Service</Link>
            <Link href="#" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link href="#" className="text-[#ad92c9] hover:text-white transition-colors duration-300">Contact Us</Link>
          </div>
          <div className="flex justify-center gap-6">
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="TwitterLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="GithubLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
                </svg>
              </div>
            </Link>
            <Link href="#" className="text-[#ad92c9] hover:text-[#8013ec] transition-colors duration-300">
              <div data-icon="DiscordLogo" data-size="24px" data-weight="regular">
                <svg fill="currentColor" height="24px" viewBox="0 0 256 256" width="24px" xmlns="http://www.w3.org/2000/svg">
                  <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;