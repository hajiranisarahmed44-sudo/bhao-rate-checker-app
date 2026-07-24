import React, { useState } from 'react';
import { ArrowLeft, Camera, Check, Upload, ThumbsUp, ThumbsDown } from 'lucide-react';
import { LAHORE_LOCATIONS, SERVICE_CATEGORIES } from '../data/mockData';

interface SubmitBillScreenProps {
  onBack: () => void;
  onSubmit: (newBill: {
    category: string;
    location: string;
    task: string;
    amount: number;
    rating: 'fair' | 'scam';
  }) => void;
  isUrdu: boolean;
}

export const SubmitBillScreen: React.FC<SubmitBillScreenProps> = ({
  onBack,
  onSubmit,
  isUrdu,
}) => {
  const [category, setCategory] = useState<string>('Electrician');
  const [location, setLocation] = useState<string>('Gulberg, Lahore');
  const [task, setTask] = useState<string>('e.g. Fan Repair & Capacitor Change');
  const [amount, setAmount] = useState<string>('1000');
  const [rating, setRating] = useState<'fair' | 'scam'>('fair');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({
        category,
        location,
        task: task || 'General Service',
        amount: parseInt(amount) || 1000,
        rating,
      });
    }, 800);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Back Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">
          {isUrdu ? 'سروس بل جمع کرائیں (Submit Service Bill)' : 'Submit Service Bill'}
        </h1>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Photo Upload Box */}
        <section>
          <label className="block w-full cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="w-full h-48 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-2xl bg-white flex flex-col items-center justify-center p-4 transition-colors shadow-2xs group">
              {imagePreview ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    src={imagePreview}
                    alt="Receipt preview"
                    className="max-h-full object-contain rounded-lg"
                  />
                  <span className="absolute bottom-2 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                    Change Receipt Photo
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Camera className="w-6 h-6 text-[#0f172a]" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">
                    {isUrdu ? 'رسید کی تصویر بنائیں یا اپ لوڈ کریں' : 'Take a photo of your receipt/bill'}
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG or PDF (OCR auto-scanned)
                  </p>
                </div>
              )}
            </div>
          </label>
        </section>

        {/* Category Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-800">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0f172a] shadow-2xs"
          >
            {SERVICE_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-800">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0f172a] shadow-2xs"
          >
            {LAHORE_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Specific Task */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-800">Specific Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g. Fan Repair & Capacitor Change"
            className="w-full bg-white border border-gray-300 rounded-xl p-3.5 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-[#0f172a] shadow-2xs"
          />
        </div>

        {/* Total Paid PKR */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold text-gray-800">Total Paid</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-sm font-bold text-gray-500">PKR</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl p-3.5 pl-16 text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-[#0f172a] shadow-2xs"
            />
          </div>
        </div>

        {/* Rating Radio Cards */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-bold text-gray-800">
            How was the pricing?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Fair Option */}
            <label
              onClick={() => setRating('fair')}
              className={`cursor-pointer rounded-2xl p-4 border-2 flex flex-col items-center justify-center text-center transition-all ${
                rating === 'fair'
                  ? 'border-[#006e2f] bg-[#f0fdf4] shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <ThumbsUp className={`w-8 h-8 mb-2 ${rating === 'fair' ? 'text-[#006e2f]' : 'text-gray-400'}`} />
              <span className="text-xs font-bold text-gray-900">
                Fair & Standard Rate
              </span>
            </label>

            {/* Overcharged Option */}
            <label
              onClick={() => setRating('scam')}
              className={`cursor-pointer rounded-2xl p-4 border-2 flex flex-col items-center justify-center text-center transition-all ${
                rating === 'scam'
                  ? 'border-rose-600 bg-rose-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <ThumbsDown className={`w-8 h-8 mb-2 ${rating === 'scam' ? 'text-rose-600' : 'text-gray-400'}`} />
              <span className="text-xs font-bold text-gray-900">
                Overcharged / Scam
              </span>
            </label>
          </div>
        </div>

        {/* Fixed Bottom Submit Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <button
              type="submit"
              disabled={submitted}
              className="w-full h-14 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-base rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {submitted ? (
                <>
                  <Check className="w-5 h-5 text-[#6bff8f] animate-bounce" />
                  <span>Submitted Anonymously!</span>
                </>
              ) : (
                <span>{isUrdu ? 'گمنام طور پر جمع کرائیں' : 'Submit Anonymously'}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
