
import React, { useState, useEffect } from 'react';
import { X, Clock } from 'lucide-react';

const AdmissionAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the alert
    const hasSeenAlert = localStorage.getItem('admissionAlertSeen');
    
    if (!hasSeenAlert) {
      // Show alert after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeAlert = () => {
    setIsVisible(false);
    localStorage.setItem('admissionAlertSeen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md mx-4 p-6 relative animate-scale-in">
        <button
          onClick={closeAlert}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-school-red/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-school-red" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-school-blue mb-2">
              Admissions Closing Soon!
            </h3>
            <p className="text-gray-600 mb-6">
              Don't miss the opportunity to join Fortune World School for the 2025-26 academic year. Limited seats available!
            </p>
          </div>
          
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop&crop=center"
              alt="Students in classroom"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
          
          <button
            onClick={closeAlert}
            className="w-full bg-school-red text-white py-3 px-6 rounded-full font-semibold hover:bg-school-red/90 transition-colors"
          >
            Learn More About Admissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionAlert;
