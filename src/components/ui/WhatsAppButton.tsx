import { MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/navigation';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${contactInfo.whatsapp}?text=Hello%20MKM%20Air%20Travels%2C%20I%20have%20a%20travel%20enquiry.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-[52px] h-[52px] bg-[#25D366] text-white shadow-lg hover:bg-[#20B858] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 rounded-full no-print"
      aria-label="Contact MKM Air Travels on WhatsApp"
      title="WhatsApp Us"
    >
      <MessageCircle size={22} strokeWidth={2} />
    </a>
  );
}
