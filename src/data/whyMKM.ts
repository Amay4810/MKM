import type { WhyReason, Stat } from '../types';

export const whyReasons: WhyReason[] = [
  {
    id: 'reason-1',
    number: '01',
    title: 'Established Since 1999',
    description:
      'MKM brings over 25 years of continuity and operational experience in the travel industry - a track record built through consistent service, not marketing.',
  },
  {
    id: 'reason-2',
    number: '02',
    title: 'IATA Accredited & TAAI Affiliated',
    description:
      'Our credentials reflect our long-standing presence within the professional travel ecosystem, ensuring clients work with a recognised and accountable travel company.',
  },
  {
    id: 'reason-3',
    number: '03',
    title: 'Corporate Travel Understanding',
    description:
      'We understand the need for speed, flexibility, accurate coordination, transparent billing, and dependable follow-through in business travel environments.',
  },
  {
    id: 'reason-4',
    number: '04',
    title: 'Personalised Human Support',
    description:
      'Clients receive direct attention from an experienced team that handles travel requirements with ownership - not automated systems or impersonal workflows.',
  },
  {
    id: 'reason-5',
    number: '05',
    title: 'Strong Handling Across Travel Categories',
    description:
      'Corporate ticketing, hotels, visas, transfers, MICE travel, group travel, leisure bookings, forex coordination, and travel insurance assistance - all under one roof.',
  },
  {
    id: 'reason-6',
    number: '06',
    title: 'Relationship-Led Service',
    description:
      'MKM has grown through trust, repeat clients, and long-term relationships rather than high-volume, impersonal transactions. We treat every client engagement with the seriousness it deserves.',
  },
];

export const stats: Stat[] = [
  {
    id: 'stat-1',
    value: '25+',
    numericValue: 25,
    suffix: '+',
    label: 'Years of Experience',
    description: 'Operating continuously since 1999',
  },
  {
    id: 'stat-2',
    value: '1,00,000+',
    numericValue: 100_000,
    suffix: '+',
    label: 'Corporate Travel Requirements',
    description: 'Managed across India & worldwide',
  },
  {
    id: 'stat-3',
    value: '24/7',
    numericValue: 24,
    suffix: '/7',
    label: 'Travel Assistance',
    description: 'For urgent and critical travel',
  },
  {
    id: 'stat-4',
    value: '8+',
    numericValue: 8,
    suffix: '+',
    label: 'Service Categories',
    description: 'End-to-end travel solutions',
  },
];
