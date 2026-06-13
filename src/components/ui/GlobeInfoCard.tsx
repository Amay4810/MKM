import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, Briefcase, Palmtree, Building2, Plane } from 'lucide-react';
import type { Destination } from '../../data/destinations';
import { regionColors } from '../../data/destinations';

interface GlobeInfoCardProps {
  destination: Destination;
}

function getTravelIcon(type: string) {
  const t = type.toLowerCase();
  if (t.includes('mice')) return <Building2 size={11} />;
  if (t.includes('leisure') && !t.includes('corporate')) return <Palmtree size={11} />;
  if (t.includes('corporate')) return <Briefcase size={11} />;
  return <Plane size={11} />;
}

function formatCoord(val: number, isLat: boolean) {
  const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
  return `${Math.abs(val).toFixed(1)}°${dir}`;
}

export default function GlobeInfoCard({ destination }: GlobeInfoCardProps) {
  const regionColor = regionColors[destination.region] ?? '#0A4DA2';
  const isHub = destination.city === 'New Delhi';

  return (
    <motion.div
      key={`${destination.city}-${destination.country}`}
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pointer-events-auto"
      role="tooltip"
      aria-live="polite"
    >
      <div className="bg-white rounded-xl border border-[#E5EAF2] shadow-[0_12px_40px_rgba(10,77,162,0.14),0_2px_8px_rgba(0,0,0,0.06)] w-56 overflow-hidden">

        {/* Animated top bar */}
        <motion.div
          className="h-[3px] w-full"
          style={{ backgroundColor: regionColor }}
          layoutId="card-bar"
        />

        <div className="p-4">

          {/* Hub badge with pulse */}
          <AnimatePresence>
            {isHub && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5 mb-2.5"
              >
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.1em] text-white"
                  style={{ backgroundColor: regionColor }}
                >
                  {/* Pulse dot */}
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                      style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                    />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  Hub City
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* City & Country */}
          <motion.div layout>
            <h3 className="font-sans font-semibold text-[#0D2B45] text-[15px] leading-tight tracking-[-0.01em]">
              {destination.city}
            </h3>
            <p className="text-[11px] text-[#7A8494] mt-0.5 font-medium">
              {destination.country}
            </p>
          </motion.div>

          {/* Divider */}
          <div className="mt-3 mb-3 h-px bg-[#EEF1F6]" />

          {/* Meta rows */}
          <div className="flex flex-col gap-2">

            {/* Region */}
            <div className="flex items-center gap-2">
              <Globe size={11} className="flex-shrink-0" style={{ color: regionColor }} />
              <span className="text-[11px] text-[#5A6474] font-medium">{destination.region}</span>
              {/* Region color pill */}
              <span
                className="ml-auto w-2 h-2 rounded-full flex-shrink-0 opacity-80"
                style={{ backgroundColor: regionColor }}
              />
            </div>

            {/* Travel type */}
            {!isHub && destination.travelType && (
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0" style={{ color: regionColor }}>
                  {getTravelIcon(destination.travelType)}
                </span>
                <span className="text-[11px] text-[#5A6474]">{destination.travelType}</span>
              </div>
            )}

            {/* Coordinates */}
            <div className="flex items-center gap-2">
              <MapPin size={11} className="flex-shrink-0 text-[#A0A8B4]" />
              <span className="text-[10px] text-[#A0A8B4] font-mono tracking-wide">
                {formatCoord(destination.lat, true)}&nbsp;&nbsp;{formatCoord(destination.lng, false)}
              </span>
            </div>

          </div>
        </div>

        {/* Bottom accent strip — subtle region color wash */}
        <div
          className="h-0.5 w-full opacity-30"
          style={{ backgroundColor: regionColor }}
        />
      </div>
    </motion.div>
  );
}
