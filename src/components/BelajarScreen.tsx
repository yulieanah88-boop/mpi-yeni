import React, { useState } from 'react';
import {
  Target,
  HelpCircle,
  BookOpen,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Video,
  Play,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { APP_IMAGES } from '../assets/images';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

type SubMenuTab = 'tujuan' | 'pemantik' | 'materi' | 'sukukata' | 'video';

interface BelajarScreenProps {
  onModuleCompleted?: (moduleName: string) => void;
}

export const BelajarScreen: React.FC<BelajarScreenProps> = ({
  onModuleCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<SubMenuTab>('tujuan');
  const [slideIndex, setSlideIndex] = useState(0);
  const [pemantikAnswered, setPemantikAnswered] = useState<boolean | null>(null);
  const [selectedSyllable, setSelectedSyllable] = useState<string>('KA');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoQuizDone, setVideoQuizDone] = useState(false);

  // Tab change handler
  const handleTabChange = (tab: SubMenuTab) => {
    sound.playClickSound();
    setActiveTab(tab);
    if (onModuleCompleted) {
      onModuleCompleted(tab);
    }
  };

  // Materials slides
  const materialSlides = [
    {
      title: 'GOSOK GIGI',
      detail: 'Minimal dua kali sehari.',
      desc: 'Sikat gigimu setelah sarapan pagi dan sebelum tidur malam agar terhindar dari kuman dan gigi berlubang.',
      image: APP_IMAGES.gosokGigi,
      syllableKey: 'GI-GI',
      voice: 'Gosok gigi, minimal dua kali sehari. Sikat gigi pagi dan sebelum tidur malam.',
    },
    {
      title: 'CUCI TANGAN',
      detail: 'Gunakan sabun dan air mengalir.',
      desc: 'Cuci tangan sebelum makan dan setelah menyentuh benda kotor agar kuman mati dan tangan wangi bersih.',
      image: APP_IMAGES.cuciTangan,
      syllableKey: 'CU-CI TA-NGAN',
      voice: 'Cuci tangan, gunakan sabun dan air mengalir.',
    },
    {
      title: 'MANDI BERSIH',
      detail: 'Mandi dua kali sehari.',
      desc: 'Gunakan sabun mandi dan bersihkan badan dari kotoran dan keringat setelah seharian bermain.',
      image: APP_IMAGES.heroCleaning,
      syllableKey: 'MAN-DI BER-SIH',
      voice: 'Mandi bersih dua kali sehari. Gunakan sabun mandi agar wangi dan segar.',
    },
    {
      title: 'POTONG KUKU',
      detail: 'Potong kuku yang panjang.',
      desc: 'Kuman suka bersembunyi di kuku yang panjang dan kotor. Potong kuku tangan dan kaki setiap minggu.',
      image: APP_IMAGES.mascotKiki,
      syllableKey: 'KU-KU',
      voice: 'Potong kuku yang panjang agar kuman tidak bersarang di jari kita.',
    },
    {
      title: 'PAKAI BAJU BERSIH',
      detail: 'Ganti baju setelah beraktivitas.',
      desc: 'Baju yang kotor dan basah oleh keringat harus segera diganti dengan baju yang bersih dan harum.',
      image: APP_IMAGES.heroCleaning,
      syllableKey: 'BA-JU BER-SIH',
      voice: 'Pakai baju bersih. Ganti baju setelah bermain agar badan nyaman dan bebas gatal.',
    },
  ];

  // Syllables data
  const syllablesData = [
    {
      syllable: 'KA',
      color: 'bg-rose-500 text-white border-rose-600',
      lightBg: 'bg-rose-50 border-rose-300',
      soundText: 'K-A dibaca KA! Ka... Kaki! Kamar! Kacamata!',
      words: [
        { word: 'KA - KI', full: 'Kaki', icon: '🦶', desc: 'Bagian tubuh untuk melangkah' },
        { word: 'KA - MAR', full: 'Kamar Mandi', icon: '🛁', desc: 'Tempat mandi dan cuci tangan' },
        { word: 'KA - CA', full: 'Kaca', icon: '🪞', desc: 'Melihat senyum gigi bersih di cermin' },
      ],
    },
    {
      syllable: 'KI',
      color: 'bg-amber-500 text-amber-950 border-amber-600',
      lightBg: 'bg-amber-50 border-amber-300',
      soundText: 'K-I dibaca KI! Ki... Kiki! Kipas! Kita!',
      words: [
        { word: 'KI - KI', full: 'Kiki si Kelinci', icon: '🐰', desc: 'Sahabat kelinci yang rajin mandi' },
        { word: 'KI - PAS', full: 'Kipas', icon: '💨', desc: 'Membuat udara sejuk dan segar' },
        { word: 'KI - TA', full: 'Kita Semua', icon: '👦👧', desc: 'Kita rajin menjaga kebersihan' },
      ],
    },
    {
      syllable: 'KU',
      color: 'bg-emerald-500 text-white border-emerald-600',
      lightBg: 'bg-emerald-50 border-emerald-300',
      soundText: 'K-U dibaca KU! Ku... Kuku! Kuman! Kuda!',
      words: [
        { word: 'KU - KU', full: 'Kuku Jari', icon: '💅', desc: 'Harus dipotong pendek dan bersih' },
        { word: 'KU - MAN', full: 'Kuman Kotor', icon: '🦠', desc: 'Musuh kebersihan yang kita basmi' },
        { word: 'KU - DA', full: 'Kuda Sehat', icon: '🐴', desc: 'Hewan yang lari dengan gesit' },
      ],
    },
    {
      syllable: 'KE',
      color: 'bg-sky-500 text-white border-sky-600',
      lightBg: 'bg-sky-50 border-sky-300',
      soundText: 'K-E dibaca KE! Ke... Keramas! Kering! Kelapa!',
      words: [
        { word: 'KE - RA - MAS', full: 'Keramas Rambut', icon: '🧴', desc: 'Cuci rambut dengan sampo wangi' },
        { word: 'KE - RING', full: 'Keringkan Badan', icon: '🧼', desc: 'Usap air dengan handuk bersih' },
        { word: 'KE - LA - PA', full: 'Kelapa Segar', icon: '🥥', desc: 'Buah yang segar dan sehat' },
      ],
    },
    {
      syllable: 'KO',
      color: 'bg-purple-500 text-white border-purple-600',
      lightBg: 'bg-purple-50 border-purple-300',
      soundText: 'K-O dibaca KO! Ko... Kotor! Kodok! Kotak!',
      words: [
        { word: 'KO - TOR', full: 'Kotor', icon: '🧽', desc: 'Harus segera dibersihkan dengan sabun' },
        { word: 'KO - DOK', full: 'Kodok Hijau', icon: '🐸', desc: 'Hewan yang suka melompat di air' },
        { word: 'KO - TAK', full: 'Kotak Sabun', icon: '📦', desc: 'Tempat menyimpan sabun mandi' },
      ],
    },
  ];

  const currentSyllableObj =
    syllablesData.find((s) => s.syllable === selectedSyllable) || syllablesData[0];

  return (
    <div className="min-h-[calc(100vh-65px)] bg-amber-50/50 p-4 sm:p-6 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-1.5 rounded-full mb-2">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-900 tracking-wider">
              RUANG BELAJAR KELAS 1
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            BELAJAR: MENJAGA KEBERSIHAN DIRI & HURUF 'K'
          </h1>
        </div>

        {/* Sub-Menu Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 bg-white/90 p-2 sm:p-3 rounded-3xl border-3 border-amber-200 shadow-md">
          {[
            { id: 'tujuan', label: 'Tujuan Belajar', icon: <Target className="w-5 h-5" /> },
            { id: 'pemantik', label: 'Pertanyaan Pemantik', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 'materi', label: 'Materi Kebersihan', icon: <BookOpen className="w-5 h-5" /> },
            { id: 'sukukata', label: "Suku Kata 'K'", icon: <Sparkles className="w-5 h-5" /> },
            { id: 'video', label: 'Video Pembelajaran', icon: <Video className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as SubMenuTab)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-md scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SUB-MENU 1: TUJUAN BELAJAR */}
        {activeTab === 'tujuan' && (
          <div className="space-y-4">
            <MascotSpeech
              character="guru"
              speechText="Halo anak-anak pintar! Hari ini kita punya dua tujuan belajar yang sangat seru. Yuk kita simak bersama di papan tulis!"
            />

            <div className="bg-emerald-900 border-8 border-amber-800 rounded-3xl shadow-2xl p-6 sm:p-10 text-white relative overflow-hidden">
              {/* Blackboard chalk texture accents */}
              <div className="absolute top-3 right-4 bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-emerald-200">
                Papan Tulis Kelas 1 SDN
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-700/60 border-4 border-amber-400 flex items-center justify-center text-5xl shrink-0 shadow-lg">
                  👩‍🏫
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-300 font-heading mb-1">
                    Tujuan Pembelajaran Hari Ini
                  </h3>
                  <p className="text-emerald-100 font-medium text-sm sm:text-base">
                    Bahasa Indonesia • Fase A (Kelas 1) • Menyimak dan Membaca
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-3xl">
                <div className="bg-emerald-800/80 border-2 border-emerald-600 p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-md">
                  <span className="w-9 h-9 rounded-xl bg-yellow-400 text-amber-950 font-black text-xl flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-yellow-200 mb-1">
                      Menjaga Kebersihan Diri
                    </h4>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      Siswa dapat menyimak dan memahami pentingnya merawat kebersihan tubuh
                      seperti menggosok gigi, mencuci tangan, mandi, dan memotong kuku.
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-800/80 border-2 border-emerald-600 p-4 sm:p-5 rounded-2xl flex items-start gap-4 shadow-md">
                  <span className="w-9 h-9 rounded-xl bg-yellow-400 text-amber-950 font-black text-xl flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-yellow-200 mb-1">
                      Mengenal Suku Kata Berawalan Huruf 'K'
                    </h4>
                    <p className="text-white text-sm sm:text-base leading-relaxed">
                      Siswa dapat melafalkan, membaca, dan menulis suku kata diawali huruf 'k' (KA,
                      KI, KU, KE, KO) dengan contoh kata benda kebersihan seperti Kaki, Kuku, Kuman,
                      dan Keramas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Audio Button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    sound.playClickSound();
                    sound.speak(
                      "Tujuan pembelajaran hari ini: Satu, tahu cara menjaga kebersihan diri. Dua, bisa membaca dan menulis suku kata yang diawali huruf K."
                    );
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl shadow-lg border-2 border-white transition-all active:scale-95 cursor-pointer text-sm sm:text-base"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Dengarkan Suara Ibu Guru 🔊</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MENU 2: PERTANYAAN PEMANTIK */}
        {activeTab === 'pemantik' && (
          <div className="space-y-4">
            <MascotSpeech
              character="kiki"
              speechText="Coba lihat teman kita ini! Apa yang harus dia lakukan setelah bermain bola dan mengapa ya?"
            />

            <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Visual of child after playing ball */}
                <div className="bg-amber-50 rounded-2xl p-6 border-3 border-amber-200 text-center flex flex-col items-center justify-center">
                  <div className="relative mb-3">
                    <div className="text-8xl animate-gentle-bounce">👦⚽</div>
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-black px-2 py-0.5 rounded-full border border-white">
                      Kotor Keringat!
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-slate-800">Budi Pulang Bermain Bola</h4>
                  <p className="text-xs text-slate-600 mt-1 font-semibold">
                    Kaki dan tangannya terkena lumpur, bajunya basah keringat.
                  </p>
                </div>

                {/* Question & Interactive Answers */}
                <div className="space-y-4">
                  <div className="bg-sky-50 border-2 border-sky-300 p-4 rounded-2xl">
                    <span className="text-xs font-extrabold uppercase text-sky-800 block mb-1">
                      Pertanyaan Pemantik:
                    </span>
                    <p className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                      "Apa yang harus Budi lakukan setelah bermain bola? Mengapa ya?"
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        sound.playSuccessSound();
                        setPemantikAnswered(true);
                        sound.speak(
                          "Hebat sekali! Benar, Budi harus segera mencuci kaki, tangan, dan mandi dengan sabun agar kuman hilang dan tubuh segar kembali!"
                        );
                      }}
                      className={`w-full p-4 rounded-2xl border-3 text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                        pemantikAnswered === true
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300'
                          : 'bg-slate-50 hover:bg-emerald-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🚿</span>
                        <div>
                          <div className="font-extrabold">A. Mandi & Cuci Bersih dengan Sabun</div>
                          <div className="text-xs text-slate-600">
                            Supaya kuman kotor mati dan badan wangi segar
                          </div>
                        </div>
                      </div>
                      {pemantikAnswered === true && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        sound.playWrongSound();
                        setPemantikAnswered(false);
                        sound.speak(
                          "Wah, jangan langsung tidur dan makan dulu ya teman. Nanti kumannya menempel di kasur dan makanan!"
                        );
                      }}
                      className={`w-full p-4 rounded-2xl border-3 text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                        pemantikAnswered === false
                          ? 'bg-rose-100 border-rose-500 text-rose-950 ring-4 ring-rose-300'
                          : 'bg-slate-50 hover:bg-rose-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍕</span>
                        <div>
                          <div className="font-extrabold">B. Langsung Makan dan Tidur di Kasur</div>
                          <div className="text-xs text-slate-600">
                            Tanpa mencuci tangan dan kaki kotor
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {pemantikAnswered !== null && (
                    <div
                      className={`p-4 rounded-2xl border-2 text-sm sm:text-base font-bold ${
                        pemantikAnswered
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                      }`}
                    >
                      {pemantikAnswered
                        ? '🌟 Hebat sekali jawabanmu! Setelah bermain, kita wajib membersihkan diri dengan sabun agar kuman tidak masuk ke dalam tubuh.'
                        : '💡 Yuk coba lagi! Jika kita tidak mencuci badan, kuman kotor akan menempel dan bisa menyebabkan gatal serta sakit.'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MENU 3: MATERI KEBERSIHAN DIRI (Slide-slide bergambar besar) */}
        {activeTab === 'materi' && (
          <div className="space-y-4">
            <MascotSpeech
              character="kiki"
              speechText={materialSlides[slideIndex].voice}
            />

            <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-amber-400 to-yellow-400 border-b-4 border-amber-300 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-950 bg-white/70 px-3 py-1 rounded-full">
                    Slide {slideIndex + 1} dari {materialSlides.length}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-amber-950 mt-1 font-heading">
                    {materialSlides[slideIndex].title}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    sound.playClickSound();
                    sound.speak(materialSlides[slideIndex].voice);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-amber-50 text-amber-950 rounded-2xl font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-rose-500" />
                  <span>Dengar 🔊</span>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Large High Fidelity Illustration */}
                  <div className="relative rounded-2xl overflow-hidden border-4 border-amber-200 shadow-lg aspect-4/3 bg-amber-50">
                    <img
                      src={materialSlides[slideIndex].image}
                      alt={materialSlides[slideIndex].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-amber-300 shadow-sm">
                      <span className="text-xs font-black text-amber-900">
                        {materialSlides[slideIndex].syllableKey}
                      </span>
                    </div>
                  </div>

                  {/* Text Information (Large & readable for grade 1) */}
                  <div className="space-y-4">
                    <div className="bg-amber-50 border-3 border-amber-200 p-5 rounded-3xl">
                      <h4 className="text-2xl sm:text-3xl font-black text-rose-600 font-heading tracking-wide mb-2">
                        {materialSlides[slideIndex].title}
                      </h4>
                      <div className="text-lg sm:text-xl font-extrabold text-slate-800 mb-2">
                        {materialSlides[slideIndex].detail}
                      </div>
                      <p className="text-base text-slate-600 font-medium leading-relaxed">
                        {materialSlides[slideIndex].desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <span>💡 Kata kunci diawali huruf K:</span>
                      <span className="bg-yellow-200 text-amber-900 px-2.5 py-0.5 rounded-full font-black">
                        {slideIndex === 0
                          ? 'K-u-man'
                          : slideIndex === 1
                          ? 'K-u-man & K-a-pan'
                          : slideIndex === 2
                          ? 'K-e-ra-mas'
                          : slideIndex === 3
                          ? 'K-u-ku'
                          : 'K-o-tor'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex items-center justify-between">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => {
                    sound.playClickSound();
                    setSlideIndex((prev) => Math.max(0, prev - 1));
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
                    slideIndex === 0
                      ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                      : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Sebelumnya</span>
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {materialSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        sound.playClickSound();
                        setSlideIndex(idx);
                      }}
                      className={`h-3 rounded-full transition-all cursor-pointer ${
                        slideIndex === idx ? 'w-8 bg-amber-500' : 'w-3 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={slideIndex === materialSlides.length - 1}
                  onClick={() => {
                    sound.playClickSound();
                    setSlideIndex((prev) => Math.min(materialSlides.length - 1, prev + 1));
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
                    slideIndex === materialSlides.length - 1
                      ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-400'
                      : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-md'
                  }`}
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUB-MENU 4: SUKU KATA DIAWALI HURUF 'K' */}
        {activeTab === 'sukukata' && (
          <div className="space-y-4">
            <MascotSpeech
              character="kiki"
              speechText="Yuk kita bunyikan suku kata huruf K bersama-sama: KA, KI, KU, KE, KO! Klik kotak warnanya ya!"
            />

            {/* Syllable Selector Buttons (KA, KI, KU, KE, KO) */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-2xl mx-auto mb-4">
              {syllablesData.map((item) => (
                <button
                  key={item.syllable}
                  onClick={() => {
                    sound.playClickSound();
                    setSelectedSyllable(item.syllable);
                    sound.speak(item.soundText);
                  }}
                  className={`p-3 sm:p-5 rounded-3xl border-4 text-center transition-all cursor-pointer active:scale-95 shadow-lg ${
                    selectedSyllable === item.syllable
                      ? `${item.color} scale-110 ring-4 ring-amber-300 font-heading`
                      : 'bg-white text-slate-700 border-slate-300 hover:border-amber-400'
                  }`}
                >
                  <div className="text-3xl sm:text-5xl font-black">{item.syllable}</div>
                  <div className="text-[11px] font-bold mt-1 opacity-90">Klik 🔊</div>
                </button>
              ))}
            </div>

            {/* Word cards for the selected syllable */}
            <div
              className={`rounded-3xl border-4 p-6 sm:p-8 shadow-xl transition-all ${currentSyllableObj.lightBg}`}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase text-slate-600">
                    Suku Kata Aktif
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-800 font-heading">
                    Suku Kata: <span className="text-rose-600">{currentSyllableObj.syllable}</span>
                  </h3>
                </div>

                <button
                  onClick={() => {
                    sound.playClickSound();
                    sound.speak(currentSyllableObj.soundText);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-2xl shadow-md border-2 border-amber-500 transition-all cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>Lafalkan Suku Kata 🗣️</span>
                </button>
              </div>

              {/* 3 Example Words Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentSyllableObj.words.map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border-3 border-amber-200 p-5 shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform"
                  >
                    <span className="text-5xl mb-3">{w.icon}</span>
                    <div className="text-xl sm:text-2xl font-black text-rose-600 font-heading tracking-wider mb-1">
                      {w.word}
                    </div>
                    <div className="text-base font-bold text-slate-800 mb-2">{w.full}</div>
                    <p className="text-xs text-slate-500 font-medium mb-3">{w.desc}</p>
                    <button
                      onClick={() => {
                        sound.playClickSound();
                        sound.speak(`${w.word}... ${w.full}`);
                      }}
                      className="px-4 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-full text-xs font-black border border-sky-300 cursor-pointer flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Dengar Kata</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SUB-MENU 5: VIDEO PEMBELAJARAN */}
        {activeTab === 'video' && (
          <div className="space-y-4">
            <MascotSpeech
              character="kiki"
              speechText="Yuk kita tonton video animasi lagu kebersihan diri! Simak kata-kata berawalan huruf K seperti kuman, kotor, dan kuku ya!"
            />

            <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden p-6 sm:p-8">
              <div className="max-w-3xl mx-auto">
                {/* Video Simulator / Player Card */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-sky-400 bg-sky-950 aspect-16/9 shadow-2xl flex flex-col items-center justify-center text-white p-6">
                  {/* Background Video Animated Canvas or Illustration */}
                  <img
                    src={APP_IMAGES.heroCleaning}
                    alt="Animasi Video"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      isVideoPlaying ? 'opacity-30 filter blur-xs' : 'opacity-70'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlaid Play Controller */}
                  {!isVideoPlaying ? (
                    <div className="relative z-10 text-center">
                      <button
                        onClick={() => {
                          sound.playSuccessSound();
                          setIsVideoPlaying(true);
                          sound.speak(
                            "Ayo kawan kita cuci tangan! Gunakan sabun dan air mengalir! Kuman kotor pergi menjauh! Kuku kita bersih bersinar!"
                          );
                        }}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white flex items-center justify-center shadow-2xl border-4 border-white hover:scale-110 active:scale-95 transition-all cursor-pointer mx-auto mb-3"
                      >
                        <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-white ml-1" />
                      </button>
                      <h4 className="text-xl sm:text-2xl font-black drop-shadow-md">
                        Putar Video Pembelajaran
                      </h4>
                      <p className="text-xs sm:text-sm text-sky-200 mt-1">
                        Lagu Cuci Tangan 6 Langkah & Huruf K
                      </p>
                    </div>
                  ) : (
                    <div className="relative z-10 text-center space-y-4 max-w-xl">
                      <div className="inline-block bg-rose-600 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider animate-pulse">
                        🔴 Memutar Animasi Edukatif
                      </div>

                      {/* Animated Subtitle Lyrics */}
                      <div className="bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                        <p className="text-xl sm:text-2xl font-black text-yellow-300 animate-gentle-bounce leading-relaxed">
                          🎵 "Kuman kotor takut sabun... Gosok gigi, potong kuku!" 🎵
                        </p>
                        <p className="text-sm text-white/90 mt-2">
                          Kata Huruf K: <span className="text-rose-400 font-bold">Kuman</span>,{' '}
                          <span className="text-amber-400 font-bold">Kotor</span>,{' '}
                          <span className="text-emerald-400 font-bold">Kuku</span>,{' '}
                          <span className="text-sky-400 font-bold">Kaki</span>!
                        </p>
                      </div>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            sound.playClickSound();
                            setIsVideoPlaying(false);
                            sound.stopSpeaking();
                          }}
                          className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-xs font-bold border border-white/40 cursor-pointer flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Ulangi Video</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Checkpoint Questions after watching */}
                <div className="mt-6 bg-amber-50 rounded-2xl border-3 border-amber-200 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <h4 className="text-lg font-black text-amber-950 font-heading">
                      Pertanyaan Menyimak Video:
                    </h4>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800 mb-3">
                    "Dari lagu di video tadi, benda apa yang ditakuti oleh kuman kotor?"
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        sound.playSuccessSound();
                        setVideoQuizDone(true);
                        sound.speak('Pintar sekali! Kuman kotor sangat takut pada sabun!');
                      }}
                      className={`p-3 rounded-2xl border-2 text-left font-bold text-sm cursor-pointer transition-all ${
                        videoQuizDone
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                          : 'bg-white hover:bg-emerald-50 border-slate-300 text-slate-700'
                      }`}
                    >
                      🧼 A. Sabun dan Air Mengalir (Benar!)
                    </button>
                    <button
                      onClick={() => {
                        sound.playWrongSound();
                        sound.speak('Kurang tepat, kuman tidak takut pada pasir mainan.');
                      }}
                      className="p-3 rounded-2xl border-2 text-left font-bold text-sm bg-white hover:bg-rose-50 border-slate-300 text-slate-700 cursor-pointer"
                    >
                      🏜️ B. Lumpur dan Pasir Mainan
                    </button>
                  </div>
                  {videoQuizDone && (
                    <div className="mt-3 text-xs sm:text-sm font-extrabold text-emerald-800 bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                      🎉 Hebat! Kamu sudah menyimak isi video dengan sangat baik!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
