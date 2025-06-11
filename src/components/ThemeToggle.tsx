import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
const ThemeToggle = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return <div className="fixed right-4 top-1/2 translate-y-8 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 px-[2px] py-0">
        <Button onClick={toggleTheme} variant="ghost" size="sm" className="flex flex-col items-center gap-1 h-auto p-3 rounded-full hover:bg-school-red/10 transition-colors">
          {theme === 'dark' ? <Sun size={24} className="text-gray-600 hover:text-school-red transition-colors" /> : <Moon size={24} className="text-gray-600 hover:text-school-red transition-colors" />}
          <span className="text-xs font-medium text-gray-600">
            {theme === 'dark' ? 'Light' : 'Dark'}
          </span>
        </Button>
      </div>
    </div>;
};
export default ThemeToggle;