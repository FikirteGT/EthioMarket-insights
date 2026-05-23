import { useState, useEffect } from 'react';
import Home from './components/Home';
import InputForm from './components/InputForm';
import Results from './components/Results';
import MarketDashboard from './components/MarketDashboard';
import { analyzeMarkets, AnalysisResult } from './lib/engine';
import { Toaster } from './components/ui/sonner';
import { Sprout, Menu, Globe, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'home' | 'input' | 'results' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartAnalysis = () => {
    setCurrentPage('input');
    window.scrollTo(0, 0);
  };

  const handleFormSubmit = (formData: any) => {
    const results = analyzeMarkets(
      formData.userLat,
      formData.userLng,
      formData.productId,
      formData.quantity,
      formData.transportMethodId,
      formData.specificMarketId
    );
    setAnalysisResults(results);
    setCurrentPage('results');
    window.scrollTo(0, 0);
  };

  const handleBackToInput = () => {
    setCurrentPage('input');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const handleGoToDashboard = () => {
    setCurrentPage('dashboard');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans selection:bg-green-100 selection:text-green-900">
      <Toaster position="top-center" />
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleGoHome}
          >
            <div className="bg-green-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
              <Sprout className="text-white" size={20} />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors ${
              currentPage === 'home' && !isScrolled ? 'text-white' : 'text-slate-900'
            }`}>
              Farmer<span className="text-green-600">Price</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleGoToDashboard}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 'dashboard'
                  ? 'bg-green-600 text-white'
                  : currentPage === 'home' && !isScrolled
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </button>
            <div className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm font-medium transition-colors ${
              currentPage === 'home' && !isScrolled ? 'bg-white/10 border-white/20 text-white' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              <Globe size={14} />
              <span>English</span>
            </div>
            <button className={`p-2 rounded-lg transition-colors ${
              currentPage === 'home' && !isScrolled ? 'text-white hover:bg-white/10' : 'text-slate-600 hover:bg-slate-100'
            }`}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-0">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home onStart={handleStartAnalysis} onDashboard={handleGoToDashboard} />
            </motion.div>
          )}

          {currentPage === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pt-24"
            >
              <InputForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {currentPage === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="pt-24"
            >
              <Results results={analysisResults} onBack={handleBackToInput} />
            </motion.div>
          )}

          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="pt-24"
            >
              <MarketDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="text-green-500" size={24} />
              <span className="font-bold text-xl">FarmerPrice Intelligence</span>
            </div>
            <p className="text-slate-400 max-w-sm">
              Empowering Ethiopian farmers with transparent market data and cost analysis to ensure every harvest reaches its maximum value.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>Official ATI Website</li>
              <li>NMIS Data Portal</li>
              <li>Regional Market Maps</li>
              <li>Transport Rate Index</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>User Guide</li>
              <li>Contact Us</li>
              <li>Woreda Support</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2023 Farmer Market Price Intelligence Tool (Ethiopia). All rights reserved.</p>
          <p>Powered by NMIS Weekly Official Data</p>
        </div>
      </footer>
    </div>
  );
}

export default App;