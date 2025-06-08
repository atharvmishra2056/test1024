
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DisclaimerHeader />
      <Navigation />
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
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
