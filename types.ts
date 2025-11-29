
export enum PricingModelType {
  SUBSCRIPTION = 'Subscription',
  BUYOUT = 'Buyout',
  CUSTOM = 'Custom'
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  benefit: string;
  icon?: React.ReactNode;
  animation?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  challenge: string;
  result: string;
  tech: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
