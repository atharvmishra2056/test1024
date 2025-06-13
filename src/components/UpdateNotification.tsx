import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import UpdateChangelogModal from './UpdateChangelogModal';

const UpdateNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Using a ref to prevent re-running timers on re-renders
  const hideTimerRef = React.useRef<NodeJS.Timeout>();

  const handleClose = useCallback(() => {
    setIsVisible(false);
    if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
    }
  }, []);
  
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    hideTimerRef.current = setTimeout(() => {
      handleClose();
    }, 16500); // 1500ms delay + 15000ms duration

    return () => {
      clearTimeout(showTimer);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [handleClose]);


  const handleOpenModal = () => {
    setIsModalOpen(true);
    // When modal is opened, clear the auto-hide timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div 
        className="fixed bottom-5 left-5 z-50 flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-lg p-3 pr-2 shadow-2xl border border-gray-200 cursor-pointer animate-slide-in-right"
        onClick={handleOpenModal}
      >
        <div className="text-sm">
          <p className="font-semibold text-gray-800">Updated on 13-6-25</p>
          <p className="text-gray-600">Click to read more</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening modal
            handleClose();
          }}
          className="relative h-9 w-9 flex-shrink-0"
          aria-label="Close notification"
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 36 36">
            <circle
              className="text-gray-200"
              strokeWidth="3"
              stroke="currentColor"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
            <circle
              className="text-green-500 origin-center -rotate-90 animate-progress-bar"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset="100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
            <X size={20} />
          </div>
        </button>
      </div>
      <UpdateChangelogModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default UpdateNotification;
