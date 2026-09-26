import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, User, GraduationCap, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

interface LoginScreenProps {
  initialUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  initialUser,
  onLogin,
  onBack,
}) => {
  const [name, setName] = useState(initialUser.name || '');
  const [className, setClassName] = useState(initialUser.className || '1A');
  const [avatar, setAvatar] = useState(initialUser.avatar || 'boy');
  const [errorMsg, setErrorMsg] = useState('');

  const loginVoice =
    "Wah, kita siap berpetualang! Ketik namamu dan kelas di kotak ini, lalu klik 'Masuk' ya.";

  useEffect(() => {
    // Sound played by MascotSpeech automatically
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      sound.playWrongSound();
      setErrorMsg('Tolong tulis namamu dulu ya, teman!');
      sound.speak('Tolong tulis namamu dulu ya teman!');
      return;
    }

    sound.playSuccessSound();
    onLogin({
      name: name.trim(),
      className: className.trim() || '1A',
      avatar,
      isLoggedIn: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-4 sm:p-8 flex flex-col justify-between">
      {/* Top Bar for back & title */}
      <div className="max-w-4xl mx-auto w-full">
        <MascotSpeech speechText={loginVoice} character="kiki" />

        {/* Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-10 max-w-2xl mx-auto transition-all">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-1.5 rounded-full mb-3">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span className="text-xs sm:text-sm font-extrabold text-amber-900 tracking-wider">
                PROFIL SISWA PETUALANG
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 font-heading tracking-wide">
              MASUKKAN DATA DIRIMU
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-semibold mt-1">
              Supaya namamu tercetak indah di Sertifikat Juara nanti! 🏆
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Selection */}
            <div>
              <label className="block text-sm sm:text-base font-extrabold text-slate-700 mb-2">
                Pilih Karakter Favoritmu:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'boy', label: 'Anak Hebat', icon: '👦', bg: 'border-blue-400 bg-blue-50' },
                  { id: 'girl', label: 'Anak Pintar', icon: '👧', bg: 'border-rose-400 bg-rose-50' },
                  { id: 'kiki', label: 'Kiki Kelinci', icon: '🐰', bg: 'border-amber-400 bg-amber-50' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      sound.playClickSound();
                      setAvatar(item.id);
                    }}
                    className={`p-3 rounded-2xl border-3 flex flex-col items-center justify-center transition-all cursor-pointer ${
                      avatar === item.id
                        ? `${item.bg} ring-4 ring-amber-400 scale-105 shadow-md`
                        : 'border-slate-200 bg-slate-50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-4xl sm:text-5xl mb-1">{item.icon}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Kotak Input 1: Nama Lengkap */}
            <div>
              <label className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-slate-800 mb-2">
                <User className="w-5 h-5 text-sky-600" />
                <span>Nama Lengkap:</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ketik Namamu di sini..."
                  className="w-full text-lg sm:text-xl font-bold px-5 py-4 rounded-2xl border-4 border-sky-400 bg-sky-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-300 focus:border-sky-500 shadow-inner"
                  autoFocus
                />
              </div>
              {errorMsg && (
                <p className="mt-2 text-sm font-bold text-rose-600 animate-bounce">
                  ⚠️ {errorMsg}
                </p>
              )}
            </div>

            {/* Kotak Input 2: Kelas */}
            <div>
              <label className="flex items-center gap-2 text-base sm:text-lg font-extrabold text-slate-800 mb-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                <span>Kelas:</span>
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Contoh: 1A..."
                className="w-full text-lg sm:text-xl font-bold px-5 py-4 rounded-2xl border-4 border-emerald-400 bg-emerald-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-300 focus:border-emerald-500 shadow-inner"
              />
              <p className="text-xs text-slate-500 mt-1.5 font-medium">
                Siswa Kelas 1 Sekolah Dasar Negeri
              </p>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between gap-4">
              {/* Tombol Kembali: Kiri Bawah, Bentuk Panah */}
              <button
                type="button"
                onClick={() => {
                  sound.playClickSound();
                  sound.stopSpeaking();
                  onBack();
                }}
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black rounded-2xl border-3 border-amber-500 shadow-lg text-lg cursor-pointer transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
                <span>Kembali</span>
              </button>

              {/* Tombol Masuk: Kanan Bawah, Warna Hijau Cerah */}
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-95 text-white font-black rounded-2xl border-3 border-emerald-300 shadow-xl text-lg sm:text-xl cursor-pointer transition-all hover:shadow-emerald-200"
              >
                <span>Masuk</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center py-4">
        <p className="text-xs text-slate-500 font-semibold">
          Mari belajar dengan gembira dan jaga kebersihan diri setiap hari!
        </p>
      </div>
    </div>
  );
};
