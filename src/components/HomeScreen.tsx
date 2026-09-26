import React from 'react';
import {
  BookOpen,
  Lightbulb,
  Gamepad2,
  Puzzle,
  Pencil,
  CheckCircle,
  Smile,
  MessageCircle,
  BookMarked,
  Globe,
  Contact2,
  Camera,
  Award,
  Sparkles,
  Heart,
  LogOut,
} from 'lucide-react';
import { AppScreen, UserProfile, ProgressState } from '../types';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

interface HomeScreenProps {
  user: UserProfile;
  progress: ProgressState;
  onSelectScreen: (screen: AppScreen) => void;
  onLogout?: () => void;
}

interface HeartMenuItem {
  id: AppScreen;
  row: 1 | 2;
  title: string;
  subtitle: string;
  heartColorClass: string;
  bgGlow: string;
  borderColor: string;
  textColor: string;
  icon1: React.ReactNode;
  icon2: React.ReactNode;
  voiceText: string;
  scaleNote: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  progress,
  onSelectScreen,
  onLogout,
}) => {
  const introVoice =
    "Pilihlah salah satu hati untuk mulai belajar! Hati yang mana yang ingin kamu klik duluan?";

  const menuItems: HeartMenuItem[] = [
    // Baris 1
    {
      id: 'belajar',
      row: 1,
      title: 'BELAJAR',
      subtitle: 'Materi & Cerita Huruf K',
      heartColorClass: 'from-red-500 to-rose-600',
      bgGlow: 'hover:shadow-rose-300',
      borderColor: 'border-red-400',
      textColor: 'text-white',
      icon1: <BookOpen className="w-8 h-8 text-yellow-200" />,
      icon2: <Lightbulb className="w-6 h-6 text-yellow-300 animate-pulse" />,
      voiceText: 'Ayo kita belajar tentang kebersihan diri dan huruf K!',
      scaleNote: 0,
    },
    {
      id: 'bermain',
      row: 1,
      title: 'BERMAIN',
      subtitle: 'Simulasi & Game Seru',
      heartColorClass: 'from-amber-400 to-yellow-500',
      bgGlow: 'hover:shadow-yellow-300',
      borderColor: 'border-yellow-400',
      textColor: 'text-amber-950',
      icon1: <Gamepad2 className="w-8 h-8 text-amber-950" />,
      icon2: <Puzzle className="w-6 h-6 text-amber-900" />,
      voiceText: 'Asyik, waktunya main game!',
      scaleNote: 1,
    },
    {
      id: 'berlatih',
      row: 1,
      title: 'BERLATIH',
      subtitle: '10 Asesmen Soal HOTS',
      heartColorClass: 'from-emerald-500 to-green-600',
      bgGlow: 'hover:shadow-emerald-300',
      borderColor: 'border-emerald-400',
      textColor: 'text-white',
      icon1: <Pencil className="w-8 h-8 text-yellow-200" />,
      icon2: <CheckCircle className="w-6 h-6 text-white" />,
      voiceText: 'Uji kemampuanmu dengan latihan soal!',
      scaleNote: 2,
    },

    // Baris 2
    {
      id: 'refleksi',
      row: 2,
      title: 'REFLEKSI',
      subtitle: 'Perasaan & Sikapku',
      heartColorClass: 'from-sky-500 to-blue-600',
      bgGlow: 'hover:shadow-sky-300',
      borderColor: 'border-sky-400',
      textColor: 'text-white',
      icon1: <Smile className="w-8 h-8 text-yellow-300" />,
      icon2: <MessageCircle className="w-6 h-6 text-white" />,
      voiceText: 'Apa yang sudah kamu pelajari hari ini?',
      scaleNote: 3,
    },
    {
      id: 'sumber',
      row: 2,
      title: 'SUMBER BELAJAR',
      subtitle: 'Buku & Video Referensi',
      heartColorClass: 'from-orange-500 to-amber-600',
      bgGlow: 'hover:shadow-orange-300',
      borderColor: 'border-orange-400',
      textColor: 'text-white',
      icon1: <BookMarked className="w-8 h-8 text-yellow-200" />,
      icon2: <Globe className="w-6 h-6 text-white" />,
      voiceText: 'Cari tahu di mana kita belajar materi ini.',
      scaleNote: 4,
    },
    {
      id: 'pengembang',
      row: 2,
      title: 'PENGEMBANG',
      subtitle: 'Profil Guru & Pembuat',
      heartColorClass: 'from-purple-500 to-indigo-600',
      bgGlow: 'hover:shadow-purple-300',
      borderColor: 'border-purple-400',
      textColor: 'text-white',
      icon1: <Contact2 className="w-8 h-8 text-yellow-200" />,
      icon2: <Camera className="w-6 h-6 text-white" />,
      voiceText: 'Kenali orang yang membuat MPI ini!',
      scaleNote: 5,
    },
  ];

  const handleHeartClick = (item: HeartMenuItem) => {
    sound.playHeartNote(item.scaleNote);
    sound.speak(item.voiceText, () => {
      onSelectScreen(item.id);
    });
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-amber-50 via-sky-50 to-emerald-50 p-4 sm:p-6 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        {/* Mascot Speech Bubble */}
        <MascotSpeech speechText={introVoice} character="kiki" />

        {/* Header Greeting Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white/90 border-2 border-amber-300 px-4 py-1.5 rounded-full shadow-sm mb-2">
            <span className="text-base">👋</span>
            <span className="text-xs sm:text-sm font-bold text-amber-900">
              Selamat Datang, {user.name}!
            </span>
            {onLogout && (
              <button
                onClick={() => {
                  sound.playClickSound();
                  onLogout();
                }}
                title="Keluar dan ganti dengan nama murid yang lain"
                className="ml-1 px-3 py-0.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-xs font-black shadow-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
                <span>Ganti Murid</span>
              </button>
            )}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            PILIHAN HATI BELAJAR
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            Klik salah satu tombol hati warna-warni untuk memulai petualanganmu!
          </p>
        </div>

        {/* 6 Heart Buttons in 2 Rows x 3 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-8">
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-center"
            >
              <button
                onClick={() => handleHeartClick(item)}
                className={`group relative w-72 h-64 sm:w-80 sm:h-72 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer drop-shadow-xl ${item.bgGlow}`}
                title={`${item.title} - ${item.subtitle}`}
              >
                {/* SVG Heart Background Shape */}
                <svg
                  viewBox="0 0 100 90"
                  className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]"
                >
                  <defs>
                    <linearGradient id={`heartGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop
                        offset="0%"
                        stopColor={
                          item.row === 1
                            ? index === 0
                              ? '#ef4444'
                              : index === 1
                              ? '#facc15'
                              : '#10b981'
                            : index === 3
                            ? '#0ea5e9'
                            : index === 4
                            ? '#f97316'
                            : '#8b5cf6'
                        }
                      />
                      <stop
                        offset="100%"
                        stopColor={
                          item.row === 1
                            ? index === 0
                              ? '#e11d48'
                              : index === 1
                              ? '#eab308'
                              : '#059669'
                            : index === 3
                            ? '#2563eb'
                            : index === 4
                            ? '#ea580c'
                            : '#6366f1'
                        }
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 50,22 
                       C 45,5  20,-5  8,15 
                       C -5,35 15,62 50,88 
                       C 85,62 105,35 92,15 
                       C 80,-5  55,5  50,22 Z"
                    fill={`url(#heartGrad-${index})`}
                    stroke="rgba(255, 255, 255, 0.7)"
                    strokeWidth="2.5"
                    className="transition-transform group-hover:brightness-105"
                  />
                  {/* Subtle inner reflection curve */}
                  <path
                    d="M 20,20 C 12,28 15,45 28,58"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* Content Inside Heart (Absolute positioned over the heart center) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 px-6 text-center select-none pointer-events-none">
                  {/* Dual Icons */}
                  <div className="flex items-center justify-center gap-2 mb-1 transform transition-transform group-hover:scale-110">
                    <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/40 shadow-xs">
                      {item.icon1}
                    </div>
                    <div className="p-1.5 rounded-xl bg-white/20 backdrop-blur-xs border border-white/40 shadow-xs">
                      {item.icon2}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-2xl sm:text-3xl font-black tracking-wide font-heading drop-shadow-sm ${item.textColor}`}
                  >
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className={`text-xs sm:text-sm font-bold line-clamp-1 max-w-[200px] mt-0.5 opacity-90 ${item.textColor}`}
                  >
                    {item.subtitle}
                  </p>

                  {/* Playful Click Hint */}
                  <span className="mt-2 text-[11px] font-extrabold uppercase tracking-wider bg-white/30 backdrop-blur-sm px-3 py-0.5 rounded-full border border-white/50 text-white shadow-xs">
                    Klik Hati ❤️
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Certificate Quick Access Banner */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-4 sm:p-5 shadow-xl border-4 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white text-amber-600 flex items-center justify-center shadow-md text-2xl shrink-0">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs font-black text-amber-950 uppercase">
                <Sparkles className="w-4 h-4 text-amber-900" />
                <span>Pencapaian Belajar</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black text-amber-950 font-heading">
                Sertifikat Kelulusan Belajar
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 font-semibold">
                Selesaikan materi & raih bintang untuk mengunduh sertifikat resmi!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playSuccessSound();
              onSelectScreen('sertifikat');
            }}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-amber-50 text-amber-900 font-black rounded-2xl shadow-md border-2 border-amber-300 text-sm sm:text-base transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Buka Sertifikat 🏅
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center py-2 text-xs text-slate-500 font-semibold">
        Bahasa Indonesia Kelas 1 SD • Menyimak Kebersihan Diri & Suku Kata Huruf K
      </div>
    </div>
  );
};
