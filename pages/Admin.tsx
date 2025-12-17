import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users, Globe, TrendingUp, Clock, MapPin, Eye,
  RefreshCw, LogOut, Shield, BarChart3, Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { adminLogin } from '../utils/adminApi';

interface VisitorData {
  id: string;
  ip: string;
  country?: string;
  city?: string;
  userAgent: string;
  referrer: string;
  path: string;
  timestamp: string;
  visitCount: number;
  lastVisit: string;
  firstVisit: string;
}

interface Stats {
  totalVisitors: number;
  totalVisits: number;
  uniqueCountries: number;
  countryStats: Record<string, number>;
}

const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await adminLogin(password);

      if (result.success && result.data) {
        setVisitors(result.data.visitors || []);
        setStats(result.data.stats);
        setIsAuthenticated(true);
        setSavedPassword(password); // Save password for refresh
        setPassword('');
      } else {
        setError(result.error || 'Onjuist wachtwoord');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Fout bij inloggen';
      setError(`Fout bij inloggen: ${errorMsg}`);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await adminLogin(savedPassword);

      if (result.success && result.data) {
        setVisitors(result.data.visitors || []);
        setStats(result.data.stats);
      } else {
        setError('Fout bij ophalen data. Probeer opnieuw in te loggen.');
        setIsAuthenticated(false);
      }
    } catch (err) {
      setError('Fout bij ophalen data');
      console.error('Refresh error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setVisitors([]);
    setStats(null);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('nl-NL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get top countries
  const topCountries = stats
    ? Object.entries(stats.countryStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
    : [];

  // Click tracking stats from local storage for demo purposes
  // In a real app, this would come from the API
  const [clickStats, setClickStats] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Load click events if available (mock/local implementation)
      const storedClicks = localStorage.getItem('skye_click_events');
      if (storedClicks) {
        try {
          setClickStats(JSON.parse(storedClicks));
        } catch (e) {
          console.error("Failed to load clicks", e);
        }
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-darkBg p-4">
        <div className="max-w-md w-full bg-white dark:bg-darkCard rounded-xl shadow-xl p-8 border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-center mb-6">
            <Shield className="text-primary" size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2 text-navy dark:text-white">
            Admin Panel
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Voer het wachtwoord in om toegang te krijgen
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wachtwoord"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primaryDark text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 mb-6 border border-slate-200 dark:border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Bezoekersstatistieken en analytics
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 bg-primary hover:bg-primaryDark text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                Verversen
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={20} />
                Uitloggen
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Users className="text-primary" size={24} />
                <span className="text-2xl font-bold text-navy dark:text-white">
                  {stats.totalVisitors}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Unieke Bezoekers
              </p>
            </div>

            <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Eye className="text-accent" size={24} />
                <span className="text-2xl font-bold text-navy dark:text-white">
                  {stats.totalVisits}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Totaal Bezoeken
              </p>
            </div>

            <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <Globe className="text-green-500" size={24} />
                <span className="text-2xl font-bold text-navy dark:text-white">
                  {stats.uniqueCountries}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Landen
              </p>
            </div>

            <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="text-blue-500" size={24} />
                <span className="text-2xl font-bold text-navy dark:text-white">
                  {stats.totalVisits > 0
                    ? (stats.totalVisits / stats.totalVisitors).toFixed(1)
                    : '0'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Gem. Bezoeken/Bezoeker
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Click Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
          <h3 className="text-lg font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" /> CTA Kliks
          </h3>
          <span className="text-3xl font-black text-primary block">
            {clickStats.filter((c: any) => c.type === 'cta').length || 0}
          </span>
          <span className="text-xs text-slate-400">Totaal website kliks</span>
        </div>
        <div className="bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
          <h3 className="text-lg font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
            <BarChart3 size={20} className="text-green-500" /> WhatsApp
          </h3>
          <span className="text-3xl font-black text-green-500 block">
            {clickStats.filter((c: any) => c.type === 'whatsapp').length || 0}
          </span>
          <span className="text-xs text-slate-400">Totaal WhatsApp kliks</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Countries */}
        <div className="lg:col-span-1 bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
            <MapPin size={20} />
            Top Landen
          </h2>
          <div className="space-y-3">
            {topCountries.length > 0 ? (
              topCountries.map(([country, count]) => (
                <div key={country} className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">{country}</span>
                  <span className="font-bold text-primary">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Nog geen data beschikbaar
              </p>
            )}
          </div>
        </div>

        {/* Visitors List */}
        <div className="lg:col-span-2 bg-white dark:bg-darkCard rounded-xl shadow-lg p-6 border border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-navy dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} />
            Recente Bezoekers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Land
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Bezoeken
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Laatste Bezoek
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    Pagina
                  </th>
                </tr>
              </thead>
              <tbody>
                {visitors.length > 0 ? (
                  visitors.slice(0, 20).map((visitor) => (
                    <tr
                      key={visitor.id}
                      className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300">
                        {visitor.country || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-medium">{visitor.visitCount}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300">
                        {formatDate(visitor.lastVisit)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-700 dark:text-slate-300">
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                          {visitor.path}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      Nog geen bezoekers geregistreerd
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

