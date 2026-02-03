"use client";

import { useEffect, useState } from "react";

export function AntigravityEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="antigravity-bg pointer-events-none overflow-hidden">
      {/* Background Blobs (Pure CSS) */}
      <div className="antigravity-blob bg-primary w-[500px] h-[500px] -top-20 -left-20 animate-[floating-blob_20s_infinite_alternate]" />
      <div className="antigravity-blob bg-blue-600 w-[400px] h-[400px] top-1/2 -right-20 animate-[floating-blob_25s_infinite_alternate-reverse]" />
      <div className="antigravity-blob bg-purple-600 w-[600px] h-[600px] -bottom-40 left-1/4 animate-[floating-blob_30s_infinite_alternate]" />
      
      {/* Mesh Overlay */}
      <div className="glow-mesh absolute inset-0 opacity-40" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
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
