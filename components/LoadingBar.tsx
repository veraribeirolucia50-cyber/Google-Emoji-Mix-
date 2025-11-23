import React, { useEffect, useState } from 'react';

interface LoadingBarProps {
  duration: number; // in seconds
}

export const LoadingBar: React.FC<LoadingBarProps> = ({ duration }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const percent = Math.min(100, Math.max(0, 100 - (remaining / (duration * 1000)) * 100));

      setProgress(percent);

      if (now >= endTime) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="w-full max-w-md">
      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-100 ease-linear rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></span>
        </div>
      </div>
    </div>
  );
};
