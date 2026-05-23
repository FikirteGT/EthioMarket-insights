export interface Market {
  id: string;
  name: string;
  region: string;
  city: string;
  lat: number;
  lng: number;
}

export interface PriceData {
  marketId: string;
  product: string;
  price: number; // ETB per unit
  unit: string;
  date: string;
  trend: 'rising' | 'stable' | 'falling';
  reliability: 'High' | 'Medium' | 'Low';
}

export interface HistoricalPrice {
  date: string;
  marketId: string;
  product: string;
  price: number;
}

export const MARKETS: Market[] = [
  { id: 'aa-merkato', name: 'Merkato Market', region: 'Addis Ababa', city: 'Addis Ababa', lat: 9.0249, lng: 38.7469 },
  { id: 'adama-central', name: 'Adama Central', region: 'Oromia', city: 'Adama', lat: 8.5410, lng: 39.2684 },
  { id: 'bd-market', name: 'Bahir Dar Market', region: 'Amhara', city: 'Bahir Dar', lat: 11.5936, lng: 37.3908 },
  { id: 'hawassa-central', name: 'Hawassa Market', region: 'Sidama', city: 'Hawassa', lat: 7.0620, lng: 38.4720 },
  { id: 'dd-market', name: 'Dire Dawa Market', region: 'Dire Dawa', city: 'Dire Dawa', lat: 9.6009, lng: 41.8591 },
  { id: 'mekelle-market', name: 'Mekelle Market', region: 'Tigray', city: 'Mekelle', lat: 13.4967, lng: 39.4794 },
  { id: 'jimma-market', name: 'Jimma Market', region: 'Oromia', city: 'Jimma', lat: 7.6733, lng: 36.8347 },
  { id: 'shashemene', name: 'Shashemene Market', region: 'Oromia', city: 'Shashemene', lat: 7.2000, lng: 38.6000 },
];

export const PRODUCTS = [
  { id: 'onion', name: 'Onion', unit: 'Quintal' },
  { id: 'tomato', name: 'Tomato', unit: 'Crate (approx 20kg)' },
  { id: 'teff-white', name: 'Teff (White)', unit: 'Quintal' },
  { id: 'teff-red', name: 'Teff (Red)', unit: 'Quintal' },
  { id: 'maize', name: 'Maize', unit: 'Quintal' },
  { id: 'pepper', name: 'Green Pepper', unit: 'Quintal' },
];

export const TRANSPORT_METHODS = [
  { id: 'truck', name: 'Truck', costPerKmPerUnit: 2.5 },
  { id: 'bajaj', name: 'Bajaj', costPerKmPerUnit: 5.0 },
  { id: 'cart', name: 'Horse Cart', costPerKmPerUnit: 1.5 },
  { id: 'manual', name: 'Manual/Donkey', costPerKmPerUnit: 0.8 },
];

// Mock NMIS Data (Weekly Official Data)
export const MOCK_PRICES: PriceData[] = [
  { marketId: 'aa-merkato', product: 'teff-white', price: 12500, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'aa-merkato', product: 'onion', price: 4200, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'aa-merkato', product: 'tomato', price: 850, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'aa-merkato', product: 'maize', price: 4100, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'aa-merkato', product: 'pepper', price: 5200, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'aa-merkato', product: 'teff-red', price: 11800, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  
  { marketId: 'adama-central', product: 'teff-white', price: 11800, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'adama-central', product: 'onion', price: 3900, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'adama-central', product: 'tomato', price: 780, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'adama-central', product: 'maize', price: 3850, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'adama-central', product: 'pepper', price: 4900, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'adama-central', product: 'teff-red', price: 11200, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  
  { marketId: 'bd-market', product: 'teff-white', price: 10500, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'bd-market', product: 'onion', price: 3600, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'bd-market', product: 'tomato', price: 720, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'bd-market', product: 'maize', price: 3650, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'bd-market', product: 'pepper', price: 4600, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'bd-market', product: 'teff-red', price: 10200, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  
  { marketId: 'hawassa-central', product: 'teff-white', price: 11200, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'hawassa-central', product: 'onion', price: 3800, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'hawassa-central', product: 'tomato', price: 800, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'hawassa-central', product: 'maize', price: 3950, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'hawassa-central', product: 'pepper', price: 5000, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'hawassa-central', product: 'teff-red', price: 10900, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  
  { marketId: 'dd-market', product: 'teff-white', price: 11600, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'dd-market', product: 'onion', price: 4000, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'dd-market', product: 'tomato', price: 820, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'dd-market', product: 'maize', price: 4050, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'dd-market', product: 'pepper', price: 5100, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'dd-market', product: 'teff-red', price: 11400, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  
  { marketId: 'mekelle-market', product: 'teff-white', price: 10800, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'mekelle-market', product: 'onion', price: 3700, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'mekelle-market', product: 'tomato', price: 750, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'mekelle-market', product: 'maize', price: 3750, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'mekelle-market', product: 'pepper', price: 4800, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'mekelle-market', product: 'teff-red', price: 10500, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  
  { marketId: 'jimma-market', product: 'teff-white', price: 10200, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'jimma-market', product: 'onion', price: 3500, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'jimma-market', product: 'tomato', price: 680, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'jimma-market', product: 'maize', price: 3800, unit: 'Quintal', date: '2023-10-25', trend: 'rising', reliability: 'High' },
  { marketId: 'jimma-market', product: 'pepper', price: 4500, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  { marketId: 'jimma-market', product: 'teff-red', price: 9900, unit: 'Quintal', date: '2023-10-25', trend: 'falling', reliability: 'High' },
  
  { marketId: 'shashemene', product: 'teff-white', price: 10900, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'shashemene', product: 'onion', price: 3650, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'shashemene', product: 'tomato', price: 650, unit: 'Crate (approx 20kg)', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'shashemene', product: 'maize', price: 3700, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'shashemene', product: 'pepper', price: 4700, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
  { marketId: 'shashemene', product: 'teff-red', price: 10600, unit: 'Quintal', date: '2023-10-25', trend: 'stable', reliability: 'High' },
];