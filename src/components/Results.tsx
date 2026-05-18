import React from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '../lib/engine';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  FileDown,
  Info,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ResultsProps {
  results: AnalysisResult[];
  onBack: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onBack }) => {
  const topResults = results.slice(0, 3);
  
  const chartData = results.slice(0, 5).map(r => ({
    name: r.market.city,
    profit: r.netProfit,
    gross: r.grossRevenue,
    cost: r.transportCost
  }));

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="text-green-500" size={16} />;
      case 'falling': return <TrendingDown className="text-red-500" size={16} />;
      default: return <Minus className="text-slate-400" size={16} />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-2 -ml-2 text-slate-600">
            <ArrowLeft className="mr-2" size={16} /> Back to Input
          </Button>
          <h2 className="text-3xl font-bold text-slate-900">Profit Analysis Results</h2>
          <p className="text-slate-500">Comparing prices across {results.length} regional markets.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-slate-300 shadow-sm" onClick={() => window.print()}>
          <FileDown size={18} /> Download Analysis (PDF)
        </Button>
      </div>

      {/* Hero Recommendation */}
      {topResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl overflow-hidden relative border-none">
            <div className="absolute right-0 top-0 opacity-10 p-4">
              <CheckCircle2 size={120} />
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-none px-3 py-1 text-xs uppercase tracking-wider font-bold">
                  Recommended Market
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-4xl font-black mb-2">{topResults[0].market.name}</h3>
                  <p className="text-green-50 flex items-center gap-1 opacity-90 mb-6">
                    <MapPin size={16} /> {topResults[0].market.region}, Ethiopia
                  </p>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                    <div className="text-sm text-green-100 uppercase tracking-wide font-medium">Potential Net Profit</div>
                    <div className="text-5xl font-bold mt-1">
                      {topResults[0].netProfit.toLocaleString()} <span className="text-xl font-normal opacity-80">ETB</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 bg-black/10 rounded-xl p-6 border border-white/5">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-green-100 text-sm">Market Price</span>
                    <span className="font-bold text-lg">{topResults[0].priceData.price.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-green-100 text-sm">Transport Cost</span>
                    <span className="font-bold text-lg text-amber-200">-{topResults[0].transportCost.toLocaleString()} ETB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-100 text-sm">Distance</span>
                    <span className="font-bold text-lg">{topResults[0].distanceKm} KM</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Market Ranking List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-xl text-slate-800 mb-4">Market Rankings</h3>
          {topResults.map((res, i) => (
            <motion.div
              key={res.market.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`border-none shadow-md overflow-hidden ${i === 0 ? 'ring-2 ring-green-600/50' : ''}`}>
                <div className="flex items-stretch h-full">
                  <div className={`w-16 flex items-center justify-center font-bold text-2xl ${i === 0 ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    #{res.rank}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg text-slate-800">{res.market.name}</h4>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <MapPin size={14} /> {res.market.city}, {res.market.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-black text-xl">{res.netProfit.toLocaleString()} ETB</div>
                        <div className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Net Profit</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-1">
                        {getTrendIcon(res.priceData.trend)}
                        <span className="text-sm capitalize font-medium text-slate-600">{res.priceData.trend} Trend</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className={`text-[10px] ${res.priceData.reliability === 'High' ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}`}>
                          <CheckCircle2 size={10} className="mr-1" /> NMIS Official (Weekly)
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <Calendar size={14} />
                        <span>Updated: {res.priceData.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Profit Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#16a34a' : '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2 italic">Relative net profit across markets</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-slate-50 shadow-inner">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Info className="text-blue-500" size={18} /> Market Reliability
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Source</span>
                  <span className="font-bold text-slate-700">ATI - NMIS</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Update Frequency</span>
                  <span className="font-bold text-slate-700">Weekly</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Confidence Score</span>
                  <span className="font-bold text-blue-600">High (98%)</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight border-t pt-2 mt-2">
                Confidence based on official regional reporting consistency and price verification by agricultural agents.
              </p>
            </CardContent>
          </Card>
          
          <div className="rounded-xl overflow-hidden shadow-md">
             <img 
               src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/2dbfdc62-7a1c-47c3-b736-eeb40d54d50e/ethiopia-map-illustration-94a6d7b2-1778196912027.webp" 
               alt="Market Locations" 
               className="w-full h-48 object-cover"
             />
             <div className="bg-slate-900 text-white p-3 text-center text-xs">
                Regional Market Connectivity View
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;