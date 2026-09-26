import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Volume2,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

type BermainMode = 'main' | 'simulasi' | 'game';
type GameSubTab = 'pg' | 'pg_kompleks' | 'menjodohkan' | 'isian' | 'susun';

interface BermainScreenProps {
  onEarnStar?: (amount: number) => void;
}

export const BermainScreen: React.FC<BermainScreenProps> = ({ onEarnStar }) => {
  const [mode, setMode] = useState<BermainMode>('main');
  const [gameTab, setGameTab] = useState<GameSubTab>('pg');

  // SIMULASI 1: Diagram Urutan Cuci Tangan (1-5)
  const initialHandwashSteps = [
    { id: 4, label: '4. Bilas dengan air bersih', icon: '🚰', short: 'Bilas Air' },
    { id: 1, label: '1. Basahi tangan dengan air', icon: '💧', short: 'Basahi Tangan' },
    { id: 5, label: '5. Keringkan dengan handuk/tisu', icon: '🧻', short: 'Keringkan' },
    { id: 2, label: '2. Ambil sabun pembersih', icon: '🧼', short: 'Ambil Sabun' },
    { id: 3, label: '3. Gosok telapak & sela jari', icon: '🤲', short: 'Gosok Tangan' },
  ];
  const [shuffledSteps, setShuffledSteps] = useState(initialHandwashSteps);
  const [orderSlots, setOrderSlots] = useState<(typeof initialHandwashSteps[0] | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // SIMULASI 2: Interactive Germs scrub game
  const [germs, setGerms] = useState([
    { id: 1, x: 25, y: 35, cleaned: false, icon: '🦠' },
    { id: 2, x: 45, y: 25, cleaned: false, icon: '👾' },
    { id: 3, x: 65, y: 40, cleaned: false, icon: '🦠' },
    { id: 4, x: 35, y: 65, cleaned: false, icon: '👾' },
    { id: 5, x: 55, y: 70, cleaned: false, icon: '🦠' },
  ]);
  const [soapPosition, setSoapPosition] = useState({ x: 50, y: 50 });

  // GAME 1: PG Sikat Gigi
  const [pgSelected, setPgSelected] = useState<string | null>(null);

  // GAME 2: PG Kompleks
  const [pgkSelected, setPgkSelected] = useState<string[]>([]);
  const [pgkChecked, setPgkChecked] = useState(false);

  // GAME 3: Menjodohkan
  const matchItemsLeft = [
    { id: 'sisir', name: 'Sisir Rambut', icon: '🪮' },
    { id: 'sabun', name: 'Sabun Mandi', icon: '🧼' },
    { id: 'kuku', name: 'Kuku Jari', icon: '💅' },
    { id: 'kacamata', name: 'Kacamata', icon: '👓' },
  ];
  const matchItemsRight = [
    { id: 'kuku', text: 'KU - KU', pair: 'kuku' },
    { id: 'sisir', text: 'SI - SIR', pair: 'sisir' },
    { id: 'kacamata', text: 'KA - CA - MA - TA', pair: 'kacamata' },
    { id: 'sabun', text: 'SA - BUN', pair: 'sabun' },
  ];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  // GAME 4: Isian Singkat
  const isianQuestions = [
    { id: 1, word: 'SABUN', display: ['S', '_', 'B', 'U', '_'], missingIdx: [1, 4], answers: { 1: 'A', 4: 'N' }, prompt: 'S _ B U _', hint: 'Sabun mandi' },
    { id: 2, word: 'KUKU', display: ['K', '_', 'K', '_'], missingIdx: [1, 3], answers: { 1: 'U', 3: 'U' }, prompt: 'K _ K _', hint: 'Kuku jari' },
    { id: 3, word: 'KUMAN', display: ['K', '_', 'M', '_', 'N'], missingIdx: [1, 3], answers: { 1: 'U', 3: 'A' }, prompt: 'K _ M _ N', hint: 'Kuman kotor' },
  ];
  const [currentIsianIndex, setCurrentIsianIndex] = useState(0);
  const [isianInputs, setIsianInputs] = useState<Record<number, string>>({});
  const [isianFinished, setIsianFinished] = useState(false);

  // GAME 5: Menyusun Ulang
  const [reorderWords, setReorderWords] = useState(['GI', 'GOSOK', 'GI']);
  const [reorderSuccess, setReorderSuccess] = useState(false);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (onEarnStar) {
      onEarnStar(1);
    }
  };

  // Handwash slot handler
  const handleAssignStepToSlot = (step: typeof initialHandwashSteps[0], slotIndex: number) => {
    sound.playClickSound();
    const newSlots = [...orderSlots];
    newSlots[slotIndex] = step;
    setOrderSlots(newSlots);

    // Remove from available
    setShuffledSteps(shuffledSteps.filter((s) => s.id !== step.id));

    // Check if all slots filled
    if (newSlots.every((s) => s !== null)) {
      const isCorrect = newSlots.every((s, idx) => s?.id === idx + 1);
      if (isCorrect) {
        sound.playSuccessSound();
        setOrderSuccess(true);
        triggerConfetti();
        sound.speak('Luar biasa! Urutan mencuci tanganmu sudah benar semua!');
      } else {
        sound.playWrongSound();
        sound.speak('Ada urutan yang belum pas. Coba atur lagi ya teman!');
      }
    }
  };

  const handleResetOrder = () => {
    sound.playClickSound();
    setShuffledSteps(initialHandwashSteps);
    setOrderSlots([null, null, null, null, null]);
    setOrderSuccess(false);
  };

  // Soap scrubbing handler
  const handleCleanGerm = (id: number) => {
    sound.playSparkleSound();
    const updated = germs.map((g) => (g.id === id ? { ...g, cleaned: true } : g));
    setGerms(updated);

    if (updated.every((g) => g.cleaned)) {
      sound.playSuccessSound();
      triggerConfetti();
      sound.speak('Hore! Semua kuman sudah bersih tersapu sabun! Tangan jadi wangi!');
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-sky-50/60 p-4 sm:p-6 pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Title Banner */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-yellow-100 border-2 border-yellow-300 px-4 py-1.5 rounded-full mb-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span className="text-xs sm:text-sm font-extrabold text-amber-900 tracking-wider">
              ZONA PERMAINAN EDUKATIF
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            BERMAIN: PETUALANGAN SERU
          </h1>
        </div>

        {/* MODE 1: PILIHAN UTAMA (Simulasi Kebersihan vs Game Menyenangkan) */}
        {mode === 'main' && (
          <div className="space-y-6">
            <MascotSpeech
              character="kiki"
              speechText="Waktunya bermain! Pilih mau melakukan simulasi atau main game!"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Tombol Besar Kiri: SIMULASI KEBERSIHAN */}
              <button
                onClick={() => {
                  sound.playSuccessSound();
                  setMode('simulasi');
                  sound.speak(
                    "Kamu memilih Simulasi Kebersihan! Mari susun urutan cuci tangan dan bersihkan kuman!"
                  );
                }}
                className="group relative bg-gradient-to-br from-sky-400 via-blue-500 to-sky-600 rounded-3xl border-6 border-white shadow-2xl p-8 sm:p-10 text-white text-center hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[300px]"
              >
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xs border-3 border-white/50 flex items-center justify-center text-6xl shadow-inner mb-4 group-hover:rotate-12 transition-transform">
                  🧼
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black font-heading mb-2 drop-shadow-md">
                    SIMULASI KEBERSIHAN
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-sky-100 leading-relaxed">
                    Aktivitas praktis: Diagram urutan cuci tangan & gosok kuman dengan sabun berbusa!
                  </p>
                </div>
                <div className="mt-6 px-6 py-2.5 bg-yellow-400 text-amber-950 font-black rounded-full text-base shadow-lg border-2 border-white group-hover:bg-yellow-300">
                  Mulai Simulasi 🌟
                </div>
              </button>

              {/* Tombol Besar Kanan: GAME MENYENANGKAN */}
              <button
                onClick={() => {
                  sound.playSuccessSound();
                  setMode('game');
                  sound.speak(
                    "Asyik! Kamu memilih Game Menyenangkan! Ayo selesaikan kuis dan tebak suku kata!"
                  );
                }}
                className="group relative bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-500 rounded-3xl border-6 border-white shadow-2xl p-8 sm:p-10 text-white text-center hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-between min-h-[300px]"
              >
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-xs border-3 border-white/50 flex items-center justify-center text-6xl shadow-inner mb-4 group-hover:-rotate-12 transition-transform">
                  🎮
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-black font-heading mb-2 drop-shadow-md">
                    GAME MENYENANGKAN
                  </h3>
                  <p className="text-sm sm:text-base font-bold text-amber-100 leading-relaxed">
                    Pilihan ganda, menjodohkan gambar, mengisi huruf hilang, dan menyusun kata!
                  </p>
                </div>
                <div className="mt-6 px-6 py-2.5 bg-white text-orange-600 font-black rounded-full text-base shadow-lg border-2 border-orange-300 group-hover:bg-amber-50">
                  Main Game 🚀
                </div>
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: SIMULASI KEBERSIHAN */}
        {mode === 'simulasi' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playClickSound();
                  setMode('main');
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer"
              >
                ← Kembali ke Pilihan Bermain
              </button>
              <div className="text-sm font-black text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
                Simulasi Praktis
              </div>
            </div>

            {/* Aktivitas 1: Diagram Urutan Mencuci Tangan */}
            <div className="bg-white rounded-3xl border-4 border-sky-300 shadow-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-sky-100 rounded-2xl text-sky-700 font-black text-xl">1</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                    Diagram Urutan Mencuci Tangan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                    Klik kartu di bawah, lalu masukkan ke dalam kotak nomor 1 sampai 5 yang benar!
                  </p>
                </div>
              </div>

              {/* 5 Target Slots (1-5) */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6">
                {orderSlots.map((slot, idx) => (
                  <div
                    key={idx}
                    className={`min-h-[110px] rounded-2xl border-3 border-dashed p-3 flex flex-col items-center justify-center text-center transition-all ${
                      slot
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-300 bg-slate-50 text-slate-400'
                    }`}
                  >
                    <span className="text-xs font-black uppercase text-slate-500 mb-1">
                      Kotak {idx + 1}
                    </span>
                    {slot ? (
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-1">{slot.icon}</span>
                        <span className="text-xs font-black">{slot.short}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">Kosong</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Shuffled Available Steps to Place */}
              {!orderSuccess ? (
                <div>
                  <div className="text-xs font-bold text-slate-700 mb-2">
                    Pilih kartu untuk dimasukkan ke kotak yang kosong berikutnya:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                    {shuffledSteps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => {
                          const firstEmptyIdx = orderSlots.findIndex((s) => s === null);
                          if (firstEmptyIdx !== -1) {
                            handleAssignStepToSlot(step, firstEmptyIdx);
                          }
                        }}
                        className="p-3 bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all active:scale-95 shadow-sm"
                      >
                        <span className="text-3xl mb-1">{step.icon}</span>
                        <span className="text-xs font-extrabold text-sky-950">{step.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleResetOrder}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Ulangi Urutan</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-100 border-2 border-emerald-400 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <div>
                      <h4 className="text-lg font-black text-emerald-950">
                        Hore! Urutan Mencuci Tangan Sempurna!
                      </h4>
                      <p className="text-xs text-emerald-800 font-semibold">
                        1. Basahi → 2. Sabun → 3. Gosok → 4. Bilas → 5. Keringkan
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleResetOrder}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Main Lagi
                  </button>
                </div>
              )}
            </div>

            {/* Aktivitas 2: Puzzle Gosok Kuman dengan Sabun */}
            <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-100 rounded-2xl text-amber-700 font-black text-xl">2</div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                    Puzzle Basmi Kuman dengan Sabun!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                    Klik atau sentuh setiap kuman kotor di tangan untuk mengusapnya dengan sabun!
                  </p>
                </div>
              </div>

              {/* Hand canvas with floating germs */}
              <div className="relative w-full max-w-lg mx-auto aspect-4/3 bg-radial from-amber-100 via-sky-50 to-emerald-50 rounded-3xl border-4 border-amber-200 shadow-inner overflow-hidden flex items-center justify-center p-4">
                {/* Big Hand Silhouette Vector */}
                <div className="text-9xl opacity-30 select-none">✋</div>

                {/* Germs on the hand */}
                {germs.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleCleanGerm(g.id)}
                    style={{ left: `${g.x}%`, top: `${g.y}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all active:scale-75 ${
                      g.cleaned
                        ? 'opacity-20 scale-50 pointer-events-none'
                        : 'animate-bounce hover:scale-125'
                    }`}
                    title={g.cleaned ? 'Sudah Bersih!' : 'Klik untuk Mengusap dengan Sabun!'}
                  >
                    {g.cleaned ? (
                      <span className="text-2xl">✨</span>
                    ) : (
                      <div className="relative">
                        <span className="text-4xl sm:text-5xl">{g.icon}</span>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black px-1 rounded-full">
                          Kuman!
                        </span>
                      </div>
                    )}
                  </button>
                ))}

                {/* Floating Soap cursor indicator */}
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-amber-300 shadow-md flex items-center gap-1.5">
                  <span className="text-xl animate-spin">🧼</span>
                  <span className="text-xs font-black text-amber-900">Sabun Ajaib Berbusa</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                {germs.every((g) => g.cleaned) ? (
                  <div className="p-3 bg-emerald-100 border border-emerald-400 rounded-2xl text-emerald-900 font-black text-sm">
                    ✨ Tanganmu sekarang berkilau bersih dan wangi bebas kuman! ✨
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm font-bold text-slate-500">
                    Sisa kuman yang belum dibersihkan:{' '}
                    <span className="text-rose-600 font-black">
                      {germs.filter((g) => !g.cleaned).length} kuman
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: GAME MENYENANGKAN */}
        {mode === 'game' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playClickSound();
                  setMode('main');
                }}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer"
              >
                ← Kembali ke Pilihan Bermain
              </button>

              {/* Sub-Tabs for the 5 games */}
              <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-2xl border-2 border-amber-200">
                {[
                  { id: 'pg', label: '1. Pilihan Ganda' },
                  { id: 'pg_kompleks', label: '2. PG Kompleks' },
                  { id: 'menjodohkan', label: '3. Menjodohkan' },
                  { id: 'isian', label: '4. Isian Singkat' },
                  { id: 'susun', label: '5. Susun Ulang' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      sound.playClickSound();
                      setGameTab(t.id as GameSubTab);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                      gameTab === t.id
                        ? 'bg-amber-400 text-amber-950 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GAME 1: PILIHAN GANDA (Sikat Gigi) */}
            {gameTab === 'pg' && (
              <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 border-3 border-amber-300 flex items-center justify-center text-6xl mx-auto shadow-md mb-3">
                    🪥
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                    Benda ini digunakan untuk...
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    Pilih satu jawaban yang paling tepat!
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: 'a', label: 'a. Mencuci Rambut', icon: '🧴', correct: false },
                    { key: 'b', label: 'b. Menggosok Gigi', icon: '😁', correct: true },
                    { key: 'c', label: 'c. Mencuci Tangan', icon: '🧼', correct: false },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => {
                        setPgSelected(opt.key);
                        if (opt.correct) {
                          sound.playSuccessSound();
                          triggerConfetti();
                          sound.speak('Tepat sekali! Sikat gigi digunakan untuk menggosok gigi!');
                        } else {
                          sound.playWrongSound();
                          sound.speak('Kurang tepat, coba ingat lagi benda yang dipakai di mulut.');
                        }
                      }}
                      className={`w-full p-4 rounded-2xl border-3 text-left font-bold text-base sm:text-lg flex items-center justify-between transition-all cursor-pointer ${
                        pgSelected === opt.key
                          ? opt.correct
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300'
                            : 'bg-rose-100 border-rose-500 text-rose-950 ring-4 ring-rose-300'
                          : 'bg-slate-50 hover:bg-amber-50 border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </div>
                      {pgSelected === opt.key && (
                        <span>{opt.correct ? '✅ Benar!' : '❌ Salah'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GAME 2: PG KOMPLEKS (Makanan Baik untuk Kesehatan Gigi) */}
            {gameTab === 'pg_kompleks' && (
              <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
                <div className="text-center mb-6">
                  <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Pilihan Ganda Kompleks
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading mt-2">
                    Manakah makanan yang BAIK untuk kesehatan gigi?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                    (Bisa memilih lebih dari satu jawaban yang benar!)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { id: 'apel', label: 'Buah Apel Segar', icon: '🍎', good: true },
                    { id: 'permen', label: 'Permen Manis Lengket', icon: '🍬', good: false },
                    { id: 'susu', label: 'Susu Putih Sehat', icon: '🥛', good: true },
                    { id: 'cokelat', label: 'Cokelat Manis', icon: '🍫', good: false },
                  ].map((item) => {
                    const isChecked = pgkSelected.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          sound.playClickSound();
                          setPgkChecked(false);
                          if (isChecked) {
                            setPgkSelected(pgkSelected.filter((x) => x !== item.id));
                          } else {
                            setPgkSelected([...pgkSelected, item.id]);
                          }
                        }}
                        className={`p-4 rounded-2xl border-3 flex items-center gap-3 font-bold transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-md ring-2 ring-amber-300'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-3xl">{item.icon}</span>
                        <div className="text-left flex-1">
                          <div className="text-sm sm:text-base font-extrabold">{item.label}</div>
                          <div className="text-[11px] text-slate-500">
                            {isChecked ? 'Terpilih ✔️' : 'Klik untuk pilih'}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => {
                      setPgkChecked(true);
                      const isCorrect =
                        pgkSelected.includes('apel') &&
                        pgkSelected.includes('susu') &&
                        !pgkSelected.includes('permen') &&
                        !pgkSelected.includes('cokelat');
                      if (isCorrect) {
                        sound.playSuccessSound();
                        triggerConfetti();
                        sound.speak(
                          'Benar sekali! Buah apel dan susu sangat baik untuk gigi kita!'
                        );
                      } else {
                        sound.playWrongSound();
                        sound.speak(
                          'Ingat, permen dan cokelat manis bisa membuat gigi berlubang jika tidak dibatasi.'
                        );
                      }
                    }}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg border-2 border-emerald-300 text-base cursor-pointer"
                  >
                    Periksa Jawaban 🔍
                  </button>

                  {pgkChecked && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-sm font-bold text-center">
                      {pgkSelected.includes('apel') &&
                      pgkSelected.includes('susu') &&
                      !pgkSelected.includes('permen') &&
                      !pgkSelected.includes('cokelat')
                        ? '🎉 Hebat! Apel kaya serat membersihkan gigi, dan susu kaya kalsium menguatkan gigi!'
                        : '💡 Makanan baik untuk gigi adalah Apel dan Susu. Permen dan cokelat manis harus dihindari agar gigi tidak sakit!'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* GAME 3: MENJODOHKAN (Matching gambar ke teks suku kata) */}
            {gameTab === 'menjodohkan' && (
              <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8 max-w-3xl mx-auto">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading">
                    Tarik Garis & Jodohkan Gambar dengan Suku Kata
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                    Klik gambar di Kolom A, lalu klik suku kata yang cocok di Kolom B!
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:gap-10">
                  {/* Kolom A (Gambar) */}
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-sky-800 bg-sky-100 px-3 py-1 rounded-full block text-center">
                      Kolom A: Gambar Benda
                    </span>
                    {matchItemsLeft.map((item) => {
                      const isMatched = matchedPairs.includes(item.id);
                      const isSelected = selectedLeft === item.id;
                      return (
                        <button
                          key={item.id}
                          disabled={isMatched}
                          onClick={() => {
                            sound.playClickSound();
                            setSelectedLeft(item.id);
                          }}
                          className={`w-full p-3.5 rounded-2xl border-3 flex items-center gap-3 transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-100 border-emerald-400 opacity-60'
                              : isSelected
                              ? 'bg-amber-100 border-amber-500 ring-4 ring-amber-300 scale-102'
                              : 'bg-slate-50 hover:bg-slate-100 border-slate-300'
                          }`}
                        >
                          <span className="text-4xl">{item.icon}</span>
                          <span className="font-extrabold text-sm sm:text-base text-slate-800">
                            {item.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Kolom B (Teks Suku Kata) */}
                  <div className="space-y-3">
                    <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full block text-center">
                      Kolom B: Suku Kata
                    </span>
                    {matchItemsRight.map((item) => {
                      const isMatched = matchedPairs.includes(item.pair);
                      return (
                        <button
                          key={item.id}
                          disabled={isMatched}
                          onClick={() => {
                            if (!selectedLeft) {
                              sound.speak('Pilih gambar di Kolom A dulu ya!');
                              return;
                            }
                            if (selectedLeft === item.pair) {
                              sound.playSuccessSound();
                              setMatchedPairs([...matchedPairs, item.pair]);
                              setSelectedLeft(null);
                              triggerConfetti();
                              sound.speak(`Benar! Pasangannya adalah ${item.text}!`);
                            } else {
                              sound.playWrongSound();
                              sound.speak('Belum cocok, coba pasangkan dengan gambar lain.');
                            }
                          }}
                          className={`w-full p-4 rounded-2xl border-3 font-heading font-black text-base sm:text-lg transition-all cursor-pointer ${
                            isMatched
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : 'bg-slate-50 hover:bg-emerald-50 border-slate-300 text-slate-800'
                          }`}
                        >
                          {item.text}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {matchedPairs.length === matchItemsLeft.length && (
                  <div className="mt-6 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-center font-black text-emerald-950 text-base">
                    🎉 Luar Biasa! Semua gambar dan suku kata berhasil kamu pasangkan!
                  </div>
                )}
              </div>
            )}

            {/* GAME 4: ISIAN SINGKAT (S_B_U_N) */}
            {gameTab === 'isian' && (
              <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8 max-w-xl mx-auto">
                <div className="text-center mb-6">
                  <span className="text-xs font-black uppercase text-purple-800 bg-purple-100 px-3 py-1 rounded-full">
                    Lengkapi Huruf yang Hilang
                  </span>
                  <div className="text-6xl my-3">
                    {isianQuestions[currentIsianIndex].word === 'SABUN'
                      ? '🧼'
                      : isianQuestions[currentIsianIndex].word === 'KUKU'
                      ? '💅'
                      : '🦠'}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-800 font-heading tracking-widest">
                    {isianQuestions[currentIsianIndex].display.map((letter, idx) => (
                      <span
                        key={idx}
                        className={`inline-block mx-1 px-3 py-1 rounded-xl border-3 ${
                          letter === '_'
                            ? isianInputs[idx]
                              ? 'border-emerald-500 bg-emerald-100 text-emerald-900'
                              : 'border-dashed border-amber-400 bg-amber-50 text-amber-600'
                            : 'border-slate-300 bg-slate-100 text-slate-800'
                        }`}
                      >
                        {isianInputs[idx] || letter}
                      </span>
                    ))}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-2">
                    Petunjuk: {isianQuestions[currentIsianIndex].hint}
                  </p>
                </div>

                {/* Kid-friendly on-screen alphabet touch keyboard */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-200 mb-4">
                  <div className="text-xs font-bold text-slate-600 mb-2 text-center">
                    Sentuh huruf untuk mengisi kotak yang kosong:
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['A', 'B', 'I', 'K', 'M', 'N', 'O', 'S', 'U'].map((char) => (
                      <button
                        key={char}
                        onClick={() => {
                          sound.playClickSound();
                          const currentQ = isianQuestions[currentIsianIndex];
                          const emptyMissingIdx = currentQ.missingIdx.find((idx) => !isianInputs[idx]);
                          if (emptyMissingIdx !== undefined) {
                            const newInputs = { ...isianInputs, [emptyMissingIdx]: char };
                            setIsianInputs(newInputs);

                            // Check if complete
                            const allFilled = currentQ.missingIdx.every((idx) => newInputs[idx]);
                            if (allFilled) {
                              const isCorrect = currentQ.missingIdx.every(
                                (idx) => newInputs[idx] === currentQ.answers[idx as keyof typeof currentQ.answers]
                              );
                              if (isCorrect) {
                                sound.playSuccessSound();
                                triggerConfetti();
                                sound.speak(`Hore! Kata yang benar adalah ${currentQ.word}!`);
                                setTimeout(() => {
                                  if (currentIsianIndex < isianQuestions.length - 1) {
                                    setCurrentIsianIndex(currentIsianIndex + 1);
                                    setIsianInputs({});
                                  } else {
                                    setIsianFinished(true);
                                  }
                                }, 1200);
                              } else {
                                sound.playWrongSound();
                                sound.speak('Hurufnya belum pas. Yuk coba lagi!');
                                setTimeout(() => setIsianInputs({}), 800);
                              }
                            }
                          }
                        }}
                        className="w-11 h-11 sm:w-12 sm:h-12 bg-white hover:bg-amber-100 text-amber-950 font-black rounded-2xl border-2 border-amber-400 shadow-md text-lg active:scale-90 transition-all cursor-pointer"
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                </div>

                {isianFinished && (
                  <div className="p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-center font-black text-emerald-950">
                    🎉 Selamat! Semua kata berhasil kamu lengkapi dengan benar!
                  </div>
                )}
              </div>
            )}

            {/* GAME 5: MENYUSUN ULANG ("GI" "GOSOK" "GI" -> "GOSOK GIGI") */}
            {gameTab === 'susun' && (
              <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-xl p-6 sm:p-8 max-w-xl mx-auto">
                <div className="text-center mb-6">
                  <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    Menyusun Ulang Kata
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 font-heading mt-2">
                    Susun potongan kata menjadi: "GOSOK GIGI"
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    Gunakan panah naik atau turun untuk menukar urutan kata!
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {reorderWords.map((word, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-amber-50 border-3 border-amber-300 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="text-2xl font-black text-slate-800 font-heading tracking-wider">
                          {word}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <button
                            onClick={() => {
                              sound.playClickSound();
                              const newArr = [...reorderWords];
                              [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
                              setReorderWords(newArr);
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-300 cursor-pointer shadow-xs"
                            title="Pindah ke Atas"
                          >
                            <ArrowUp className="w-5 h-5 text-slate-700" />
                          </button>
                        )}
                        {index < reorderWords.length - 1 && (
                          <button
                            onClick={() => {
                              sound.playClickSound();
                              const newArr = [...reorderWords];
                              [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
                              setReorderWords(newArr);
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-slate-100 border-2 border-slate-300 cursor-pointer shadow-xs"
                            title="Pindah ke Bawah"
                          >
                            <ArrowDown className="w-5 h-5 text-slate-700" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => {
                      const joined = reorderWords.join(' ');
                      if (joined === 'GOSOK GI GI') {
                        sound.playSuccessSound();
                        setReorderSuccess(true);
                        triggerConfetti();
                        sound.speak('Hebat sekali! Urutannya tepat: GOSOK GIGI!');
                      } else {
                        sound.playWrongSound();
                        sound.speak('Urutannya belum pas, kata GOSOK harus di depan ya!');
                      }
                    }}
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-lg border-2 border-amber-300 text-base cursor-pointer"
                  >
                    Periksa Susunan Kata ✨
                  </button>

                  {reorderSuccess && (
                    <div className="mt-4 p-4 rounded-2xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 font-black">
                      🎉 Tepat Sekali! Kata tersusun rapi: "GOSOK GIGI"!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
