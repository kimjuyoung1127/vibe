import React from 'react';
import Link from 'next/link';
import WeeklyVibeRanking from '@/components/WeeklyVibeRanking';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0D0A11] text-white bg-grid-pattern-animated">
      <main className="px-4 sm:px-8 md:px-16 flex flex-1 justify-center pt-0 pb-10">
        <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 gap-12">
          <div className="@container">
            <div className="@[480px]:p-4">
              <div className="flex min-h-[520px] flex-col gap-8 bg-cover bg-center bg-no-repeat @[480px]:gap-10 @[480px]:rounded-xl items-center justify-center p-6 border border-[#8013ec] neon-glow glass-effect hover-glitch" style={{ backgroundImage: 'linear-gradient(rgba(13, 10, 17, 0.8) 0%, rgba(13, 10, 17, 0.6) 100%)' }}>
                <div className="flex flex-col gap-4 text-center max-w-3xl">
                  <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] neon-text hover-glitch cyber-heading">당신의 코딩, Vibe를 만나다</h1>
                  <h2 className="text-gray-300 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal font-modern">창작물을 공유하고, 기술을 논하며, 영감을 주고받는 Vibe Coder들의 허브.</h2>
                </div>
                <div className="flex gap-4">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 @[480px]:h-14 @[480px]:px-8 bg-[#8013ec] text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[-0.015em] hover:bg-opacity-90 transition-all neon-glow btn-neon hover-glitch font-heading">
                    <span className="truncate">내 Vibe 공유하기</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 @[480px]:h-14 @[480px]:px-8 bg-transparent text-white text-base font-bold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[-0.015em] hover:bg-[#8013ec]/20 transition-all neon-glow border-2 border-[#8013ec] hover:border-[#9d4aff] font-heading">
                    <span className="truncate">Vibe 발견하기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Visual separator */}
          <div className="border-t border-[#362348] my-8"></div>
          {/* Value Propositions Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="text-[#8013ec] text-4xl mb-4">💻</div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">프로젝트 쇼케이스</h3>
                <p className="text-white font-modern">당신의 창작물을 공유하고, 다른 Vibe Coder들의 피드백을 받아보세요. 좋아요와 댓글을 통해 인사이트를 얻을 수 있습니다.</p>
              </div>
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="text-[#8013ec] text-4xl mb-4">🔧</div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">툴 & 테크 리뷰</h3>
                <p className="text-white font-modern">최신 기술과 도구에 대한 솔직한 리뷰를 공유하세요. 다른 개발자들에게 유용한 정보를 제공할 수 있습니다.</p>
              </div>
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="text-[#8013ec] text-4xl mb-4">💬</div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">코딩 라운지</h3>
                <p className="text-white font-modern">자유롭게 소통하고, 질문을 하고, 다른 개발자들과 함께 성장하세요. 커뮤니티의 지혜를 경험해보세요.</p>
              </div>
          </div>
          {/* Visual separator */}
          <div className="border-t border-[#362348] my-8"></div>
          {/* Featured Projects Showcase */}
          <div className="py-12">
            <h2 className="text-white text-3xl font-bold mb-8 text-center cyber-heading">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="w-full h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFAg3rrmwOsOvOasC5HFTijMj0_J_pgsnki9ycy5T-TYLh7p0YFejasGvEoz6PEuGY_iQDJwsNhXR1Al4R-x93B9P39CG4bzQ1b8m9Wtx-6n6xggH13LmJ8zq3G6MnqIhng1WjmuIsFzpzALAZ7Yy7Ps7ofFbDmzuHEpYuNbJF1ISsGLglvUFgm2gNg8Y5OO7fUA2DBbUTFajHRZwYcxzL2yhFjliqBVve6XZg7nHJztLzRjL2-2lsL90KtuiG6ozLrXPHS92RRGI')" }}></div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">Neon City Simulator</h3>
                                  <p className="text-white text-sm font-normal leading-normal font-modern">A vibrant city simulation with neon lights and retro aesthetics.</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-modern">@SynthWaveDev</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">favorite</span> 1.2K
                    </span>
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">comment</span> 42
                    </span>
                  </div>
                </div>
              </div>
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="w-full h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8yTaZ7s2VuLwNFMikB3Ki7mN9Ffl6ZtPdaMprRZM7fjcAGUm5bzGGRBNi133zYscCpjM612blMgNvxx54eFyQcoium4p8Xc2wbckKYoLv8ji4m9QBZaehYkl8pLhoGs329TohRdLUOXkX5TzdydjDVy8zbYHVWDayhRlmR7aKGSX0kvIPJx1wheljy23m_WIg8P_VygU8YiW7dU0iiyPfoF2jDbzKZMGvlo2sMgDtCDvPNzQmvNah-4cW6EC-dCWDhrqgTzP72W8')" }}></div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">Retro Wave Visualizer</h3>
                                  <p className="text-white text-sm font-normal leading-normal font-modern">A music visualizer with retro wave style graphics.</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-modern">@PixelPioneer</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">favorite</span> 980
                    </span>
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">comment</span> 36
                    </span>
                  </div>
                </div>
              </div>
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="w-full h-48 bg-cover bg-center rounded-md mb-4" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOjNUDgNlCQvJR4Xwcud5SbJqBidWq3bCU5sFQHOBbpVIUhkJuubI3vuKbIthUqSl6svjq2B5k4qyEJmVYdQ2EDRWmF8j4FnCbsw3rYcKCdQ91wrxgpsuPT8pKTnIZVVJIgbu6il5tIdyU-m_PjuWMG-c_Jg4swwz1XzbahNUu1fJ4u0U8TEvw0ZMbqD5hjrx1k9KRqhR048obQ_lIpP7bOLTeHepK1GNRt1eGT-k_FAtDOfpVy_-wzG6PhToSHLBLFh4affZIwbU')"}}></div>
                <h3 className="text-white text-xl font-bold mb-2 cyber-heading">Cyberpunk Dreams</h3>
                                  <p className="text-white text-sm font-normal leading-normal font-modern">A cyberpunk-themed adventure game with stunning visuals.</p>
                <div className="flex justify-between items-center">
                  <span className="text-white font-modern">@VR_Architect</span>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">favorite</span> 854
                    </span>
                    <span className="flex items-center gap-1 text-[#ad92c9] font-modern">
                      <span className="material-symbols-outlined text-base">comment</span> 28
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12 mb-12">
              <Link href="/showcase" className="inline-block neon-glow btn-neon font-heading px-6 py-3 rounded-md">
                View All Projects
              </Link>
            </div>
          </div>
          {/* Testimonials Section */}
          <div className="py-12 glass-effect rounded-lg p-8">
            <h2 className="text-white text-3xl font-bold mb-8 text-center cyber-heading">What Our Community Says</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    alt="Avatar of cyber_ninja" 
                    className="h-12 w-12 rounded-full border-2 border-[#8013ec]" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu6CgNai0Ijy2g9vheNU_aSgS8_dQQzSjtVuU95M9bSLtPlJl2BYSNRbiYFOn2xfjNICkgjWD0ikHtiaNTKZL6hmf4PrhNSY3iR3Rfg59HXDj1VxsawaU7LN7eZmf0N8Gp8-zepKb3P9GwpuYpGvTl5FOAcZ8_N54H4JnfTGjCelT1BKKoyOusQzvLxI9HcViTgw_G2dPFllY6Ucx14ylz8kQXrIpKX9HD51n92F2mQFYpR4SrnYyB_867IGqqJvFRkixqT6V-r4E" 
                  />
                  <div>
                                        <span className="text-white font-modern">@cyber_ninja</span>
                    <p className="text-[#ad92c9] text-sm font-modern">Full-stack Developer</p>
                  </div>
                </div>
                                <p className="text-white font-modern italic">
                  "Vibe Code has completely changed how I share my projects. The community is incredibly supportive and the cyberpunk aesthetic makes every interaction feel special. I've gotten amazing feedback that's helped me improve my work."
                </p>
              </div>
              <div className="glass-effect rounded-lg p-6 border border-[#362348] hover:border-[#8013ec] transition-all hover:neon-glow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    alt="Avatar of code_poet" 
                    className="h-12 w-12 rounded-full border-2 border-[#8013ec]" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4W6WTXVBLSTFTcBzR_DQ7gfwnqzaKTNGXT3H8VgjTbvPzlQolLaq56ExKxO7_mSQp9wn8VPjqilBS44hrq3Mn15k1cU461SqVwTXUEQ84wZJSZIUEfMgYGgvEjuxD3I3AFDJ07v6s-8Oj0SYfhBBAp-vbwvwEqL9Z_2OB43phqW6-5kJGVvDSm1LVJvIsju9Ux6PHhWQ0s1BmRUO4Bwp4sVpfeJxImNxTdhDJmJ3Cy3LAPCnE6Qvzg8GgeC6a5a5GcHoTLR7Qc-k" 
                  />
                  <div>
                    <h3 className="text-white font-bold cyber-heading">@code_poet</h3>
                    <p className="text-white text-sm font-modern">UI/UX Designer</p>
                  </div>
                </div>
                <p className="text-white font-modern italic">
                  "As a designer who codes, I love the emphasis on aesthetics here. The 'Vibe' editor lets me showcase my work exactly how I want, and the community genuinely appreciates the visual aspects of development. It's refreshing!"
                </p>
              </div>
            </div>
          </div>
          {/* Visual separator */}
          <div className="border-t border-[#362348] my-8"></div>
          <WeeklyVibeRanking />
          {/* Visual separator */}
          <div className="border-t border-[#362348] my-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section>
              <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-5 pt-5 neon-text hover-glitch cyber-heading">Latest Posts</h2>
              <div className="space-y-6 p-4">
                <div className="flex items-start justify-between gap-6 rounded-lg bg-[#1F172C] p-4 border border-[#362348] hover:border-[#8013ec] transition-all card-neon hover-glitch">
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-white text-lg font-bold leading-tight hover-glitch font-heading">Exploring the Future of AI in Game Development</p>
                    <p className="text-white text-sm font-normal leading-normal font-modern">A deep dive into how artificial intelligence is revolutionizing game design and player experiences.</p>
                    <Link href="#" className="text-white text-sm font-bold mt-2 self-start hover:underline link-neon hover-glitch font-modern neon-text">Read More →</Link>
                  </div>
                  <div className="w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-md flex-shrink-0 hover-glitch" style={{ backgroundImage: 'url()' }}></div>
                </div>
                <div className="flex items-start justify-between gap-6 rounded-lg bg-[#1F172C] p-4 border border-[#362348] hover:border-[#8013ec] transition-all card-neon hover-glitch">
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-white text-lg font-bold leading-tight hover-glitch font-heading">Building a Retro-Style Website with Modern Frameworks</p>
                    <p className="text-white text-sm font-normal leading-normal font-modern">Learn how to combine the charm of retro aesthetics with the power of modern web development frameworks.</p>
                    <Link href="#" className="text-white text-sm font-bold mt-2 self-start hover:underline link-neon hover-glitch font-modern neon-text">Read More →</Link>
                  </div>
                  <div className="w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-md flex-shrink-0 hover-glitch" style={{ backgroundImage: 'url()' }}></div>
                </div>
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between px-4 pb-5 pt-5">
                <h2 className="text-white text-3xl font-bold leading-tight tracking-[-0.015em] neon-text hover-glitch cyber-heading">Vibe News</h2>
                <Link href="/news" className="text-white text-sm font-bold hover:underline link-neon hover-glitch font-modern">View All →</Link>
              </div>
              <div className="space-y-6 p-4">
                <div className="flex items-start justify-between gap-6 rounded-lg bg-[#1F172C] p-4 border border-[#362348] hover:border-[#8013ec] transition-all card-neon hover-glitch">
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-white text-lg font-bold leading-tight hover-glitch font-heading">New Cyberpunk Game Release: 'Neon Nights'</p>
                    <p className="text-white text-sm font-normal leading-normal font-modern">A highly anticipated cyberpunk-themed game, 'Neon Nights', has just been released, featuring stunning visuals and an immersive storyline.</p>
                    <Link href="/news/1" className="text-white text-sm font-bold mt-2 self-start hover:underline link-neon hover-glitch font-modern">Learn More →</Link>
                  </div>
                  <div className="w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-md flex-shrink-0 hover-glitch" style={{ backgroundImage: 'url()' }}></div>
                </div>
                <div className="flex items-start justify-between gap-6 rounded-lg bg-[#1F172C] p-4 border border-[#362348] hover:border-[#8013ec] transition-all card-neon hover-glitch">
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-white text-lg font-bold leading-tight hover-glitch font-heading">Tech Conference Highlights: Innovations in VR and AR</p>
                    <p className="text-white text-sm font-normal leading-normal font-modern">Key takeaways from the latest tech conference, focusing on advancements in virtual reality and augmented reality technologies.</p>
                    <Link href="/news/2" className="text-white text-sm font-bold mt-2 self-start hover:underline link-neon hover-glitch font-modern">Read More →</Link>
                  </div>
                  <div className="w-32 h-32 bg-center bg-no-repeat aspect-square bg-cover rounded-md flex-shrink-0 hover-glitch" style={{ backgroundImage: 'url()' }}></div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;