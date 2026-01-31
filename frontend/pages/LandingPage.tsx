
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Shield, MapPin, 
  ArrowRight, CheckCircle2, Star, 
  Activity, Zap, Globe, Smartphone, 
  ShieldCheck, LayoutDashboard, Menu, X
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full animate-float"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-accent-500/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Activity className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display">VitalityAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="hover:text-primary-500 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary-500 transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-primary-500 transition-colors">Trust</a>
            <Link to="/auth" className="px-6 py-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-95">
              Get Started
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass absolute top-full left-0 w-full p-6 flex flex-col gap-4 border-t border-white/10 animate-fade-in">
             <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
             <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
             <Link to="/auth" className="w-full py-3 bg-primary-600 text-center text-white rounded-xl">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-primary-600 dark:text-primary-400 font-semibold mb-6 animate-bounce">
              <Zap size={16} />
              <span>Future of Health Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
              Your Health. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">Smarter. Personalised.</span> <br />
              Local.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the next generation of wellness. Our AI-driven engine provides deep health insights, local recommendations, and multilingual support for a healthier you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/auth" className="group w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-full text-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all shadow-xl shadow-primary-600/30">
                Get Started Free
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 glass rounded-full text-lg font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800 hover:bg-white/10 transition-all">
                Explore Features
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i + 50}/100/100`} className="w-10 h-10 rounded-full border-2 border-slate-50 dark:border-slate-950" alt="user" />
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">Trusted by 10,000+ users worldwide</p>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="relative z-10 animate-float">
                <GlassCard className="!p-0 overflow-hidden neumorph border-white/40">
                   <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 flex justify-between items-center text-white">
                      <div>
                        <h4 className="font-semibold text-lg">Health Snapshot</h4>
                        <p className="text-primary-100 text-sm">Real-time vitals updated</p>
                      </div>
                      <Activity className="animate-ping" />
                   </div>
                   <div className="p-6 grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/50 dark:bg-black/20">
                         <p className="text-slate-500 text-xs mb-1">Heart Rate</p>
                         <h3 className="text-2xl font-bold flex items-center gap-2">72 <span className="text-sm font-normal">BPM</span></h3>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/50 dark:bg-black/20">
                         <p className="text-slate-500 text-xs mb-1">Blood Sugar</p>
                         <h3 className="text-2xl font-bold flex items-center gap-2">94 <span className="text-sm font-normal">mg/dL</span></h3>
                      </div>
                      <div className="col-span-2 h-32 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-end justify-between p-4 gap-2">
                        {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                          <div key={i} className="w-full bg-primary-500/30 rounded-t-md relative group">
                            <div style={{height: `${h}%`}} className="w-full bg-primary-500 rounded-t-md transition-all duration-500 group-hover:bg-accent-500"></div>
                          </div>
                        ))}
                      </div>
                   </div>
                </GlassCard>
             </div>

             {/* Floating Icons */}
             <div className="absolute top-10 -left-8 glass p-4 rounded-2xl shadow-xl animate-float" style={{animationDelay: '1s'}}>
                <Heart className="text-red-500" />
             </div>
             <div className="absolute bottom-10 -right-8 glass p-4 rounded-2xl shadow-xl animate-float" style={{animationDelay: '1.5s'}}>
                <ShieldCheck className="text-accent-500" />
             </div>
             <div className="absolute -top-10 right-20 glass p-4 rounded-2xl shadow-xl animate-float" style={{animationDelay: '0.5s'}}>
                <MapPin className="text-primary-500" />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">Smarter Features for a Healthier Life</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with medical research to provide you with the most accurate health profile.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Smart Health Profiling', desc: 'Comprehensive digital twin of your health metrics.', icon: Activity, color: 'text-primary-500' },
              { title: 'Disease-Aware Insights', desc: 'Personalized recommendations based on your conditions.', icon: Shield, color: 'text-red-500' },
              { title: 'Location-Based Insights', desc: 'Find local clinics and air quality data in real-time.', icon: MapPin, color: 'text-accent-500' },
              { title: 'Multilingual Support', desc: 'Switch seamlessly between English and Hindi.', icon: Globe, color: 'text-purple-500' },
              { title: 'Secure & Private', desc: 'Your data is encrypted and stays under your control.', icon: ShieldCheck, color: 'text-blue-500' },
              { title: 'Health Dashboard', desc: 'Visualize your progress with stunning analytics.', icon: LayoutDashboard, color: 'text-orange-500' },
            ].map((feature, i) => (
              <GlassCard key={i} className="text-left group cursor-default border-transparent hover:border-primary-500/20">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500 group-hover:text-white`}>
                  <feature.icon className={feature.color + " group-hover:text-white transition-colors"} size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3 font-display">{feature.title}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24">
         <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 font-display">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10"></div>
               {[
                 { step: '01', title: 'Quick Sign Up', desc: 'Create your account in seconds with Google or email.' },
                 { step: '02', title: 'Health Onboarding', desc: 'Tell us about your vitals and health history.' },
                 { step: '03', title: 'Get Insights', desc: 'Receive your custom dashboard and local health alerts.' }
               ].map((item, i) => (
                 <div key={i} className="text-center group">
                    <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl shadow-primary-600/30 group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold mb-2 font-display">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-100/50 dark:bg-slate-900/50">
         <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-16 font-display">Trusted by Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1,2,3].map(i => (
                 <GlassCard key={i} className="text-left">
                    <div className="flex gap-1 text-orange-400 mb-4">
                      {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic mb-6">
                      "VitalityAI changed how I track my diabetes. The local air quality alerts are a life saver for my morning runs!"
                    </p>
                    <div className="flex items-center gap-3">
                       <img src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-12 h-12 rounded-full" alt="avatar" />
                       <div>
                          <h5 className="font-bold">Patient Name</h5>
                          <p className="text-sm text-slate-500">Verified User</p>
                       </div>
                    </div>
                 </GlassCard>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
         <div className="container mx-auto">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary-600/40">
               <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full"></div>
               <h2 className="text-4xl md:text-6xl font-bold mb-6 font-display">Ready to Start Your Health Journey?</h2>
               <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">Join thousands who are managing their health smarter with VitalityAI.</p>
               <Link to="/auth" className="px-10 py-5 bg-white text-primary-600 rounded-full text-xl font-bold hover:bg-slate-100 transition-all inline-block">
                 Get Started Now
               </Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-6">
                  <Activity className="text-primary-600 w-8 h-8" />
                  <span className="text-2xl font-bold tracking-tight">VitalityAI</span>
               </div>
               <p className="text-slate-500 max-w-sm">Making health tracking intuitive, intelligent, and personalized for everyone, everywhere.</p>
            </div>
            <div>
               <h5 className="font-bold mb-6">Product</h5>
               <ul className="space-y-4 text-slate-500">
                  <li><a href="#" className="hover:text-primary-500">Features</a></li>
                  <li><a href="#" className="hover:text-primary-500">Onboarding</a></li>
                  <li><a href="#" className="hover:text-primary-500">Pricing</a></li>
               </ul>
            </div>
            <div>
               <h5 className="font-bold mb-6">Company</h5>
               <ul className="space-y-4 text-slate-500">
                  <li><a href="#" className="hover:text-primary-500">About</a></li>
                  <li><a href="#" className="hover:text-primary-500">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary-500">Terms</a></li>
               </ul>
            </div>
         </div>
         <div className="container mx-auto px-6 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500">
            <p>© 2024 VitalityAI. Built for Hackathons.</p>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
