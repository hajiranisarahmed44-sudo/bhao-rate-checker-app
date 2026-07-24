import React, { useState } from 'react';
import { Search, Verified, ThumbsUp, ThumbsDown, Camera, ChevronRight, PlusCircle } from 'lucide-react';
import { ServiceRate, ScreenType } from '../types';
import { SERVICE_CATEGORIES } from '../data/mockData';
import { BhaoGauge } from './BhaoGauge';

interface HomeScreenProps {
  services: ServiceRate[];
  onSelectService: (service: ServiceRate) => void;
  onVote: (serviceId: string, isFair: boolean) => void;
  setScreen: (screen: ScreenType) => void;
  isUrdu: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  services,
  onSelectService,
  onVote,
  setScreen,
  isUrdu,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesQuery = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Search Input Bar */}
      <section className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isUrdu
                ? 'سروس تلاش کریں (مثلاً پنکھا مرمت، پلمبر، اے سی)'
                : 'Search service (e.g. Fan repair, Plumber, AC service)'
            }
            className="w-full bg-white border border-gray-300 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f172a] focus:border-transparent shadow-xs transition-shadow"
          />
        </div>
      </section>

      {/* Category Horizontal Chips */}
      <section className="overflow-x-auto no-scrollbar -mx-4 px-4 py-1 flex gap-2">
        {SERVICE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-sm scale-102'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* Featured / Trending Rates Header */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {isUrdu ? 'مقبول ترین نرخ (Trending Rates)' : 'Trending Rates'}
          </h2>
          <span className="text-xs text-gray-500 font-medium">
            {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
          </span>
        </div>

        {/* Services List Cards */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200 text-gray-500 space-y-2">
            <p className="font-semibold text-gray-700">No rates found for "{searchQuery}"</p>
            <p className="text-xs">Try searching for "Fan", "AC", "Plumber", or "UPS"</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden relative transition-all hover:shadow-md group"
            >
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#6bff8f]" />

              <div className="p-4 pl-6 space-y-3">
                {/* Header Row */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3
                      onClick={() => onSelectService(service)}
                      className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{service.title}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Based on {service.verifiedCount} verified receipts in Lahore
                    </p>
                  </div>

                  <div className="bg-[#6bff8f]/20 text-[#007432] px-2.5 py-1 rounded-full flex items-center gap-1 text-xs font-bold shrink-0">
                    <Verified className="w-3.5 h-3.5 fill-[#007432] text-white" />
                    <span>{service.fairPercentage}% voted Fair</span>
                  </div>
                </div>

                {/* Price Display */}
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    {isUrdu ? 'مناسب ریٹ رینج' : 'FAIR RATE RANGE'}
                  </span>
                  <div className="text-3xl font-black text-[#0f172a] mt-0.5 tracking-tight">
                    PKR {service.minPrice.toLocaleString()} - {service.maxPrice.toLocaleString()}
                  </div>
                </div>

                {/* Bhao Gauge Component */}
                <BhaoGauge position={service.gaugePosition} />

                {/* Quick Community Voting Box */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-bold text-gray-700 text-center mb-2">
                    {isUrdu ? 'کیا آپ کا ریٹ مناسب تھا؟' : 'Was your rate fair?'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onVote(service.id, true)}
                      className="bg-[#6bff8f]/30 hover:bg-[#6bff8f]/50 text-[#005321] text-xs font-bold py-2.5 rounded-xl border border-emerald-400 transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-[#006e2f]" />
                      <span>{isUrdu ? 'مناسب (Fair)' : '👍 Fair'}</span>
                    </button>

                    <button
                      onClick={() => onVote(service.id, false)}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold py-2.5 rounded-xl border border-rose-200 transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />
                      <span>{isUrdu ? 'زیادہ پیسے لیے' : '👎 Overcharged'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Floating Upload Receipt Button */}
      <button
        onClick={() => setScreen('submit')}
        className="fixed bottom-20 sm:bottom-6 right-5 z-40 bg-[#0f172a] hover:bg-[#1e293b] text-white px-5 py-3.5 rounded-full shadow-lg flex items-center gap-2 font-bold text-sm transition-all active:scale-95 cursor-pointer"
      >
        <Camera className="w-5 h-5 text-[#6bff8f]" />
        <span>{isUrdu ? 'رسید اپ لوڈ کریں' : 'Upload Receipt'}</span>
      </button>
    </div>
  );
};
