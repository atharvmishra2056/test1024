import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useAppSettings } from '../contexts/AppSettingsContext'; // Import the context hook

const UpdateNotification = () => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const { setIsChangelogModalOpen } = useAppSettings(); // Get the modal state setter from context
  
  const hideTimerRef = React.useRef<NodeJS.Timeout>();

  const handleCloseBox = useCallback(() => {
    setIsBoxVisible(false);
    if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
    }
  }, []);
  
  useEffect(() => {
    // Timer to show the notification box after a delay
    const showTimer = setTimeout(() => {
      setIsBoxVisible(true);
    }, 1500);

    // Timer to auto-hide the notification box after 20 seconds
    hideTimerRef.current = setTimeout(() => {
      handleCloseBox();
    }, 21500); // 1.5s show delay + 20s visibility

    return () => {
      clearTimeout(showTimer);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [handleCloseBox]);


  // When the box is clicked, it uses the context's function to open the modal
  const handleOpenModal = () => {
    setIsChangelogModalOpen(true);
  };

  if (!isBoxVisible) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-5 left-5 z-50 flex items-center gap-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-lg p-3 pr-2 shadow-2xl border border-gray-200 dark:border-zinc-700 cursor-pointer animate-slide-in-right"
      onClick={handleOpenModal}
    >
      <div className="text-sm">
        <p className="font-semibold text-gray-800 dark:text-gray-200">Updated on 13-6-25</p>
        <p className="text-gray-600 dark:text-gray-400">Click to read more</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent opening modal when clicking the close button
          handleCloseBox();
        }}
        className="relative h-9 w-9 flex-shrink-0"
        aria-label="Close notification"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 36 36">
          <circle
            className="text-gray-200 dark:text-zinc-700"
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
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
          <X size={20} />
        </div>
      </button>
    </div>
  );
};

export default UpdateNotification;
