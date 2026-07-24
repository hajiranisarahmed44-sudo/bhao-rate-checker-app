import React, { useState } from 'react';
import { ScreenType, ServiceRate } from './types';
import { INITIAL_SERVICES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { RateDetailsScreen } from './components/RateDetailsScreen';
import { SubmitBillScreen } from './components/SubmitBillScreen';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';

export default function App() {
  const [currentScreen, setScreen] = useState<ScreenType>('home');
  const [services, setServices] = useState<ServiceRate[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceRate>(INITIAL_SERVICES[0]);
  const [selectedLocation, setSelectedLocation] = useState<string>('Johar Town, Lahore');
  const [isUrdu, setIsUrdu] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectService = (service: ServiceRate) => {
    setSelectedService(service);
    setScreen('details');
  };

  const handleVote = (serviceId: string, isFair: boolean) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const votes = s.userVotes || { fair: 100, overcharged: 20 };
          const newFairCount = isFair ? votes.fair + 1 : votes.fair;
          const newOverchargedCount = !isFair ? votes.overcharged + 1 : votes.overcharged;
          const total = newFairCount + newOverchargedCount;
          const newPct = Math.round((newFairCount / total) * 100);

          return {
            ...s,
            verifiedCount: s.verifiedCount + 1,
            fairPercentage: newPct,
            userVotes: { fair: newFairCount, overcharged: newOverchargedCount },
          };
        }
        return s;
      })
    );

    showToast(isFair ? '👍 Thank you! Voted Fair.' : '👎 Noted as Overcharged.');
  };

  const handleNewBillSubmit = (newBill: {
    category: string;
    location: string;
    task: string;
    amount: number;
    rating: 'fair' | 'scam';
  }) => {
    // Add new receipt entry to matching service
    setServices((prev) =>
      prev.map((s) => {
        if (s.category === newBill.category || s.id === 'ceiling-fan-repair') {
          const newReceipt = {
            id: `r-${Date.now()}`,
            location: newBill.location.split(',')[0],
            timeAgo: 'Just now',
            amountPaid: newBill.amount,
            isVerified: newBill.rating === 'fair',
            notes: newBill.task,
          };
          return {
            ...s,
            verifiedCount: s.verifiedCount + 1,
            receipts: [newReceipt, ...s.receipts],
          };
        }
        return s;
      })
    );

    showToast('🎉 Service bill submitted anonymously!');
    setScreen('home');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-gray-900 font-sans antialiased flex flex-col selection:bg-emerald-200">
      {/* App Navigation Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setScreen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        isUrdu={isUrdu}
        setIsUrdu={setIsUrdu}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-5 pb-20">
        {/* Screen 1: Home & Search */}
        {currentScreen === 'home' && (
          <HomeScreen
            services={services}
            onSelectService={handleSelectService}
            onVote={handleVote}
            setScreen={setScreen}
            isUrdu={isUrdu}
          />
        )}

        {/* Screen 2: Rate Details Breakdown */}
        {currentScreen === 'details' && (
          <RateDetailsScreen
            service={selectedService}
            onBack={() => setScreen('home')}
            onVote={handleVote}
            isUrdu={isUrdu}
          />
        )}

        {/* Screen 3: Submit Service Bill */}
        {currentScreen === 'submit' && (
          <SubmitBillScreen
            onBack={() => setScreen('home')}
            onSubmit={handleNewBillSubmit}
            isUrdu={isUrdu}
          />
        )}

        {/* Screen 4: Flutter Dart Code Exporter & Viewer */}
        {currentScreen === 'flutter_code' && <FlutterCodeViewer />}
      </main>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0f172a] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg border border-emerald-500/40 animate-fade-in flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <BottomNav
        currentScreen={currentScreen}
        setScreen={setScreen}
        isUrdu={isUrdu}
      />
    </div>
  );
}
