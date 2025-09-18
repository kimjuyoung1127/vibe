'use client';

import React from 'react';
import Link from 'next/link';

const ProfilePage = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 flex flex-1 justify-center pt-0 pb-6 sm:pb-8 md:pb-10">
      <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1 gap-6 sm:gap-8">
        {/* Profile Header */}
        <div className="flex p-4 bg-[#11091a] rounded-lg border border-[var(--primary-900)] shadow-lg shadow-black/30">
          <div className="flex w-full flex-col gap-6 items-center">
            <div className="flex gap-6 flex-col items-center">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 border-4 border-[var(--primary-700)] neon-glow"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL8BPUR0o8U7msmzlxt0WJUDeSoGlswvEjCIovJfuGedi4XGbkVWgSTr4XxGzZoNLKtU2Zkgg02av0cf5Ss4CaxkSAa37HyBbM1GxJpaCuL3zuEpG51PZ3MUKa56w5VjjoLoDNFJZbjzcXKvSlMcNhYCJVnjLuH828ylwXL-ep2WbuiHcEs-KKti4VXDyvljlCuN8lstrCRfp5NDg-DTAuaYffdfsIoIgp6ZJccdpgh2plDEIus7EEuCaQtyA7GZjB0flIdVXhCtI")' }}
              ></div>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] text-center neon-text">Alex Ryder</p>
                <p className="text-white text-base font-normal leading-normal text-center">Software Engineer</p>
                <p className="text-white text-sm font-normal leading-normal text-center">Joined 2021</p>
              </div>
            </div>
            <Link href="/profile/edit" className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-6 bg-[var(--primary-600)] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-48 hover:bg-[var(--primary-500)] transition-all duration-300 neon-glow">
              <span className="truncate">Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Profile Content Tabs */}
        <div className="flex flex-col gap-6">
          <div className="pb-0">
            <div className="flex border-b border-[var(--primary-900)] px-4 gap-8">
              <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[var(--primary-500)] pb-[13px] pt-4" href="#">
                <p className="text-white text-sm font-bold leading-normal tracking-[0.015em] neon-text">Projects</p>
              </a>
              <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-white pb-[13px] pt-4 hover:text-white hover:border-b-[var(--primary-500)]/50 transition-all duration-300" href="#">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Reviews</p>
              </a>
              <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-white pb-[13px] pt-4 hover:text-white hover:border-b-[var(--primary-500)]/50 transition-all duration-300" href="#">
                <p className="text-sm font-bold leading-normal tracking-[0.015em]">Lounge Posts</p>
              </a>
            </div>
          </div>

          {/* Featured Projects Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4">Featured Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              <div className="flex flex-col gap-3 group">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCeBc6BnJvWP3ldGTlctZR7nC7sHZAKacw3Zl74yoVkCTSduzaE9mvKEmyDTN1yd-Qje5ooZeKYOgU5rN6EBKWbjUlOxvD0RhQ6lIwNzh4Ta55S9NA5WSWOLS0Z8qhIOsWjuraZg2NgCHxILDiqX1EJs6WwoCGpNB2W3LGRsjB-qcm7c8NFABnO8ExRbEzyC7Snh9X12fPTRkABBlYvtyPxA_P7x52I9HQFZVQPbecb0qvOPALZ5qwOHNPPR9lGP5M6S4NrcA4SJcs")' }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">Project Neon City</p>
                  <p className="text-white text-sm font-normal leading-normal">A neon-lit city simulation</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAllafG2JMnArSR2XOLYkXuXOePzl5zXpQy21vC53eOhH6RhudNdSwD9HipO3bzANPthPl8ZjkbWa6K-3oTy3-DviJsv3vTnXe9JTsjaEiyhu84ep3r4Nw5Bp8-Jzfgl6fkuvp10AmkazJkMuK_lsWckeU1NQcUfN7qE0bI8XM7Gmb556ysjMwlkcg4dmzFzxMEB02uUe_ab6IYp5qliMK7Z3-_sJfJ_vV0SIAbgDt2wLa2OgULQVyI3PkNqQ3wKeZmSTTF-nz_rWM")' }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">Cyberpunk UI Kit</p>
                  <p className="text-white text-sm font-normal leading-normal">UI components with cyberpunk style</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg border border-[var(--primary-900)] group-hover:scale-105 group-hover:neon-glow transition-all duration-300"
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuLzUwH9DrP4zn0QrR3JCmHLrpR3TQMGDOCy64WOOMhbPk5oCd2-uGZckwlTclRD_P8mEpYhOzUjO6L5FKWPVaEq-zhsn0OGEkTKXjsDHvIFyg-KQuDsGokWKmxSjEO6r46Xq5PY5i_fA0tGoXeAkWn99itrgX6BoVipPxWgkgYKw8P_9KiRGMyDZ1zX0hJ0H0AWPojZkk0EdZmAT_fvUVGMUIBMwAkrZiyjZWnNmSLca4d8XB_k4VApc-agvjTorRXGfOjYidgk")' }}
                ></div>
                <div>
                  <p className="text-white text-base font-medium leading-normal">Retro Wave Game</p>
                  <p className="text-white text-sm font-normal leading-normal">A game with retro wave aesthetics</p>
                </div>
              </div>
            </div>
          </div>

          {/* All Projects Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4">All Projects</h3>
            <div className="px-4 py-3">
              <div className="flex overflow-hidden rounded-lg border border-[var(--primary-900)] bg-[#11091a]">
                <table className="flex-1 w-full">
                  <thead className="bg-[#1a1122]">
                    <tr>
                      <th className="px-4 py-3 text-left text-white w-[40%] text-sm font-medium leading-normal">Project</th>
                      <th className="px-4 py-3 text-left text-white w-[40%] text-sm font-medium leading-normal">Description</th>
                      <th className="px-4 py-3 text-left text-white w-[10%] text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-white w-[10%] text-sm font-medium leading-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--primary-900)]">
                    <tr className="hover:bg-[#1a1122]/50 transition-colors duration-200">
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Project Neon City</td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">A neon-lit city simulation</td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
                          Completed
                        </span>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                        View
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1a1122]/50 transition-colors duration-200">
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Cyberpunk UI Kit</td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">UI components with cyberpunk style</td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-300 border border-yellow-700/50">
                          In Progress
                        </span>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                        Edit
                      </td>
                    </tr>
                    <tr className="hover:bg-[#1a1122]/50 transition-colors duration-200">
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">Retro Wave Game</td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-normal leading-normal">A game with retro wave aesthetics</td>
                      <td className="h-[72px] px-4 py-2 text-sm font-normal leading-normal">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300 border border-green-700/50">
                          Completed
                        </span>
                      </td>
                      <td className="h-[72px] px-4 py-2 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:text-white hover:neon-text transition-all duration-300 cursor-pointer">
                        View
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;