import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'am';

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  formatNumber: (num: number) => string;
  formatDate: (date: Date) => string;
  formatCurrency: (amount: number) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.charts': 'Charts',
    'nav.news': 'News',
    'nav.home': 'Home',
    
    // Home Page
    'home.title': 'Farmer Market Price Intelligence Tool',
    'home.subtitle': 'Maximize your net profit by finding the best markets for your crops using official Ethiopian NMIS data.',
    'home.startAnalysis': 'Start Price Analysis',
    'home.viewDashboard': 'Dashboard',
    'home.viewNews': 'News',
    'home.officialPrices': 'Official Prices',
    'home.officialPricesDesc': 'Accessed weekly data from the National Market Information System (NMIS) managed by ATI.',
    'home.transportCosts': 'Transport Costs',
    'home.transportCostsDesc': 'Calculate realistic transport expenses based on distance and vehicle type.',
    'home.smartProfit': 'Smart Profit',
    'home.smartProfitDesc': 'We calculate your actual net profit (Price - Transport) to find the best deal.',
    'home.dataTransparency': 'Data Transparency',
    'home.dataTransparencyDesc': 'This tool uses official Ethiopian market price data from the National Market Information System (NMIS). Prices are updated weekly and reflect the official recorded rates for major regions.',
    'home.howItWorks': 'How It Works',
    
    // Dashboard
    'dashboard.title': 'Market Data Dashboard',
    'dashboard.subtitle': 'Real-time commodity prices and market insights',
    'dashboard.selectCommodity': 'Select Commodity',
    'dashboard.currentPrices': 'Current Prices',
    'dashboard.priceTrends': 'Price Trends',
    'dashboard.regionalView': 'Regional View',
    'dashboard.exportData': 'Export Data',
    'dashboard.weekTrends': '6-Week Price Trends',
    'dashboard.historicalMovement': 'Historical price movements across major markets',
    'dashboard.regionalComparison': 'Regional Price Comparison',
    'dashboard.avgPrices': 'Average prices across Ethiopian regions',
    'dashboard.market': 'market',
    'dashboard.markets': 'markets',
    
    // Trends
    'trend.rising': 'Rising',
    'trend.falling': 'Falling',
    'trend.stable': 'Stable',
    
    // News
    'news.title': 'Market News & Insights',
    'news.subtitle': 'Stay informed with the latest agricultural market updates and economic indicators',
    'news.newsUpdates': 'News & Updates',
    'news.economicIndicators': 'Economic Indicators',
    'news.filterNews': 'Filter News',
    'news.category': 'Category',
    'news.impactLevel': 'Impact Level',
    'news.all': 'All',
    'news.market': 'Market',
    'news.policy': 'Policy',
    'news.economic': 'Economic',
    'news.agriculture': 'Agriculture',
    'news.high': 'High',
    'news.medium': 'Medium',
    'news.low': 'Low',
    'news.impact': 'Impact',
    'news.keyInsights': 'Key Economic Insights',
    'news.noArticles': 'No news articles match your filters',
    
    // Visualization
    'viz.title': 'Data Visualization',
    'viz.subtitle': 'Interactive charts and market analytics',
    'viz.exportCSV': 'Export CSV',
    'viz.exportJSON': 'Export JSON',
    'viz.trends': 'Trends',
    'viz.compare': 'Compare',
    'viz.distribution': 'Distribution',
    'viz.performance': 'Performance',
    'viz.mapView': 'Map View',
    'viz.weekTrends': '12-Week Price Trends',
    'viz.marketComparison': 'Market Price Comparison',
    'viz.currentPrices': 'Current prices across all markets',
    'viz.marketShare': 'Market Share by Region',
    'viz.tradingVolume': 'Trading volume distribution',
    'viz.volatilityIndex': 'Price Volatility Index',
    'viz.priceStability': 'Price stability across commodities',
    'viz.productPerformance': 'Product Performance Radar',
    'viz.multiDimensional': 'Multi-dimensional product analysis',
    'viz.ethiopianMap': 'Ethiopian Market Map',
    'viz.geographicDist': 'Geographic distribution of markets and prices',
    'viz.interactiveMap': 'Interactive Map View',
    'viz.line': 'Line',
    'viz.bar': 'Bar',
    'viz.area': 'Area',
    
    // Common
    'common.per': 'per',
    'common.week': 'Week',
    'common.currency': 'ETB',
    'common.loading': 'Loading...',
    'common.error': 'Error',
  },
  am: {
    // Navigation
    'nav.dashboard': 'ዳሽቦርድ',
    'nav.charts': 'ገበታዎች',
    'nav.news': 'ዜና',
    'nav.home': 'መነሻ',
    
    // Home Page
    'home.title': 'የገበሬ የገበያ ዋጋ የመረጃ መሳሪያ',
    'home.subtitle': 'ከኢትዮጵያ NMIS ይፋዊ መረጃ በመጠቀም ለሰብልዎ ምርጡን ገበያ በማግኘት የተጣራ ትርፍዎን ያሳድጉ።',
    'home.startAnalysis': 'የዋጋ ትንተና ጀምር',
    'home.viewDashboard': 'ዳሽቦርድ',
    'home.viewNews': 'ዜና',
    'home.officialPrices': 'ይፋዊ ዋጋዎች',
    'home.officialPricesDesc': 'በኤቲአይ የሚተዳደረው ከብሔራዊ የገበያ መረጃ ስርዓት (NMIS) ሳምንታዊ መረጃ ተደራሽ።',
    'home.transportCosts': 'የትራንስፖርት ወጪዎች',
    'home.transportCostsDesc': 'በርቀት እና በተሽከርካሪ አይነት ላይ በመመስረት ተጨባጭ የትራንስፖርት ወጪዎችን ያስሉ።',
    'home.smartProfit': 'ብልህ ትርፍ',
    'home.smartProfitDesc': 'ምርጡን ስምምነት ለማግኘት የእርስዎን ትክክለኛ የተጣራ ትርፍ (ዋጋ - ትራንስፖርት) እናሰላለን።',
    'home.dataTransparency': 'የመረጃ ግልጽነት',
    'home.dataTransparencyDesc': 'ይህ መሳሪያ ከብሔራዊ የገበያ መረጃ ስርዓት (NMIS) ይፋዊ የኢትዮጵያ የገበያ ዋጋ መረጃን ይጠቀማል። ዋጋዎች በየሳምንቱ ይዘመናሉ እና ለዋና ክልሎች የተመዘገቡ ይፋዊ ተመኖችን ያንፀባርቃሉ።',
    'home.howItWorks': 'እንዴት ይሰራል',
    
    // Dashboard
    'dashboard.title': 'የገበያ መረጃ ዳሽቦርድ',
    'dashboard.subtitle': 'የእውነተኛ ጊዜ የሸቀጦች ዋጋዎች እና የገበያ ግንዛቤዎች',
    'dashboard.selectCommodity': 'ሸቀጥ ይምረጡ',
    'dashboard.currentPrices': 'የአሁን ዋጋዎች',
    'dashboard.priceTrends': 'የዋጋ አዝማሚያዎች',
    'dashboard.regionalView': 'የክልል እይታ',
    'dashboard.exportData': 'መረጃ ላክ',
    'dashboard.weekTrends': '6-ሳምንት የዋጋ አዝማሚያዎች',
    'dashboard.historicalMovement': 'በዋና ገበያዎች ላይ ታሪካዊ የዋጋ እንቅስቃሴዎች',
    'dashboard.regionalComparison': 'የክልል የዋጋ ንፅፅር',
    'dashboard.avgPrices': 'በኢትዮጵያ ክልሎች አማካይ ዋጋዎች',
    'dashboard.market': 'ገበያ',
    'dashboard.markets': 'ገበያዎች',
    
    // Trends
    'trend.rising': 'እየጨመረ',
    'trend.falling': 'እየቀነሰ',
    'trend.stable': 'የተረጋጋ',
    
    // News
    'news.title': 'የገበያ ዜና እና ግንዛቤዎች',
    'news.subtitle': 'በቅርብ ጊዜ የግብርና ገበያ ዝመናዎች እና የኢኮኖሚ አመልካቾች መረጃ ያግኙ',
    'news.newsUpdates': 'ዜና እና ዝመናዎች',
    'news.economicIndicators': 'የኢኮኖሚ አመልካቾች',
    'news.filterNews': 'ዜና አጣራ',
    'news.category': 'ምድብ',
    'news.impactLevel': 'የተፅእኖ ደረጃ',
    'news.all': 'ሁሉም',
    'news.market': 'ገበያ',
    'news.policy': 'ፖሊሲ',
    'news.economic': 'ኢኮኖሚያዊ',
    'news.agriculture': 'ግብርና',
    'news.high': 'ከፍተኛ',
    'news.medium': 'መካከለኛ',
    'news.low': 'ዝቅተኛ',
    'news.impact': 'ተፅእኖ',
    'news.keyInsights': 'ቁልፍ የኢኮኖሚ ግንዛቤዎች',
    'news.noArticles': 'ከማጣሪያዎችዎ ጋር የሚዛመድ ምንም የዜና መጣጥፎች የሉም',
    
    // Visualization
    'viz.title': 'የመረጃ ምስላዊነት',
    'viz.subtitle': 'በይነተገናኝ ገበታዎች እና የገበያ ትንታኔዎች',
    'viz.exportCSV': 'CSV ላክ',
    'viz.exportJSON': 'JSON ላክ',
    'viz.trends': 'አዝማሚያዎች',
    'viz.compare': 'አወዳድር',
    'viz.distribution': 'ስርጭት',
    'viz.performance': 'አፈጻጸም',
    'viz.mapView': 'የካርታ እይታ',
    'viz.weekTrends': '12-ሳምንት የዋጋ አዝማሚያዎች',
    'viz.marketComparison': 'የገበያ የዋጋ ንፅፅር',
    'viz.currentPrices': 'በሁሉም ገበያዎች የአሁን ዋጋዎች',
    'viz.marketShare': 'በክልል የገበያ ድርሻ',
    'viz.tradingVolume': 'የንግድ መጠን ስርጭት',
    'viz.volatilityIndex': 'የዋጋ መለዋወጥ መረጃ ጠቋሚ',
    'viz.priceStability': 'በሸቀጦች ላይ የዋጋ መረጋጋት',
    'viz.productPerformance': 'የምርት አፈጻጸም ራዳር',
    'viz.multiDimensional': 'ባለብዙ-ገጽታ የምርት ትንተና',
    'viz.ethiopianMap': 'የኢትዮጵያ የገበያ ካርታ',
    'viz.geographicDist': 'የገበያዎች እና ዋጋዎች ጂኦግራፊያዊ ስርጭት',
    'viz.interactiveMap': 'በይነተገናኝ የካርታ እይታ',
    'viz.line': 'መስመር',
    'viz.bar': 'አሞሌ',
    'viz.area': 'ቦታ',
    
    // Common
    'common.per': 'በ',
    'common.week': 'ሳምንት',
    'common.currency': 'ብር',
    'common.loading': 'በመጫን ላይ...',
    'common.error': 'ስህተት',
  },
};

// Ethiopian calendar utilities
export const ethiopianCalendar = {
  // Convert Gregorian to Ethiopian date
  toEthiopian: (gregorianDate: Date): { year: number; month: number; day: number } => {
    const year = gregorianDate.getFullYear();
    const month = gregorianDate.getMonth() + 1;
    const day = gregorianDate.getDate();
    
    // Simplified conversion (approximate)
    let ethYear = year - 7;
    let ethMonth = month + 4;
    let ethDay = day;
    
    if (ethMonth > 13) {
      ethMonth -= 13;
      ethYear += 1;
    }
    
    return { year: ethYear, month: ethMonth, day: ethDay };
  },
  
  // Get Ethiopian month name
  getMonthName: (month: number, lang: Language): string => {
    const monthNames = {
      en: ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'],
      am: ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'],
    };
    return monthNames[lang][month - 1] || '';
  },
  
  // Format Ethiopian date
  format: (date: Date, lang: Language): string => {
    const ethDate = ethiopianCalendar.toEthiopian(date);
    const monthName = ethiopianCalendar.getMonthName(ethDate.month, lang);
    return `${monthName} ${ethDate.day}, ${ethDate.year}`;
  },
};

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  const formatNumber = (num: number): string => {
    if (language === 'am') {
      // Amharic number formatting (uses Arabic numerals for readability)
      return num.toLocaleString('en-US');
    }
    return num.toLocaleString('en-US');
  };
  
  const formatDate = (date: Date): string => {
    if (language === 'am') {
      return ethiopianCalendar.format(date, 'am');
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const formatCurrency = (amount: number): string => {
    const formatted = formatNumber(amount);
    const currency = t('common.currency');
    return `${formatted} ${currency}`;
  };
  
  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t, formatNumber, formatDate, formatCurrency }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within LocalizationProvider');
  }
  return context;
};
