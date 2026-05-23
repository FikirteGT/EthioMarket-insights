import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, Map, BarChart3, PieChartIcon, Activity, Share2 } from 'lucide-react';
import { MARKETS, PRODUCTS, MOCK_PRICES } from '../data/mockData';

const DataVisualization: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id);
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');

  // Price comparison data
  const priceComparisonData = MARKETS.map(market => {
    const priceData = MOCK_PRICES.find(
      p => p.marketId === market.id && p.product === selectedProduct
    );
    return {
      name: market.city,
      price: priceData?.price || 0,
      region: market.region,
    };
  }).sort((a, b) => b.price - a.price);

  // Historical trend data (12 weeks)
  const historicalData = Array.from({ length: 12 }, (_, i) => {
    const weekAgo = 12 - i;
    return {
      week: `W${i + 1}`,
      'Addis Ababa': 12500 - weekAgo * 150 + Math.random() * 400,
      'Adama': 11800 - weekAgo * 140 + Math.random() * 350,
      'Bahir Dar': 10500 - weekAgo * 120 + Math.random() * 300,
      'Hawassa': 11200 - weekAgo * 130 + Math.random() * 320,
      'Jimma': 10200 - weekAgo * 110 + Math.random() * 280,
    };
  });

  // Market share by region
  const marketShareData = [
    { name: 'Addis Ababa', value: 35, color: '#16a34a' },
    { name: 'Oromia', value: 28, color: '#2563eb' },
    { name: 'Amhara', value: 18, color: '#dc2626' },
    { name: 'Sidama', value: 12, color: '#f59e0b' },
    { name: 'Others', value: 7, color: '#8b5cf6' },
  ];

  // Product performance radar
  const productPerformance = PRODUCTS.map(product => {
    const prices = MARKETS.map(market => {
      const priceData = MOCK_PRICES.find(
        p => p.marketId === market.id && p.product === product.id
      );
      return priceData?.price || 0;
    });
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    return {
      product: product.name,
      avgPrice: Math.round(avgPrice),
      availability: Math.floor(Math.random() * 30) + 70,
      demand: Math.floor(Math.random() * 30) + 60,
    };
  });

  // Price volatility data
  const volatilityData = PRODUCTS.map(product => ({
    name: product.name,
    volatility: Math.floor(Math.random() * 25) + 5,
    avgPrice: Math.floor(Math.random() * 8000) + 3000,
  }));

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Market', 'Region', 'Price (ETB)'];
    const rows = priceComparisonData.map(item => [
      item.name,
      item.region,
      item.price.toString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `market-data-${selectedProduct}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Export to JSON
  const exportToJSON = () => {
    const data = {
      product: PRODUCTS.find(p => p.id === selectedProduct)?.name,
      exportDate: new Date().toISOString(),
      markets: priceComparisonData,
      historicalData: historicalData,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `market-data-${selectedProduct}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const renderChart = () => {
    const ChartComponent = chartType === 'line' ? LineChart : chartType === 'bar' ? BarChart : AreaChart;
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ChartComponent data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(0)} ETB`}
            contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
          />
          <Legend />
          {chartType === 'line' && (
            <>
              <Line type="monotone" dataKey="Addis Ababa" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="Adama" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="Bahir Dar" stroke="#dc2626" strokeWidth={2} />
              <Line type="monotone" dataKey="Hawassa" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="Jimma" stroke="#8b5cf6" strokeWidth={2} />
            </>
          )}
          {chartType === 'bar' && (
            <>
              <Bar dataKey="Addis Ababa" fill="#16a34a" />
              <Bar dataKey="Adama" fill="#2563eb" />
              <Bar dataKey="Bahir Dar" fill="#dc2626" />
              <Bar dataKey="Hawassa" fill="#f59e0b" />
              <Bar dataKey="Jimma" fill="#8b5cf6" />
            </>
          )}
          {chartType === 'area' && (
            <>
              <Area type="monotone" dataKey="Addis Ababa" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Adama" stackId="1" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Bahir Dar" stackId="1" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Hawassa" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              <Area type="monotone" dataKey="Jimma" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
            </>
          )}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Data Visualization</h1>
          <p className="text-slate-600">Interactive charts and market analytics</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportToCSV} variant="outline" className="gap-2">
            <Download size={16} />
            Export CSV
          </Button>
          <Button onClick={exportToJSON} variant="outline" className="gap-2">
            <Download size={16} />
            Export JSON
          </Button>
        </div>
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

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 max-w-3xl">
          <TabsTrigger value="trends">
            <Activity size={16} className="mr-1" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <BarChart3 size={16} className="mr-1" />
            Compare
          </TabsTrigger>
          <TabsTrigger value="distribution">
            <PieChartIcon size={16} className="mr-1" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="performance">
            <Activity size={16} className="mr-1" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="map">
            <Map size={16} className="mr-1" />
            Map View
          </TabsTrigger>
        </TabsList>

        {/* Price Trends Tab */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>12-Week Price Trends</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">Historical price movements across major markets</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={chartType === 'line' ? 'default' : 'outline'}
                    onClick={() => setChartType('line')}
                  >
                    Line
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === 'bar' ? 'default' : 'outline'}
                    onClick={() => setChartType('bar')}
                  >
                    Bar
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === 'area' ? 'default' : 'outline'}
                    onClick={() => setChartType('area')}
                  >
                    Area
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderChart()}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Comparison Tab */}
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Market Price Comparison</CardTitle>
              <p className="text-sm text-slate-500">Current prices across all markets</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={priceComparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString()} ETB`}
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  />
                  <Bar dataKey="price" fill="#16a34a" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Distribution Tab */}
        <TabsContent value="distribution">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Share by Region</CardTitle>
                <p className="text-sm text-slate-500">Trading volume distribution</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Volatility Index</CardTitle>
                <p className="text-sm text-slate-500">Price stability across commodities</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={volatilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => `${value}%`}
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    />
                    <Bar dataKey="volatility" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Product Performance Tab */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance Radar</CardTitle>
              <p className="text-sm text-slate-500">Multi-dimensional product analysis</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={productPerformance}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="product" />
                  <PolarRadiusAxis />
                  <Radar name="Avg Price (ETB)" dataKey="avgPrice" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
                  <Radar name="Availability (%)" dataKey="availability" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                  <Radar name="Demand (%)" dataKey="demand" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Map View Tab */}
        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Ethiopian Market Map</CardTitle>
              <p className="text-sm text-slate-500">Geographic distribution of markets and prices</p>
            </CardHeader>
            <CardContent>
              <div className="relative bg-slate-100 rounded-lg p-8 min-h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <Map size={64} className="mx-auto text-slate-400 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Interactive Map View</h3>
                  <p className="text-slate-500 max-w-md">
                    Geographic visualization of Ethiopian markets with price overlays. 
                    Integration with mapping libraries like Leaflet or Mapbox can be added here.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {MARKETS.map((market, index) => {
                      const priceData = MOCK_PRICES.find(
                        p => p.marketId === market.id && p.product === selectedProduct
                      );
                      return (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-left">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-3 h-3 rounded-full bg-green-600" />
                            <span className="font-semibold text-slate-900">{market.name}</span>
                          </div>
                          <p className="text-sm text-slate-600">{market.region}</p>
                          <p className="text-lg font-bold text-green-600 mt-2">
                            {priceData?.price.toLocaleString() || 'N/A'} ETB
                          </p>
                          <p className="text-xs text-slate-500">
                            Lat: {market.lat.toFixed(4)}, Lng: {market.lng.toFixed(4)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataVisualization;
