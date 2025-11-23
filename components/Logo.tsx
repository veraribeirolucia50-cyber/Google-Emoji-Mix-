import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Simple Smiley Face Emoji Style */}
      <div className="w-16 h-16 rounded-full bg-yellow-400 border-2 border-yellow-500 flex items-center justify-center shadow-sm relative overflow-hidden">
        <div className="absolute top-4 left-3 w-3 h-3 bg-[#3c4043] rounded-full"></div>
        <div className="absolute top-4 right-3 w-3 h-3 bg-[#3c4043] rounded-full"></div>
        <div className="absolute bottom-4 w-8 h-4 border-b-4 border-[#3c4043] rounded-full"></div>
      </div>
      
      {/* Google G Logo Style */}
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-10 h-10">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
          <path fill="#34A853" d="M24 48c6.48 0 12.01-2.09 15.97-5.7l-7.73-6c-2.15 1.45-4.92 2.3-8.24 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
        </svg>
      </div>
    </div>
  );
};
