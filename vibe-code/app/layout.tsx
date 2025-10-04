import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './custom.css';
import Footer from './components/footer';
import GoogleAnalyticsProvider from '../google/providers/GoogleAnalyticsProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Vibe Hub - A Developer Community for Creative Coding',
    template: '%s | Vibe Hub',
  },
  description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style. Share projects, reviews, and connect with like-minded developers.',
  keywords: ['developer community', 'vibe coding', 'creative coding', 'programming', 'tech reviews', 'project showcase', 'developer tools', 'coding environment'],
  authors: [{ name: 'Vibe Hub Team' }],
  creator: 'Vibe Hub Team',
  publisher: 'Vibe Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.vibehub.dev',
    title: 'Vibe Hub - A Developer Community for Creative Coding',
    description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style.',
    siteName: 'Vibe Hub',
    images: [
      {
        url: 'https://www.vibehub.dev/og-image.png', // Replace with actual image path
        width: 1200,
        height: 630,
        alt: 'Vibe Hub - Developer Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Hub - A Developer Community for Creative Coding',
    description: 'A community website for developers who value the "vibe coding" and environment of coding, featuring modern retro pop art style.',
    images: ['https://www.vibehub.dev/twitter-image.png'], // Replace with actual image path
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-token', // Replace with actual token
    yahoo: 'yahoo-site-verification-token',   // Replace with actual token
    other: {
      'msvalidate.01': 'bing-verification-token', // Replace with actual token
    },
  },
  metadataBase: new URL('https://www.vibehub.dev'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Space+Grotesk:wght@400;500;700" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" 
          rel="stylesheet" 
        />
        {/* Kakao SDK */}
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          crossOrigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Immediately initialize Kakao SDK when script is loaded
              if (typeof window !== 'undefined') {
                // Wait for Kakao SDK to be loaded
                let attempts = 0;
                const maxAttempts = 50; // 50 * 100ms = 5s total wait time
                
                const initializeKakao = () => {
                  if (window.Kakao && !window.Kakao.isInitialized()) {
                    const kakaoApiKey = "${process.env.NEXT_PUBLIC_KAKAO_API_KEY || ''}";
                    if (kakaoApiKey && kakaoApiKey !== '') {
                      try {
                        window.Kakao.init(kakaoApiKey);
                        console.log('Kakao SDK initialized successfully');
                      } catch (error) {
                        console.error('Failed to initialize Kakao SDK:', error);
                      }
                    } else {
                      console.warn('Kakao API key is not set. Please set NEXT_PUBLIC_KAKAO_API_KEY in your .env file to enable Kakao sharing.');
                    }
                  } else if (window.Kakao && window.Kakao.isInitialized()) {
                    console.log('Kakao SDK already initialized');
                  } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(initializeKakao, 100);
                  } else {
                    console.error('Kakao SDK not available after maximum attempts');
                  }
                };
                
                // Start initialization check after a brief delay
                setTimeout(initializeKakao, 100);
              }
            `,
          }}
        ></script>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID'}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vibe Hub',
              legalName: 'Vibe Hub',
              url: 'https://www.vibehub.dev',
              logo: 'https://www.vibehub.dev/logo.png', // Replace with actual logo path
              description: 'A community website for developers who value the "vibe coding" and environment of coding',
              foundingDate: '2025',
              founder: {
                '@type': 'Person',
                name: 'Vibe Hub Team',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@vibehub.dev',
                contactType: 'customer service',
                areaServed: 'Worldwide',
                availableLanguage: 'English',
              },
              sameAs: [
                'https://www.facebook.com/vibehub',
                'https://www.twitter.com/vibehub',
                'https://www.instagram.com/vibehub',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            {children}
            <GoogleAnalyticsProvider />
           
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}