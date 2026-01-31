
import React from 'react';
import { Search, Globe, Sun, Moon, Menu } from 'lucide-react';

interface NavbarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (val: boolean) => void;
  lang: string;
  setLang: (lang: string) => void;
  darkMode: boolean;
  toggleTheme: () => void;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  lang, 
  setLang, 
  darkMode, 
  toggleTheme,
  onProfileClick
}) => {
  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden md:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search health records..." 
            className="pl-12 pr-6 py-2.5 bg-slate-100/50 dark:bg-slate-900/50 border border-transparent focus:border-primary-500/30 rounded-xl w-80 outline-none focus:ring-4 focus:ring-primary-500/5 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
          className="flex items-center gap-2 px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all font-bold text-sm"
        >
          <Globe size={18} className="text-primary-500" />
          <span className="hidden sm:inline">{lang === 'EN' ? 'English' : 'हिंदी'}</span>
          <span className="sm:hidden">{lang}</span>
        </button>
        
        <button 
          onClick={toggleTheme}
          className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400"
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-primary-600" />}
        </button>
        
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

        <button 
          onClick={onProfileClick}
          className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all group"
        >
          <span className="hidden lg:block text-sm font-bold text-slate-700 dark:text-slate-200">Aryan Sharma</span>
          <div className="w-10 h-10 rounded-full border-2 border-primary-500 p-0.5 transition-transform group-hover:scale-105">
            <img 
              src="https://picsum.photos/seed/profile/100/100" 
              className="w-full h-full rounded-full object-cover" 
              alt="profile" 
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
