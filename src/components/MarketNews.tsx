import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Newspaper, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar,
  Filter,
  AlertCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { MOCK_NEWS, ECONOMIC_INDICATORS, NewsArticle } from '../data/newsData';
import { useLocalization } from '../contexts/LocalizationContext';

const MarketNews: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImpact, setSelectedImpact] = useState<string>('all');
  const { t, formatDate } = useLocalization();

  const filteredNews = MOCK_NEWS.filter(article => {
    const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
    const impactMatch = selectedImpact === 'all' || article.impact === selectedImpact;
    return categoryMatch && impactMatch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'market':
        return 'bg-blue-100 text-blue-800';
      case 'policy':
        return 'bg-purple-100 text-purple-800';
      case 'economic':
        return 'bg-green-100 text-green-800';
      case 'agriculture':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-green-600" size={20} />;
      case 'down':
        return <TrendingDown className="text-red-600" size={20} />;
      default:
        return <Minus className="text-gray-600" size={20} />;
    }
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    return formatDate(date);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('news.title')}</h1>
        <p className="text-slate-600">{t('news.subtitle')}</p>
      </div>

      <Tabs defaultValue="news" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="news">
            <Newspaper className="mr-2" size={16} />
            {t('news.newsUpdates')}
          </TabsTrigger>
          <TabsTrigger value="indicators">
            <BarChart3 className="mr-2" size={16} />
            {t('news.economicIndicators')}
          </TabsTrigger>
        </TabsList>

        {/* News Tab */}
        <TabsContent value="news" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={18} className="text-slate-600" />
                <span className="font-medium text-slate-700">{t('news.filterNews')}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('news.category')}</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'market', 'policy', 'economic', 'agriculture'].map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {t(`news.${category}`)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t('news.impactLevel')}</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'high', 'medium', 'low'].map(impact => (
                      <button
                        key={impact}
                        onClick={() => setSelectedImpact(impact)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedImpact === impact
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {t(`news.${impact}`)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News Articles */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                    </Badge>
                    <Badge variant="outline" className={getImpactColor(article.impact)}>
                      <AlertCircle size={12} className="mr-1" />
                      {t(`news.${article.impact}`).toUpperCase()} {t('news.impact')}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">{article.summary}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FileText size={14} />
                        <span>{article.source}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDateString(article.date)}</span>
                      </div>
                    </div>
                    {article.region && (
                      <Badge variant="outline" className="text-xs">
                        {article.region}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Newspaper size={48} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500">{t('news.noArticles')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Economic Indicators Tab */}
        <TabsContent value="indicators" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ECONOMIC_INDICATORS.map((indicator) => (
              <Card key={indicator.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-slate-700">{indicator.name}</CardTitle>
                  <p className="text-xs text-slate-500">{indicator.period}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-slate-900">{indicator.value}</div>
                      <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
                        indicator.trend === 'up' 
                          ? 'text-green-600' 
                          : indicator.trend === 'down' 
                          ? 'text-red-600' 
                          : 'text-gray-600'
                      }`}>
                        {getTrendIcon(indicator.trend)}
                        <span>
                          {indicator.change > 0 ? '+' : ''}{indicator.change}%
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      indicator.trend === 'up' 
                        ? 'bg-green-100' 
                        : indicator.trend === 'down' 
                        ? 'bg-red-100' 
                        : 'bg-gray-100'
                    }`}>
                      {getTrendIcon(indicator.trend)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Insights */}
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="text-green-600" />
                {t('news.keyInsights')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <p className="text-sm text-slate-700">
                    <strong>Inflation declining:</strong> Consumer prices showing downward trend for third consecutive month, benefiting farmers' purchasing power.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <p className="text-sm text-slate-700">
                    <strong>Export growth:</strong> Agricultural exports up 12.5%, driven by strong coffee and oilseed performance.
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2" />
                  <p className="text-sm text-slate-700">
                    <strong>Input availability:</strong> Fertilizer imports increased, expected to support upcoming planting season.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketNews;
