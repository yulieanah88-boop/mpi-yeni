import React, { useEffect } from 'react';
import { Award, Trophy, Download, Printer, Sparkles, Star, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfile, ProgressState } from '../types';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

interface SertifikatScreenProps {
  user: UserProfile;
  progress: ProgressState;
}

export const SertifikatScreen: React.FC<SertifikatScreenProps> = ({ user, progress }) => {
  const introVoice =
    "Selamat! Kamu luar biasa! Klik 'Unduh Sertifikat' untuk melihat sertifikat belajarmu!";

  useEffect(() => {
    // Joyful celebration fanfare & confetti
    sound.playSuccessSound();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const studentName = user.name.trim() || 'Siswa Berprestasi';
  const studentClass = user.className.trim() || '1A';

  const handlePrint = () => {
    sound.playSuccessSound();
    window.print();
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-amber-50 via-yellow-50 to-emerald-50 p-4 sm:p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* Banner Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-300 px-4 py-1.5 rounded-full mb-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-900 tracking-wider">
              PENGHARGAAN RESMI SDN
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            SERTIFIKAT HASIL BELAJAR
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-bold mt-1">
            "Hore! Kamu sudah menyelesaikan petualangan kebersihan diri."
          </p>
        </div>

        <MascotSpeech speechText={introVoice} character="kiki" />

        {/* Action Controls for Download / Print */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <button
            onClick={handlePrint}
            className="group px-8 py-4 bg-gradient-to-r from-red-500 via-rose-600 to-red-600 hover:from-red-600 hover:to-rose-700 active:scale-95 text-white font-black rounded-3xl border-4 border-white shadow-2xl text-lg sm:text-xl flex items-center justify-center gap-3 cursor-pointer animate-pulse-glow transition-all"
          >
            <Trophy className="w-7 h-7 text-yellow-300 group-hover:scale-110 transition-transform" />
            <span>UNDUH / CETAK SERTIFIKAT</span>
            <Download className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handlePrint}
            className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-2xl border-2 border-slate-300 shadow-md text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-5 h-5 text-slate-600" />
            <span>Cetak Langsung (PDF)</span>
          </button>
        </div>

        {/* Jendela Pratonton Sertifikat Resmi (A4 Landscape Ratio Printable) */}
        <div
          id="printable-certificate"
          className="relative bg-[#FFFDF7] rounded-3xl border-8 border-amber-400 p-6 sm:p-12 shadow-2xl text-slate-900 overflow-hidden mx-auto max-w-3xl"
        >
          {/* Ornate Gold Border Inner Line */}
          <div className="border-4 border-amber-300 p-4 sm:p-8 rounded-2xl relative">
            {/* Corner Decorative Ornaments */}
            <div className="absolute -top-3 -left-3 text-2xl text-amber-500">⚜️</div>
            <div className="absolute -top-3 -right-3 text-2xl text-amber-500">⚜️</div>
            <div className="absolute -bottom-3 -left-3 text-2xl text-amber-500">⚜️</div>
            <div className="absolute -bottom-3 -right-3 text-2xl text-amber-500">⚜️</div>

            {/* School Header */}
            <div className="text-center border-b-2 border-amber-200 pb-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-3xl">🏫</span>
                <span className="text-xs sm:text-sm font-black tracking-widest text-amber-900 uppercase">
                  SEKOLAH DASAR NEGERI INDONESIA
                </span>
                <span className="text-3xl">🇮🇩</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-700 font-heading tracking-wide uppercase">
                SERTIFIKAT KELULUSAN
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
                Nomor: SDN-MPI/BI-F1/{Math.floor(1000 + Math.random() * 9000)}/2026
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-3 sm:space-y-4 my-6">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
                Diberikan dengan bangga kepada Siswa Hebat:
              </p>

              {/* Student's Full Name (Large & Elegant) */}
              <div className="py-2">
                <span className="text-3xl sm:text-5xl font-black text-slate-900 font-heading border-b-4 border-amber-400 pb-1 px-6 inline-block">
                  {studentName}
                </span>
              </div>

              <p className="text-sm sm:text-base font-extrabold text-slate-700">
                Siswa Kelas: <span className="text-amber-800 font-black">{studentClass}</span>
              </p>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
                Atas keberhasilan dan dedikasinya dalam menyelesaikan seluruh rangkaian{' '}
                <strong className="text-slate-900 font-bold">
                  Media Pembelajaran Interaktif (MPI) Bahasa Indonesia Fase A
                </strong>{' '}
                dengan materi:
                <br />
                <span className="font-bold text-emerald-800">
                  "Menyimak Kebersihan Diri & Membaca Suku Kata Diawali Huruf 'K'"
                </span>
              </p>

              {/* Predicate Ribbon Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300 text-amber-950 px-6 py-2 rounded-full border-2 border-amber-400 shadow-md my-2">
                <Sparkles className="w-5 h-5 text-amber-900" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                  PREDIKAT: BINTANG KEBERSIHAN KELAS 1 ⭐⭐⭐
                </span>
              </div>
            </div>

            {/* Signatures & Seal Section */}
            <div className="pt-6 border-t-2 border-amber-200 grid grid-cols-2 gap-4 items-end mt-6">
              {/* Left: Date & School Stamp */}
              <div className="text-left space-y-1">
                <p className="text-xs text-slate-500 font-medium">Diberikan pada tanggal:</p>
                <p className="text-xs sm:text-sm font-black text-slate-800">{currentDate}</p>

                {/* Stempel Resmi */}
                <div className="w-20 h-20 rounded-full border-3 border-dashed border-red-500/80 text-red-600/90 flex flex-col items-center justify-center p-1 transform -rotate-12 select-none shadow-xs mt-2">
                  <span className="text-[9px] font-black uppercase text-center leading-none">
                    ★ SDN ★
                  </span>
                  <span className="text-[10px] font-black uppercase text-center leading-tight">
                    RESMI LULUS
                  </span>
                  <span className="text-[8px] font-bold">2026</span>
                </div>
              </div>

              {/* Right: Teacher Signature */}
              <div className="text-right space-y-1">
                <p className="text-xs text-slate-500 font-medium">Guru Pengembang MPI:</p>
                {/* Handwritten signature mock representation */}
                <div className="h-10 flex items-center justify-end text-xl sm:text-2xl font-serif italic text-blue-900 select-none">
                  Yeni Sumarni
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-900">
                  Yeni Sumarni, S.Pd.
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  NIP. 19890422 201402 2 001
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Tip below */}
        <div className="mt-8 text-center text-xs text-slate-500 font-semibold">
          💡 Tips Guru: Kamu bisa mencetak sertifikat ini atau menyimpannya sebagai file PDF untuk
          ditunjukkan kepada orang tua tercinta!
        </div>
      </div>
    </div>
  );
};
