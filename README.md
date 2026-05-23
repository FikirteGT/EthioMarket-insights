# EthioMarket Insights - Ethiopian Market Intelligence Platform

A comprehensive market intelligence platform for Ethiopian farmers and traders, built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui components. This application provides real-time commodity prices, market analytics, news insights, and data visualization tools specifically designed for the Ethiopian agricultural market.

## 🚀 Features

### Core Technologies
- ⚡️ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with hooks support
- 🎯 **TypeScript** - Type safety and better developer experience
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautifully designed components built with Radix UI
- 📦 **Path Mapping** - Clean imports with `@/` prefix
- 📊 **Recharts** - Powerful charting library for data visualization
- 🌐 **Framer Motion** - Smooth animations and transitions

### Application Features

#### 1. 📊 Market Data Dashboard
- **Real-time Commodity Prices** - View current prices for Teff, Onion, Tomato, Maize, Pepper across 8 major Ethiopian markets
- **Price Trend Indicators** - Visual badges showing if prices are rising, falling, or stable
- **6-Week Historical Trends** - Line charts tracking price movements over time
- **Regional Comparison** - Bar charts comparing average prices across Ethiopian regions
- **Interactive Tabs** - Easy navigation between Current Prices, Price Trends, and Regional View
- **Export Functionality** - Download market data in JSON format

#### 2. 📰 Market News & Insights
- **News Aggregator** - Curated news articles covering:
  - Market updates (price changes, supply/demand)
  - Government policy announcements (subsidies, export regulations)
  - Economic reports (inflation, GDP, trade)
  - Agricultural developments (irrigation, weather warnings)
- **Advanced Filtering** - Filter by category (Market, Policy, Economic, Agriculture) and impact level (High, Medium, Low)
- **Economic Indicators** - 6 key metrics with trend analysis:
  - Consumer Price Index (CPI)
  - USD/ETB Exchange Rate
  - Agricultural GDP Growth
  - Food Price Index
  - Export Revenue
  - Fertilizer Import Volume
- **Key Insights Section** - Summarized economic analysis

#### 3. 📈 Data Visualization
- **Multiple Chart Types**:
  - Line Charts - Track price trends over time
  - Bar Charts - Compare prices across markets
  - Area Charts - Visualize stacked price data
  - Pie Charts - Show market share distribution
  - Radar Charts - Multi-dimensional product performance
- **Interactive Features**:
  - Chart type switcher (Line/Bar/Area)
  - 12-week historical price movements
  - Market price comparison (horizontal bars)
  - Price volatility index
  - Product performance radar (avg price, availability, demand)
- **Export Capabilities**:
  - Export to CSV - Download price data in spreadsheet format
  - Export to JSON - Download complete data with metadata
  - Automatic filename generation with date stamps
- **Map View** - Geographic distribution of markets with coordinates and prices

#### 4. 🌍 Localization (i18n)
- **Bilingual Support**:
  - **English** - Full interface in English
  - **Amharic (አማርኛ)** - Complete translation with Ge'ez script
- **Ethiopian Calendar Integration**:
  - Automatic Gregorian to Ethiopian date conversion
  - Ethiopian month names (Meskerem/መስከረም, Tikimt/ጥቅምት, etc.)
  - Context-aware date formatting
- **Regional Formatting**:
  - Currency: "ETB" (English) / "ብር" (Amharic)
  - Localized number formatting
  - Date formatting based on selected language
- **Language Switcher** - Toggle button in navigation bar
- **100+ Translation Keys** - All major UI elements translated

#### 5. 💰 Price Analysis Tool
- **Smart Profit Calculator** - Calculate net profit (Price - Transport costs)
- **Transport Cost Analysis** - Factor in distance and vehicle type
- **Market Recommendations** - Find the best markets for your crops
- **Official NMIS Data** - Weekly data from National Market Information System

## 📦 Included shadcn/ui Components

- Button, Card, Input, Label, Badge, Dialog
- Tabs, Table, Select, Dropdown Menu
- Alert, Toast (Sonner), Progress
- Accordion, Collapsible, Separator
- Calendar, Date Picker, Form
- And 50+ more components...

## 🛠️ Getting Started

### Prerequisites
- Node.js 16+ or Bun
- npm, yarn, or bun package manager

### Installation

1. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

2. **Start development server**

   ```bash
   npm run dev
   # or
   bun dev
   ```

   The app will be available at `http://localhost:5173`

3. **Build for production**

   ```bash
   npm run build
   # or
   bun run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   # or
   bun run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn/ui components (50+ components)
│   ├── Home.tsx               # Landing page with hero section
│   ├── InputForm.tsx          # Price analysis input form
│   ├── Results.tsx            # Analysis results display
│   ├── MarketDashboard.tsx    # Market data dashboard with charts
│   ├── MarketNews.tsx         # News aggregator and economic indicators
│   └── DataVisualization.tsx  # Advanced charts and visualizations
├── contexts/
│   └── LocalizationContext.tsx # i18n context with Ethiopian calendar
├── data/
│   ├── mockData.ts            # Market and price data
│   └── newsData.ts            # News articles and economic indicators
├── hooks/
│   └── use-mobile.ts          # Mobile detection hook
├── lib/
│   ├── engine.ts              # Price analysis engine
│   └── utils.ts               # Utility functions (cn, etc.)
├── App.tsx                    # Main application with routing
├── index.css                  # Global styles with Tailwind
└── main.tsx                   # Application entry point
```

## 🎨 Customization

### Adding New shadcn/ui Components

This template is pre-configured with shadcn/ui. Components are located in `src/components/ui/`.

### Tailwind Configuration

The Tailwind configuration is set up with shadcn/ui color variables:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS custom properties for themes

### TypeScript Configuration

Path mapping is configured for clean imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocalization } from "@/contexts/LocalizationContext";
```

### Adding Translations

Edit `src/contexts/LocalizationContext.tsx` to add new translation keys:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    'your.key': 'Your English Text',
  },
  am: {
    'your.key': 'የአማርኛ ጽሑፍዎ',
  },
};
```

Use in components:

```typescript
const { t } = useLocalization();
<h1>{t('your.key')}</h1>
```

## 🌗 Dark Mode

The template includes dark mode support through Tailwind's `dark:` classes and CSS custom properties.

## 🗺️ Ethiopian Market Coverage

### Supported Markets
- **Addis Ababa** - Merkato Market
- **Oromia** - Adama Central, Jimma Market, Shashemene
- **Amhara** - Bahir Dar Market
- **Sidama** - Hawassa Market
- **Dire Dawa** - Dire Dawa Market
- **Tigray** - Mekelle Market

### Supported Commodities
- Teff (White & Red)
- Onion
- Tomato
- Maize
- Green Pepper

## 📊 Data Sources

- **NMIS** - National Market Information System (weekly official data)
- **ATI** - Agricultural Transformation Institute
- **Ethiopian Meteorological Institute** - Weather and climate data
- **National Bank of Ethiopia** - Economic indicators

## 🚀 Deployment

The application can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- GitHub Pages
- Any static hosting service

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Ethiopian Agricultural Transformation Institute (ATI)
- National Market Information System (NMIS)
- Ethiopian farmers and traders community

---

**Built with ❤️ for Ethiopian farmers and agricultural traders**

