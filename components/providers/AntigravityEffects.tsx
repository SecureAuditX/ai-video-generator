"use client";

import { useEffect, useState } from "react";

export function AntigravityEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="antigravity-container">
      {/* Background Blobs with absolute fallback styles */}
      <div 
        className="antigravity-blob animate-[floating-blob_20s_infinite_alternate]" 
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          left: '-100px',
          backgroundColor: '#7c3aed', // primary/violet fallback
          filter: 'blur(120px)',
          opacity: 0.15
        }}
      />
      <div 
        className="antigravity-blob animate-[floating-blob_25s_infinite_alternate-reverse]" 
        style={{
          width: '500px',
          height: '500px',
          top: '40%',
          right: '-100px',
          backgroundColor: '#2563eb', // blue fallback
          filter: 'blur(120px)',
          opacity: 0.12
        }}
      />
      <div 
        className="antigravity-blob animate-[floating-blob_30s_infinite_alternate]" 
        style={{
          width: '700px',
          height: '700px',
          bottom: '-200px',
          left: '20%',
          backgroundColor: '#9333ea', // purple fallback
          filter: 'blur(120px)',
          opacity: 0.15
        }}
      />
      
      {/* Mesh Overlay */}
      <div className="glow-mesh" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
      {children}
    </div>
  );
}
