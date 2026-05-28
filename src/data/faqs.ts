import type { FAQItem } from '../types';

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What does MKM Air Travels specialise in?',
    answer:
      'MKM provides end to end travel solutions including corporate travel management, air ticketing, hotel bookings, visa assistance, car rentals, transfers, corporate MICE travel, group handling, leisure travel, forex coordination, and travel insurance assistance.',
    category: 'General',
  },
  {
    id: 'faq-2',
    question: 'Does MKM work with corporate clients?',
    answer:
      'Yes. MKM works with corporates, SMEs, institutions, and businesses requiring reliable travel management support for regular and ad hoc travel needs.',
    category: 'Corporate',
  },
  {
    id: 'faq-3',
    question: 'Can MKM handle urgent or last minute travel requests?',
    answer:
      'Yes. Our team regularly assists with urgent bookings, itinerary changes, last minute travel requirements, and time sensitive coordination, subject to availability and airline or supplier rules.',
    category: 'Corporate',
  },
  {
    id: 'faq-4',
    question: 'Does MKM manage group bookings and MICE travel?',
    answer:
      'Yes. MKM supports group travel, corporate offsites, meetings, incentive movements, conferences, exhibitions, delegate travel, and related accommodation and transfer coordination.',
    category: 'MICE & Groups',
  },
  {
    id: 'faq-5',
    question: 'Can MKM provide GST compliant invoices?',
    answer:
      'Yes. MKM is a GST registered private limited company and provides GST compliant billing as applicable.',
    category: 'Billing',
  },
  {
    id: 'faq-6',
    question: 'Does MKM provide visa services?',
    answer:
      'MKM assists with visa documentation guidance and process coordination. Visa approval remains subject to the decision of the relevant embassy, consulate, or issuing authority.',
    category: 'Visa',
  },
  {
    id: 'faq-7',
    question: 'Does MKM offer credit facilities to corporate clients?',
    answer:
      'Credit facility may be considered for eligible corporate accounts after evaluation and agreement of commercial terms.',
    category: 'Billing',
  },
  {
    id: 'faq-8',
    question: 'Does MKM handle leisure holidays too?',
    answer:
      'Yes. Alongside corporate travel, MKM also supports customised holidays, cruises, rail passes, and travel planning for individual and family trips.',
    category: 'Leisure',
  },
  {
    id: 'faq-9',
    question: 'How can we contact MKM?',
    answer:
      'You can contact the team directly by phone, WhatsApp, or email using the details on the Contact Us page. The fastest way to reach us is by call or WhatsApp.',
    category: 'General',
  },
];

export const faqCategories = ['All', 'General', 'Corporate', 'MICE & Groups', 'Billing', 'Visa', 'Leisure'];
