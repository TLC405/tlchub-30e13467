import React from "react";

const OKCWorld: React.FC = () => {
  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="border-[3px] border-foreground rounded-2xl p-6 bg-card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🗺️</span>
          <div>
            <h2 className="font-serif text-2xl font-black text-foreground leading-tight">OKC</h2>
            <span className="inline-block text-[10px] font-black tracking-widest uppercase border-[2px] border-foreground px-2 py-0.5 rounded-full mt-1">
              Coming Soon
            </span>
          </div>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          Your City. Local gyms, community resources, Men of Purpose OKC Foundation, weather, events.
        </p>
        <p className="text-xs text-muted-foreground">
          Source: multiple repos (okc-street-stories, OKC-Command-Station, okc-3d-street-map)
        </p>
      </div>
    </div>
  );
};

export default OKCWorld;
