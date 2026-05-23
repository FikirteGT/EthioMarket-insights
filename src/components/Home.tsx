import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, Truck, MapPin, ChevronRight, Info, BarChart3, Newspaper } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { useLocalization } from '../contexts/LocalizationContext';

interface HomeProps {
  onStart: () => void;
  onDashboard?: () => void;
  onNews?: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onDashboard, onNews }) => {
  const { t } = useLocalization();
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/2dbfdc62-7a1c-47c3-b736-eeb40d54d50e/hero-background-72f90bf2-1778196911606.webp')`,
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4 text-green-400">
              <Sprout size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg transition-all"
                onClick={onStart}
              >
                {t('home.startAnalysis')} <ChevronRight className="ml-2" />
              </Button>
              <div className="flex gap-4">
                {onDashboard && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-6 py-6 rounded-xl shadow-lg transition-all backdrop-blur-sm"
                    onClick={onDashboard}
                  >
                    <BarChart3 className="mr-2" size={20} />
                    {t('home.viewDashboard')}
                  </Button>
                )}
                {onNews && (
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-6 py-6 rounded-xl shadow-lg transition-all backdrop-blur-sm"
                    onClick={onNews}
                  >
                    <Newspaper className="mr-2" size={20} />
                    {t('home.viewNews')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">{t('home.howItWorks')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<TrendingUp className="text-green-600" size={32} />}
              title={t('home.officialPrices')}
              description={t('home.officialPricesDesc')}
            />
            <FeatureCard 
              icon={<Truck className="text-amber-600" size={32} />}
              title={t('home.transportCosts')}
              description={t('home.transportCostsDesc')}
            />
            <FeatureCard 
              icon={<MapPin className="text-blue-600" size={32} />}
              title={t('home.smartProfit')}
              description={t('home.smartProfitDesc')}
            />
          </div>
        </div>
      </section>

      {/* Data Notice */}
      <section className="bg-white py-8 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center text-slate-500">
          <div className="inline-flex items-center gap-2 mb-2 font-semibold text-slate-700">
            <Info size={18} />
            <span>{t('home.dataTransparency')}</span>
          </div>
          <p className="text-sm">
            {t('home.dataTransparencyDesc')}
          </p>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <Card className="border-none shadow-md bg-white hover:shadow-lg transition-shadow">
    <CardContent className="pt-8 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </CardContent>
  </Card>
);

export default Home;