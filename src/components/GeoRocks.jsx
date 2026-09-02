import { useState, useEffect, useRef } from 'react';

// Accumulates rotation from scroll delta — rocks stay where they stopped.
// scale: degrees per pixel scrolled (0.4 = a 250px scroll ≈ 100°)
export function useScrollRotation(scale = 0.4) {
  const accumulated = useRef(0);
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      accumulated.current += dy * scale;
      setRotation(accumulated.current);
      lastY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scale]);
  return rotation;
}

const ROCKS = {
  granite: (
    <>
      <path d="M8 34L2 20L10 6L22 2L38 5L48 16L44 32L30 38L14 37Z" fill="rgba(148,118,84,0.94)" />
      <path d="M22 2L38 5L48 16L30 12Z" fill="rgba(196,165,118,0.72)" />
      <path d="M8 34L2 20L10 6L14 18Z" fill="rgba(88,62,40,0.88)" />
      <line x1="12" y1="30" x2="35" y2="8" stroke="rgba(210,180,130,0.45)" strokeWidth="0.9" />
      <circle cx="30" cy="10" r="1.2" fill="rgba(220,190,145,0.5)" />
    </>
  ),
  shard: (
    <>
      <path d="M6 38L2 22L8 6L18 2L30 8L36 22L32 36L20 44L10 42Z" fill="rgba(142,112,78,0.94)" />
      <path d="M18 2L30 8L36 22L24 14Z" fill="rgba(188,152,106,0.72)" />
      <path d="M6 38L2 22L8 6L12 20Z" fill="rgba(85,58,36,0.88)" />
      <line x1="8" y1="36" x2="32" y2="10" stroke="rgba(210,180,130,0.48)" strokeWidth="1.1" />
      <circle cx="26" cy="12" r="1.1" fill="rgba(215,185,140,0.48)" />
    </>
  ),
  pebble: (
    <>
      <ellipse cx="15" cy="12" rx="13" ry="10" fill="rgba(152,122,88,0.94)" />
      <ellipse cx="13" cy="10" rx="9" ry="6" fill="rgba(190,158,112,0.68)" />
      <path d="M5 16 Q12 10 25 14" fill="none" stroke="rgba(205,175,125,0.42)" strokeWidth="0.7" />
      <circle cx="12" cy="8" r="1" fill="rgba(220,190,145,0.48)" />
    </>
  ),
  slab: (
    <>
      <path d="M6 22L2 14L10 4L26 2L46 4L56 12L52 22L34 26L14 25Z" fill="rgba(150,118,82,0.92)" />
      <path d="M10 4L26 2L46 4L56 12L30 8Z" fill="rgba(192,158,110,0.68)" />
      <line x1="6" y1="14" x2="54" y2="14" stroke="rgba(205,175,125,0.38)" strokeWidth="0.8" />
      <circle cx="36" cy="7" r="1" fill="rgba(215,185,140,0.45)" />
    </>
  ),
  olivine: (
    <>
      <path d="M10 34L2 20L6 6L18 2L30 6L34 18L28 32L16 36Z" fill="rgba(78,145,62,0.92)" />
      <path d="M18 2L30 6L34 18L22 10Z" fill="rgba(128,190,98,0.72)" />
      <line x1="8" y1="28" x2="28" y2="8" stroke="rgba(140,210,110,0.42)" strokeWidth="0.9" />
      <circle cx="24" cy="10" r="1.3" fill="rgba(160,220,130,0.45)" />
    </>
  ),
  amber: (
    <>
      <path d="M6 36L2 22L6 6L14 2L24 8L28 22L22 36L12 40Z" fill="rgba(205,135,42,0.92)" />
      <path d="M14 2L24 8L28 22L18 12Z" fill="rgba(238,178,68,0.72)" />
      <line x1="8" y1="32" x2="24" y2="10" stroke="rgba(245,200,100,0.45)" strokeWidth="0.9" />
      <circle cx="20" cy="10" r="1.1" fill="rgba(255,215,120,0.5)" />
    </>
  ),
  nugget: (
    <>
      <path d="M4 14L1 8L5 2L12 1L18 5L17 12L11 16Z" fill="rgba(150,118,82,0.94)" />
      <path d="M5 2L12 1L18 5L10 6Z" fill="rgba(194,160,112,0.68)" />
      <line x1="4" y1="12" x2="16" y2="4" stroke="rgba(210,180,130,0.4)" strokeWidth="0.7" />
    </>
  ),
  crystal: (
    <>
      <path d="M8 42L2 26L6 8L17 2L28 8L32 24L26 40L15 46Z" fill="rgba(205,130,38,0.92)" />
      <path d="M17 2L28 8L32 24L20 14Z" fill="rgba(240,175,65,0.72)" />
      <line x1="8" y1="36" x2="28" y2="10" stroke="rgba(230,165,55,0.45)" strokeWidth="1.0" />
      <circle cx="22" cy="12" r="1.4" fill="rgba(245,185,70,0.5)" />
    </>
  ),
};

const SIZES = {
  granite: [52, 40],
  shard: [38, 46],
  pebble: [30, 24],
  slab: [60, 28],
  olivine: [36, 38],
  amber: [30, 42],
  nugget: [20, 18],
  crystal: [34, 48],
};

export function GeoRock({ variant, top, left, right, bottom, opacity = 0.68, animation = 'rock-drift-1', delay = '0s', duration = '34s', className = '', rotation = 0 }) {
  const [w, h] = SIZES[variant] || [36, 36];

  return (
    <div
      style={{
        position: 'absolute', top, left, right, bottom,
        opacity, pointerEvents: 'none',
        transform: `rotate(${rotation}deg)`,
        willChange: 'transform',
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
        className={`geo-rock ${className}`}
        style={{ animation: `${animation} ${duration} ease-in-out ${delay} infinite`, display: 'block' }}
      >
        {ROCKS[variant]}
      </svg>
    </div>
  );
}

export const PROJECTS_ROCKS = [
  { variant: 'granite', top: '8%',  left: '18%' },
  { variant: 'pebble',  top: '12%', right: '22%' },
  { variant: 'nugget',  top: '24%', left: '42%' },
  { variant: 'slab',    top: '28%', right: '6%' },
  { variant: 'shard',   top: '52%', left: '3%' },
  { variant: 'amber',   top: '58%', left: '48%' },
  { variant: 'olivine', top: '62%', right: '4%' },
  { variant: 'pebble',  top: '72%', left: '14%' },
  { variant: 'granite', top: '78%', right: '32%' },
  { variant: 'nugget',  top: '82%', left: '72%' },
  { variant: 'shard',   top: '88%', right: '12%' },
  { variant: 'slab',    top: '91%', left: '28%' },
  { variant: 'amber',   top: '86%', right: '48%' },
  { variant: 'olivine', top: '94%', left: '52%' },
  { variant: 'pebble',  top: '96%', right: '68%' },
  /* extra scatter */
  { variant: 'nugget',  top: '16%', left: '62%' },
  { variant: 'crystal', top: '20%', right: '38%' },
  { variant: 'shard',   top: '44%', left: '32%' },
  { variant: 'pebble',  top: '48%', right: '52%' },
  { variant: 'granite', top: '64%', left: '84%' },
  { variant: 'amber',   top: '74%', left: '36%' },
  { variant: 'olivine', top: '80%', right: '58%' },
  { variant: 'nugget',  top: '92%', left: '8%' },
];

export const CONTACT_ROCKS = [
  { variant: 'crystal', top: '4%',  left: '8%' },
  { variant: 'amber',   top: '8%',  right: '8%' },
  { variant: 'granite', top: '14%', left: '72%' },
  { variant: 'crystal', top: '20%', right: '22%' },
  { variant: 'shard',   top: '28%', left: '4%' },
  { variant: 'olivine', top: '32%', right: '6%' },
  { variant: 'pebble',  top: '38%', left: '88%' },
  { variant: 'amber',   top: '44%', left: '32%' },
  { variant: 'crystal', top: '50%', right: '42%' },
  { variant: 'nugget',  top: '56%', left: '18%' },
  /* extra scatter */
  { variant: 'granite', top: '10%', left: '48%' },
  { variant: 'nugget',  top: '16%', right: '38%' },
  { variant: 'amber',   top: '24%', left: '62%' },
  { variant: 'shard',   top: '36%', right: '55%' },
  { variant: 'pebble',  top: '42%', left: '76%' },
  { variant: 'crystal', top: '60%', left: '8%' },
  { variant: 'olivine', top: '64%', right: '18%' },
];

// ─── Sand texture — maroon / dark-red / magenta grit between rocks ───────────
const SAND_TEXTURE = (() => {
  const colors = [
    'rgba(120,0,32,0.55)',   // deep maroon
    'rgba(100,6,22,0.52)',   // dark maroon
    'rgba(140,12,44,0.48)',  // crimson
    'rgba(108,4,26,0.50)',   // near-black maroon
    'rgba(158,28,68,0.42)',  // magenta-maroon
    'rgba(130,10,38,0.46)',  // mid maroon
    'rgba(170,38,80,0.36)',  // bright magenta
    'rgba(95,2,18,0.54)',    // blackened maroon
    'rgba(148,20,58,0.40)',  // muted magenta
    'rgba(112,8,30,0.50)',   // maroon-red
  ];
  let seed = 0xdeadbeef;
  const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const grains = [];
  for (let i = 0; i < 90; i++) {
    const x = (rand() * 300).toFixed(1);
    const y = (rand() * 300).toFixed(1);
    const r = (0.5 + rand() * 1.6).toFixed(1);
    const c = colors[Math.floor(rand() * colors.length)];
    grains.push(`<circle cx='${x}' cy='${y}' r='${r}' fill='${c}'/>`);
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>${grains.join('')}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
})();

export function SandLayer({ opacity = 0.72 }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: SAND_TEXTURE,
        backgroundSize: '300px 300px',
        backgroundRepeat: 'repeat',
        opacity,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}

// Multipliers spread across rocks so they tumble at different rates
const ROTATION_MULTS = [0.7, 1.0, 1.3, 0.5, 1.6, 0.9, 1.2, 0.6, 1.4, 0.8];

export function GeoRockField({ rocks, baseDelay = 0 }) {
  const baseRot = useScrollRotation(0.4);

  const anims = ['rock-drift-1', 'rock-drift-2', 'rock-drift-3'];
  return rocks.map((rock, i) => {
    const mult = ROTATION_MULTS[i % ROTATION_MULTS.length];
    return (
      <GeoRock
        key={`${rock.variant}-${i}`}
        {...rock}
        opacity={rock.opacity ?? 0.62 + (i % 3) * 0.04}
        animation={anims[i % 3]}
        delay={`${baseDelay + (i % 5) * 2.5}s`}
        duration={`${30 + (i % 4) * 4}s`}
        rotation={baseRot * mult}
      />
    );
  });
}
