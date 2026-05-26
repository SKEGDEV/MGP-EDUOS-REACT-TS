import React, { useEffect, useState } from 'react';

interface DecisionScreenProps {
  onSelectSide: (side: 'jedi' | 'sith') => void;
}

const DecisionScreen: React.FC<DecisionScreenProps> = ({ onSelectSide }) => {
  const [embers, setEmbers] = useState<Array<{ id: number; size: number; left: number; bottom: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    // Generate floating embers
    const numEmbers = 25;
    const newEmbers = Array.from({ length: numEmbers }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2, // 2px to 6px
      left: Math.random() * 100, // 0% to 100%
      bottom: Math.random() * 30, // start in bottom 30%
      duration: Math.random() * 3 + 2, // 2s to 5s
      delay: Math.random() * 5, // 0s to 5s delay
    }));
    setEmbers(newEmbers);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#050505] text-on-surface overflow-hidden flex flex-col items-center justify-center relative">
      
      {/* Background Gradients and Effects */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at 50% 120%, rgba(255, 60, 0, 0.15) 0%, rgba(10, 10, 10, 1) 70%)'
        }}
      />
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-50" 
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 60, 0, 0.02) 2px, rgba(255, 60, 0, 0.02) 4px)'
        }}
      />

      {/* Embers Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute bg-primary rounded-full animate-ember-float"
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              left: `${ember.left}%`,
              bottom: `${ember.bottom}%`,
              animationDuration: `${ember.duration}s`,
              animationDelay: `${ember.delay}s`,
              boxShadow: '0 0 10px #ff5540, 0 0 20px #ff0000',
              opacity: 0
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col items-center justify-center min-h-screen">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-16 animate-fade-in-up">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
            Protocolo de Decisión
          </h1>
          <p className="font-label-sm text-label-sm text-secondary tracking-[0.2em] mt-2 md:mt-4 opacity-70">
            SISTEMA EN ESPERA // SELECCIONE ALINEACIÓN
          </p>
        </div>

        {/* Decision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-gutter w-full max-w-sm md:max-w-6xl">
          
          {/* Dark Side Card */}
          <button 
            onClick={() => onSelectSide('sith')}
            className="bg-surface/60 backdrop-blur-[20px] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col items-center justify-between group cursor-pointer h-full min-h-[40vh] md:min-h-[60vh] relative overflow-hidden transition-all duration-300 hover:border-primary-container hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:scale-[1.02]"
          >
            {/* Background Image overlaying card */}
            <div 
              className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity group-hover:opacity-80 transition-opacity duration-500 bg-center bg-cover md:hidden" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDePf2lKieDgzu7byxiPBghab8H7b_xJ1T8HIUpbdDZGU52ARZR13oDTLC988R9Jnzsz6HI6a20fSGOhbMpdVF8v-Yzii4Ks6-LJGZDsqx3N_xiHdvMtuI2L59Sc0BCoF_CLGhnei_nuFu73xOwoDWeBpNnTt_KgYRo_CBaMjxKDKQew1VZMnIZxj2So4S72wCDduS7PJ93DTotKIuDt5xzYGnwOOIfBrEiY1XFod9CLsHdJn9XUGRRLc0pOwRuKCC5VL6NWEYEckYo')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10 md:hidden" />
            
            {/* Desktop Image */}
            <div className="relative w-full flex-grow hidden md:flex items-center justify-center mb-8 z-20">
              <img 
                alt="Vader" 
                className="max-h-[50vh] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0I-E5vZGtuNdvVT_3Hh0ebhnxz1pNF8YOoTuVHK-jJZ9z0v7ztZOGriUWBCDCk5rsWWYUDnw6GcgapuP3i4sknh5RRNuGu-8P3H_fMcWMuJRUpAvXXrTAdN2Uxa6dtP8EaqTK4xxJHgobFJlGNKE2_87BYzKc87VygHcCW3uIjWWs8YvAi8emiW2L2h52YQVoME7cmtQz3Wa06TWhk0qJ3I3WIZum2pARt3KPom0P0UFsiLRBJkoQH_qqJCRWkbAC0qH_JZH5tIKd"
              />
            </div>
            
            <div className="text-center w-full z-20 relative flex flex-col items-center justify-end h-full md:h-auto md:justify-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-4 drop-shadow-[0_0_10px_#ffb4a8] md:hidden">
                swords
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold tracking-tight text-primary uppercase md:normal-case">Lado Oscuro</h2>
              <p className="font-body-md text-body-md text-on-surface-variant md:h-12">
                Únete hoy al lado oscuro. Poder absoluto.
              </p>
            </div>
            
            {/* Mobile Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left shadow-[0_0_10px_#ffb4a8] md:hidden" />
          </button>

          {/* Light Side Card */}
          <button 
            onClick={() => onSelectSide('jedi')}
            className="bg-surface/60 backdrop-blur-[20px] border border-white/10 rounded-xl p-6 md:p-8 flex flex-col items-center justify-between group cursor-pointer h-full min-h-[40vh] md:min-h-[60vh] relative overflow-hidden transition-all duration-300 hover:border-light-primary hover:shadow-[0_0_30px_rgba(125,211,252,0.2)] hover:scale-[1.02]"
          >
            {/* Background Image overlaying card */}
            <div 
              className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity group-hover:opacity-70 transition-opacity duration-500 bg-center bg-cover md:hidden" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUgqdB32UIkf5bhas6GL8y7pHd0KiXeBpi-3PYmTs3VlKWzJgrU6PR8UxATq89pAOICfIfTVUMPCgTmSCaj-tUUQUUQxpNoQlBtXWVVVBIoCQytbGwgdGp5zJrrQ3U8Anh1OufmFZbbYlmL-CWBWbfbLRYRnapvynOkSijhEuFN5acW1c2PNwnnon-qyP_zZ275zgOFS02OPpXxV_hKaC3znhQvYzR2fMVKFCPTYmoVdJzp38XcQuUoIq59uZuGLqrMiMc5Oq8dQQE')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-transparent z-10 md:hidden" />

            {/* Desktop Image */}
            <div className="relative w-full flex-grow hidden md:flex items-center justify-center mb-8 z-20">
              <img 
                alt="Kenobi" 
                className="max-h-[50vh] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(163,222,254,0.4)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwXRHz1d-s0hwZO9qUTmqXgKpn_USDhSqrS9Ok64QyDmDMtB6zd95QipsMAJOrB25TI8vA7ALs2SMTLW-mhXkExlyQVwjDiZW6WpBfGKzPQnb8bJ8wCnInixgSXoJN0GRvdkoQSvl2GkKGZaST33Uqlft_EYaervTMU9aWkXVdZKQw5bH--YxMQ1rWEdAGLlAzlNFt39JjqZKSXSguqVL613LuWw-7uKVHU0jtKzleBNbbT86hCYBG_omCDpTO24fwOBho2M-PLMPG"
              />
            </div>
            
            <div className="text-center w-full z-20 relative flex flex-col items-center justify-end h-full md:h-auto md:justify-center">
              <span className="material-symbols-outlined text-light-primary text-4xl mb-4 drop-shadow-[0_0_10px_#7dd3fc] md:hidden">
                self_improvement
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold tracking-tight text-secondary uppercase md:normal-case md:group-hover:text-light-primary">Lado Luminoso</h2>
              <p className="font-body-md text-body-md text-secondary md:h-12">
                Elige bien joven padawan. Paz y conocimiento.
              </p>
            </div>
            
            {/* Mobile Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-light-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right shadow-[0_0_10px_#7dd3fc] md:hidden" />
          </button>
        </div>

        {/* Bottom Status */}
        <div className="mt-8 md:mt-16 font-label-sm text-label-sm text-outline-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary animate-pulse">warning</span>
          LA ELECCIÓN ES IRREVERSIBLE
        </div>
      </main>
    </div>
  );
};

export default DecisionScreen;
