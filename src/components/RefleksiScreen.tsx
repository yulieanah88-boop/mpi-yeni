import React, { useState } from 'react';
import { Sparkles, ThumbsUp, Heart, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

interface RefleksiScreenProps {
  onSaveReflection?: (mood: 'senang' | 'sedih' | 'bingung', knowsHygiene: boolean) => void;
}

export const RefleksiScreen: React.FC<RefleksiScreenProps> = ({ onSaveReflection }) => {
  const [selectedMood, setSelectedMood] = useState<'senang' | 'sedih' | 'bingung' | null>(null);
  const [knowsHygiene, setKnowsHygiene] = useState<boolean | null>(null);

  const emojiOptions = [
    {
      id: 'senang' as const,
      label: 'Senang & Gembira',
      emoji: '😊',
      colorClass: 'from-emerald-400 to-green-500',
      glow: 'hover:shadow-emerald-200',
      message: 'Wah hebat! Senang sekali belajar bersama kamu hari ini! Tetap semangat ya!',
      voiceText: 'Wah hebat! Senang sekali belajar bersama kamu hari ini! Tetap semangat ya!',
    },
    {
      id: 'sedih' as const,
      label: 'Sedih / Lelah',
      emoji: '😢',
      colorClass: 'from-rose-400 to-red-500',
      glow: 'hover:shadow-rose-200',
      message: 'Jangan bersedih ya teman. Istirahat sejenak, minum air putih, dan kita belajar lagi!',
      voiceText: 'Jangan bersedih ya teman! Istirahat sejenak, minum air putih, dan kita belajar lagi!',
    },
    {
      id: 'bingung' as const,
      label: 'Masih Bingung',
      emoji: '🤔',
      colorClass: 'from-amber-400 to-yellow-500',
      glow: 'hover:shadow-yellow-200',
      message: 'Tidak apa-apa! Bertanya kepada guru atau orang tua ya. Kamu pasti bisa!',
      voiceText: 'Tidak apa-apa! Boleh bertanya kepada guru atau orang tua ya! Kamu anak pintar!',
    },
  ];

  const handleMoodSelect = (moodId: 'senang' | 'sedih' | 'bingung') => {
    sound.playSuccessSound();
    setSelectedMood(moodId);
    const chosen = emojiOptions.find((m) => m.id === moodId);
    if (chosen) {
      sound.speak(chosen.voiceText);
    }
    if (onSaveReflection && knowsHygiene !== null) {
      onSaveReflection(moodId, knowsHygiene);
    }
  };

  const handleHygieneChoice = (choice: boolean) => {
    sound.playClickSound();
    setKnowsHygiene(choice);
    if (choice) {
      sound.speak(
        'Luar biasa! Sekarang kamu sudah tahu cara merawat kebersihan diri setiap hari!'
      );
    } else {
      sound.speak('Yuk kita baca lagi materi kebersihan diri di menu Belajar ya teman!');
    }
    if (onSaveReflection && selectedMood !== null) {
      onSaveReflection(selectedMood, choice);
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-sky-50 via-amber-50 to-pink-50 p-4 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Banner Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-pink-100 border-2 border-pink-300 px-4 py-1.5 rounded-full mb-2">
            <Heart className="w-5 h-5 text-pink-600 fill-pink-600" />
            <span className="text-xs sm:text-sm font-extrabold text-pink-900 tracking-wider">
              REFLEKSI PEMBELAJARAN
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            REFLEKSI DIRIMU
          </h1>
        </div>

        <MascotSpeech
          character="kiki"
          speechText="Apa yang kamu rasakan hari ini setelah belajar? Pilih salah satu hati di bawah ini ya!"
        />

        <div className="bg-white rounded-3xl border-4 border-pink-200 shadow-xl p-6 sm:p-8 space-y-8">
          {/* Question 1: Mood Emoji Love Buttons */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                Pertanyaan Refleksi 1
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading mt-2">
                "Apa yang kamu rasakan hari ini setelah belajar?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                Pilih salah satu emoji berbentuk hati di bawah ini:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {emojiOptions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMoodSelect(item.id)}
                  className={`group relative p-6 rounded-3xl border-4 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center ${
                    selectedMood === item.id
                      ? 'border-pink-500 bg-pink-50/80 ring-4 ring-pink-300 shadow-xl scale-105'
                      : 'border-slate-200 bg-slate-50 hover:bg-white shadow-md'
                  }`}
                >
                  {/* Heart Shape Icon Container */}
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${item.colorClass} text-white flex items-center justify-center text-4xl shadow-md border-3 border-white mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <span>{item.emoji}</span>
                  </div>

                  <span className="text-base sm:text-lg font-black text-slate-800 font-heading">
                    {item.label}
                  </span>

                  <span className="mt-2 text-xs font-bold text-pink-600">
                    {selectedMood === item.id ? 'Terpilih ❤️' : 'Pilih Hati'}
                  </span>
                </button>
              ))}
            </div>

            {/* Motivational message after selecting mood */}
            {selectedMood && (
              <div className="mt-6 p-4 rounded-2xl bg-pink-50 border-2 border-pink-300 text-center max-w-xl mx-auto animate-gentle-bounce">
                <span className="text-2xl block mb-1">💌</span>
                <p className="text-sm sm:text-base font-extrabold text-pink-900">
                  "{emojiOptions.find((m) => m.id === selectedMood)?.message}"
                </p>
              </div>
            )}
          </div>

          <hr className="border-slate-200" />

          {/* Question 2: Pertanyaan Tambahan Kebersihan Diri (Ya / Tidak) */}
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-black uppercase text-sky-700 bg-sky-100 px-3 py-1 rounded-full">
                Pertanyaan Refleksi 2
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading mt-2">
                "Apakah kamu sudah tahu cara menjaga kebersihan diri?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
                Pilih jawabanmu dengan jujur ya:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button
                onClick={() => handleHygieneChoice(true)}
                className={`w-full sm:w-1/2 p-5 rounded-3xl border-4 font-heading font-black text-xl transition-all cursor-pointer flex items-center justify-center gap-3 ${
                  knowsHygiene === true
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-300 shadow-xl scale-105'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                }`}
              >
                <ThumbsUp className="w-6 h-6" />
                <span>YA, SUDAH TAHU!</span>
              </button>

              <button
                onClick={() => handleHygieneChoice(false)}
                className={`w-full sm:w-1/2 p-5 rounded-3xl border-4 font-heading font-black text-xl transition-all cursor-pointer flex items-center justify-center gap-3 ${
                  knowsHygiene === false
                    ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-300 shadow-xl scale-105'
                    : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                <span>BELUM TAHU</span>
              </button>
            </div>

            {knowsHygiene !== null && (
              <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center max-w-xl mx-auto">
                <p className="text-xs sm:text-sm font-bold text-emerald-900">
                  {knowsHygiene
                    ? '🌟 Luar biasa! Ingat untuk selalu gosok gigi 2x sehari dan cuci tangan sebelum makan!'
                    : '💡 Jangan khawatir! Buka kembali menu "Belajar" untuk melihat langkah-langkah kebersihan yang menyenangkan!'}
                </p>
              </div>
            )}
          </div>

          {/* Daily Commitment Banner */}
          <div className="bg-amber-100/70 border-3 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <span className="text-4xl">🌟</span>
            <div>
              <h4 className="text-base font-black text-amber-950 font-heading">
                Janji Anak Sehat Kelas 1 SDN:
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-0.5">
                "Aku berjanji akan selalu menggosok gigi, mencuci tangan memakai sabun, mandi teratur,
                dan memotong kuku agar tubuhku sehat dan cerdas!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
