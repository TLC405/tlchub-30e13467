interface TLCLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: { w: 28, h: 32, text: '7px', subtextSize: '3.5px' },
  md: { w: 40, h: 46, text: '10px', subtextSize: '4.5px' },
  lg: { w: 64, h: 74, text: '16px', subtextSize: '7px' },
};

export function TLCLogo({ size = 'md', className = '' }: TLCLogoProps) {
  const s = sizes[size];
  
  return (
    <svg
      width={s.w}
      height={s.h}
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="TLC Trainer Logo"
    >
      {/* Shield shape */}
      <path
        d="M20 2L4 8V22C4 32 11 40 20 44C29 40 36 32 36 22V8L20 2Z"
        fill="hsl(var(--foreground))"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
      {/* Inner border */}
      <path
        d="M20 5L7 10V22C7 30.5 13 37 20 41C27 37 33 30.5 33 22V10L20 5Z"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* TLC text */}
      <text
        x="20"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill="hsl(var(--primary))"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize={s.text}
        letterSpacing="1"
      >
        TLC
      </text>
      {/* TRAINER subtext */}
      <text
        x="20"
        y="31"
        textAnchor="middle"
        dominantBaseline="central"
        fill="hsl(var(--primary))"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize={s.subtextSize}
        letterSpacing="2"
        opacity="0.6"
      >
        TRAINER
      </text>
    </svg>
  );
}
