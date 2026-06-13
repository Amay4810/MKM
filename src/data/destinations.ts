export interface Destination {
  city: string;
  country: string;
  region: string;
  lat: number;
  lng: number;
  travelType: string;
}

export const destinations: Destination[] = [
  // South Asia
  { city: 'New Delhi',  country: 'India',       region: 'South Asia',  lat: 28.6139,  lng: 77.2090,  travelType: 'Hub' },
  { city: 'Mumbai',     country: 'India',        region: 'South Asia',  lat: 19.0760,  lng: 72.8777,  travelType: 'Corporate & Leisure' },
  { city: 'Bangalore',  country: 'India',        region: 'South Asia',  lat: 12.9716,  lng: 77.5946,  travelType: 'Corporate' },
  { city: 'Kolkata',    country: 'India',        region: 'South Asia',  lat: 22.5726,  lng: 88.3639,  travelType: 'Corporate' },
  { city: 'Chennai',    country: 'India',        region: 'South Asia',  lat: 13.0827,  lng: 80.2707,  travelType: 'Corporate' },
  { city: 'Colombo',    country: 'Sri Lanka',    region: 'South Asia',  lat: 6.9271,   lng: 79.8612,  travelType: 'Leisure & Corporate' },
  { city: 'Kathmandu',  country: 'Nepal',        region: 'South Asia',  lat: 27.7172,  lng: 85.3240,  travelType: 'Leisure' },
  { city: 'Dhaka',      country: 'Bangladesh',   region: 'South Asia',  lat: 23.8103,  lng: 90.4125,  travelType: 'Corporate' },

  // Middle East
  { city: 'Dubai',       country: 'UAE',          region: 'Middle East', lat: 25.2048,  lng: 55.2708,  travelType: 'Corporate & MICE' },
  { city: 'Abu Dhabi',   country: 'UAE',          region: 'Middle East', lat: 24.4539,  lng: 54.3773,  travelType: 'Corporate' },
  { city: 'Doha',        country: 'Qatar',        region: 'Middle East', lat: 25.2854,  lng: 51.5310,  travelType: 'Corporate & MICE' },
  { city: 'Riyadh',      country: 'Saudi Arabia', region: 'Middle East', lat: 24.7136,  lng: 46.6753,  travelType: 'Corporate' },
  { city: 'Muscat',      country: 'Oman',         region: 'Middle East', lat: 23.5880,  lng: 58.3829,  travelType: 'Leisure & Corporate' },
  { city: 'Kuwait City', country: 'Kuwait',       region: 'Middle East', lat: 29.3759,  lng: 47.9774,  travelType: 'Corporate' },
  { city: 'Bahrain',     country: 'Bahrain',      region: 'Middle East', lat: 26.0667,  lng: 50.5577,  travelType: 'Corporate' },

  // Southeast Asia
  { city: 'Singapore',    country: 'Singapore',  region: 'SE Asia',  lat: 1.3521,   lng: 103.8198, travelType: 'Corporate & MICE' },
  { city: 'Bangkok',      country: 'Thailand',   region: 'SE Asia',  lat: 13.7563,  lng: 100.5018, travelType: 'Leisure & MICE' },
  { city: 'Kuala Lumpur', country: 'Malaysia',   region: 'SE Asia',  lat: 3.1390,   lng: 101.6869, travelType: 'Leisure & Corporate' },
  { city: 'Bali',         country: 'Indonesia',  region: 'SE Asia',  lat: -8.3405,  lng: 115.0920, travelType: 'Leisure' },
  { city: 'Manila',       country: 'Philippines',region: 'SE Asia',  lat: 14.5995,  lng: 120.9842, travelType: 'Corporate' },

  // East Asia
  { city: 'Tokyo',     country: 'Japan',       region: 'East Asia', lat: 35.6762,  lng: 139.6503, travelType: 'Corporate & Leisure' },
  { city: 'Beijing',   country: 'China',       region: 'East Asia', lat: 39.9042,  lng: 116.4074, travelType: 'Corporate' },
  { city: 'Hong Kong', country: 'Hong Kong',   region: 'East Asia', lat: 22.3193,  lng: 114.1694, travelType: 'Corporate & MICE' },
  { city: 'Seoul',     country: 'South Korea', region: 'East Asia', lat: 37.5665,  lng: 126.9780, travelType: 'Corporate & Leisure' },

  // Europe
  { city: 'London',    country: 'UK',          region: 'Europe', lat: 51.5074,  lng: -0.1278,  travelType: 'Corporate & Leisure' },
  { city: 'Paris',     country: 'France',      region: 'Europe', lat: 48.8566,  lng: 2.3522,   travelType: 'Leisure & MICE' },
  { city: 'Frankfurt', country: 'Germany',     region: 'Europe', lat: 50.1109,  lng: 8.6821,   travelType: 'Corporate' },
  { city: 'Amsterdam', country: 'Netherlands', region: 'Europe', lat: 52.3676,  lng: 4.9041,   travelType: 'Corporate & Leisure' },
  { city: 'Zurich',    country: 'Switzerland', region: 'Europe', lat: 47.3769,  lng: 8.5417,   travelType: 'Corporate' },
  { city: 'Rome',      country: 'Italy',       region: 'Europe', lat: 41.9028,  lng: 12.4964,  travelType: 'Leisure' },
  { city: 'Madrid',    country: 'Spain',       region: 'Europe', lat: 40.4168,  lng: -3.7038,  travelType: 'Leisure & Corporate' },
  { city: 'Vienna',    country: 'Austria',     region: 'Europe', lat: 48.2082,  lng: 16.3738,  travelType: 'Corporate & MICE' },
  { city: 'Istanbul',  country: 'Turkey',      region: 'Europe', lat: 41.0082,  lng: 28.9784,  travelType: 'Corporate & Leisure' },

  // Americas
  { city: 'New York',      country: 'USA',    region: 'Americas', lat: 40.7128,  lng: -74.0060,  travelType: 'Corporate & Leisure' },
  { city: 'Los Angeles',   country: 'USA',    region: 'Americas', lat: 34.0522,  lng: -118.2437, travelType: 'Leisure & Corporate' },
  { city: 'Chicago',       country: 'USA',    region: 'Americas', lat: 41.8781,  lng: -87.6298,  travelType: 'Corporate' },
  { city: 'Toronto',       country: 'Canada', region: 'Americas', lat: 43.6532,  lng: -79.3832,  travelType: 'Corporate' },
  { city: 'San Francisco', country: 'USA',    region: 'Americas', lat: 37.7749,  lng: -122.4194, travelType: 'Corporate' },

  // Africa
  { city: 'Nairobi',       country: 'Kenya',        region: 'Africa', lat: -1.2921,  lng: 36.8219,  travelType: 'Corporate & Leisure' },
  { city: 'Johannesburg',  country: 'South Africa', region: 'Africa', lat: -26.2041, lng: 28.0473,  travelType: 'Corporate' },
  { city: 'Cairo',         country: 'Egypt',        region: 'Africa', lat: 30.0444,  lng: 31.2357,  travelType: 'Leisure & Corporate' },

  // Oceania
  { city: 'Sydney',    country: 'Australia', region: 'Oceania', lat: -33.8688, lng: 151.2093, travelType: 'Leisure & Corporate' },
  { city: 'Melbourne', country: 'Australia', region: 'Oceania', lat: -37.8136, lng: 144.9631, travelType: 'Leisure' },
];

// Corporate blue palette — each region gets a distinct blue shade
export const regionColors: Record<string, string> = {
  'South Asia':  '#0A4DA2',
  'Middle East': '#1565C0',
  'SE Asia':     '#1976D2',
  'East Asia':   '#1E88E5',
  'Europe':      '#2196F3',
  'Americas':    '#42A5F5',
  'Africa':      '#0D47A1',
  'Oceania':     '#1565C0',
};

// Geo centroids for rotating globe to each region
export const regionCentroids: Record<string, { lat: number; lng: number; altitude: number }> = {
  'All':         { lat: 20,  lng: 0,    altitude: 2.5 },
  'South Asia':  { lat: 20,  lng: 82,   altitude: 1.8 },
  'Middle East': { lat: 25,  lng: 50,   altitude: 1.8 },
  'SE Asia':     { lat: 5,   lng: 110,  altitude: 1.9 },
  'East Asia':   { lat: 35,  lng: 120,  altitude: 1.8 },
  'Europe':      { lat: 50,  lng: 10,   altitude: 1.8 },
  'Americas':    { lat: 38,  lng: -95,  altitude: 2.0 },
  'Africa':      { lat: 5,   lng: 25,   altitude: 2.0 },
  'Oceania':     { lat: -28, lng: 140,  altitude: 2.0 },
};