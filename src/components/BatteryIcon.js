import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Battery icon component that visually tracks the number of user prompts in a session
 * @param {Object} props - Component props
 * @param {number} props.promptCount - Number of prompts used in the current session
 */
const BatteryIcon = ({ promptCount }) => {
  const { darkMode } = useTheme();
  
  // Define thresholds for battery levels
  const THRESHOLDS = {
    GREEN: { min: 0, max: 3 },
    ORANGE: { min: 4, max: 6 },
    RED: { min: 7, max: 10 },
    EMPTY: { min: 11, max: Infinity }
  };
  
  // Calculate battery level based on prompt count
  const getBatteryLevel = () => {
    if (promptCount <= THRESHOLDS.GREEN.max) {
      return { color: 'bg-green-500', percentage: 100 - (promptCount / THRESHOLDS.GREEN.max * 30) };
    } else if (promptCount <= THRESHOLDS.ORANGE.max) {
      return { 
        color: 'bg-orange-500', 
        percentage: 70 - ((promptCount - THRESHOLDS.ORANGE.min) / (THRESHOLDS.ORANGE.max - THRESHOLDS.ORANGE.min) * 40) 
      };
    } else if (promptCount <= THRESHOLDS.RED.max) {
      return { 
        color: 'bg-red-500', 
        percentage: 30 - ((promptCount - THRESHOLDS.RED.min) / (THRESHOLDS.RED.max - THRESHOLDS.RED.min) * 30) 
      };
    } else {
      return { color: 'bg-gray-800', percentage: 0 };
    }
  };
  
  const { color, percentage } = getBatteryLevel();
  
  // Determine if battery is empty/disabled
  const isEmpty = promptCount >= THRESHOLDS.EMPTY.min;
  
  // Get status text based on prompt count
  const getStatusText = () => {
    if (promptCount <= THRESHOLDS.GREEN.max) {
      return `${promptCount} prompts used - Green zone`;
    } else if (promptCount <= THRESHOLDS.ORANGE.max) {
      return `${promptCount} prompts used - Orange zone`;
    } else if (promptCount <= THRESHOLDS.RED.max) {
      return `${promptCount} prompts used - Red zone`;
    } else {
      return `${promptCount} prompts used - Beyond tracking`;
    }
  };
  
  return (
    <div className="flex items-center">
      <div className="relative mr-2" title={getStatusText()}>
        {/* Battery body */}
        <div className={`w-8 h-14 border-2 ${darkMode ? 'border-gray-300' : 'border-gray-800'} rounded-md overflow-hidden`}>
          {/* Battery level fill */}
          <div 
            className={`absolute bottom-0 left-0 right-0 ${color} transition-all duration-300 ease-in-out`} 
            style={{ height: `${percentage}%` }}
          ></div>
          
          {/* Battery indicator for high count */}
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>!</span>
            </div>
          )}
        </div>
        
        {/* Battery tip */}
        <div className={`w-4 h-2 ${darkMode ? 'bg-gray-300' : 'bg-gray-800'} mx-auto rounded-t-sm -mt-1`}></div>
      </div>
      
      {/* Prompt count display */}
      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {promptCount} / {THRESHOLDS.RED.max}
      </div>
    </div>
  );
};

export default BatteryIcon;
