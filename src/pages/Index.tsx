import React from 'react';
import DisclaimerHeader from '../components/DisclaimerHeader';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import AcademicsSection from '../components/AcademicsSection';
import AdmissionsSection from '../components/AdmissionsSection';
import FacilitiesSection from '../components/FacilitiesSection';
import AcademicExcellenceSection from '../components/AcademicExcellenceSection';
import CoactivitiesSection from '../components/CoactivitiesSection';
import EventsSection from '../components/EventsSection';
import StudentCouncilSection from '../components/StudentCouncilSection';
import GallerySection from '../components/GallerySection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LikeButton from '../components/LikeButton';
import PrincipalMessageModal from '../components/PrincipalMessageModal';
import AdmissionAlert from '../components/AdmissionAlert';
import UpdateNotification from '../components/UpdateNotification';
import UpdateChangelogModal from '../components/UpdateChangelogModal';
import { useAppSettings } from '../contexts/AppSettingsContext';

const Index = () => {
  // Get modal state and setter from the global context
  const { isChangelogModalOpen, setIsChangelogModalOpen } = useAppSettings();

  return (
    <div className="min-h-screen bg-background dark:bg-zinc-900">
      <DisclaimerHeader />
      <Navigation />
      <div className="pt-12 md:pt-16 lg:pt-20">
        <HeroSection />
        <AboutSection />
        <AcademicsSection />
        <AdmissionsSection />
        <FacilitiesSection />
        <AcademicExcellenceSection />
        <CoactivitiesSection />
        <EventsSection />
        <StudentCouncilSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </div>
      <Footer />
      <BackToTop />
      <LikeButton />
      <PrincipalMessageModal />
      <AdmissionAlert />
      <UpdateNotification />
      {/* The Changelog Modal is rendered here, controlled by the global state */}
      <UpdateChangelogModal isOpen={isChangelogModalOpen} onOpenChange={setIsChangelogModalOpen} />
    </div>
  );
};

export default Index;
