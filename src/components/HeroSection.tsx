
import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://fortuneworldschool.com/uploads/slider/videos/1740726135_videofws.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-school-red/70 to-school-beige/30"></div>
      </div>
      
      {/* School Logo */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <img
          src="https://fortuneworldschool.com/assets/web/images/fw-logo.png"
          alt="Fortune World School Logo"
          className="h-24 md:h-32 w-auto"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-20">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          Empowering Young Minds
          <span className="block text-school-beige">Since 2012</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto animate-slide-in-right">
          Academic Excellence, Global Vision, Moral Integrity
        </p>
        
        <button
          onClick={scrollToAbout}
          className="inline-flex items-center px-8 py-4 bg-school-beige text-school-red font-semibold rounded-full hover:bg-school-white transform hover:scale-105 transition-all duration-300 shadow-xl glass-effect"
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
