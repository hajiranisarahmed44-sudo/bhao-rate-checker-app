import React from 'react';
import { BarChart3, Search, PlusSquare, User, Code } from 'lucide-react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  isUrdu: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  setScreen,
  isUrdu,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-2 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {/* Rates Tab */}
        <button
          onClick={() => setScreen('home')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'home'
              ? 'text-[#0f172a] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <BarChart3 className={`w-5 h-5 ${currentScreen === 'home' ? 'text-[#0f172a]' : 'text-gray-500'}`} />
          <span className="text-[11px] mt-0.5">{isUrdu ? 'نرخ' : 'Rates'}</span>
        </button>

        {/* Upload Bill Tab */}
        <button
          onClick={() => setScreen('submit')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all cursor-pointer ${
            currentScreen === 'submit'
              ? 'bg-[#131b2e] text-[#6bff8f] font-bold shadow-xs'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <PlusSquare className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">{isUrdu ? 'اپ لوڈ' : 'Upload'}</span>
        </button>

        {/* Rate Details / Breakdown Screen shortcut if selected */}
        <button
          onClick={() => setScreen('details')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'details'
              ? 'text-[#0f172a] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Search className={`w-5 h-5 ${currentScreen === 'details' ? 'text-[#0f172a]' : 'text-gray-500'}`} />
          <span className="text-[11px] mt-0.5">{isUrdu ? 'تفصیل' : 'Details'}</span>
        </button>

        {/* Flutter Dart Code Tab */}
        <button
          onClick={() => setScreen('flutter_code')}
          className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentScreen === 'flutter_code'
              ? 'bg-blue-50 text-blue-700 font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Code className={`w-5 h-5 ${currentScreen === 'flutter_code' ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className="text-[11px] mt-0.5">Flutter</span>
        </button>
      </div>
    </nav>
  );
};
