import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

// Define the shape of the context data
interface AppSettingsContextType {
  isCursorFollowerEnabled: boolean;
  toggleCursorFollower: () => void;
  isChangelogModalOpen: boolean;
  setIsChangelogModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

/**
 * Provides application-wide settings state to all child components.
 * Manages state for the cursor follower and the changelog modal.
 * Persists the cursor follower setting to localStorage.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 * @returns {React.ReactElement} The settings provider component.
 */
export const AppSettingsProvider = ({ children }: { children: ReactNode }) => {
  // State for cursor follower, initialized from localStorage or defaults to true
  const [isCursorFollowerEnabled, setIsCursorFollowerEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('cursorFollowerEnabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // State for the changelog modal visibility
  const [isChangelogModalOpen, setIsChangelogModalOpen] = useState(false);

  // Toggles the cursor follower and saves the preference to localStorage
  const toggleCursorFollower = () => {
    setIsCursorFollowerEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('cursorFollowerEnabled', JSON.stringify(newState));
      return newState;
    });
  };

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({
    isCursorFollowerEnabled,
    toggleCursorFollower,
    isChangelogModalOpen,
    setIsChangelogModalOpen,
  }), [isCursorFollowerEnabled, isChangelogModalOpen]);

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
};

/**
 * Custom hook to easily access the AppSettingsContext.
 * @returns {AppSettingsContextType} The app settings context.
 */
export const useAppSettings = () => {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
};
