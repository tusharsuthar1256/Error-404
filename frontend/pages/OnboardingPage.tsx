
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ArrowLeft, User, 
  Activity, MapPin, Check, 
  Thermometer, Wind, Zap, Navigation,
  Search, X, Plus, AlertCircle
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface OnboardingPageProps {
  onComplete: () => void;
}

const commonSuggestions = [
  'Asthma', 'Hypertension', 'Heart Disease', 'Arthritis', 'Anxiety', 
  'Depression', 'PCOS', 'Cholesterol', 'Migraine', 'Obesity',
  'Celiac Disease', 'Anemia', 'Eczema', 'Sleep Apnea', 'Insomnia'
];

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    conditions: [] as string[],
    city: '',
    state: ''
  });
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleCondition = (cond: string) => {
    setFormData(prev => {
      if (cond === 'None') {
        return { ...prev, conditions: ['None'] };
      }
      
      const filtered = prev.conditions.filter(c => c !== 'None');
      if (filtered.includes(cond)) {
        const newConditions = filtered.filter(c => c !== cond);
        return { ...prev, conditions: newConditions.length === 0 ? [] : newConditions };
      } else {
        return { ...prev, conditions: [...filtered, cond] };
      }
    });
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const removeCondition = (cond: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c !== cond)
    }));
  };

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return commonSuggestions.filter(s => 
      s.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !formData.conditions.includes(s)
    );
  }, [searchTerm, formData.conditions]);

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && !formData.conditions.includes(searchTerm.trim())) {
      toggleCondition(searchTerm.trim());
    }
  };

  const handleSubmit = () => {
    onComplete();
    navigate('/dashboard');
  };

  const isStep1Valid = formData.name && formData.age && formData.gender;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-8">
           <button onClick={step > 1 ? handleBack : () => navigate('/')} className="p-2 glass rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
           </button>
           <div className="flex-1 px-8">
              <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-primary-600 transition-all duration-700 ease-out"
                   style={{ width: `${(step / 2) * 100}%` }}
                 ></div>
              </div>
           </div>
           <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">Step {step}/2</span>
        </div>

        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-bold font-display mb-3 tracking-tight">Basic Details</h2>
            <p className="text-slate-500 mb-10 text-lg">Let's start with the basics to personalize your health journey.</p>
            
            <GlassCard className="space-y-8 neumorph border-white/40 !p-10">
               <div className="space-y-4">
                  <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={22} />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-14 pr-4 py-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/20 transition-all text-lg font-medium" 
                      placeholder="Enter your full name" 
                    />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Age</label>
                    <input 
                      type="number" 
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full px-6 py-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/20 transition-all text-lg font-medium" 
                      placeholder="Years" 
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Gender</label>
                    <div className="flex gap-2">
                       {['Male', 'Female', 'Other'].map(g => (
                         <button 
                           key={g}
                           onClick={() => setFormData({...formData, gender: g})}
                           className={`flex-1 py-5 rounded-2xl font-bold transition-all ${formData.gender === g ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/30' : 'bg-slate-100 dark:bg-slate-800/50 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                         >
                           {g}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>

               <button 
                 onClick={handleNext}
                 disabled={!isStep1Valid}
                 className="w-full py-5 bg-primary-600 text-white rounded-3xl font-black text-xl hover:bg-primary-700 transition-all shadow-2xl shadow-primary-600/40 disabled:opacity-50 disabled:shadow-none hover:scale-[1.02] active:scale-[0.98] mt-4"
               >
                 Continue <ChevronRight className="inline-block ml-2" size={24} />
               </button>
            </GlassCard>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-bold font-display mb-3 tracking-tight">Health & Location</h2>
            <p className="text-slate-500 mb-10 text-lg">Help us tailor your dashboard with localized environmental alerts and medical insights.</p>
            
            <GlassCard className="space-y-10 neumorph border-white/40 !p-10">
               <div>
                  <div className="flex justify-between items-end mb-6">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Existing Conditions</label>
                    {formData.conditions.length > 0 && (
                      <button 
                        onClick={() => setFormData({...formData, conditions: []})} 
                        className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Selected Conditions Pills */}
                  {formData.conditions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in zoom-in duration-300">
                      {formData.conditions.map(cond => (
                        <div key={cond} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20">
                          {cond}
                          <button onClick={() => removeCondition(cond)} className="hover:bg-white/20 rounded-full p-0.5 transition-colors">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Search and Manual Add */}
                  <div className="relative mb-8">
                    <form onSubmit={handleManualAdd}>
                      <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={20} />
                        <input 
                          type="text" 
                          value={searchTerm}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Search or type a condition..."
                          className="w-full pl-12 pr-12 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/20 transition-all font-medium"
                        />
                        {searchTerm && (
                          <button 
                            type="submit" 
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md"
                          >
                            <Plus size={18} />
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Suggestions Dropdown */}
                    {showSuggestions && (filteredSuggestions.length > 0 || (searchTerm && !formData.conditions.includes(searchTerm))) && (
                      <div className="absolute z-50 left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                        {filteredSuggestions.map(suggestion => (
                          <button 
                            key={suggestion}
                            onClick={() => toggleCondition(suggestion)}
                            className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{suggestion}</span>
                            <Plus size={16} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                          </button>
                        ))}
                        {searchTerm && !filteredSuggestions.includes(searchTerm) && !formData.conditions.includes(searchTerm) && (
                          <button 
                            onClick={() => toggleCondition(searchTerm)}
                            className="w-full text-left px-6 py-4 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors flex items-center gap-3"
                          >
                            <div className="p-1.5 bg-primary-600 rounded-lg text-white">
                              <Plus size={14} />
                            </div>
                            <span className="font-bold text-primary-600 dark:text-primary-400">Add "{searchTerm}"</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Common Selection Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Diabetes', icon: Activity },
                      { name: 'Blood Sugar', icon: Thermometer },
                      { name: 'Hypertension', icon: Wind },
                      { name: 'Thyroid', icon: Zap },
                      { name: 'None', icon: Check }
                    ].map(item => (
                      <button 
                        key={item.name}
                        onClick={() => toggleCondition(item.name)}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${formData.conditions.includes(item.name) ? 'border-primary-600 bg-primary-600/10 text-primary-600 shadow-xl shadow-primary-500/10 scale-[1.05]' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                      >
                        <item.icon size={28} className={formData.conditions.includes(item.name) ? 'animate-pulse' : ''} />
                        <span className="font-bold text-sm">{item.name}</span>
                      </button>
                    ))}
                  </div>
               </div>

               <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-black text-slate-500 uppercase tracking-widest">Your Location</label>
                    <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-black hover:underline group">
                      <Navigation size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      Auto-Detect
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" size={20} />
                      <input 
                        type="text" 
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        placeholder="City" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/20 transition-all font-medium" 
                      />
                    </div>
                    <div className="relative group">
                      <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500" size={20} />
                      <input 
                        type="text" 
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        placeholder="State" 
                        className="w-full pl-12 pr-4 py-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl outline-none focus:ring-4 focus:ring-primary-500/20 transition-all font-medium" 
                      />
                    </div>
                  </div>
               </div>

               <div className="flex items-center gap-3 p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                  <AlertCircle className="text-amber-500 shrink-0" size={20} />
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400 leading-tight">
                    We use your location and health data to send you localized environmental alerts and personalized wellness tips.
                  </p>
               </div>

               <button 
                 onClick={handleSubmit}
                 className="w-full py-5 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-3xl font-black text-xl hover:opacity-90 transition-all shadow-2xl shadow-primary-600/40 hover:scale-[1.02] active:scale-[0.98]"
               >
                 Complete Setup
               </button>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
