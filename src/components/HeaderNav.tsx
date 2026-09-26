import React, { useState } from 'react';
import { ArrowLeft, Home, Volume2, VolumeX, Music, Award, Sparkles, LogOut, X, Check } from 'lucide-react';
import { AppScreen, UserProfile, ProgressState } from '../types';
import { sound } from '../utils/audio';

interface HeaderNavProps {
  currentScreen: AppScreen;
  user: UserProfile;
  progress: ProgressState;
  onNavigate: (screen: AppScreen) => void;
  onBack: () => void;
  onLogout: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentScreen,
  user,
  progress,
  onNavigate,
  onBack,
  onLogout,
  soundEnabled,
  onToggleSound,
  bgmPlaying,
  onToggleBgm,
}) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Hide top bar on landing and login screen
  if (currentScreen === 'landing' || currentScreen === 'login') {
    return null;
  }

  const handleConfirmLogout = () => {
    sound.playSuccessSound();
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-300 shadow-md px-4 py-2 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Left Zone: Back and Home Buttons */}
          <div className="flex items-center gap-2">
            {currentScreen !== 'home' && (
              <button
                onClick={() => {
                  sound.playClickSound();
                  onBack();
                }}
                title="Kembali ke halaman sebelumnya"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-bold rounded-2xl shadow-md border-2 border-amber-500 transition-all text-sm sm:text-base cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden xs:inline">Kembali</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClickSound();
                onNavigate('home');
              }}
              title="Menu Utama (Hati)"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-400 hover:bg-sky-500 active:scale-95 text-sky-950 font-bold rounded-2xl shadow-md border-2 border-sky-500 transition-all text-sm sm:text-base cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Beranda</span>
            </button>
          </div>

          {/* Center Zone: Active Student Profile & Stars & Quick Switch Button */}
          <div className="flex items-center gap-2 bg-amber-100/90 border-2 border-amber-300 rounded-full px-3 py-1 shadow-inner">
            <div className="w-8 h-8 rounded-full bg-amber-400 border border-amber-500 flex items-center justify-center text-sm font-bold text-amber-950">
              {user.avatar === 'boy' ? '👦' : user.avatar === 'girl' ? '👧' : '🐰'}
            </div>
            <div className="text-left text-xs sm:text-sm">
              <span className="font-bold text-slate-800 block leading-tight max-w-[100px] sm:max-w-[160px] truncate">
                {user.name || 'Siswa Pintar'}
              </span>
              <span className="text-slate-600 text-[11px] block leading-tight">
                Kelas {user.className || '1'}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-400/80 px-2 py-0.5 rounded-full text-xs font-bold text-amber-950 ml-1">
              <Sparkles className="w-3.5 h-3.5 fill-amber-600 text-amber-600" />
              <span>{progress.starsEarned}</span>
            </div>

            {/* Menu Keluar / Ganti Murid button */}
            <button
              onClick={() => {
                sound.playClickSound();
                setShowLogoutConfirm(true);
              }}
              title="Keluar / Ganti Nama Murid"
              className="ml-1 px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-[11px] font-black border border-rose-600 shadow-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ganti Murid</span>
            </button>
          </div>

          {/* Right Zone: Certificate & Audio Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClickSound();
                onNavigate('sertifikat');
              }}
              title="Lihat Sertifikat"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl font-bold shadow-md border-2 transition-all text-xs sm:text-sm cursor-pointer ${
                currentScreen === 'sertifikat'
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-emerald-400 hover:bg-emerald-500 text-emerald-950 border-emerald-500'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-950" />
              <span className="hidden md:inline">Sertifikat</span>
            </button>

            {/* Sound Effect & Voice Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Matikan Suara Petunjuk' : 'Hidupkan Suara Petunjuk'}
              className={`p-2 rounded-2xl border-2 transition-all cursor-pointer shadow-md ${
                soundEnabled
                  ? 'bg-rose-400 hover:bg-rose-500 text-rose-950 border-rose-500'
                  : 'bg-slate-200 text-slate-500 border-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Background Music Toggle */}
            <button
              onClick={onToggleBgm}
              title={bgmPlaying ? 'Matikan Musik Latar' : 'Nyalakan Musik Latar'}
              className={`p-2 rounded-2xl border-2 transition-all cursor-pointer shadow-md ${
                bgmPlaying
                  ? 'bg-indigo-400 hover:bg-indigo-500 text-indigo-950 border-indigo-500 animate-pulse'
                  : 'bg-slate-200 text-slate-500 border-slate-300'
              }`}
            >
              <Music className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal: Keluar / Ganti Murid */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-8 max-w-md w-full text-center animate-gentle-bounce">
            <div className="w-16 h-16 rounded-full bg-rose-100 border-3 border-rose-300 text-rose-600 flex items-center justify-center text-3xl mx-auto mb-3">
              👋
            </div>

            <h3 className="text-2xl font-black text-slate-800 font-heading mb-1">
              Ganti Nama Murid?
            </h3>
            <p className="text-sm text-slate-600 font-semibold mb-6">
              Apakah kamu ingin keluar dan berganti dengan nama murid yang lain?
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClickSound();
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl border-2 border-slate-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>

              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-3 px-4 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl border-2 border-rose-600 shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Ya, Ganti Murid</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

