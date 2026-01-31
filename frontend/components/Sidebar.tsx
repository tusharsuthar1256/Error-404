
import React from 'react';
import { 
  Activity, Home, User, BarChart2, 
  Settings, LogOut, Wind 
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'profile', name: 'Health Profile', icon: User },
    { id: 'aqi', name: 'AQI Insights', icon: Wind },
    { id: 'analytics', name: 'Insights', icon: BarChart2 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`
      fixed h-full z-40 transition-all duration-300 glass border-r border-slate-200 dark:border-slate-800
      ${collapsed ? 'w-20' : 'w-72'}
    `}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
          <Activity className="text-white" />
        </div>
        {!collapsed && (
          <span className="text-xl font-bold font-display tracking-tight text-slate-800 dark:text-white">
            VitalityAI
          </span>
        )}
      </div>

      <nav className="mt-10 px-4 space-y-2">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`
              w-full flex items-center gap-4 p-4 rounded-2xl transition-all group
              ${activeView === item.id 
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900'}
            `}
          >
            <item.icon size={22} className={activeView === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
            {!collapsed && <span className="font-semibold">{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-8 left-0 w-full px-4">
        <button className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all group">
          <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
          {!collapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
