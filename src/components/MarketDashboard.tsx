import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import { MARKETS, PRODUCTS, MOCK_PRICES } from '../data/mockData';

const MarketDashboard: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);

  // Get price data for selected product across markets
  const productPrices = MARKETS.map(market => {
    const priceData = MOCK_PRICES.find(
      p => p.marketId === market.id && p.product === selectedProduct
    );
    return {
      market: market.name,
      region: market.region,
      price: priceData?.price || 0,
      trend: priceData?.trend || 'stable',
    };
  }).sort((a, b) => b.price - a.price);

  // Historical data simulation (last 6 weeks)
  const historicalData = Array.from({ length: 6 }, (_, i) => {
    const weekAgo = 6 - i;
    return {
      week: `Week ${i + 1}`,
      'Addis Ababa': 12500 - weekAgo * 200 + Math.random() * 300,
      'Adama': 11800 - weekAgo * 180 + Math.random() * 250,
      'Bahir Dar': 10500 - weekAgo * 150 + Math.random() * 200,
      'Hawassa': 11200 - weekAgo * 170 + Math.random() * 220,
    };
  });

  // Regional comparison data
  const regionalData = [
    { region: 'Addis Ababa', avgPrice: 8500, markets: 1 },
    { region: 'Oromia', avgPrice: 7200, markets: 3 },
    { region: 'Amhara', avgPrice: 6800, markets: 1 },
    { region: 'Sidama', avgPrice: 7500, markets: 1 },
    { region: 'Dire Dawa', avgPrice: 7900, markets: 1 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'falling':
        return <TrendingDown className="text-red-600" size={16} />;
      default:
        return <Minus className="text-gray-600" size={16} />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising':
        return 'bg-green-100 text-green-800';
      case 'falling':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Market Data Dashboard</h1>
        <p className="text-slate-600">Real-time commodity prices and market insights</p>
      </div>

      {/* Product Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Select Commodity</label>
        <div className="flex flex-wrap gap-2">
          {PRODUCTS.map(product => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedProduct === product.id
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-green-600'
              }`}
            >
              {product.name}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="prices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="prices">Current Prices</TabsTrigger>
          <TabsTrigger value="trends">Price Trends</TabsTrigger>
          <TabsTrigger value="regional">Regional View</TabsTrigger>
        </TabsList>

        {/* Current Prices Tab */}
        <TabsContent value="prices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {productPrices.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{item.market}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                        <MapPin size={14} />
                        <span>{item.region}</span>
                      </div>
                    </div>
                    <Badge className={getTrendColor(item.trend)}>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(item.trend)}
                        <span className="capitalize">{item.trend}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">
                    {item.price.toLocaleString()} <span className="text-lg text-slate-500">ETB</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    per {PRODUCTS.find(p => p.id === selectedProduct)?.unit}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Price Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>6-Week Price Trends</CardTitle>
              <p className="text-sm text-slate-500">Historical price movements across major markets</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `${value.toFixed(0)} ETB`}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Addis Ababa" stroke="#16a34a" strokeWidth={2} />
                  <Line type="monotone" dataKey="Adama" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="Bahir Dar" stroke="#dc2626" strokeWidth={2} />
                  <Line type="monotone" dataKey="Hawassa" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Regional Comparison Tab */}
        <TabsContent value="regional">
          <Card>
            <CardHeader>
              <CardTitle>Regional Price Comparison</CardTitle>
              <p className="text-sm text-slate-500">Average prices across Ethiopian regions</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString()} ETB`}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="avgPrice" fill="#16a34a" name="Average Price (ETB)" />
                </BarChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {regionalData.map((region, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-semibold text-slate-900">{region.region}</h4>
                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {region.avgPrice.toLocaleString()} ETB
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {region.markets} market{region.markets > 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketDashboard;
