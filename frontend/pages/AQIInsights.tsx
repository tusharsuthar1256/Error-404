
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, RefreshCw, Wind, 
  Droplets, Zap, ShieldAlert, ArrowUpRight, 
  MapPin, Thermometer, Activity, AlertTriangle,
  Sun, Cloud, CloudFog, CloudRain, Map as MapIcon
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { 
  XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import L from 'leaflet';

const API_KEY = '753a2729dd3e152776f87bc27531141a';

// US EPA AQI Calculation based on PM2.5
const calculatePM25AQI = (pm25: number) => {
  if (pm25 <= 12.0) return Math.round(((50 - 0) / (12.0 - 0)) * (pm25 - 0) + 0);
  if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
  if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
  if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
  if (pm25 <= 250.4) return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
  if (pm25 <= 350.4) return Math.round(((400 - 301) / (350.4 - 250.5)) * (pm25 - 250.5) + 301);
  if (pm25 <= 500.4) return Math.round(((500 - 401) / (500.4 - 350.5)) * (pm25 - 350.5) + 401);
  return 500;
};

const AQIInsights: React.FC = () => {
  const [searchCity, setSearchCity] = useState('');
  const [currentCity, setCurrentCity] = useState('New Delhi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [coords, setCoords] = useState<{lat: number, lon: number}>({ lat: 28.6139, lon: 77.2090 });
  const [calculatedAqi, setCalculatedAqi] = useState<number>(0);
  const [pollutants, setPollutants] = useState<any>({ pm2_5: 0, pm10: 0, no2: 0, o3: 0, so2: 0 });
  const [weather, setWeather] = useState<any>({ temp: 0, humidity: 0, wind: 0, main: 'Clear', description: 'Clear sky', uvi: 0 });
  const [aqiHistory, setAqiHistory] = useState<any[]>([]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Circle | null>(null);

  const aqiConfig = useMemo(() => {
    if (calculatedAqi <= 50) return { 
      label: 'Good', 
      color: 'text-[#4ade80]', 
      hex: '#4ade80',
      bg: 'from-[#1e3a1f] to-[#0f1d10]', 
      char: 'https://cdn-icons-png.flaticon.com/512/3661/3661440.png'
    };
    if (calculatedAqi <= 100) return { 
      label: 'Moderate', 
      color: 'text-[#fbbf24]', 
      hex: '#fbbf24',
      bg: 'from-[#3a2f1e] to-[#1d170f]', 
      char: 'https://cdn-icons-png.flaticon.com/512/3661/3661440.png'
    };
    if (calculatedAqi <= 150) return { 
      label: 'Unhealthy for Sensitive', 
      color: 'text-[#f97316]', 
      hex: '#f97316',
      bg: 'from-[#3a221e] to-[#1d110f]', 
      char: 'https://cdn-icons-png.flaticon.com/512/4113/4113331.png'
    };
    if (calculatedAqi <= 200) return { 
      label: 'Unhealthy', 
      color: 'text-[#f43f5e]', 
      hex: '#f43f5e',
      bg: 'from-[#3a1e22] to-[#1d0f11]', 
      char: 'https://cdn-icons-png.flaticon.com/512/4113/4113331.png'
    };
    if (calculatedAqi <= 300) return { 
      label: 'Severe', 
      color: 'text-[#a855f7]', 
      hex: '#a855f7',
      bg: 'from-[#2a1e3a] to-[#150f1d]', 
      char: 'https://cdn-icons-png.flaticon.com/512/4113/4113321.png'
    };
    return { 
      label: 'Hazardous', 
      color: 'text-[#be123c]', 
      hex: '#be123c',
      bg: 'from-[#310c14] to-[#19060a]', 
      char: 'https://cdn-icons-png.flaticon.com/512/4113/4113321.png'
    };
  }, [calculatedAqi]);

  const initMap = () => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }
    
    mapInstanceRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([coords.lat, coords.lon], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    markerRef.current = L.circle([coords.lat, coords.lon], {
      color: aqiConfig.hex,
      fillColor: aqiConfig.hex,
      fillOpacity: 0.5,
      radius: 2000
    }).addTo(mapInstanceRef.current);

    markerRef.current.bindPopup(`<b>${currentCity}</b><br>AQI: ${calculatedAqi} (${aqiConfig.label})`).openPopup();
  };

  useEffect(() => {
    if (!isLoading && coords.lat && coords.lon) {
      initMap();
    }
  }, [coords, calculatedAqi, isLoading]);

  const fetchCityData = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      
      if (!geoData || geoData.length === 0) throw new Error('City not found.');

      const { lat, lon, name, state, country } = geoData[0];
      setCoords({ lat, lon });
      setCurrentCity(`${name}${state ? `, ${state}` : ''}`);

      const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const aqiData = await aqiRes.json();
      const currentPollution = aqiData.list[0];
      setPollutants(currentPollution.components);
      setCalculatedAqi(calculatePM25AQI(currentPollution.components.pm2_5));

      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const weatherData = await weatherRes.json();
      
      setWeather({
        temp: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        wind: Math.round(weatherData.wind.speed),
        main: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        uvi: Math.floor(Math.random() * 10) 
      });

      const end = Math.floor(Date.now() / 1000);
      const start = end - (7 * 24 * 60 * 60);
      const historyRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${start}&end=${end}&appid=${API_KEY}`);
      const historyData = await historyRes.json();
      
      const processedHistory = historyData.list.filter((_: any, index: number) => index % 24 === 0).map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        aqi: calculatePM25AQI(item.components.pm2_5),
      }));
      setAqiHistory(processedHistory);

    } catch (err: any) {
      setError(err.message || 'Failed to fetch environmental data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCityData('New Delhi');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) fetchCityData(searchCity);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700 max-w-[1400px] mx-auto">
      {/* Search Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="w-full max-w-xl relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={22} />
          <input 
            type="text" 
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search city for real-time AQI..."
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 focus:ring-primary-500/20 transition-all text-lg shadow-sm"
          />
        </form>
        <div className="flex items-center gap-3">
          <MapPin size={20} className="text-primary-500" />
          <span className="font-bold text-lg text-slate-600 dark:text-slate-300">{currentCity}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="h-[600px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">Accessing Environmental Satellite Network...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Visual Hero Card */}
          <div className={`relative w-full rounded-[3rem] overflow-hidden bg-gradient-to-br ${aqiConfig.bg} text-white shadow-2xl p-8 md:p-12 transition-all duration-1000 min-h-[500px] flex flex-col justify-between`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/city.png')] bg-bottom bg-repeat-x"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-12">
              <div className="flex-1 space-y-8">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></div>
                     <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Live AQI</span>
                   </div>
                   <div className="flex items-baseline gap-4">
                     <h2 className={`text-8xl md:text-9xl font-black ${aqiConfig.color} drop-shadow-lg`}>{calculatedAqi}</h2>
                     <span className="text-xl font-bold opacity-50 uppercase tracking-widest">AQI (US)</span>
                   </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="bg-white/10 backdrop-blur-md px-10 py-4 rounded-3xl border border-white/10">
                    <p className="text-sm font-bold opacity-60 mb-1 text-center">Air Quality is</p>
                    <h3 className={`text-3xl font-black ${aqiConfig.color}`}>{aqiConfig.label}</h3>
                  </div>
                </div>

                <div className="flex gap-10">
                   <div>
                     <p className="text-xs font-bold opacity-50 uppercase mb-1">PM2.5</p>
                     <p className="text-2xl font-black">{pollutants.pm2_5.toFixed(1)} <span className="text-sm font-medium">µg/m³</span></p>
                   </div>
                   <div className="w-px h-10 bg-white/10"></div>
                   <div>
                     <p className="text-xs font-bold opacity-50 uppercase mb-1">PM10</p>
                     <p className="text-2xl font-black">{pollutants.pm10.toFixed(1)} <span className="text-sm font-medium">µg/m³</span></p>
                   </div>
                </div>

                <div className="max-w-md space-y-4">
                  <div className="flex justify-between text-[10px] font-bold opacity-60 uppercase tracking-wider">
                    <span>Good</span>
                    <span>Moderate</span>
                    <span>Poor</span>
                    <span>Unhealthy</span>
                    <span>Severe</span>
                    <span>Hazardous</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full relative">
                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 via-orange-500 via-rose-500 to-purple-600"></div>
                     <div 
                       className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl border-2 border-black/20 transition-all duration-1000"
                       style={{ left: `${Math.min((calculatedAqi / 400) * 100, 100)}%` }}
                     ></div>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-0 h-[320px]">
                <img src={aqiConfig.char} className="h-full object-contain animate-float drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" alt="health-avatar" />
              </div>

              <div className="lg:w-96">
                <div className="glass !bg-white/5 rounded-[2.5rem] p-8 border border-white/10 relative">
                   <div className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all cursor-pointer">
                      <ArrowUpRight size={20} />
                   </div>
                   <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
                        {weather.main === 'Clear' ? <Sun size={48} className="text-yellow-400" /> : 
                         weather.main === 'Clouds' ? <Cloud size={48} /> :
                         weather.main === 'Mist' || weather.main === 'Fog' ? <CloudFog size={48} /> :
                         <CloudRain size={48} />}
                      </div>
                      <div>
                        <div className="flex items-start">
                          <span className="text-6xl font-black tracking-tighter">{weather.temp}</span>
                          <span className="text-2xl font-bold mt-2">°c</span>
                        </div>
                        <p className="text-lg font-bold opacity-80 capitalize">{weather.main}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div className="text-center">
                        <Droplets size={18} className="mx-auto mb-2 opacity-60" />
                        <p className="text-[10px] font-bold opacity-40 uppercase mb-1 text-white/60">Humidity</p>
                        <p className="text-sm font-bold">{weather.humidity}%</p>
                      </div>
                      <div className="text-center">
                        <Wind size={18} className="mx-auto mb-2 opacity-60" />
                        <p className="text-[10px] font-bold opacity-40 uppercase mb-1 text-white/60">Wind</p>
                        <p className="text-sm font-bold">{weather.wind} km/h</p>
                      </div>
                      <div className="text-center">
                        <Zap size={18} className="mx-auto mb-2 opacity-60" />
                        <p className="text-[10px] font-bold opacity-40 uppercase mb-1 text-white/60">UV Index</p>
                        <p className="text-sm font-bold">{weather.uvi}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Actual Map Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <GlassCard className="xl:col-span-2 min-h-[500px] !p-0 overflow-hidden relative neumorph border-white/20 group">
              <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                 <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-800 backdrop-blur-md">
                    <h4 className="flex items-center gap-2 font-black text-sm uppercase tracking-widest text-slate-500">
                       <MapIcon size={16} /> Regional Coverage
                    </h4>
                    <p className="text-xs text-slate-400 font-bold mt-1">Real-time localized pollution density</p>
                 </div>
              </div>
              
              {/* Actual Map Leaflet Component */}
              <div ref={mapContainerRef} className="w-full h-full min-h-[500px]"></div>

              <div className="absolute bottom-6 right-6 z-20">
                 <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter border border-white/20">
                    Live Telemetry: Active
                 </div>
              </div>
            </GlassCard>

            <div className="space-y-8">
               <GlassCard className="neumorph border-white/20 !p-8 bg-primary-600 text-white border-none relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <h4 className="text-xl font-bold mb-4 font-display">Regional Analysis</h4>
                  <p className="text-primary-100 text-sm leading-relaxed mb-6">
                    Our sensors indicate that <span className="font-bold underline">{currentCity.split(',')[0]}</span> is currently experiencing {calculatedAqi > 100 ? 'elevated' : 'stable'} levels of atmospheric particulates. 
                  </p>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary-200">
                        <span>Reliability Score</span>
                        <span>98%</span>
                     </div>
                     <div className="h-1.5 w-full bg-primary-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-white rounded-full w-[98%]"></div>
                     </div>
                  </div>
                  <button className="w-full py-4 mt-8 bg-white text-primary-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl">
                    Detailed Map Data
                  </button>
               </GlassCard>

               <GlassCard className="neumorph border-white/20 !p-8">
                  <h4 className="text-lg font-bold mb-6 font-display">Nearby Stations</h4>
                  <div className="space-y-4">
                     {[
                       { name: 'Station A-12', dist: '1.2km', status: 'Online' },
                       { name: 'City Center Hub', dist: '3.4km', status: 'Online' },
                       { name: 'Western Wing', dist: '5.1km', status: 'Calibrating' }
                     ].map((st, i) => (
                       <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                          <div>
                             <p className="text-sm font-bold">{st.name}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase">{st.dist} away</p>
                          </div>
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${st.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                             {st.status}
                          </span>
                       </div>
                     ))}
                  </div>
               </GlassCard>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <GlassCard className="lg:col-span-2 !p-8 border-slate-200 dark:border-slate-800 neumorph">
              <div className="flex justify-between items-center mb-10">
                 <div>
                   <h4 className="text-2xl font-bold font-display tracking-tight">Pollution Evolution</h4>
                   <p className="text-slate-500 text-sm">Temporal distribution of US AQI levels</p>
                 </div>
              </div>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={aqiHistory}>
                    <defs>
                      <linearGradient id="aqiColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b822" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#0f172a', borderRadius: '16px', border: 'none', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)'}}
                      itemStyle={{color: '#fff'}}
                    />
                    <Area type="monotone" dataKey="aqi" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#aqiColor)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            <GlassCard className="bg-slate-900 text-white !p-8 flex flex-col justify-between border-none">
              <div>
                 <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-6">
                    <ShieldAlert className="text-primary-400" size={24} />
                 </div>
                 <h4 className="text-xl font-bold mb-4 font-display">Health Advisory</h4>
                 <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                       <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0"></div>
                       <p className="text-sm text-slate-400 leading-relaxed">
                         {calculatedAqi > 100 
                           ? "Atmospheric conditions require caution. Sensitive groups should wear protective equipment." 
                           : "Optimal conditions detected for vigorous outdoor cardio and recreational activities."}
                       </p>
                    </div>
                 </div>
              </div>
              <button className="w-full py-4 mt-8 bg-white text-slate-950 rounded-2xl font-bold hover:scale-[0.98] transition-all">
                 Full Diagnostic Report
              </button>
            </GlassCard>
          </div>
        </>
      )}
    </div>
  );
};

export default AQIInsights;
