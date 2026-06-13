import { useEffect, useRef, useState, useCallback } from 'react';
import { destinations, regionColors, regionCentroids, type Destination } from '../../data/destinations';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any;

interface GlobeVizProps {
  activeRegion: string;
  reducedMotion: boolean;
  onDestinationHover: (dest: Destination | null) => void;
  onRegisterZoom?: (zIn: () => void, zOut: () => void) => void;
  onRegisterFlyTo?: (flyTo: (lat: number, lng: number) => void) => void;
}

const HUB = { lat: 28.6139, lng: 77.209 };
const ZOOM_STEP = 0.35;
const MIN_ALT = 0.85;
const MAX_ALT = 3.2;

// Subtle animated arc per destination
function buildArcs(activeRegion: string) {
  return destinations
    .filter(d => d.city !== 'New Delhi')
    .filter(d => activeRegion === 'All' || d.region === activeRegion)
    .map(d => {
      const base = regionColors[d.region] ?? '#1E88E5';
      return {
        startLat: HUB.lat, startLng: HUB.lng,
        endLat: d.lat, endLng: d.lng,
        // Fade: bright start → transparent end
        color: [`${base}55`, `${base}08`],
      };
    });
}

// Clean uniform dots — hub bigger, others small
function buildPoints(activeRegion: string) {
  return destinations
    .filter(d => activeRegion === 'All' || d.region === activeRegion || d.city === 'New Delhi')
    .map(d => ({
      lat: d.lat,
      lng: d.lng,
      radius: d.city === 'New Delhi' ? 0.42 : 0.19,
      color: d.city === 'New Delhi' ? '#0A4DA2' : (regionColors[d.region] ?? '#1E88E5'),
      destination: d,
    }));
}

export default function GlobeViz({
  activeRegion,
  reducedMotion,
  onDestinationHover,
  onRegisterZoom,
  onRegisterFlyTo,
}: GlobeVizProps) {
  const globeRef = useRef<GlobeInstance>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [GlobeComponent, setGlobeComponent] = useState<GlobeInstance>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dims, setDims] = useState({ width: 600, height: 480 });

  // Change-detection ref — prevents rapid React state updates while mouse moves
  const lastHoveredKeyRef = useRef<string | null>(null);
  const currentAltRef = useRef(2.2);

  // Dynamic import (client-side only)
  useEffect(() => {
    let dead = false;
    import('react-globe.gl').then(mod => { if (!dead) setGlobeComponent(() => mod.default); });
    return () => { dead = true; };
  }, []);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const e = entries[0];
      if (!e) return;
      const w = e.contentRect.width;
      setDims({ width: w, height: Math.min(Math.max(w * 0.65, 360), 560) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    const pov = g.pointOfView();
    const alt = Math.max(MIN_ALT, (pov.altitude ?? currentAltRef.current) - ZOOM_STEP);
    currentAltRef.current = alt;
    g.pointOfView({ ...pov, altitude: alt }, 420);
  }, []);

  const zoomOut = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    const pov = g.pointOfView();
    const alt = Math.min(MAX_ALT, (pov.altitude ?? currentAltRef.current) + ZOOM_STEP);
    currentAltRef.current = alt;
    g.pointOfView({ ...pov, altitude: alt }, 420);
  }, []);

  // Register zoom + flyTo with parent
  useEffect(() => {
    if (!isLoaded) return;
    onRegisterZoom?.(zoomIn, zoomOut);
    onRegisterFlyTo?.((lat, lng) => {
      const alt = 1.15;
      currentAltRef.current = alt;
      globeRef.current?.pointOfView({ lat, lng, altitude: alt }, 1100);
    });
  }, [isLoaded, onRegisterZoom, onRegisterFlyTo, zoomIn, zoomOut]);

  // Globe ready — set controls
  const handleGlobeReady = useCallback(() => {
    const g = globeRef.current;
    if (!g) return;
    setIsLoaded(true);

    // Intro: start over hub then pan back
    g.pointOfView({ lat: HUB.lat, lng: HUB.lng, altitude: 1.4 }, 0);
    setTimeout(() => {
      g.pointOfView({ lat: 22, lng: 48, altitude: 2.2 }, 2000);
      currentAltRef.current = 2.2;
    }, 600);

    const ctrl = g.controls();
    ctrl.enableZoom = false;  // disabled; zoom via buttons / pinch
    ctrl.enableRotate = true;
    ctrl.rotateSpeed = 0.65;
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.07;
    ctrl.autoRotate = !reducedMotion;
    ctrl.autoRotateSpeed = 0.3;

    // Block scroll-wheel zoom; allow 2-finger pinch
    const canvas = g.renderer()?.domElement;
    if (canvas) {
      canvas.addEventListener('wheel',
        (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); },
        { passive: false });

      canvas.addEventListener('touchstart',
        (e: TouchEvent) => { if (e.touches.length === 2) ctrl.enableZoom = true; },
        { passive: true });

      canvas.addEventListener('touchend', () => {
        ctrl.enableZoom = false;
        setTimeout(() => {
          const pov = g.pointOfView();
          if (pov?.altitude)
            currentAltRef.current = Math.min(MAX_ALT, Math.max(MIN_ALT, pov.altitude));
        }, 60);
      }, { passive: true });
    }
  }, [reducedMotion]);

  // Pan to region on filter change
  useEffect(() => {
    if (!globeRef.current || !isLoaded) return;
    const c = regionCentroids[activeRegion];
    if (!c) return;
    const alt = Math.min(MAX_ALT, Math.max(MIN_ALT, c.altitude));
    currentAltRef.current = alt;
    globeRef.current.pointOfView({ ...c, altitude: alt }, 1400);
  }, [activeRegion, isLoaded]);

  const arcs = buildArcs(activeRegion);
  const points = buildPoints(activeRegion);

  // Hover — only fires setState when the hovered destination actually changes
  type PointDatum = typeof points[0];
  const handlePointHover = useCallback((point: PointDatum | null) => {
    const dest = point?.destination ?? null;
    const key = dest?.city ?? null;
    if (key === lastHoveredKeyRef.current) return;
    lastHoveredKeyRef.current = key;
    onDestinationHover(dest);
    // Pause auto-rotate while viewing a destination
    if (globeRef.current)
      globeRef.current.controls().autoRotate = !dest && !reducedMotion;
  }, [onDestinationHover, reducedMotion]);

  // ── Loading skeleton ──────────────────────────────────────────────
  if (!GlobeComponent) {
    return (
      <div
        ref={containerRef}
        className="w-full flex items-center justify-center"
        style={{ height: dims.height, background: 'linear-gradient(to bottom, #F5F8FC, #EBF4FF)' }}
      >
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

  // ── Globe ─────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ height: dims.height }}
      aria-label="Interactive 3D globe — MKM Air Travels destination network"
    >
      <GlobeComponent
        ref={globeRef}
        width={dims.width}
        height={dims.height}

        // Earth
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="#90CAF9"
        atmosphereAltitude={0.14}
        backgroundColor="rgba(0,0,0,0)"

        // Flight routes — thin, animated, low opacity
        arcsData={arcs}
        arcStartLat={(d: typeof arcs[0]) => d.startLat}
        arcStartLng={(d: typeof arcs[0]) => d.startLng}
        arcEndLat={(d: typeof arcs[0]) => d.endLat}
        arcEndLng={(d: typeof arcs[0]) => d.endLng}
        arcColor={(d: typeof arcs[0]) => d.color}
        arcAltitude={0.22}
        arcStroke={0.28}
        arcDashLength={0.28}
        arcDashGap={0.72}
        arcDashAnimateTime={reducedMotion ? 0 : 3800}
        arcDashInitialGap={() => Math.random()}

        // Destination dots — clean, uniform
        pointsData={points}
        pointLat={(d: PointDatum) => d.lat}
        pointLng={(d: PointDatum) => d.lng}
        pointColor={(d: PointDatum) => d.color}
        pointAltitude={0.01}
        pointRadius={(d: PointDatum) => d.radius}
        pointsMerge={false}
        pointResolution={12}
        onPointHover={handlePointHover}

        onGlobeReady={handleGlobeReady}
        animateIn={!reducedMotion}
      />
    </div>
  );
}
