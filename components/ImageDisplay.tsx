import React from 'react';

interface ImageDisplayProps {
  imageSrc: string;
  prompt: string;
  generatedByText: string;
  downloadText: string;
  isDark: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  imageSrc, 
  prompt, 
  generatedByText, 
  downloadText,
  isDark
}) => {
  return (
    <div className={`flex flex-col items-center p-6 rounded-2xl shadow-xl border transform transition-all duration-500 hover:scale-105 ${
      isDark ? 'bg-[#303134] border-gray-700' : 'bg-white border-gray-100'
    }`}>
      <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-xl overflow-hidden flex items-center justify-center ${
        isDark ? 'bg-[#202124]' : 'bg-gray-50'
      }`}>
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `radial-gradient(${isDark ? '#555' : '#ccc'} 1px, transparent 1px)`, backgroundSize: '10px 10px' }}>
        </div>
        
        <img 
          src={imageSrc} 
          alt={`Emoji: ${prompt}`} 
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
      
      <div className="mt-6 flex flex-col items-center">
        <h3 className={`text-xl font-medium capitalize ${isDark ? 'text-white' : 'text-gray-800'}`}>{prompt}</h3>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>{generatedByText}</p>
        
        <a 
          href={imageSrc} 
          download={`emoji-mix-${prompt.replace(/\s+/g, '-')}.png`}
          className={`mt-4 px-4 py-2 rounded font-medium text-sm transition-colors ${
            isDark 
            ? 'text-[#8ab4f8] hover:bg-blue-900/20' 
            : 'text-[#1a73e8] hover:bg-blue-50'
          }`}
        >
          {downloadText}
        </a>
      </div>
    </div>
  );
};