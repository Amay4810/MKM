import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumb({ items, light = true }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5" role="list">
        <li>
          <Link
            to="/"
            className={`flex items-center text-xs font-medium transition-colors duration-200 ${
              light ? 'text-white/40 hover:text-white/70' : 'text-slate-light hover:text-navy'
            }`}
            aria-label="Home"
          >
            <Home size={12} />
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight
              size={12}
              className={light ? 'text-white/20' : 'text-slate-light/50'}
              aria-hidden="true"
            />
            {item.path && i < items.length - 1 ? (
              <Link
                to={item.path}
                className={`text-xs font-medium transition-colors duration-200 ${
                  light ? 'text-white/40 hover:text-white/70' : 'text-slate-light hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`text-xs font-medium ${
                  light ? 'text-white/65' : 'text-charcoal'
                }`}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
