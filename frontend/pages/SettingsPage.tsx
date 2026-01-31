
import React, { useContext } from 'react';
import { 
  User, Bell, Lock, Globe, Eye,
  Smartphone, Database, HelpCircle,
  LogOut, ChevronRight, Moon, Sun,
  Shield, Languages, Download, Trash2
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import GlassCard from '../components/GlassCard';

const SettingsPage: React.FC = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const SettingRow = ({ icon: Icon, title, desc, action, danger }: any) => (
    <div className="flex items-center justify-between py-6 group">
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${danger ? 'bg-red-500/10 text-red-500' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 group-hover:text-primary-500'}`}>
          <Icon size={22} />
        </div>
        <div>
          <h4 className={`font-bold ${danger ? 'text-red-500' : 'text-slate-800 dark:text-slate-100'}`}>{title}</h4>
          <p className="text-xs text-slate-500 mt-1">{desc}</p>
        </div>
      </div>
      <div>{action || <ChevronRight size={20} className="text-slate-300" />}</div>
    </div>
  );

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button 
      onClick={onToggle}
      className={`w-14 h-8 rounded-full relative transition-all duration-300 ${enabled ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-800'}`}
    >
      <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 ${enabled ? 'right-1' : 'left-1'}`}></div>
    </button>
  );

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold font-display">Settings</h1>
          <p className="text-slate-500 mt-1">Manage your account preferences and security.</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Section */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-4">Account & Profile</h3>
          <GlassCard className="neumorph border-white/10 divide-y divide-slate-100 dark:divide-slate-800 !p-2">
            <div className="px-6">
              <SettingRow 
                icon={User} 
                title="Profile Information" 
                desc="Name, email, phone number and address"
              />
              <SettingRow 
                icon={Lock} 
                title="Security & Password" 
                desc="Change password and two-factor auth"
              />
              <SettingRow 
                icon={Shield} 
                title="Privacy Settings" 
                desc="Control what data you share with others"
              />
            </div>
          </GlassCard>
        </section>

        {/* Preferences Section */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-4">Preferences</h3>
          <GlassCard className="neumorph border-white/10 divide-y divide-slate-100 dark:divide-slate-800 !p-2">
            <div className="px-6">
              <SettingRow 
                icon={darkMode ? Moon : Sun} 
                title="Appearance" 
                desc="Switch between dark and light themes"
                action={<Toggle enabled={darkMode} onToggle={toggleTheme} />}
              />
              <SettingRow 
                icon={Bell} 
                title="Notifications" 
                desc="App alerts, email reports and SMS"
                action={<Toggle enabled={true} onToggle={() => {}} />}
              />
              <SettingRow 
                icon={Languages} 
                title="Language" 
                desc="Current: English (United States)"
                action={
                  <select className="bg-slate-100 dark:bg-slate-900 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none cursor-pointer">
                    <option>English</option>
                    <option>हिंदी</option>
                    <option>Español</option>
                  </select>
                }
              />
            </div>
          </GlassCard>
        </section>

        {/* Data Section */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-4">Data & Privacy</h3>
          <GlassCard className="neumorph border-white/10 divide-y divide-slate-100 dark:divide-slate-800 !p-2">
            <div className="px-6">
              <SettingRow 
                icon={Download} 
                title="Download Data" 
                desc="Request a copy of your health records"
              />
              <SettingRow 
                icon={Trash2} 
                title="Delete Account" 
                desc="Permanently remove your account and data"
                danger
              />
            </div>
          </GlassCard>
        </section>

        {/* Support Section */}
        <section>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-4">Support</h3>
          <GlassCard className="neumorph border-white/10 divide-y divide-slate-100 dark:divide-slate-800 !p-2">
            <div className="px-6">
              <SettingRow 
                icon={HelpCircle} 
                title="Help Center" 
                desc="Guides, FAQs and contact support"
              />
              <SettingRow 
                icon={Smartphone} 
                title="About VitalityAI" 
                desc="Version 2.4.0 (Hackathon Build)"
              />
            </div>
          </GlassCard>
        </section>
      </div>

      <div className="pt-10 flex flex-col items-center gap-4">
        <button className="flex items-center gap-3 px-10 py-4 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all">
          <LogOut size={16} /> Logout Account
        </button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">VitalityAI Healthcare Systems © 2024</p>
      </div>
    </div>
  );
};

export default SettingsPage;
