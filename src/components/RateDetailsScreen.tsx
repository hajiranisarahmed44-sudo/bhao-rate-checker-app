import React from 'react';
import { ArrowLeft, MapPin, Verified, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';
import { ServiceRate, ScreenType } from '../types';

interface RateDetailsScreenProps {
  service: ServiceRate;
  onBack: () => void;
  onVote: (serviceId: string, isFair: boolean) => void;
  isUrdu: boolean;
}

export const RateDetailsScreen: React.FC<RateDetailsScreenProps> = ({
  service,
  onBack,
  onVote,
  isUrdu,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          {isUrdu ? 'ریٹ کی تفصیلات (Rate Details)' : 'Rate Details'}
        </h1>
      </div>

      {/* Title & Location Header */}
      <section className="space-y-1">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          {service.title}
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
          <MapPin className="w-4 h-4 text-[#006e2f]" />
          <span>{service.locations.join(' / ')}</span>
        </div>
      </section>

      {/* Main Fair Range Card Banner */}
      <section className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#006e2f]" />
        <div className="pl-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            {isUrdu ? 'مناسب ریٹ رینج' : 'FAIR RANGE'}
          </span>
          <div className="text-3xl font-black text-[#0f172a] mt-1 tracking-tight">
            PKR {service.minPrice.toLocaleString()} – {service.maxPrice.toLocaleString()}
          </div>
        </div>
      </section>

      {/* Sub-Task Breakdown List */}
      <section className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
          {isUrdu ? 'ذیلی کاموں کی تفصیل (Sub-Task Breakdown)' : 'Sub-Task Breakdown'}
        </h3>
        <div className="space-y-2.5">
          {service.subTasks.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs flex justify-between items-center gap-2"
            >
              <span className="text-sm font-semibold text-gray-800">{st.name}</span>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full shrink-0">
                PKR {st.minPrice.toLocaleString()} – {st.maxPrice.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Community Voting CTA Card */}
      <section className="bg-[#131b2e] text-white rounded-2xl p-5 shadow-sm space-y-4 text-center">
        <h3 className="text-base font-bold text-gray-100">
          {isUrdu ? 'کیا آپ نے یہ کام حال ہی میں کرایا؟' : 'Did you get this done recently?'}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onVote(service.id, true)}
            className="bg-white text-gray-900 font-bold py-3 rounded-xl border border-gray-200 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ThumbsUp className="w-4 h-4 text-emerald-600" />
            <span>Fair</span>
          </button>
          <button
            onClick={() => onVote(service.id, false)}
            className="bg-white text-gray-900 font-bold py-3 rounded-xl border border-rose-300 hover:bg-rose-50 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <ThumbsDown className="w-4 h-4 text-rose-600" />
            <span>Overcharged</span>
          </button>
        </div>
      </section>

      {/* Recent Verified Receipts Feed */}
      <section className="space-y-3">
        <div className="flex justify-between items-end border-b border-gray-200 pb-2">
          <h3 className="text-base font-bold text-gray-900">
            {isUrdu ? 'حالیہ تصدیق شدہ رسیدیں' : 'Recent Verified Receipts'}
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            {service.receipts.length} community posts
          </span>
        </div>

        <div className="space-y-3">
          {service.receipts.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-2xs space-y-2 relative overflow-hidden"
            >
              {/* Badge Icon Corner */}
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-500">
                  {r.location} • {r.timeAgo}
                </span>
                {r.isVerified ? (
                  <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                    <Verified className="w-4 h-4 fill-emerald-600 text-white" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-rose-600 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Flagged High</span>
                  </div>
                )}
              </div>

              {/* Price Tag */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Paid</span>
                <span
                  className={`text-sm font-extrabold px-2.5 py-0.5 rounded ${
                    r.isVerified
                      ? 'bg-emerald-100 text-emerald-900'
                      : 'bg-rose-100 text-rose-900'
                  }`}
                >
                  PKR {r.amountPaid.toLocaleString()}
                </span>
              </div>

              {r.notes && (
                <p className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded">
                  "{r.notes}"
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
