import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Volume2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { MascotSpeech } from './MascotSpeech';

interface BerlatihScreenProps {
  onAssessmentCompleted?: (score: number, stars: number) => void;
  onGoToCertificate?: () => void;
}

interface QuestionItem {
  id: number;
  title: string;
  story: string;
  imageIcon: string;
  question: string;
  audioText: string;
  options: {
    key: string;
    text: string;
    icon: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const BerlatihScreen: React.FC<BerlatihScreenProps> = ({
  onAssessmentCompleted,
  onGoToCertificate,
}) => {
  const introVoice = "Kerjakan soal-soal ini dengan teliti ya!";

  const questions: QuestionItem[] = [
    {
      id: 1,
      title: 'Soal HOTS 1: Menjaga Gigi Sehat',
      story: 'Budi sering memakan banyak permen manis sebelum tidur dan lupa menyikat gigi.',
      imageIcon: '🦷🤕🍬',
      question: 'Mengapa gigi Budi bisa sakit dan benda apa yang seharusnya ia gunakan setiap malam?',
      audioText:
        'Nomor satu. Budi giginya sakit karena banyak makan permen manis. Mengapa giginya sakit dan benda mana yang bisa mencegah sakit gigi?',
      options: [
        {
          key: 'A',
          text: 'Gula permen membuat kuman merusak gigi. Budi harus memakai Sikat Gigi dan Pasta Gigi.',
          icon: '🪥',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Gigi Budi sakit karena kenyang. Budi harus memakai sisir rambut.',
          icon: '🪮',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Gigi Budi kedinginan. Budi harus memakai topi hangat.',
          icon: '🧢',
          isCorrect: false,
        },
      ],
      explanation:
        'Sisa manis dari permen disukai kuman. Jika tidak disikat dengan sikat gigi, kuman akan membuat lubang pada gigi.',
    },
    {
      id: 2,
      title: 'Soal HOTS 2: Tangan Bersih Sebelum Makan',
      story: 'Siti baru saja bermain tanah dan pasir bersama teman-temannya. Ibu memanggil Siti untuk sarapan pagi.',
      imageIcon: '👧🪴🥪',
      question: 'Apa akibat yang terjadi jika Siti langsung makan tanpa mencuci tangan dengan sabun?',
      audioText:
        'Nomor dua. Siti baru bermain tanah. Apa akibatnya jika Siti langsung makan tanpa cuci tangan dengan sabun?',
      options: [
        {
          key: 'A',
          text: 'Makanan terasa lebih enak dan manis.',
          icon: '😋',
          isCorrect: false,
        },
        {
          key: 'B',
          text: 'Kuman di tangan menempel ke makanan dan bisa menyebabkan sakit perut.',
          icon: '🤢',
          isCorrect: true,
        },
        {
          key: 'C',
          text: 'Kuman di tanah akan hilang sendiri saat disentuh sendok.',
          icon: '🥄',
          isCorrect: false,
        },
      ],
      explanation:
        'Tanah mengandung banyak kuman. Mencuci tangan dengan sabun membasmi kuman agar tidak masuk ke perut.',
    },
    {
      id: 3,
      title: "Soal HOTS 3: Suku Kata 'Ku' Kebersihan",
      story: 'Perhatikan tiga kata berikut: Kuda, Kuku, Kucing.',
      imageIcon: '🐴💅🐱',
      question: 'Bagian tubuh manakah yang berawalan suku kata "Ku" dan harus selalu dipotong pendek?',
      audioText:
        'Nomor tiga. Dari kata Kuda, Kuku, dan Kucing, bagian tubuh mana yang berawalan suku kata Ku dan harus selalu dipotong pendek?',
      options: [
        {
          key: 'A',
          text: 'Ku - ku (Harus dipotong agar kuman tidak bersarang)',
          icon: '💅',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Ku - da (Hewan penarik kereta)',
          icon: '🐴',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Ku - cing (Hewan peliharaan berbulu)',
          icon: '🐱',
          isCorrect: false,
        },
      ],
      explanation:
        'Kata Kuku diawali suku kata "Ku". Kuku panjang dan hitam menjadi sarang kotoran kuman.',
    },
    {
      id: 4,
      title: 'Soal HOTS 4: Membersihkan Rambut',
      story: 'Setelah berolahraga lari di terik matahari, rambut Dito terasa gatal dan berbau keringat.',
      imageIcon: '🏃‍♂️💦🧴',
      question: 'Kata kegiatan berawalan suku kata "Ke" apa yang harus Dito lakukan saat mandi?',
      audioText:
        'Nomor empat. Rambut Dito gatal dan bau keringat setelah olahraga. Kata berawalan suku kata Ke apa yang harus Dito lakukan?',
      options: [
        {
          key: 'A',
          text: 'Ke - ring (Mengeringkan baju di jemuran)',
          icon: '☀️',
          isCorrect: false,
        },
        {
          key: 'B',
          text: 'Ke - ra - mas (Mencuci rambut dengan sampo)',
          icon: '🧴',
          isCorrect: true,
        },
        {
          key: 'C',
          text: 'Ke - la - pa (Memetik buah kelapa)',
          icon: '🥥',
          isCorrect: false,
        },
      ],
      explanation:
        'Keramas adalah kegiatan mencuci rambut dengan sampo agar rambut bersih, wangi, dan bebas gatal.',
    },
    {
      id: 5,
      title: 'Soal HOTS 5: Mengapa Harus Memakai Sabun?',
      story: 'Roni mencuci tangannya yang berminyak hanya disiram air biasa tanpa sabun.',
      imageIcon: '👦🧼💧',
      question: 'Mengapa air saja tidak cukup untuk membersihkan kotoran dan kuman di tangan?',
      audioText:
        'Nomor lima. Mengapa air saja tidak cukup untuk membersihkan kuman di tangan tanpa memakai sabun?',
      options: [
        {
          key: 'A',
          text: 'Sabun memiliki busa pembersih yang mengikat lemak dan mematikan kuman.',
          icon: '🫧',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Air biasa membuat tangan menjadi terlalu licin.',
          icon: '💧',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Supaya tangan berubah warna menjadi ungu.',
          icon: '🎨',
          isCorrect: false,
        },
      ],
      explanation:
        'Sabun mengandung zat pembersih aktif yang dapat mengangkat minyak serta merusak dinding kuman jahat.',
    },
    {
      id: 6,
      title: "Soal HOTS 6: Suku Kata 'Ka' di Kamar Mandi",
      story: 'Kiki masuk ke kamar mandi untuk bersiap menyikat gigi di depan cermin.',
      imageIcon: '🐰🛁🪞',
      question: 'Benda untuk melihat senyum gigi kita di kamar mandi yang berawalan suku kata "Ka" adalah...',
      audioText:
        'Nomor enam. Benda untuk melihat senyum gigi kita yang diawali suku kata Ka adalah...',
      options: [
        {
          key: 'A',
          text: 'Ka - ca (Cermin untuk melihat gigi bersih)',
          icon: '🪞',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Ka - sur (Tempat tidur empuk)',
          icon: '🛏️',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Ka - pal (Alat transportasi laut)',
          icon: '🚢',
          isCorrect: false,
        },
      ],
      explanation:
        'Kaca (cermin) berawalan suku kata "Ka", membantu kita melihat kebersihan gigi saat menyikat.',
    },
    {
      id: 7,
      title: 'Soal HOTS 7: Baju Basah Keringat',
      story: 'Edo selesai bermain hujan dan lumpur di lapangan. Bajunya basah dan berpasir.',
      imageIcon: '🌧️👕🧦',
      question: 'Langkah terbaik yang harus Edo lakukan sesampainya di rumah adalah...',
      audioText:
        'Nomor tujuh. Edo bajunya basah dan berlumpur. Apa langkah terbaik yang harus Edo lakukan di rumah?',
      options: [
        {
          key: 'A',
          text: 'Duduk di sofa dan menonton televisi sampai bajunya kering sendiri.',
          icon: '📺',
          isCorrect: false,
        },
        {
          key: 'B',
          text: 'Segera melepas baju kotor di tempat cucian lalu mandi dengan air bersih dan sabun.',
          icon: '🚿',
          isCorrect: true,
        },
        {
          key: 'C',
          text: 'Memakai jaket tebal di luar baju yang basah kuyup.',
          icon: '🧥',
          isCorrect: false,
        },
      ],
      explanation:
        'Baju basah dan kotor mengandung bakteri. Harus segera dicopot dan tubuh dimandikan agar tidak masuk angin.',
    },
    {
      id: 8,
      title: 'Soal HOTS 8: Menjaga Teman Saat Bersin',
      story: 'Ketika sedang belajar di kelas, Ani merasa hidungnya gatal dan ingin bersin.',
      imageIcon: '🤧👧🏫',
      question: 'Bagaimana cara bersin yang benar agar kuman tidak menyebar ke teman di dekatnya?',
      audioText:
        'Nomor delapan. Bagaimana cara bersin yang benar agar kuman tidak menyebar ke teman di dekat kita?',
      options: [
        {
          key: 'A',
          text: 'Menutup mulut dan hidung dengan tisu atau lipatan siku tangan.',
          icon: '🧻',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Bersin keras-keras ke arah wajah teman sebangku.',
          icon: '💨',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Membuka mulut lebar-lebar tanpa menutup apapun.',
          icon: '😮',
          isCorrect: false,
        },
      ],
      explanation:
        'Menutup mulut dengan siku dalam atau tisu mencegah droplet kuman terbang menulari orang lain.',
    },
    {
      id: 9,
      title: "Soal HOTS 9: Fonem 'Ko' dan 'Ku'",
      story: 'Dengarkan dua kata ini: "Kotor" dan "Kuman".',
      imageIcon: '🦠🧽🧹',
      question: 'Manakah pernyataan yang BENAR tentang suku kata awal kedua kata tersebut?',
      audioText:
        'Nomor sembilan. Dengarkan kata Kotor dan Kuman. Manakah pernyataan yang benar tentang suku kata awalnya?',
      options: [
        {
          key: 'A',
          text: 'Kotor diawali suku kata "Ko", sedangkan Kuman diawali suku kata "Ku".',
          icon: '🗣️',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Kedua kata memiliki suku kata awal yang sama yaitu "Ka".',
          icon: '❌',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Kotor diawali huruf M dan Kuman diawali huruf P.',
          icon: '❌',
          isCorrect: false,
        },
      ],
      explanation:
        'Kotor = Ko - tor (awal Ko). Kuman = Ku - man (awal Ku). Keduanya adalah musuh kebersihan yang harus kita bersihkan.',
    },
    {
      id: 10,
      title: 'Soal HOTS 10: Menyimak Kisah Kiki si Kelinci',
      story: 'Kiki si Kelinci selalu mandi 2 kali sehari, memotong kuku setiap minggu, dan menyikat gigi sebelum tidur.',
      imageIcon: '🐰🌟🏆',
      question: 'Menurutmu, apa manfaat utama dari kebiasaan baik Kiki tersebut?',
      audioText:
        'Nomor sepuluh. Kiki selalu menjaga kebersihan diri. Apa manfaat utama dari kebiasaan baik Kiki tersebut?',
      options: [
        {
          key: 'A',
          text: 'Tubuh Kiki selalu sehat, bugar, wangi, dan tidak mudah terserang penyakit.',
          icon: '💪',
          isCorrect: true,
        },
        {
          key: 'B',
          text: 'Kiki jadi sering sakit perut dan malas belajar.',
          icon: '😴',
          isCorrect: false,
        },
        {
          key: 'C',
          text: 'Kiki tidak punya waktu untuk bermain dengan teman-teman.',
          icon: '😢',
          isCorrect: false,
        },
      ],
      explanation:
        'Menjaga kebersihan diri secara teratur membuat badan kita terlindung dari kuman dan tumbuh sehat ceria.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = questions[currentIndex];
  const userChoice = selectedAnswers[currentQ.id];

  const handleSelectOption = (key: string, isCorrect: boolean) => {
    if (isSubmitted) return;
    const newAnswers = { ...selectedAnswers, [currentQ.id]: key };
    setSelectedAnswers(newAnswers);

    if (isCorrect) {
      sound.playSuccessSound();
    } else {
      sound.playWrongSound();
    }
  };

  const handleFinishQuiz = () => {
    setIsSubmitted(true);
    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.key === chosen);
      if (opt?.isCorrect) {
        correctCount++;
      }
    });

    const finalScore = correctCount * 10;
    const stars = finalScore >= 80 ? 3 : finalScore >= 60 ? 2 : 1;

    sound.playSuccessSound();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });

    sound.speak(
      `Selamat! Kamu mendapatkan nilai ${finalScore}! Kamu hebat sekali menjaga kebersihan!`
    );

    if (onAssessmentCompleted) {
      onAssessmentCompleted(finalScore, stars);
    }
  };

  const calculateFinalStats = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      const chosen = selectedAnswers[q.id];
      const opt = q.options.find((o) => o.key === chosen);
      if (opt?.isCorrect) correctCount++;
    });
    return {
      score: correctCount * 10,
      correctCount,
      stars: correctCount >= 8 ? 3 : correctCount >= 6 ? 2 : 1,
    };
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-emerald-50/60 p-4 sm:p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Banner Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border-2 border-emerald-300 px-4 py-1.5 rounded-full mb-2">
            <Award className="w-5 h-5 text-emerald-700" />
            <span className="text-xs sm:text-sm font-extrabold text-emerald-900 tracking-wider">
              ASESMEN HOTS KELAS 1 SDN
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-800 font-heading">
            BERLATIH: UJI KEMAMPUAN
          </h1>
        </div>

        <MascotSpeech speechText={introVoice} character="kiki" />

        {!isSubmitted ? (
          <div className="bg-white rounded-3xl border-4 border-emerald-300 shadow-2xl p-6 sm:p-8">
            {/* Question Progress Numbering Strip */}
            <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-500">Nomor Soal:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 font-heading">
                  {currentIndex + 1} / {questions.length}
                </span>
              </div>

              {/* Audio Reader for Question */}
              <button
                onClick={() => {
                  sound.playClickSound();
                  sound.speak(`${currentQ.story}. ${currentQ.question}`);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-2xl font-bold text-xs sm:text-sm shadow-md cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-950" />
                <span>Bacakan Soal 🔊</span>
              </button>
            </div>

            {/* Quick Question Selector Numbers (1 to 10) */}
            <div className="flex flex-wrap gap-1.5 mb-6 justify-center">
              {questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = currentIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      sound.playClickSound();
                      setCurrentIndex(idx);
                    }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-500 text-white ring-3 ring-emerald-300 scale-110 shadow-sm'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Card */}
            <div className="space-y-4 mb-6">
              {/* Context Story & Visual Icons */}
              <div className="bg-emerald-50/70 border-2 border-emerald-200 p-4 sm:p-5 rounded-2xl flex items-center gap-4">
                <div className="text-4xl sm:text-5xl shrink-0 p-2 bg-white rounded-2xl shadow-sm border border-emerald-200">
                  {currentQ.imageIcon}
                </div>
                <div>
                  <span className="text-xs font-black text-emerald-800 uppercase tracking-wide">
                    {currentQ.title}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-700 leading-snug mt-0.5">
                    {currentQ.story}
                  </p>
                </div>
              </div>

              {/* Main Question Text */}
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                "{currentQ.question}"
              </h3>

              {/* Answer Choices */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt) => {
                  const isChosen = userChoice === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key, opt.isCorrect)}
                      className={`w-full p-4 rounded-2xl border-3 text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isChosen
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-200 scale-101 shadow-md'
                          : 'bg-slate-50 hover:bg-emerald-50/60 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-white border border-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shrink-0">
                          {opt.key}
                        </span>
                        <span className="text-2xl shrink-0">{opt.icon}</span>
                        <span className="text-sm sm:text-base">{opt.text}</span>
                      </div>
                      {isChosen && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between border-t-2 border-slate-100 pt-4">
              <button
                disabled={currentIndex === 0}
                onClick={() => {
                  sound.playClickSound();
                  setCurrentIndex((prev) => Math.max(0, prev - 1));
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm cursor-pointer ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Sebelumnya</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playClickSound();
                    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span>Soal Berikutnya</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishQuiz}
                  className="flex items-center gap-1.5 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-2xl font-black text-sm sm:text-base shadow-xl border-2 border-white animate-pulse cursor-pointer"
                >
                  <Award className="w-5 h-5" />
                  <span>Selesai & Kumpulkan 🎯</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* RESULT SCORE SCREEN */
          <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-10 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 rounded-full bg-yellow-100 border-4 border-yellow-400 flex items-center justify-center text-5xl mx-auto shadow-lg mb-4 animate-bounce">
              🏆
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-800 font-heading mb-1">
              HASIL ASESMEN BELAJAR
            </h2>
            <p className="text-sm text-slate-600 font-bold mb-4">
              Hebat sekali! Kamu telah menyelesaikan 10 soal HOTS Kebersihan Diri!
            </p>

            {/* Score Box */}
            <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 border-4 border-white shadow-xl text-amber-950 max-w-sm mx-auto mb-6">
              <span className="text-xs font-black uppercase tracking-wider block mb-1">
                Nilai Akhir Siswa
              </span>
              <div className="text-6xl sm:text-7xl font-black font-heading">
                {calculateFinalStats().score}
              </div>
              <div className="flex justify-center gap-2 my-2">
                {[...Array(calculateFinalStats().stars)].map((_, i) => (
                  <Sparkles key={i} className="w-8 h-8 fill-amber-700 text-amber-800" />
                ))}
              </div>
              <p className="text-xs sm:text-sm font-extrabold mt-1">
                Predikat:{' '}
                {calculateFinalStats().score >= 80
                  ? 'BINTANG KEBERSIHAN KELAS 1 ⭐'
                  : 'SANGAT BAIK ⭐'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClickSound();
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setCurrentIndex(0);
                }}
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl border border-slate-300 text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Latihan</span>
              </button>

              {onGoToCertificate && (
                <button
                  onClick={() => {
                    sound.playSuccessSound();
                    onGoToCertificate();
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black rounded-2xl shadow-xl border-2 border-emerald-300 text-base flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-6 h-6" />
                  <span>Lihat & Cetak Sertifikat 🏅</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
