import { motion, AnimatePresence } from 'framer-motion';
import { destinations, regionColors } from '../../data/destinations';

const REGIONS = [
  'All',
  'South Asia',
  'Middle East',
  'SE Asia',
  'East Asia',
  'Europe',
  'Americas',
  'Africa',
  'Oceania',
];

interface RegionSegmentedControlProps {
  activeRegion: string;
  onChange: (region: string) => void;
}

function getRegionCount(region: string) {
  if (region === 'All') return destinations.length;
  return destinations.filter((d) => d.region === region).length;
}

export default function RegionSegmentedControl({
  activeRegion,
  onChange,
}: RegionSegmentedControlProps) {
  return (
    <div
      className="flex items-center gap-1.5 overflow-x-auto pb-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      role="group"
      aria-label="Filter destinations by region"
    >
      <style>{`.region-scroller::-webkit-scrollbar { display: none; }`}</style>

      {REGIONS.map((region) => {
        const isActive = activeRegion === region;
        const color = regionColors[region] ?? '#0A4DA2';
        const count = getRegionCount(region);

        return (
          <motion.button
            key={region}
            onClick={() => onChange(region)}
            className={[
              'relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium',
              'whitespace-nowrap flex-shrink-0 border outline-none',
              'focus-visible:ring-2 focus-visible:ring-[#0A4DA2] focus-visible:ring-offset-2',
              isActive
                ? 'text-white border-transparent shadow-[0_2px_12px_rgba(10,77,162,0.28)]'
                : 'text-[#5A6474] bg-white border-[#E5EAF2] hover:border-[#B8C8DF] hover:text-[#0D2B45]',
            ].join(' ')}
            style={isActive ? { backgroundColor: color, borderColor: color } : {}}
            aria-pressed={isActive}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
          >
            {/* Animated background fill for active state */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="region-pill-bg"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                />
              )}
            </AnimatePresence>

            {/* Content sits above the animated bg */}
            <span className="relative flex items-center gap-1.5">
              {region !== 'All' && (
                <motion.span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : color,
                  }}
                  animate={{
                    scale: isActive ? [1, 1.3, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}

              <span>{region}</span>

              <motion.span
                className={[
                  'text-[10px] font-semibold tabular-nums',
                  isActive ? 'text-white/70' : 'text-[#A0A8B4]',
                ].join(' ')}
                key={`${region}-${count}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                {count}
              </motion.span>
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
