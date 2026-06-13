import { destinations, regionColors } from '../../data/destinations';

interface StaticMapFallbackProps {
  activeRegion: string;
}

// Simple, clean SVG world map fallback for reduced-motion / low-power devices
// Using simplified polygon land masses on a light background
export default function StaticMapFallback({ activeRegion }: StaticMapFallbackProps) {
  const filtered = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region === activeRegion || d.city === 'New Delhi');

  // Convert lat/lng to SVG x/y (equirectangular, 1000x500 viewBox)
  const toSvg = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  });

  const hub = toSvg(28.6139, 77.209);

  return (
    <div className="w-full relative rounded-xl overflow-hidden border border-[#E5EAF2]" style={{ background: '#F5F8FC' }}>
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-auto"
        aria-label="Static world map showing MKM destination network"
      >
        {/* Ocean */}
        <rect width="1000" height="500" fill="#EBF4FF" />

        {/* Equator */}
        <line x1="0" y1="250" x2="1000" y2="250" stroke="#1E88E5" strokeOpacity="0.08" strokeWidth="0.8" strokeDasharray="5 10" />

        {/* Land masses (simplified polygons) */}
        {/* North America */}
        <path d="M 110,90 L 145,72 L 185,68 L 220,75 L 255,85 L 278,100 L 285,118 L 278,138 L 260,158 L 248,178 L 240,200 L 228,212 L 215,205 L 200,195 L 185,198 L 172,210 L 165,225 L 155,220 L 148,205 L 135,198 L 120,198 L 108,188 L 100,170 L 98,148 L 104,125 L 110,90 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        <path d="M 170,210 L 185,198 L 200,195 L 215,205 L 222,218 L 218,235 L 210,248 L 200,258 L 190,262 L 178,258 L 168,248 L 165,235 L 170,210 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* Greenland */}
        <path d="M 340,50 L 370,42 L 395,45 L 412,58 L 408,78 L 390,90 L 368,95 L 345,90 L 330,75 L 330,60 L 340,50 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* South America */}
        <path d="M 215,260 L 238,252 L 260,250 L 278,258 L 288,272 L 290,295 L 285,320 L 275,345 L 262,368 L 248,385 L 235,390 L 220,385 L 208,370 L 198,348 L 192,320 L 192,295 L 198,270 L 205,260 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        {/* Europe */}
        <path d="M 420,100 L 448,92 L 475,90 L 495,96 L 508,108 L 510,122 L 502,135 L 490,142 L 478,148 L 465,155 L 458,168 L 448,172 L 438,165 L 428,155 L 420,140 L 415,122 L 418,108 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        <path d="M 448,68 L 462,58 L 478,55 L 490,62 L 492,75 L 485,88 L 470,95 L 455,92 L 445,80 L 448,68 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* Africa */}
        <path d="M 458,172 L 480,162 L 505,158 L 528,162 L 545,175 L 552,192 L 550,215 L 542,238 L 530,262 L 515,285 L 500,308 L 488,328 L 478,340 L 468,342 L 458,335 L 448,318 L 440,295 L 436,268 L 435,242 L 438,218 L 442,195 L 448,178 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        {/* Middle East */}
        <path d="M 508,155 L 530,148 L 552,148 L 570,155 L 578,168 L 575,182 L 562,192 L 548,198 L 532,196 L 518,188 L 508,175 L 506,162 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* South Asia */}
        <path d="M 575,168 L 598,158 L 622,155 L 645,160 L 660,172 L 662,188 L 655,205 L 642,218 L 628,228 L 615,235 L 605,240 L 594,232 L 584,218 L 577,200 L 573,182 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        {/* SE Asia */}
        <path d="M 660,188 L 678,178 L 695,178 L 708,185 L 712,198 L 708,212 L 698,222 L 685,228 L 672,225 L 662,215 L 658,200 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        <path d="M 678,248 L 695,240 L 712,238 L 728,245 L 735,258 L 730,272 L 718,280 L 702,282 L 688,275 L 678,262 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* East Asia/China */}
        <path d="M 662,140 L 688,125 L 718,115 L 748,110 L 775,112 L 798,120 L 810,135 L 808,152 L 796,165 L 778,172 L 758,175 L 735,172 L 712,165 L 692,158 L 675,150 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        <path d="M 745,148 L 758,140 L 770,140 L 778,148 L 776,160 L 766,168 L 754,168 L 745,160 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.5" />
        {/* Russia */}
        <path d="M 500,50 L 540,40 L 590,35 L 650,32 L 710,35 L 760,42 L 800,52 L 820,65 L 815,80 L 795,90 L 765,98 L 728,102 L 695,100 L 660,98 L 622,95 L 590,92 L 558,90 L 528,85 L 505,75 L 498,62 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />
        {/* Australia */}
        <path d="M 720,290 L 748,275 L 780,268 L 815,268 L 848,275 L 872,290 L 882,312 L 878,338 L 862,358 L 840,370 L 812,375 L 782,372 L 755,360 L 732,342 L 718,320 L 714,300 Z" fill="#D6E8F7" stroke="#B0C4E0" strokeWidth="0.6" />

        {/* Arc lines from hub */}
        {filtered
          .filter(d => d.city !== 'New Delhi')
          .map((dest, i) => {
            const p = toSvg(dest.lat, dest.lng);
            const mx = (hub.x + p.x) / 2;
            const my = Math.min(hub.y, p.y) - 40;
            const color = regionColors[dest.region] ?? '#1E88E5';
            return (
              <path
                key={i}
                d={`M ${hub.x} ${hub.y} Q ${mx} ${my} ${p.x} ${p.y}`}
                fill="none"
                stroke={color}
                strokeWidth="0.6"
                strokeOpacity="0.2"
                strokeDasharray="4 6"
              />
            );
          })}

        {/* Destination dots */}
        {filtered.map(dest => {
          const p = toSvg(dest.lat, dest.lng);
          const isHub = dest.city === 'New Delhi';
          const color = isHub ? '#0A4DA2' : (regionColors[dest.region] ?? '#1E88E5');
          return (
            <g key={`${dest.city}-${dest.country}`}>
              {isHub && <circle cx={p.x} cy={p.y} r={9} fill={color} fillOpacity="0.12" />}
              <circle cx={p.x} cy={p.y} r={isHub ? 4.5 : 3} fill={color} fillOpacity={isHub ? 1 : 0.85} />
              {isHub && <circle cx={p.x} cy={p.y} r={7} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.4" />}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
