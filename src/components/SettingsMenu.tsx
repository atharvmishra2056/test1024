import React from 'react';
import { useTheme } from 'next-themes';
import { Settings, Sun, Moon, MousePointer2, GitPullRequest } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Switch } from './ui/switch';
import { useAppSettings } from '../contexts/AppSettingsContext';

/**
 * A dropdown menu component for application settings.
 * Allows users to toggle theme, cursor follower, and view updates.
 * @returns {React.ReactElement} The settings menu component.
 */
export function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const { isCursorFollowerEnabled, toggleCursorFollower, setIsChangelogModalOpen } = useAppSettings();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-[1.2rem] w-[1.2rem] transition-transform group-hover:rotate-45" />
          <span className="sr-only">Open settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <Sun className="mr-2 h-4 w-4" />
              <span>Light / Dark</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Toggle theme"
            />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
           <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <MousePointer2 className="mr-2 h-4 w-4" />
                <span>Cursor Follower</span>
              </div>
              <Switch
                checked={isCursorFollowerEnabled}
                onCheckedChange={toggleCursorFollower}
                aria-label="Toggle cursor follower"
              />
           </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsChangelogModalOpen(true)}>
          <GitPullRequest className="mr-2 h-4 w-4" />
          <span>View Updates</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
