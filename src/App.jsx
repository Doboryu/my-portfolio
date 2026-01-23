import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, Phone, Code, Gamepad, Video, Github, Sun, Moon, Menu, X } from 'lucide-react';

const App = () => {
  // State
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);

  // Refs for animations
  const contactRef = useRef(null);
  const servicesRef = useRef(null);

  // 1. Handle Dark Mode Logic
  useEffect(() => {
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // 2. Track Scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Animation Observers
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const contactObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setContactVisible(true);
    }, observerOptions);
    const servicesObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setServicesVisible(true);
    }, observerOptions);

    if (contactRef.current) contactObserver.observe(contactRef.current);
    if (servicesRef.current) servicesObserver.observe(servicesRef.current);

    return () => {
      if (contactRef.current) contactObserver.unobserve(contactRef.current);
      if (servicesRef.current) servicesObserver.unobserve(servicesRef.current);
    };
  }, []);

  return (
    <div className="bg-gray-50 text-slate-900 dark:bg-[#111] dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden transition-colors duration-300">
      
      {/* Background Grid Lines (Adaptive Color) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', 
             backgroundSize: '100px 100px' 
           }}>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <span className="text-xl font-bold tracking-tighter uppercase border border-white px-2 py-1 z-50">JA.</span>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#about" className="hover:underline underline-offset-4">About</a>
          <a href="#services" className="hover:underline underline-offset-4">Services</a>
          <a href="#contact" className="hover:underline underline-offset-4">Contact</a>
          
          {/* Theme Toggle Button */}
          <button onClick={toggleTheme} className="hover:scale-110 transition-transform">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50">
           <button onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black text-white z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-bold uppercase tracking-widest">
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center px-6 pt-20 z-10 overflow-hidden">
        {/* Animated Marquee (Background) */}
        <div className="absolute top-[20%] left-0 w-full flex overflow-hidden whitespace-nowrap border-y border-black/10 dark:border-white/20 py-4 select-none pointer-events-none">
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            DEVELOPER — DESIGNER — CREATOR —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            DEVELOPER — DESIGNER — CREATOR —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            DEVELOPER — DESIGNER — CREATOR —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            DEVELOPER — DESIGNER — CREATOR —&nbsp;
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-black leading-[0.9] mb-6 tracking-tighter">
            JIRO AZIL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-900 dark:from-gray-100 dark:to-gray-500">
              SANTILLAN
            </span>
          </h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-12 gap-8 border-t border-black/20 dark:border-white/30 pt-8">
            <div className="max-w-md">
              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
                Merging logic with creativity. A developer focused on building immersive digital experiences and interactive game systems.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm tracking-widest uppercase text-slate-500 dark:text-gray-400">Available for work</span>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="relative py-24 md:py-32 px-6 border-t border-black/10 dark:border-white/10 z-10 bg-white dark:bg-[#111] transition-colors duration-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image Container */}
          <div className="relative group">
            <div className="absolute inset-0 border-2 border-black dark:border-white translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src="/march.jpg" 
              alt="Jiro Azil Santillan" 
              className="relative z-10 w-full h-[400px] md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-6 uppercase">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-8 text-slate-900 dark:text-white">
              "I build systems that work and designs that inspire."
            </h3>
            <div className="space-y-6 text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I am a passionate developer currently dedicated to refining my craft. My journey isn't just about writing code; it's about solving complex problems with elegant solutions.
              </p>
              <p>
                Whether it's architecting a web app or designing game mechanics, I approach every project with technical precision and creative curiosity.
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="mt-10 pt-10 border-t border-black/20 dark:border-white/20">
              <span className="text-xs uppercase tracking-widest text-slate-500 dark:text-gray-500 mb-4 block">Core Technologies</span>
              <div className="flex flex-wrap gap-4 text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                <span>React / Next.js</span>
                <span className="text-gray-400">•</span>
                <span>C# / Unity</span>
                <span className="text-gray-400">•</span>
                <span>CapCut / DaVinci Resolve</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="relative py-24 md:py-32 px-6 bg-gray-50 dark:bg-[#0a0a0a] border-t border-black/10 dark:border-white/10 transition-colors duration-300 overflow-hidden">
        
        {/* Background Marquee for Services */}
        <div className="absolute top-[10%] left-0 w-full flex overflow-hidden whitespace-nowrap border-y border-black/5 dark:border-white/5 py-4 select-none pointer-events-none">
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            WEB DEVELOPMENT — GAME DESIGN — VIDEO EDITING —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            WEB DEVELOPMENT — GAME DESIGN — VIDEO EDITING —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            WEB DEVELOPMENT — GAME DESIGN — VIDEO EDITING —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            WEB DEVELOPMENT — GAME DESIGN — VIDEO EDITING —&nbsp;
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-20">
             <h2 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white uppercase tracking-tighter overflow-hidden">
               <span className={`block transform transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${servicesVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                 Expertise
               </span>
             </h2>
          </div>

          <div className="flex flex-col">
            {/* Service Items */}
            {[
              { id: '01', title: 'Web Development', icon: Code, desc: 'Full-stack development using modern frameworks like React and Tailwind.' },
              { id: '02', title: 'Game Development', icon: Gamepad, desc: 'Specializing in Game Design, logic, and interactive mechanics.' },
              { id: '03', title: 'Video Editing', icon: Video, desc: 'Professional editing and motion graphics for social media and branding.' }
            ].map((service, index) => (
              <div key={service.id} className={`group border-t border-black/20 dark:border-white/20 py-12 transition-all duration-700 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer relative overflow-hidden transform ${servicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 px-4">
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <span className="text-slate-400 dark:text-gray-600 font-mono text-xl group-hover:text-black dark:group-hover:text-white transition-colors">{service.id}</span>
                    <h3 className="text-2xl md:text-5xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">{service.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                     <span className="text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 hidden md:block">Details</span>
                    <service.icon size={32} strokeWidth={1} />
                  </div>
                </div>
                <p className="mt-4 md:ml-16 max-w-xl text-slate-600 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-gray-300 transition-colors px-4">
                  {service.desc}
                </p>
              </div>
            ))}
            <div className="border-b border-black/20 dark:border-white/20"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="relative py-24 md:py-32 px-6 bg-white dark:bg-[#111] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
        
        {/* Background Marquee for Contact */}
        <div className="absolute top-[20%] left-0 w-full flex overflow-hidden whitespace-nowrap border-y border-black/5 dark:border-white/5 py-4 select-none pointer-events-none">
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            START A PROJECT — LET'S BUILD TOGETHER — GET IN TOUCH —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            START A PROJECT — LET'S BUILD TOGETHER — GET IN TOUCH —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            START A PROJECT — LET'S BUILD TOGETHER — GET IN TOUCH —&nbsp;
          </div>
          <div className="animate-marquee flex-shrink-0 text-7xl md:text-9xl font-black text-transparent stroke-text-dark dark:stroke-text opacity-30 dark:opacity-80 px-4">
            START A PROJECT — LET'S BUILD TOGETHER — GET IN TOUCH —&nbsp;
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-start justify-between min-h-[50vh]">
            <div>
              <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-16 text-slate-900 dark:text-white">
                <div className="overflow-hidden">
                  <span className={`block transform transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${contactVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                    Let's Work
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span className={`block transform transition-transform duration-1000 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${contactVisible ? 'translate-y-0' : 'translate-y-full'}`}>
                    Together
                  </span>
                </div>
              </h2>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/20 dark:border-white/20 pt-12">
               <div>
                  <p className="text-xl text-slate-600 dark:text-gray-400 max-w-md mb-8">
                    No forms to fill. No hoops to jump through. Just direct communication. 
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500">Currently accepting new projects</span>
                  </div>
               </div>

               <div className="flex flex-col gap-6 items-start md:items-end">
                <a href="mailto:jiroazil@gmail.com" className="group flex items-center gap-4 text-2xl md:text-5xl font-black text-slate-900 dark:text-white hover:text-gray-500 transition-colors break-all">
                  <span>jiroazil@gmail.com</span>
                  <ArrowUpRight className="hidden md:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={40} />
                </a>
                <a href="tel:+639763869864" className="group flex items-center gap-4 text-2xl md:text-5xl font-black text-slate-900 dark:text-white hover:text-gray-500 transition-colors">
                  <span>+63 976 386 9864</span>
                  <ArrowUpRight className="hidden md:block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={40} />
                </a>
               </div>
            </div>
          </div>
          
          <div className="mt-24 pt-8 border-t border-gray-200 dark:border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500">© 2026 Jiro Azil Santillan</span>
            <div className="flex gap-6">
               <a href="https://github.com/Doboryu" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white hover:text-gray-500 transition-colors flex items-center gap-2">
                  <Github size={24}/> <span className="text-sm font-bold">Doboryu</span>
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations & light mode strokes */}
      <style>{`
        /* Dark Mode: White text stroke - Set to solid white so opacity-40 controls visibility */
        .stroke-text {
          -webkit-text-stroke: 1px #ffffff;
        }
        /* Light Mode: Black text stroke - Set to solid black so opacity-40 controls visibility */
        .stroke-text-dark {
          -webkit-text-stroke: 1px #000000;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;