import React, { useState, useCallback } from 'react';
import { generateEmojiMix } from './services/geminiService';
import { Logo } from './components/Logo';
import { LoadingBar } from './components/LoadingBar';
import { ImageDisplay } from './components/ImageDisplay';
import { SettingsPage } from './components/SettingsPage';

// Dictionary for translations
const translations = {
  pt: {
    appTitle: 'Google Emoji Mix',
    inputPlaceholder: 'Ex: Gato robô, Pizza alienígena...',
    generateButton: 'Gerar Emoji',
    generatingButton: 'Gerando...',
    loadingMessage: 'Misturando emojis... (Aguarde 15s)',
    errorGeneric: 'Não foi possível gerar o emoji. Tente novamente.',
    errorConnection: 'Ocorreu um erro ao conectar com o Google AI.',
    generatedBy: 'Gerado com Google Emoji Mix',
    downloadImage: 'Baixar Imagem',
    footer: 'Feito com Google Gemini API',
    settingsTitle: 'Configurações',
    languageLabel: 'Idioma',
    themeLabel: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    back: 'Voltar'
  },
  en: {
    appTitle: 'Google Emoji Mix',
    inputPlaceholder: 'Ex: Robot cat, Alien pizza...',
    generateButton: 'Generate Emoji',
    generatingButton: 'Generating...',
    loadingMessage: 'Mixing emojis... (Wait 15s)',
    errorGeneric: 'Could not generate emoji. Try again.',
    errorConnection: 'An error occurred connecting to Google AI.',
    generatedBy: 'Generated with Google Emoji Mix',
    downloadImage: 'Download Image',
    footer: 'Made with Google Gemini API',
    settingsTitle: 'Settings',
    languageLabel: 'Language',
    themeLabel: 'Theme',
    themeLight: 'Light',
    themeDark: 'Dark',
    back: 'Back'
  }
};

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState<'home' | 'settings'>('home');

  const t = translations[language];
  const isDark = theme === 'dark';

  const handleGenerate = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // The requirement is to wait 15 seconds specifically.
      // We run the API call and the timer in parallel, ensuring at least 15s passes.
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 15000));
      
      const [imageResult] = await Promise.all([
        generateEmojiMix(inputText),
        delayPromise
      ]);

      if (imageResult) {
        setGeneratedImage(imageResult);
      } else {
        setError(t.errorGeneric);
      }
    } catch (err) {
      console.error(err);
      setError(t.errorConnection);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, t]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleGenerate();
    }
  };

  if (view === 'settings') {
    return (
      <SettingsPage 
        currentLang={language} 
        setLang={setLanguage}
        currentTheme={theme}
        setTheme={setTheme}
        onBack={() => setView('home')}
        translations={t}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${isDark ? 'bg-[#202124] text-[#e8eaed]' : 'bg-white text-gray-800'}`}>
      
      {/* Header / Logo Section */}
      <header className="w-full p-6 flex items-center justify-center relative mt-8 mb-4">
        <div className="flex flex-col items-center">
          <Logo />
          <h1 className={`text-3xl font-normal mt-4 ${isDark ? 'text-[#e8eaed]' : 'text-gray-700'}`}>{t.appTitle}</h1>
        </div>

        {/* Settings Icon */}
        <button 
          onClick={() => setView('settings')}
          className={`absolute right-6 top-6 p-2 rounded-full transition-colors ${
             isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
          aria-label="Settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-2xl px-4 flex flex-col items-center space-y-8">
        
        {/* Input Section */}
        <div className="w-full flex flex-col items-center space-y-6">
          <div className={`relative w-full shadow-md rounded-full border hover:shadow-lg transition-all duration-200 ease-in-out group ${
             isDark ? 'bg-[#303134] border-gray-600' : 'bg-white border-gray-200'
          }`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className={`h-5 w-5 transition-colors ${isDark ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              type="text"
              className={`w-full py-4 pl-12 pr-6 rounded-full text-lg outline-none bg-transparent ${
                isDark ? 'text-white placeholder-gray-500' : 'text-gray-700 placeholder-gray-400'
              }`}
              placeholder={t.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading || !inputText.trim()}
              className={`px-8 py-3 rounded text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-sm ${
                (isLoading || !inputText.trim()) ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                isDark ? 'bg-[#8ab4f8] text-[#202124] hover:bg-[#a4c2f4] focus:ring-[#8ab4f8]' : 'bg-[#1a73e8] hover:bg-[#1557b0] focus:ring-[#1a73e8]'
              }`}
            >
              {isLoading ? t.generatingButton : t.generateButton}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="w-full flex flex-col items-center animate-fade-in">
             <LoadingBar duration={15} />
             <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.loadingMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className={`px-4 py-2 rounded-lg border ${
            isDark ? 'bg-red-900/20 border-red-800 text-red-300' : 'bg-red-50 border-red-100 text-red-600'
          }`}>
            {error}
          </div>
        )}

        {/* Result Display */}
        {!isLoading && generatedImage && (
          <div className="mt-8 animate-fade-in-up">
            <ImageDisplay 
              imageSrc={generatedImage} 
              prompt={inputText} 
              generatedByText={t.generatedBy}
              downloadText={t.downloadImage}
              isDark={isDark}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`mt-auto py-6 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default App;