// KakaoInitializer.ts
// This utility initializes the Kakao SDK for use throughout the app

'use client';

import { useEffect } from 'react';

// 타입 에러 방지를 위해 Kakao 객체를 window에 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

// Initialize Kakao SDK
export const initKakao = () => {
  if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
    if (kakaoApiKey) {
      window.Kakao.init(kakaoApiKey);
    } else {
      console.error('Kakao API key is not set. Please set NEXT_PUBLIC_KAKAO_API_KEY in your .env file.');
    }
  }
};

// Hook to initialize Kakao SDK
export const useKakaoInit = () => {
  useEffect(() => {
    const loadKakaoSdk = () => {
      if (typeof window !== 'undefined' && !window.Kakao) {
        const script = document.createElement('script');
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
        script.integrity = 'sha384-TYPfRpjW5lhWULnQ8uaWy6KX6+16wFVNyRcaT2AXvn41H9m5l4/LZUW451P3W4fcZ';
        script.crossOrigin = 'anonymous';
        script.onload = () => {
          initKakao();
        };
        script.onerror = () => {
          console.error('Failed to load Kakao SDK');
        };
        document.head.appendChild(script);
      } else if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
        initKakao();
      }
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        // Loading, wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', loadKakaoSdk);
      } else {
        // DOM is already ready, load immediately
        loadKakaoSdk();
      }
    }
  }, []);
};