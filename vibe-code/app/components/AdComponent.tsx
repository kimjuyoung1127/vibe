'use client';

import React, { useEffect } from 'react';

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayoutKey?: string;
  className?: string;
  style?: React.CSSProperties;
  layoutKey?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({
  adSlot,
  adFormat = 'auto',
  adLayoutKey,
  className = '',
  style,
  layoutKey
}) => {
  useEffect(() => {
    try {
      // Check if adsbygoogle is loaded and push the ad
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  const adStyle = {
    display: 'block',
    ...(style || {})
  };

  // Build ad attributes
  const attributes: Record<string, string> = {
    'data-ad-client': 'ca-pub-5327530419834984',
    'data-ad-slot': adSlot,
    'data-ad-format': adFormat,
    'data-full-width-responsive': 'true'
  };

  if (adLayoutKey) {
    attributes['data-ad-layout-key'] = adLayoutKey;
  }

  if (layoutKey) {
    attributes['data-ad-layout-key'] = layoutKey;
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={adStyle as React.CSSProperties}
        {...attributes}
      />
    </div>
  );
};

export default AdComponent;