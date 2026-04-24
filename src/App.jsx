import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, Phone, Code, Gamepad, Video, Github, Sun, Moon, Menu, X, ExternalLink, PlayCircle } from 'lucide-react';

// --- PROJECT DATA ---
// You can easily edit this section to add your real projects!
const expertiseData = [
  { 
    id: '01', 
    title: 'Web Development', 
    icon: Code, 
    desc: 'Full-stack development using modern frameworks like React and Tailwind.',
    projects: [
      {
        id: 1,
        title: 'Scent-Match',
        type: 'image', // 'image', 'video', or 'link'
        mediaUrl: 'scentmatch.jpg',
        link: 'https://scent-match.vercel.app',
        description: 'A modern online fragrance builder to find the perfume that perfectly matches your lifestyle, occasion, and personality. Created using React and Tailwind CSS.'
      },
    ]
  },
  { 
    id: '02', 
    title: 'Game Development', 
    icon: Gamepad, 
    desc: 'Specializing in Game Design, logic, and interactive mechanics.',
    projects: [
      {
        id: 3,
        title: 'Flavorful Journeys',
        type: 'video', 
        // Example: Put your video file in the 'public' folder and link it here like '/my-game.mp4'
        mediaUrl: 'favjourn.mp4', 
        link: 'https://flavorfuljourneys.fil-byte.com',
        description: 'An Adventure Cooking Game that lets you explore the world of Gourmara. Created using Unity and C#.'
      }
    ]
  },
  { 
    id: '03', 
    title: 'Video Editing', 
    icon: Video, 
    desc: 'Professional editing for social media and branding.',
    projects: [
      {
        id: 4,
        title: 'MARIPOSA: Pour Femme - Brand Promotional Video',
        type: 'video',
        mediaUrl: 'mariposa.mp4',
        link: 'https://www.tiktok.com/@fragranzaolio/video/7596930944892751111',
        description: 'High-energy promo video edited in DaVinci Resolve.'
      },
      {
        id: 5,
        title: 'ZYNX: Pour Homme - Brand Promotional Video',
        type: 'video',
        mediaUrl: 'ZYNX.mp4',
        link: 'https://www.tiktok.com/@fragranzaolio/video/7588467621272538386',
        description: 'Engaging short-form content edited using CapCut.'
      }
    ]
  }
];

const App = () => {
  // State
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  
  // New State for Modal
  const [selectedService, setSelectedService] = useState(null);

  // Refs for animations
  const contactRef = useRef(null);
  const servicesRef = useRef(null);

  // 1. Handle Dark Mode Logic
  useEffect(() => {
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedService || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService, isMobileMenuOpen]);

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
      
      {/* Background Grid Lines */}
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
        {/* Animated Marquee */}
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
          <div className="relative group">
            <div className="absolute inset-0 border-2 border-black dark:border-white translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <img 
              src="/marchie.jpg" 
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
        
        <div className="absolute top-[10%] left-0 w-full flex overflow-hidden whitespace-nowrap border-y border-black/5 dark:border-white/5 py-4 select-none pointer-events-none">
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
            {expertiseData.map((service, index) => (
              // Added onClick handler to open modal
              <div 
                key={service.id} 
                onClick={() => setSelectedService(service)}
                className={`group border-t border-black/20 dark:border-white/20 py-12 transition-all duration-700 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer relative overflow-hidden transform ${servicesVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} 
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 px-4">
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <span className="text-slate-400 dark:text-gray-600 font-mono text-xl group-hover:text-black dark:group-hover:text-white transition-colors">{service.id}</span>
                    <h3 className="text-2xl md:text-5xl font-bold uppercase tracking-tight text-slate-900 dark:text-white">{service.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                     <span className="text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-4 group-hover:translate-x-0 hidden md:block">View Projects</span>
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

      {/* --- PROJECTS MODAL OVERLAY --- */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          {/* Modal Box */}
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-50 dark:bg-[#111] rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl custom-scrollbar animate-fade-in-up">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-gray-50/90 dark:bg-[#111]/90 backdrop-blur-md border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-4">
                <selectedService.icon size={32} className="text-slate-900 dark:text-white" />
                <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                  {selectedService.title} Projects
                </h2>
              </div>
              <button 
                onClick={() => setSelectedService(null)} 
                className="p-2 bg-black/5 dark:bg-white/10 hover:bg-red-500 hover:text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content / Projects Grid */}
            <div className="p-6 md:p-8">
              {selectedService.projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedService.projects.map((project) => (
                    <div key={project.id} className="group flex flex-col bg-white dark:bg-[#1a1a1a] rounded-xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-slate-400 dark:hover:border-gray-500 transition-colors shadow-sm">
                      
                      {/* Media Area */}
                      <div className="relative aspect-video bg-gray-200 dark:bg-black overflow-hidden flex items-center justify-center">
                        {project.type === 'image' && (
                          <img src={project.mediaUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                        {project.type === 'video' && (
                          <video src={project.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        )}
                        {project.type === 'link' && (
                          <div className="text-gray-400 dark:text-gray-600 flex flex-col items-center">
                            <ExternalLink size={48} className="mb-2 opacity-50" />
                            <span className="text-sm font-bold uppercase tracking-widest">Link Only Project</span>
                          </div>
                        )}
                      </div>

                      {/* Project Details */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h4>
                        <p className="text-slate-600 dark:text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors"
                        >
                          View Project <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500 dark:text-gray-500">
                  <p className="text-xl font-bold uppercase tracking-widest">Projects coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="relative py-24 md:py-32 px-6 bg-white dark:bg-[#111] text-slate-900 dark:text-white transition-colors duration-300 overflow-hidden">
        <div className="absolute top-[20%] left-0 w-full flex overflow-hidden whitespace-nowrap border-y border-black/5 dark:border-white/5 py-4 select-none pointer-events-none">
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
               <a href="" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white hover:text-gray-500 transition-colors flex items-center gap-2">
    
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations & custom scrollbar for modal */}
      <style>{`
        .stroke-text { -webkit-text-stroke: 1px #ffffff; }
        .stroke-text-dark { -webkit-text-stroke: 1px #000000; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Custom Scrollbar for Modal */
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background-color: rgba(156, 163, 175, 0.5); 
          border-radius: 20px; 
        }
      `}</style>
    </div>
  );
};

export default App;