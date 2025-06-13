import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import UpdateChangelogModal from './UpdateChangelogModal';

const UpdateNotification = () => {
  // State for the small notification box's visibility
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  // State for the large pop-up modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const hideTimerRef = React.useRef<NodeJS.Timeout>();

  // This function now *only* hides the notification box
  const handleCloseBox = useCallback(() => {
    setIsBoxVisible(false);
    if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
    }
  }, []);
  
  useEffect(() => {
    // Timer to show the notification box
    const showTimer = setTimeout(() => {
      setIsBoxVisible(true);
    }, 1500);

    // Timer to auto-hide the notification box after 20 seconds
    hideTimerRef.current = setTimeout(() => {
      handleCloseBox();
    }, 21500); // 1.5s show delay + 20s visibility

    // Cleanup timers when the component is removed
    return () => {
      clearTimeout(showTimer);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [handleCloseBox]);

  // This function opens the pop-up modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    // Use a React Fragment to render the box and modal independently
    <>
      {/* Render the notification box only if isBoxVisible is true */}
      {isBoxVisible && (
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
              e.stopPropagation(); // Prevent the modal from opening when closing the box
              handleCloseBox();
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
      )}

      {/* The Modal is now rendered outside the box's visibility check. 
          Its lifecycle is independent and controlled by its own state. */}
      <UpdateChangelogModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default UpdateNotification;
