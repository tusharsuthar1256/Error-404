
import React from 'react';
import { 
  User, Mail, Phone, Calendar, 
  Droplet, Ruler, Weight, Activity,
  Edit3, Shield, Clock, ChevronRight,
  Heart, Star, MapPin
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const ProfilePage: React.FC = () => {
  const healthStats = [
    { label: 'Blood Group', value: 'O+', icon: Droplet, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Height', value: '178 cm', icon: Ruler, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Weight', value: '72 kg', icon: Weight, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'BMI', value: '22.4', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const medicalHistory = [
    { title: 'Annual Health Checkup', date: 'Jan 15, 2024', status: 'Completed', hospital: 'City Care Hospital' },
    { title: 'Flu Vaccination', date: 'Nov 10, 2023', status: 'Administered', hospital: 'Wellness Clinic' },
    { title: 'Dental Screening', date: 'Aug 22, 2023', status: 'Completed', hospital: 'Bright Smiles Dental' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto">
      {/* Header Profile Section */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <GlassCard className="relative overflow-hidden !p-10 border-white/20 neumorph">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary-500 p-1">
                <img 
                  src="https://picsum.photos/seed/profile/200/200" 
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                  alt="profile"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-primary-600 text-white rounded-2xl shadow-xl hover:scale-110 transition-transform">
                <Edit3 size={18} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <h2 className="text-4xl font-bold font-display">Aryan Sharma</h2>
                <span className="px-4 py-1.5 bg-accent-500/10 text-accent-600 rounded-full text-xs font-black uppercase tracking-widest border border-accent-500/20 self-center md:self-auto">
                  Premium Member
                </span>
              </div>
              <p className="text-slate-500 text-lg">Health Enthusiast & Software Engineer</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <div className="flex items-center gap-2 text-slate-400 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl text-sm font-medium">
                  {/* Fixed: Added MapPin to imports above */}
                  <MapPin size={16} /> New Delhi, India
                </div>
                <div className="flex items-center gap-2 text-slate-400 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl text-sm font-medium">
                  <Star size={16} className="text-yellow-500" /> Top 5% Contributor
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info & Stats */}
        <div className="lg:col-span-2 space-y-8">
          {/* Health Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {healthStats.map((stat, i) => (
              <GlassCard key={i} className="!p-6 text-center neumorph border-white/10">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">{stat.label}</p>
                <h4 className="text-xl font-black">{stat.value}</h4>
              </GlassCard>
            ))}
          </div>

          {/* Personal Information Grid */}
          <GlassCard className="neumorph border-white/10 !p-8">
            <h3 className="text-xl font-bold font-display mb-8">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Email', value: 'aryan.sharma@vitality.ai', icon: Mail },
                { label: 'Phone', value: '+91 98765 43210', icon: Phone },
                { label: 'Date of Birth', value: 'October 12, 1996', icon: Calendar },
                { label: 'Emergency Contact', value: 'Raj Sharma (Father)', icon: Shield },
              ].map((info, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{info.label}</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Medical History */}
          <GlassCard className="neumorph border-white/10 !p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold font-display">Medical Timeline</h3>
              <button className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-6">
              {medicalHistory.map((item, i) => (
                <div key={i} className="relative pl-10 before:absolute before:left-3 before:top-2 before:bottom-[-24px] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-primary-500/20 border-2 border-primary-500 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:scale-[1.01] transition-transform">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">{item.title}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                        <Clock size={12} /> {item.date} • {item.hospital}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase rounded-lg">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Conditions & Activity */}
        <div className="space-y-8">
          <GlassCard className="neumorph border-white/10 !p-8">
            <h3 className="text-xl font-bold font-display mb-6">Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {['Asthma', 'Pre-Diabetic', 'Pollen Allergy'].map((cond, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-600 rounded-xl border border-rose-500/20 font-bold text-sm">
                  <Heart size={14} fill="currentColor" />
                  {cond}
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:border-primary-500 hover:text-primary-500 transition-all">
              + Add Condition
            </button>
          </GlassCard>

          <GlassCard className="bg-slate-900 text-white !p-8 border-none overflow-hidden relative">
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-primary-500 blur-[60px] opacity-20"></div>
            <h3 className="text-xl font-bold mb-6">Health Score</h3>
            <div className="text-center py-4">
              <div className="text-6xl font-black text-primary-400 mb-2">92</div>
              <p className="text-sm text-slate-400 uppercase font-black tracking-widest">Exceptional</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Sleep Quality</span>
                <span className="font-bold text-emerald-400">98%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Daily Steps</span>
                <span className="font-bold text-emerald-400">105%</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Vitals Stability</span>
                <span className="font-bold text-primary-400">88%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="neumorph border-white/10 !p-8">
            <h3 className="text-xl font-bold font-display mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-4 px-6 bg-primary-600 text-white rounded-2xl font-bold text-sm hover:scale-[0.98] transition-all flex items-center justify-between">
                Download Health ID <Activity size={18} />
              </button>
              <button className="w-full py-4 px-6 glass dark:bg-white/5 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-between">
                Sync Apple Health <ChevronRight size={18} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
