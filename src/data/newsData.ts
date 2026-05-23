export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: 'market' | 'policy' | 'economic' | 'agriculture';
  source: string;
  date: string;
  region?: string;
  impact: 'high' | 'medium' | 'low';
  imageUrl?: string;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Teff Prices Surge 15% in Addis Ababa Markets',
    summary: 'White teff prices have increased significantly due to reduced supply from major producing regions. Farmers report lower yields this season due to irregular rainfall patterns.',
    category: 'market',
    source: 'Ethiopian Herald',
    date: '2024-01-15',
    region: 'Addis Ababa',
    impact: 'high',
  },
  {
    id: '2',
    title: 'New Agricultural Subsidy Program Announced',
    summary: 'Ministry of Agriculture announces 2 billion ETB subsidy program for smallholder farmers focusing on fertilizer and improved seed distribution across all regions.',
    category: 'policy',
    source: 'Ministry of Agriculture',
    date: '2024-01-14',
    impact: 'high',
  },
  {
    id: '3',
    title: 'Coffee Export Revenue Reaches Record High',
    summary: 'Ethiopia earned $1.2 billion from coffee exports in the first half of the fiscal year, marking a 23% increase compared to the same period last year.',
    category: 'economic',
    source: 'Ethiopian Coffee & Tea Authority',
    date: '2024-01-13',
    impact: 'medium',
  },
  {
    id: '4',
    title: 'Onion Prices Drop in Oromia Region Markets',
    summary: 'Abundant harvest in East Shewa and West Arsi zones leads to 20% price reduction. Farmers urged to explore storage and processing options to maintain profitability.',
    category: 'market',
    source: 'Oromia Broadcasting Network',
    date: '2024-01-12',
    region: 'Oromia',
    impact: 'medium',
  },
  {
    id: '5',
    title: 'Government Lifts Export Ban on Selected Crops',
    summary: 'Export restrictions on maize and wheat lifted for registered commercial farmers. New regulations require 30% of production to be sold to domestic markets first.',
    category: 'policy',
    source: 'Ministry of Trade',
    date: '2024-01-11',
    impact: 'high',
  },
  {
    id: '6',
    title: 'Inflation Rate Declines to 28.5%',
    summary: 'National Bank of Ethiopia reports consumer price inflation decreased from 31.2% to 28.5%, driven by stable food prices and improved supply chains.',
    category: 'economic',
    source: 'National Bank of Ethiopia',
    date: '2024-01-10',
    impact: 'high',
  },
  {
    id: '7',
    title: 'New Irrigation Projects to Benefit 50,000 Farmers',
    summary: 'Three major irrigation schemes in Amhara and Tigray regions set to commence, expected to increase crop production by 40% in target areas.',
    category: 'agriculture',
    source: 'Ethiopian News Agency',
    date: '2024-01-09',
    region: 'Amhara',
    impact: 'medium',
  },
  {
    id: '8',
    title: 'Tomato Glut Affects Prices in Southern Markets',
    summary: 'Hawassa and Shashemene markets experience oversupply of tomatoes. Prices fall below production costs, prompting calls for better market coordination.',
    category: 'market',
    source: 'Sidama Media Network',
    date: '2024-01-08',
    region: 'Sidama',
    impact: 'medium',
  },
  {
    id: '9',
    title: 'Digital Payment System Launched for Agricultural Markets',
    summary: 'New mobile-based payment platform aims to reduce cash transactions and improve transparency in commodity trading across major markets.',
    category: 'policy',
    source: 'Ministry of Innovation',
    date: '2024-01-07',
    impact: 'medium',
  },
  {
    id: '10',
    title: 'Drought Warning Issued for Eastern Regions',
    summary: 'Meteorological agency warns of below-average rainfall in Somali and parts of Oromia regions. Farmers advised to prepare contingency plans.',
    category: 'agriculture',
    source: 'Ethiopian Meteorological Institute',
    date: '2024-01-06',
    impact: 'high',
  },
];

export const ECONOMIC_INDICATORS: EconomicIndicator[] = [
  {
    id: '1',
    name: 'Consumer Price Index (CPI)',
    value: '28.5%',
    change: -2.7,
    trend: 'down',
    period: 'December 2023',
  },
  {
    id: '2',
    name: 'USD/ETB Exchange Rate',
    value: '115.50 ETB',
    change: 1.2,
    trend: 'up',
    period: 'January 2024',
  },
  {
    id: '3',
    name: 'Agricultural GDP Growth',
    value: '6.8%',
    change: 0.5,
    trend: 'up',
    period: 'Q4 2023',
  },
  {
    id: '4',
    name: 'Food Price Index',
    value: '245.3',
    change: -3.2,
    trend: 'down',
    period: 'December 2023',
  },
  {
    id: '5',
    name: 'Export Revenue (Agriculture)',
    value: '$2.8B',
    change: 12.5,
    trend: 'up',
    period: 'H1 FY2024',
  },
  {
    id: '6',
    name: 'Fertilizer Import Volume',
    value: '850K MT',
    change: 8.3,
    trend: 'up',
    period: 'Q4 2023',
  },
];
