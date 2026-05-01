import React, { useState, memo } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const SafeImage: React.FC<SafeImageProps> = memo(({ 
  src, 
  alt, 
  className, 
  fallback = "https://placehold.co/400x400/0b0b0f/D4AF37?text=Image+Not+Found", 
  loading = "lazy",
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to fix IPFS links on the fly if they are in the wrong format
  const getProcessedSrc = (url: string | undefined) => {
    if (!url) return fallback;
    
    let processed = url;
    
    // Normalise ipfs:// protocol
    if (processed.startsWith("ipfs://")) {
      processed = processed.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
    }
    
    // If it's a known problematic Pinata subdomain, try using the public one or another reliable gateway
    if (processed.includes("ivory-magnificent-caterpillar-957.mypinata.cloud")) {
      processed = processed.replace("ivory-magnificent-caterpillar-957.mypinata.cloud", "gateway.pinata.cloud");
    }
    
    return processed;
  };

  const finalSrc = error || !src ? fallback : getProcessedSrc(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur Placeholder */}
      <div 
        className={`absolute inset-0 bg-bg-card/20 backdrop-blur-xl transition-opacity duration-700 pointer-events-none ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      
      <img
        src={finalSrc}
        alt={alt}
        className={`w-full h-full transform transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        onError={() => {
          console.error(`[SafeImage] Failed to load: ${src}`);
          setError(true);
        }}
        onLoad={() => setIsLoaded(true)}
        loading={loading}
        decoding="async"
        {...props}
      />
    </div>
  );
});

SafeImage.displayName = "SafeImage";

export default SafeImage;
