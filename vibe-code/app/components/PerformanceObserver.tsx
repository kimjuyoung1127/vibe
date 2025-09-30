// app/components/PerformanceObserver.tsx
'use client';

import { useEffect } from 'react';

// This component implements performance monitoring using the Web Performance API
const PerformanceObserver = () => {
  useEffect(() => {
    // Track First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log FCP time
        console.log('FCP:', entry.startTime);
        
        // Send to analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'Web Vitals',
            event_label: 'FCP',
            value: Math.round(entry.startTime),
          });
        }
      }
    });
    
    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log LCP time
        console.log('LCP:', entry.startTime);
        
        // Send to analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance', {
            event_category: 'Web Vitals',
            event_label: 'LCP',
            value: Math.round(entry.startTime),
          });
        }
      }
    });
    
    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
      
      // Send to analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'performance', {
          event_category: 'Web Vitals',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000) / 1000, // Round to 3 decimals
        });
      }
    });
    
    fcpObserver.observe({ entryTypes: ['paint'] });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);
  
  return null;
};

export default PerformanceObserver;