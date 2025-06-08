
import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 90, 156, 0.7), rgba(255, 215, 0, 0.3)), url('https://fortuneworldschool.com/assets/web/images/banner/the-school-banner-1.jpg')`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Empowering Young Minds
          <span className="block text-school-yellow">Since 2012</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto animate-slide-in-right">
          Academic Excellence, Global Vision, Moral Integrity
        </p>
        
        <button
          onClick={scrollToAbout}
          className="inline-flex items-center px-8 py-4 bg-school-yellow text-school-blue font-semibold rounded-full hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Explore Our Journey
          <ChevronDown className="ml-2 animate-bounce-gentle" size={20} />
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white" size={32} />
      </div>
    </section>
  );
};

export default HeroSection;
