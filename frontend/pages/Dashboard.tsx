
import React, { useState, useContext } from 'react';
import { 
  Activity, Bell, ChevronRight,
  TrendingUp, Wind, MapPin, Heart, Shield
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import GlassCard from '../components/GlassCard';
import { 
  AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import AQIInsights from './AQIInsights';
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const vitalsData = [
  { name: 'Mon', bpm: 68, glucose: 95 },
  { name: 'Tue', bpm: 72, glucose: 102 },
  { name: 'Wed', bpm: 70, glucose: 98 },
  { name: 'Thu', bpm: 75, glucose: 110 },
  { name: 'Fri', bpm: 71, glucose: 96 },
  { name: 'Sat', bpm: 69, glucose: 92 },
  { name: 'Sun', bpm: 72, glucose: 94 },
];

const Dashboard: React.FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState('EN');
  const [activeView, setActiveView] = useState('dashboard');

  const renderDashboardContent = () => (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      {/* Welcome Card */}
      <section className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-2xl shadow-primary-500/20">
         <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 blur-[80px] rounded-full"></div>
         <div className="relative z-10">
            <h2 className="text-4xl font-bold font-display mb-2">Good morning, Aryan!</h2>
            <p className="text-primary-100 text-lg opacity-90">Your health is looking great today. You've completed 80% of your daily goals.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-primary-600 rounded-2xl font-bold shadow-lg hover:scale-105 active:scale-95 transition-all">Start Health Scan</button>
              <button className="px-6 py-3 bg-white/20 text-white backdrop-blur rounded-2xl font-bold hover:bg-white/30 active:scale-95 transition-all">View Reports</button>
            </div>
         </div>
         <div className="hidden lg:flex items-center gap-6 mt-8 md:mt-0 relative z-10">
            <div className="text-center">
               <p className="text-xs uppercase tracking-widest text-primary-100 opacity-70 mb-1">Steps Today</p>
               <h3 className="text-3xl font-bold">8,432</h3>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
               <p className="text-xs uppercase tracking-widest text-primary-100 opacity-70 mb-1">Cals Burned</p>
               <h3 className="text-3xl font-bold">420</h3>
            </div>
         </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'BMI Status', val: '22.4', unit: 'Healthy', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Blood Glucose', val: '94', unit: 'mg/dL', icon: TrendingUp, color: 'text-accent-500', bg: 'bg-accent-500/10' },
          { label: 'Air Quality', val: '42', unit: 'Good (PM2.5)', icon: Wind, color: 'text-primary-500', bg: 'bg-primary-500/10' },
          { label: 'Conditions', val: '1', unit: 'Active', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <GlassCard key={i} className="hover:translate-y-[-4px] neumorph border-white/20 !p-7">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-[1.25rem] ${stat.bg} ${stat.color}`}>
                <stat.icon size={26} />
              </div>
              <span className="text-accent-500 flex items-center gap-1 text-sm font-black bg-accent-500/10 px-3 py-1.5 rounded-xl border border-accent-500/10">
                <TrendingUp size={14} /> +2%
              </span>
            </div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.1em]">{stat.label}</p>
            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-4xl font-black">{stat.val}</h3>
              <span className="text-sm text-slate-400 font-bold uppercase">{stat.unit}</span>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Charts & Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2 neumorph border-white/20 !p-8">
           <div className="flex justify-between items-center mb-10">
              <div>
                <h4 className="text-2xl font-bold font-display tracking-tight">Vitals Analytics</h4>
                <p className="text-slate-500 text-sm">Long-term cardiovascular trends</p>
              </div>
              <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                 <button className="px-4 py-2 bg-white dark:bg-slate-800 shadow-sm rounded-lg text-xs font-bold transition-all">7D</button>
                 <button className="px-4 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold transition-all">30D</button>
                 <button className="px-4 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold transition-all">1Y</button>
              </div>
           </div>
           <div className="h-[380px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={vitalsData}>
                 <defs>
                   <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#1e293b' : '#e2e8f0'} />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{backgroundColor: darkMode ? '#0f172a' : '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}
                 />
                 <Area type="monotone" dataKey="bpm" stroke="#0ea5e9" strokeWidth={4} fillOpacity={1} fill="url(#colorBpm)" />
                 <Area type="monotone" dataKey="glucose" stroke="#10b981" strokeWidth={4} fillOpacity={0.1} fill="#10b981" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>

        <div className="space-y-6">
           <GlassCard className="neumorph border-white/20 !p-8">
              <h4 className="text-xl font-bold font-display mb-8">Health Intelligence</h4>
              <div className="space-y-6">
                 {[
                   { title: 'Local Hazard', desc: 'AQI is spiking near New Delhi. Wear an N95 mask.', icon: MapPin, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                   { title: 'Prescription', desc: 'Medication due in 15 minutes.', icon: Bell, color: 'text-primary-500', bg: 'bg-primary-500/10' },
                   { title: 'Wellness Goal', desc: '1,200 steps to reach daily target.', icon: TrendingUp, color: 'text-accent-500', bg: 'bg-accent-500/10' },
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:scale-[1.03] transition-all cursor-pointer">
                      <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm group-hover:rotate-12 transition-transform`}>
                         <item.icon size={22} />
                      </div>
                      <div>
                         <h6 className="font-bold text-sm tracking-tight">{item.title}</h6>
                         <p className="text-xs text-slate-500 leading-relaxed mt-1">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </GlassCard>

           <GlassCard className="bg-slate-950 text-white border-none !p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-[60px] rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <h4 className="text-lg font-bold mb-4 font-display opacity-80 uppercase tracking-widest text-xs">Bio-Rhythm Focus</h4>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 font-medium">"Prioritize high-quality protein today to optimize muscle recovery."</p>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl font-bold text-sm transition-all border border-white/10 active:scale-[0.98]">
                Unlock Full Analysis
              </button>
           </GlassCard>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />

      <main className={`
        flex-1 transition-all duration-300
        ${sidebarCollapsed ? 'ml-20' : 'ml-72'}
      `}>
        <Navbar 
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          toggleTheme={toggleTheme}
          onProfileClick={() => setActiveView('profile')}
        />

        <div className="relative pb-20">
          {activeView === 'dashboard' ? renderDashboardContent() : 
           activeView === 'aqi' ? <AQIInsights /> : 
           activeView === 'profile' ? <ProfilePage /> :
           activeView === 'settings' ? <SettingsPage /> :
           <div className="p-8 flex items-center justify-center h-[calc(100vh-80px)]">
             <div className="text-center animate-in zoom-in duration-500">
               <Activity className="w-20 h-20 text-slate-200 dark:text-slate-800 mx-auto mb-6 animate-pulse" />
               <h2 className="text-3xl font-bold text-slate-400 font-display tracking-tight">Feature in Development</h2>
               <p className="text-slate-500 mt-2">The {activeView} module is being optimized for your profile.</p>
               <button onClick={() => setActiveView('dashboard')} className="mt-8 text-primary-500 font-bold hover:underline flex items-center gap-2 mx-auto">
                 Return to Dashboard <ChevronRight size={18} />
               </button>
             </div>
           </div>}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
