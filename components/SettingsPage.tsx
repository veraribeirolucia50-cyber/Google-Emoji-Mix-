import React from 'react';

interface SettingsPageProps {
  currentLang: 'pt' | 'en';
  setLang: (lang: 'pt' | 'en') => void;
  currentTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onBack: () => void;
  translations: any;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  currentLang,
  setLang,
  currentTheme,
  setTheme,
  onBack,
  translations
}) => {
  const isDark = currentTheme === 'dark';

  return (
    <div className={`min-h-screen w-full flex flex-col ${isDark ? 'bg-[#202124] text-[#e8eaed]' : 'bg-white text-gray-800'}`}>
      <header className="p-4 flex items-center border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="text-xl font-medium">{translations.settingsTitle}</h1>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 space-y-8">
        
        {/* Language Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {translations.languageLabel}
          </label>
          <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-600 bg-[#303134]' : 'border-gray-200 bg-white'}`}>
            <button
              onClick={() => setLang('pt')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                currentLang === 'pt' 
                  ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700') 
                  : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
              }`}
            >
              <span>Português (Brasil)</span>
              {currentLang === 'pt' && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className={`h-px w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <button
              onClick={() => setLang('en')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                currentLang === 'en' 
                  ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700') 
                  : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
              }`}
            >
              <span>English</span>
              {currentLang === 'en' && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {translations.themeLabel}
          </label>
          <div className={`rounded-lg border overflow-hidden ${isDark ? 'border-gray-600 bg-[#303134]' : 'border-gray-200 bg-white'}`}>
             <button
              onClick={() => setTheme('light')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                currentTheme === 'light' 
                   ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700') 
                  : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
              }`}
            >
              <div className="flex items-center space-x-3">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                 <span>{translations.themeLight}</span>
              </div>
              {currentTheme === 'light' && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className={`h-px w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
            <button
              onClick={() => setTheme('dark')}
              className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                currentTheme === 'dark' 
                   ? (isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-700') 
                  : (isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50')
              }`}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                <span>{translations.themeDark}</span>
              </div>
              {currentTheme === 'dark' && (
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
};