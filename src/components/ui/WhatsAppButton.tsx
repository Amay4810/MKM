import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/navigation';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Delay entrance animation until page settles (1.5s)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20a%20travel%20enquiry.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] text-white shadow-lg hover:bg-[#20B858] hover:shadow-xl hover:scale-110 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 rounded-full no-print group"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(80px) scale(0.6)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
      }}
      aria-label="Contact MKM Air Travels on WhatsApp"
      title="WhatsApp Us"
    >
      <MessageCircle size={22} strokeWidth={2} />
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      {/* Tooltip */}
      <span
        className="absolute right-full mr-3 px-3 py-1.5 bg-[#0D2B45] text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none shadow-lg"
        aria-hidden="true"
      >
        Chat with us
        <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#0D2B45] rotate-45" />
      </span>
    </a>
  );
}
