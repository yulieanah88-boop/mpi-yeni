import React from 'react';
import { BookMarked, Globe, Video, Music, UserCheck, ExternalLink, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

export const SumberBelajarScreen: React.FC = () => {
  const introVoice = "Cari tahu di mana kita belajar materi ini.";

  const references = [
    {
      category: 'Buku Teks Utama',
      icon: <BookMarked className="w-6 h-6 text-amber-600" />,
      title: 'Buku Panduan Guru & Siswa: Bahasa Indonesia "Aku Bisa!" Kelas 1 SD',
      author: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi Republik Indonesia',
      year: '2021 / Kurikulum Merdeka',
      notes: 'Bab 3: Awas Kuman! (Menyimak Kebersihan Diri & Fonem / Suku Kata Huruf K)',
    },
    {
      category: 'Video Pembelajaran Digital',
      icon: <Video className="w-6 h-6 text-rose-600" />,
      title: 'Animasi Edukasi: Lagu Cuci Tangan 6 Langkah Pakai Sabun',
      author: 'Channel: Direktorat Promosi Kesehatan Kemenkes RI & Kemendikbudristek TV',
      year: '2023 - 2026',
      notes: 'Video gerak berirama anak sekolah dasar untuk membiasakan cuci tangan pakai sabun.',
    },
    {
      category: 'Lagu-Lagu Edukasi Anak',
      icon: <Music className="w-6 h-6 text-purple-600" />,
      title: 'Koleksi Lagu Kebersihan Diri Anak Usia Dini',
      author: 'Lagu Ciptaan: Pak Kasur & Ibu Sud ("Bangun Tidur", "Gigi Bersih", "Kuman Jahat")',
      year: 'Lagu Anak Indonesia Legendaris',
      notes: 'Menekankan pelafalan kata berawalan huruf K (kamar mandi, kuman, kotor, kuku).',
    },
    {
      category: 'Materi Pribadi Penulis',
      icon: <UserCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Modul Ajar & Media Pembelajaran Interaktif (MPI) Berbasis Komputer',
      author: 'Yeni Sumarni, S.Pd. — Guru Kelas 1 SDN',
      year: 'Tahun Ajaran 2025/2026',
      notes: 'Desain instruksional interaktif dengan audio voiceover ramah anak kelas 1 SD.',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 p-4 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Banner Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 border-2 border-orange-300 px-4 py-1.5 rounded-full mb-2">
            <Globe className="w-5 h-5 text-orange-600" />
            <span className="text-xs sm:text-sm font-extrabold text-orange-950 tracking-wider">
              REFERENSI PENDIDIKAN
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            SUMBER BELAJAR
          </h1>
        </div>

        <MascotSpeech speechText={introVoice} character="kiki" />

        <div className="bg-white rounded-3xl border-4 border-orange-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div className="border-b-2 border-slate-100 pb-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
              Daftar Rujukan & Sumber Pembelajaran
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Seluruh materi, gambar kartun, asesmen, dan audio dikembangkan berpedoman pada Capaian
              Pembelajaran Kurikulum Merdeka.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {references.map((item, idx) => (
              <div
                key={idx}
                className="bg-amber-50/50 hover:bg-orange-50/70 border-2 border-orange-200 rounded-2xl p-4 sm:p-5 transition-all shadow-xs flex items-start gap-4"
              >
                <div className="p-3 bg-white rounded-2xl border border-orange-300 shadow-sm shrink-0">
                  {item.icon}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-800 bg-orange-200/80 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">{item.year}</span>
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-slate-800 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 font-semibold">{item.author}</p>

                  <p className="text-xs text-slate-500 font-medium italic mt-1 bg-white/70 p-2 rounded-xl border border-orange-100">
                    💡 Catatan: {item.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Standard Curriculum Alignment */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-5 text-white flex items-center gap-4 shadow-md">
            <Sparkles className="w-8 h-8 text-yellow-200 shrink-0" />
            <div>
              <h4 className="text-base sm:text-lg font-black font-heading">
                Capaian Pembelajaran (CP) Fase A Menyimak & Membaca
              </h4>
              <p className="text-xs sm:text-sm text-orange-50 font-medium mt-0.5">
                "Peserta didik mampu bersikap menjadi penyimak yang baik, memahami pesan lisan
                tentang topik kebersihan diri, serta mengenali bunyi huruf dan merangkai suku kata 'k'
                menjadi kata bermakna."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
