// ─── Navigation ───────────────────────────────
export interface NavItem {
  label: string;
  path: string;
}

// ─── Service ───────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  fullDescription?: string;
}

// ─── FAQ ───────────────────────────────────────
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ─── Stat ───────────────────────────────────────
export interface Stat {
  id: string;
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description?: string;
}

// ─── Why MKM Reason ────────────────────────────
export interface WhyReason {
  id: string;
  number: string;
  title: string;
  description: string;
}

// ─── Contact Info ──────────────────────────────
export interface ContactInfo {
  phones: string[];
  email: string;
  address: string;
  gstin: string;
  whatsapp: string;
}

// ─── SEO Meta ─────────────────────────────────
export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
}
