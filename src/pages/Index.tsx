
import React from 'react';
import DisclaimerHeader from '../components/DisclaimerHeader';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AcademicsSection from '../components/AcademicsSection';
import AdmissionsSection from '../components/AdmissionsSection';
import FacilitiesSection from '../components/FacilitiesSection';
import CoactivitiesSection from '../components/CoactivitiesSection';
import EventsSection from '../components/EventsSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LikeButton from '../components/LikeButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DisclaimerHeader />
      <Navigation />
      {/* Add proper responsive spacing to account for fixed headers */}
      <div className="pt-16 md:pt-20 lg:pt-24">
        <HeroSection />
        <AboutSection />
        <AcademicsSection />
        <AdmissionsSection />
        <FacilitiesSection />
        <CoactivitiesSection />
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      <Footer />
      <BackToTop />
      <LikeButton />
    </div>
  );
};

export default Index;
