import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { usePromptCount } from '../contexts/PromptCountContext';
import BatteryIcon from './BatteryIcon';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { promptCount, resetCount } = usePromptCount();

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b py-3 px-4 flex justify-between items-center`}>
      <div className="flex-1 flex justify-start">
        {/* Placeholder for additional buttons */}
        <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 flex justify-center">
        <h1 className={`text-xl font-semibold text-center ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>ChatGPT</h1>
      </div>
      
      <div className="flex-1 flex justify-end gap-2 items-center">
        {/* Battery Icon */}
        <div className="mr-2">
          <BatteryIcon promptCount={promptCount} />
        </div>
        
        {/* Reset prompt count button */}
        <button
          onClick={resetCount}
          className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          aria-label="Reset prompt count"
          title="Reset prompt count"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        
        {/* Theme toggle button */}
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </button>
        
        <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </button>
        
        <button className={`p-2 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
