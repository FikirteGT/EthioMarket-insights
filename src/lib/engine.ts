import { Market, PriceData, MOCK_PRICES, MARKETS, TRANSPORT_METHODS } from '../data/mockData';

export interface AnalysisResult {
  market: Market;
  priceData: PriceData;
  distanceKm: number;
  transportCost: number;
  grossRevenue: number;
  netProfit: number;
  rank: number;
}

// Simple Haversine distance formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function analyzeMarkets(
  userLat: number,
  userLng: number,
  productId: string,
  quantity: number,
  transportMethodId: string,
  specificMarketId?: string
): AnalysisResult[] {
  const transportMethod = TRANSPORT_METHODS.find(m => m.id === transportMethodId) || TRANSPORT_METHODS[0];
  
  let targetMarkets = MARKETS;
  if (specificMarketId && specificMarketId !== 'best') {
    targetMarkets = MARKETS.filter(m => m.id === specificMarketId);
  }

  const results: AnalysisResult[] = targetMarkets.map(market => {
    const priceData = MOCK_PRICES.find(p => p.marketId === market.id && p.product === productId);
    
    if (!priceData) return null;

    const distanceKm = calculateDistance(userLat, userLng, market.lat, market.lng);
    const transportCost = distanceKm * transportMethod.costPerKmPerUnit * quantity;
    const grossRevenue = priceData.price * quantity;
    const netProfit = grossRevenue - transportCost;

    return {
      market,
      priceData,
      distanceKm: Math.round(distanceKm * 10) / 10,
      transportCost: Math.round(transportCost),
      grossRevenue,
      netProfit: Math.round(netProfit),
      rank: 0
    };
  }).filter((r): r is AnalysisResult => r !== null);

  // Rank by net profit
  return results
    .sort((a, b) => b.netProfit - a.netProfit)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}