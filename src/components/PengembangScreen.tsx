import React from 'react';
import {
  Contact2,
  Building,
  BookOpen,
  Mail,
  Calendar,
  Award,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

export const PengembangScreen: React.FC = () => {
  const introVoice = "Kenali orang yang membuat MPI ini!";

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-purple-50 via-indigo-50 to-amber-50 p-4 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Banner Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-purple-100 border-2 border-purple-300 px-4 py-1.5 rounded-full mb-2">
            <Contact2 className="w-5 h-5 text-purple-700" />
            <span className="text-xs sm:text-sm font-extrabold text-purple-900 tracking-wider">
              INFORMASI PEMBUAT MPI
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            PROFIL PENGEMBANG
          </h1>
        </div>

        <MascotSpeech speechText={introVoice} character="kiki" />

        {/* Clean, Professional Developer Card */}
        <div className="bg-white rounded-3xl border-4 border-purple-200 shadow-2xl overflow-hidden max-w-2xl mx-auto">
          {/* Header Colored Ribbon */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 p-6 text-white text-center relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto bg-purple-100 flex items-center justify-center text-6xl">
              👩‍🏫
            </div>
            <h3 className="text-2xl sm:text-3xl font-black mt-3 font-heading text-yellow-300">
              Yeni Sumarni, S.Pd.
            </h3>
            <p className="text-xs sm:text-sm font-bold text-purple-100 mt-0.5">
              Guru Kelas 1 SD • Pengembang Media Pembelajaran Interaktif (MPI)
            </p>
          </div>

          {/* Profile Details with Small Icons */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Nama Lengkap */}
              <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500 text-white shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-purple-800 uppercase block">
                    Nama Lengkap
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800">
                    Yeni Sumarni, S.Pd.
                  </span>
                </div>
              </div>

              {/* Instansi */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500 text-white shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-indigo-800 uppercase block">
                    Instansi Sekolah
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800">
                    SDN Belajar Indonesia
                  </span>
                </div>
              </div>

              {/* Mata Pelajaran */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-800 uppercase block">
                    Mata Pelajaran
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800">
                    Bahasa Indonesia (Fase A)
                  </span>
                </div>
              </div>

              {/* Tahun Pembuatan */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">
                    Tahun Pembuatan
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800">
                    Tahun 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Email Contact (Full Width) */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500 text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-[11px] font-bold text-sky-800 uppercase block">
                  Surel Resmi (Email)
                </span>
                <span className="text-sm sm:text-base font-black text-sky-950 font-mono block truncate">
                  yenisumarni42@guru.sd.belajar.id
                </span>
              </div>
            </div>

            {/* Vision & Pedagogy Note */}
            <div className="p-4 rounded-2xl bg-purple-50/50 border-2 border-purple-200 text-slate-700">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-black uppercase text-purple-900">
                  Dedikasi Pembelajaran:
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                "Media Pembelajaran Interaktif ini dirancang dengan penuh kasih untuk membantu siswa
                kelas 1 Sekolah Dasar menyukai kegiatan menyimak kebersihan diri dan melatih kemampuan
                literasi awal melalui pengenalan fonem huruf K yang ceria dan bermakna."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
