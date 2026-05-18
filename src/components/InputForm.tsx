import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShoppingBag, Truck, Calculator, ArrowRight, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MARKETS, PRODUCTS, TRANSPORT_METHODS } from '../data/mockData';
import { toast } from 'sonner';

interface InputFormProps {
  onSubmit: (data: any) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [transportId, setTransportId] = useState('');
  const [sellingOption, setSellingOption] = useState('best');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!region || !city || !productId || !quantity || !transportId) {
      toast.error('Please fill in all required fields');
      return;
    }

    // For the prototype, we simulate farmer's coordinates based on city choice
    // In a real app, this would use Geolocation API or a city database
    const selectedCityMarket = MARKETS.find(m => m.city.toLowerCase() === city.toLowerCase()) || MARKETS[0];
    
    onSubmit({
      userLat: selectedCityMarket.lat + 0.1, // slightly offset from the city market
      userLng: selectedCityMarket.lng + 0.1,
      productId,
      quantity: parseFloat(quantity),
      transportMethodId: transportId,
      specificMarketId: sellingOption
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <Card className="border-t-4 border-t-green-600 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-slate-800">
            <Calculator className="text-green-600" />
            Market Analysis Input
          </CardTitle>
          <p className="text-slate-500 text-sm">Fill in your details to calculate the best market for your product.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-slate-700">
                <MapPin size={18} className="text-red-500" /> Farmer Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select onValueChange={setRegion} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Addis Ababa">Addis Ababa</SelectItem>
                      <SelectItem value="Oromia">Oromia</SelectItem>
                      <SelectItem value="Amhara">Amhara</SelectItem>
                      <SelectItem value="Tigray">Tigray</SelectItem>
                      <SelectItem value="Sidama">Sidama</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Nearest Town / Woreda</Label>
                  <Select onValueChange={setCity} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Town" />
                    </SelectTrigger>
                    <SelectContent>
                      {MARKETS.filter(m => !region || m.region === region).map(m => (
                        <SelectItem key={m.id} value={m.city}>{m.city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Product Section */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h3 className="font-semibold flex items-center gap-2 text-slate-700">
                <ShoppingBag size={18} className="text-blue-500" /> Product Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select onValueChange={setProductId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCTS.map(p => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity ({productId ? PRODUCTS.find(p => p.id === productId)?.unit : 'Unit'})</Label>
                  <Input 
                    type="number" 
                    placeholder="e.g. 50" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </div>

            {/* Transport Section */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h3 className="font-semibold flex items-center gap-2 text-slate-700">
                <Truck size={18} className="text-amber-500" /> Transport Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="transport">Transport Method</Label>
                  <Select onValueChange={setTransportId} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSPORT_METHODS.map(m => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Selling Strategy</Label>
                  <Select onValueChange={setSellingOption} defaultValue="best">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="best">Find Best Market</SelectItem>
                      {MARKETS.map(m => (
                        <SelectItem key={m.id} value={m.id}>Sell at {m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg font-bold rounded-xl shadow-lg mt-4 group">
              Analyze Best Profit <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-start gap-2 bg-slate-50 p-4 rounded-lg text-xs text-slate-500 mt-4 border border-slate-100">
              <Info className="shrink-0 text-blue-500" size={16} />
              <p>Your inputs will be compared against the latest <strong>National Market Information System (NMIS)</strong> weekly prices to determine the highest net profit after transport expenses.</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InputForm;