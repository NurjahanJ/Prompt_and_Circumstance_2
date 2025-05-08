import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Battery icon component that visually tracks the number of user prompts in a session
 * @param {Object} props - Component props
 * @param {number} props.promptCount - Number of prompts used in the current session
 */
const BatteryIcon = ({ promptCount }) => {
  const { darkMode } = useTheme();
  const [animate, setAnimate] = useState(false);
  const [prevCount, setPrevCount] = useState(promptCount);
  
  // Define thresholds for battery levels
  const THRESHOLDS = {
    GREEN: { min: 0, max: 3 },
    ORANGE: { min: 4, max: 6 },
    RED: { min: 7, max: 10 },
    EMPTY: { min: 11, max: Infinity }
  };
  
  // Trigger animation when prompt count changes
  useEffect(() => {
    if (promptCount !== prevCount) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      setPrevCount(promptCount);
      return () => clearTimeout(timer);
    }
  }, [promptCount, prevCount]);
  
  // Calculate battery level based on prompt count
  const getBatteryLevel = () => {
    if (promptCount <= THRESHOLDS.GREEN.max) {
      return { 
        color: 'bg-green-500', 
        borderColor: 'border-green-600',
        glow: 'shadow-green-500/50',
        textColor: darkMode ? 'text-green-300' : 'text-green-700',
        percentage: 100 - (promptCount / THRESHOLDS.GREEN.max * 30) 
      };
    } else if (promptCount <= THRESHOLDS.ORANGE.max) {
      return { 
        color: 'bg-orange-500', 
        borderColor: 'border-orange-600',
        glow: 'shadow-orange-500/50',
        textColor: darkMode ? 'text-orange-300' : 'text-orange-700',
        percentage: 70 - ((promptCount - THRESHOLDS.ORANGE.min) / (THRESHOLDS.ORANGE.max - THRESHOLDS.ORANGE.min) * 40) 
      };
    } else if (promptCount <= THRESHOLDS.RED.max) {
      return { 
        color: 'bg-red-500', 
        borderColor: 'border-red-600',
        glow: 'shadow-red-500/50',
        textColor: darkMode ? 'text-red-300' : 'text-red-700',
        percentage: 30 - ((promptCount - THRESHOLDS.RED.min) / (THRESHOLDS.RED.max - THRESHOLDS.RED.min) * 30) 
      };
    } else {
      return { 
        color: 'bg-gray-700', 
        borderColor: 'border-gray-600',
        glow: 'shadow-gray-500/50',
        textColor: darkMode ? 'text-gray-300' : 'text-gray-700',
        percentage: 0 
      };
    }
  };
  
  const { color, borderColor, glow, textColor, percentage } = getBatteryLevel();
  
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
  
  // Get battery segments
  const getBatterySegments = () => {
    const segments = [];
    const totalSegments = 4;
    const filledSegments = Math.ceil((percentage / 100) * totalSegments);
    
    for (let i = 0; i < totalSegments; i++) {
      const isActive = i < filledSegments;
      segments.push(
        <div 
          key={i}
          className={`h-[18%] mx-[10%] my-[2%] rounded-sm transition-all duration-300 ${isActive ? color : darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
        />
      );
    }
    
    return segments; // No reverse - fill from top
  };
  
  return (
    <div className="flex items-center group">
      <div 
        className={`relative mr-3 ${animate ? 'animate-pulse' : ''}`} 
        title={getStatusText()}
      >
        {/* Battery tip (now at bottom) */}
        <div className={`w-5 h-3 ${borderColor} ${color} mx-auto rounded-b-sm`}></div>
        
        {/* Battery body */}
        <div 
          className={`w-10 h-16 border-2 ${borderColor} ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} 
            rounded-md overflow-hidden shadow-lg transition-all duration-300 ease-in-out 
            ${animate ? glow : ''} ${isEmpty ? 'animate-pulse' : ''} -mt-[2px]`}
        >
          {/* Battery segments */}
          <div className="flex flex-col justify-start h-full py-1">
            {getBatterySegments()}
          </div>
          
          {/* Battery indicator for high count */}
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <span className={`text-xl font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-500'} animate-pulse`}>!</span>
            </div>
          )}
        </div>
        
        {/* Battery glow effect */}
        <div 
          className={`absolute -inset-1 ${color} opacity-0 group-hover:opacity-20 rounded-lg blur-md transition-opacity duration-300`}
        ></div>
      </div>
      
      {/* Prompt count display */}
      <div className={`text-sm font-medium ${textColor} transition-colors duration-300`}>
        <span className="font-bold">{promptCount}</span> / {THRESHOLDS.RED.max}
      </div>
    </div>
  );
};

export default BatteryIcon;
