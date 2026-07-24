import React from 'react';
import { MapPin, Code, Smartphone, Globe, ChevronDown } from 'lucide-react';
import { LAHORE_LOCATIONS } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  isUrdu: boolean;
  setIsUrdu: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  setScreen,
  selectedLocation,
  setSelectedLocation,
  isUrdu,
  setIsUrdu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f9fb] border-b border-gray-200 px-4 py-3 shadow-xs">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
        {/* Location Dropdown & Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-2xs hover:border-gray-300 transition-colors cursor-pointer">
            <MapPin className="w-4 h-4 text-[#006e2f] shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-800 outline-none cursor-pointer pr-1 truncate max-w-[140px] sm:max-w-[200px]"
            >
              {LAHORE_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand & Mode Switchers */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Logo Badge */}
          <button
            onClick={() => setScreen('home')}
            className="flex items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center font-black text-lg shadow-sm border border-gray-300">
              <span className="text-[#6bff8f]">B</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-gray-900 hidden xs:inline">
              Bhao
            </span>
          </button>

          {/* Urdu / English Language Toggle */}
          <button
            onClick={() => setIsUrdu(!isUrdu)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            title="Toggle English / Urdu UI text"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>{isUrdu ? 'اردو' : 'EN'}</span>
          </button>

          {/* Flutter Code Tab Switcher */}
          <button
            onClick={() => setScreen(currentScreen === 'flutter_code' ? 'home' : 'flutter_code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
              currentScreen === 'flutter_code'
                ? 'bg-blue-600 text-white'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            {currentScreen === 'flutter_code' ? (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span>App Preview</span>
              </>
            ) : (
              <>
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">Flutter Dart Code</span>
                <span className="sm:hidden">Dart Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
