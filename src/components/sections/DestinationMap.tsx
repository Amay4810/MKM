import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus, MapPin } from 'lucide-react';
import { destinations, regionColors, type Destination } from '../../data/destinations';
import RegionSegmentedControl from '../ui/RegionSegmentedControl';
import StaticMapFallback from './StaticMapFallback';

const GlobeViz = lazy(() => import('./GlobeViz'));

// ─── Regions ordered for the panel ───────────────────────────────────
const REGION_ORDER = [
  'South Asia', 'Middle East', 'SE Asia', 'East Asia',
  'Europe', 'Americas', 'Africa', 'Oceania',
];

// ─── Count-up hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1500, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

// ─── Stats strip ─────────────────────────────────────────────────────
const STATS = [
  { value: destinations.filter(d => d.city !== 'New Delhi').length, suffix: '+', label: 'Destinations' },
  { value: 8,  suffix: '',  label: 'Global Regions' },
  { value: 30, suffix: '+', label: 'Countries' },
  { value: 25, suffix: '+', label: 'Years of reach' },
];

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const v = useCountUp(stat.value, 1500, active);
  return (
    <div className="flex flex-col">
      <div className="text-2xl lg:text-3xl font-serif font-semibold text-[#0A4DA2] tabular-nums">
        {v}{stat.suffix}
      </div>
      <div className="text-xs text-[#5A6474] mt-1 tracking-wide">{stat.label}</div>
    </div>
  );
}

// ─── Globe loader ─────────────────────────────────────────────────────
function GlobeLoader() {
  return (
    <div className="w-full flex items-center justify-center"
      style={{ height: 460, background: 'linear-gradient(to bottom, #F5F8FC, #EBF4FF)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#E5EAF2]" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#0A4DA2] animate-spin" />
        </div>
        <span className="text-[11px] text-[#8A93A0] tracking-[0.15em] uppercase font-medium">
          Loading globe
        </span>
      </div>
    </div>
  );
}

// ─── Zoom button ──────────────────────────────────────────────────────
function ZoomBtn({ icon, label, onClick, disabled }: {
  icon: React.ReactNode; label: string;
  onClick: () => void; disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      whileTap={disabled ? {} : { scale: 0.88 }}
      transition={{ duration: 0.1 }}
      className={[
        'w-7 h-7 flex items-center justify-center rounded-md border transition-colors duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A4DA2]',
        disabled
          ? 'border-[#E5EAF2] text-[#C8D0DA] cursor-not-allowed bg-white/40'
          : 'border-[#D0DCF0] text-[#3A5F8A] bg-white hover:bg-[#EBF4FF] hover:border-[#B0C4E0]',
      ].join(' ')}
    >
      {icon}
    </motion.button>
  );
}

// ─── Destination side panel ───────────────────────────────────────────
function DestinationPanel({
  activeRegion,
  highlighted,
  onSelect,
}: {
  activeRegion: string;
  highlighted: Destination | null;
  onSelect: (d: Destination) => void;
}) {
  const panelRef  = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Filter destinations for current region
  const visible = activeRegion === 'All'
    ? destinations
    : destinations.filter(d => d.region === activeRegion || d.city === 'New Delhi');

  // Group by region in canonical order
  const grouped: [string, Destination[]][] = REGION_ORDER
    .map(r => [r, visible.filter(d => d.region === r)] as [string, Destination[]])
    .filter(([, ds]) => ds.length > 0);

  const totalDests = visible.filter(d => d.city !== 'New Delhi').length;

  // Scroll active item into view
  useEffect(() => {
    if (highlighted && activeRef.current && panelRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [highlighted]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E5EAF2] flex items-center justify-between flex-shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-[#0A4DA2]" />
          <span className="text-xs font-semibold text-[#0D2B45]">Destinations</span>
          <span className="text-[10px] font-medium text-[#8A93A0] bg-[#F0F4F8] px-1.5 py-0.5 rounded-full">
            {totalDests}
          </span>
        </div>
        <span className="text-[10px] text-[#A8B0BC]">Click to navigate</span>
      </div>

      {/* Scrollable list */}
      <div ref={panelRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {grouped.map(([region, dests]) => (
          <div key={region}>
            {/* Region header */}
            <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-1.5 bg-[#F7F9FC] border-b border-[#EEF1F5]">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: regionColors[region] ?? '#1E88E5' }}
              />
              <span className="text-[9.5px] font-semibold text-[#8A93A0] uppercase tracking-[0.1em]">
                {region}
              </span>
              <span className="ml-auto text-[9px] text-[#B0B8C4]">{dests.length}</span>
            </div>

            {/* City rows */}
            {dests.map(d => {
              const isHub        = d.city === 'New Delhi';
              const isHighlighted = highlighted?.city === d.city;
              const dotColor     = isHub ? '#0A4DA2' : (regionColors[d.region] ?? '#1E88E5');

              return (
                <button
                  key={d.city}
                  ref={isHighlighted ? activeRef : undefined}
                  onClick={() => onSelect(d)}
                  className={[
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left',
                    'transition-colors duration-100 border-b border-transparent',
                    isHighlighted
                      ? 'bg-[#EBF4FF] border-[#C8DEFF]'
                      : 'hover:bg-[#F5F8FC]',
                  ].join(' ')}
                >
                  {/* Region dot */}
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 ring-1 ring-white/60"
                    style={{ backgroundColor: dotColor }}
                  />

                  {/* City + country */}
                  <div className="min-w-0 flex-1">
                    <p className={[
                      'text-[11.5px] leading-snug truncate',
                      isHighlighted ? 'font-semibold text-[#0A4DA2]' : 'font-medium text-[#0D2B45]',
                    ].join(' ')}>
                      {d.city}
                    </p>
                    <p className="text-[10px] text-[#8A93A0] truncate">{d.country}</p>
                  </div>

                  {/* Hub badge */}
                  {isHub && (
                    <span className="text-[8.5px] font-bold text-white bg-[#0A4DA2] px-1.5 py-0.5 rounded-full flex-shrink-0 tracking-wider">
                      HUB
                    </span>
                  )}

                  {/* Active indicator */}
                  {isHighlighted && !isHub && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A4DA2] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* New Delhi is always shown at top of South Asia — add extra padding at bottom */}
        <div className="h-4" />
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────
export default function DestinationMap() {
  const [activeRegion, setActiveRegion]   = useState('All');
  const [hoveredDest,  setHoveredDest]    = useState<Destination | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [globeReady,   setGlobeReady]     = useState(false);

  const zoomInRef  = useRef<(() => void) | null>(null);
  const zoomOutRef = useRef<(() => void) | null>(null);
  const flyToRef   = useRef<((lat: number, lng: number) => void) | null>(null);

  const statsRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);

  const handleRegisterZoom = useCallback((zi: () => void, zo: () => void) => {
    zoomInRef.current  = zi;
    zoomOutRef.current = zo;
    setGlobeReady(true);
  }, []);

  const handleRegisterFlyTo = useCallback((fn: (lat: number, lng: number) => void) => {
    flyToRef.current = fn;
  }, []);

  const handleZoomIn  = useCallback(() => zoomInRef.current?.(),  []);
  const handleZoomOut = useCallback(() => zoomOutRef.current?.(), []);

  const handleSelect = useCallback((d: Destination) => {
    flyToRef.current?.(d.lat, d.lng);
    setHoveredDest(d);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #F5F8FC 0%, #EBF4FF 55%, #F5F8FC 100%)', cursor: 'default' }}
      aria-labelledby="dest-map-heading"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10,77,162,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,77,162,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="container-corporate relative z-10 py-14 lg:py-20">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#0A4DA2]/30" />
            <span className="text-xs font-semibold text-[#0A4DA2]/70 uppercase tracking-[0.18em]">
              Global Reach
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <h2
                id="dest-map-heading"
                className="font-serif font-semibold text-[#0D2B45] leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
              >
                Our Destination Network
              </h2>
              <p className="mt-2 text-sm text-[#5A6474] max-w-md leading-relaxed">
                From New Delhi, MKM connects to{' '}
                <span className="font-medium text-[#0A4DA2]">
                  {destinations.filter(d => d.city !== 'New Delhi').length}+ destinations
                </span>{' '}
                across 8 regions worldwide.
              </p>
            </div>
            <div className="lg:max-w-lg">
              <RegionSegmentedControl activeRegion={activeRegion} onChange={setActiveRegion} />
            </div>
          </div>
        </motion.div>

        {/* ── Globe + Panel two-column layout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-3">

            {/* ── Globe card ── */}
            <div
              className="rounded-2xl border border-[#E5EAF2] bg-white/55 backdrop-blur-sm shadow-[0_4px_24px_rgba(10,77,162,0.07),0_1px_4px_rgba(0,0,0,0.04)] overflow-hidden"
              style={{ contain: 'layout style paint' }}
            >

              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#E5EAF2] bg-white/80">
                <div className="flex items-center gap-2 min-w-0">
                  {/* Hub pulse */}
                  <div className="relative flex items-center flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#0A4DA2]" />
                    <span className="absolute inset-0 w-2 h-2 rounded-full bg-[#0A4DA2] animate-ping opacity-45" />
                  </div>
                  <span className="text-xs font-medium text-[#0D2B45] flex-shrink-0">New Delhi Hub</span>

                  {/* Hovered city label — animated */}
                  <AnimatePresence mode="wait">
                    {hoveredDest && (
                      <motion.span
                        key={hoveredDest.city}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 4 }}
                        transition={{ duration: 0.14 }}
                        className="flex items-center gap-1.5 text-[11px] text-[#0A4DA2] font-medium ml-2 hidden sm:flex"
                      >
                        <span className="text-[#D8E4F0]">·</span>
                        {hoveredDest.city}, {hoveredDest.country}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Zoom buttons */}
                {!reducedMotion && (
                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                    <ZoomBtn icon={<Plus size={11} strokeWidth={2.5} />} label="Zoom in"  onClick={handleZoomIn}  disabled={!globeReady} />
                    <ZoomBtn icon={<Minus size={11} strokeWidth={2.5} />} label="Zoom out" onClick={handleZoomOut} disabled={!globeReady} />
                  </div>
                )}
              </div>

              {/* Globe / fallback */}
              <div className="relative">
                {reducedMotion ? (
                  <div className="p-4">
                    <StaticMapFallback activeRegion={activeRegion} />
                  </div>
                ) : (
                  <Suspense fallback={<GlobeLoader />}>
                    <GlobeViz
                      activeRegion={activeRegion}
                      reducedMotion={reducedMotion}
                      onDestinationHover={setHoveredDest}
                      onRegisterZoom={handleRegisterZoom}
                      onRegisterFlyTo={handleRegisterFlyTo}
                    />
                  </Suspense>
                )}

                {/* Mobile touch hint — pointer-events-none prevents cursor trapping */}
                <div className="lg:hidden absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                  <span className="text-[10px] text-[#8A93A0] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E5EAF2] shadow-sm whitespace-nowrap pointer-events-none">
                    Drag to rotate · Pinch to zoom
                  </span>
                </div>
              </div>
            </div>

            {/* ── Destination panel card ── */}
            <div className="rounded-2xl border border-[#E5EAF2] bg-white shadow-[0_2px_12px_rgba(10,77,162,0.05)] overflow-hidden flex flex-col max-h-64 lg:max-h-[560px]">
              <DestinationPanel
                activeRegion={activeRegion}
                highlighted={hoveredDest}
                onSelect={handleSelect}
              />
            </div>
          </div>

          {/* ── Legend — pointer-events-none prevents cursor sticking ── */}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5 px-1 pointer-events-none select-none">
            <div className="flex items-center gap-1.5 text-xs text-[#5A6474]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0A4DA2] flex-shrink-0" />
              Hub — New Delhi
            </div>
            {REGION_ORDER.slice(0, 4).map(r => (
              <div key={r} className="flex items-center gap-1.5 text-xs text-[#5A6474]">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: regionColors[r] }} />
                {r}
              </div>
            ))}
            <span className="hidden sm:block text-[10px] text-[#A8B0BC] ml-auto">
              Hover a dot or click a city to navigate
            </span>
          </div>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-10 pt-8 border-t border-[#E5EAF2]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map(s => <StatCard key={s.label} stat={s} active={statsInView} />)}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
