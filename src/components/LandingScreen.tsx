import React, { useEffect, useState } from 'react';
import { Play, Sparkles, Volume2, VolumeX, Music } from 'lucide-react';
import { APP_IMAGES } from '../assets/images';
import { sound } from '../utils/audio';

interface LandingScreenProps {
  onStart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStart,
  soundEnabled,
  onToggleSound,
  bgmPlaying,
  onToggleBgm,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const welcomeVoiceText =
    "Halo teman-teman! Yuk, kita mulai berpetualang menjaga kebersihan diri! Klik 'Mulai Belajar' ya!";

  useEffect(() => {
    // Play voiceover when user is on landing page
    if (soundEnabled) {
      const timer = setTimeout(() => {
        setIsPlayingAudio(true);
        sound.speak(welcomeVoiceText, () => setIsPlayingAudio(false));
      }, 500);
      return () => {
        clearTimeout(timer);
        sound.stopSpeaking();
      };
    }
  }, [soundEnabled]);

  const handleStartClick = () => {
    sound.playSuccessSound();
    sound.stopSpeaking();
    onStart();
  };

  const handleReplayVoice = () => {
    if (isPlayingAudio) {
      sound.stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      sound.speak(welcomeVoiceText, () => setIsPlayingAudio(false));
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* Background Hero Image with gentle overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={APP_IMAGES.heroCleaning}
          alt="Petualangan Kebersihan Diri"
          className="w-full h-full object-cover object-center filter brightness-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Soft pastel gradient scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/40 via-sky-900/25 to-sky-950/70" />
      </div>

      {/* Top Floating Controls */}
      <div className="relative z-10 p-4 sm:p-6 flex justify-between items-center max-w-6xl w-full mx-auto">
        <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-amber-300 flex items-center gap-2">
          <span className="text-xl">🏫</span>
          <span className="text-xs sm:text-sm font-extrabold text-amber-900">
            MEDIA PEMBELAJARAN INTERAKTIF • KELAS 1 SDN
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Replay Welcome Speech */}
          <button
            onClick={handleReplayVoice}
            title="Dengarkan Suara Kiki"
            className={`p-3 rounded-2xl border-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-400 text-amber-950 border-amber-500 animate-pulse'
                : 'bg-white/90 text-slate-700 border-white hover:bg-white'
            }`}
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5 text-rose-600" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Suara' : 'Hidupkan Suara'}
            className="p-3 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border-2 border-white shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* BGM Toggle */}
          <button
            onClick={onToggleBgm}
            title={bgmPlaying ? 'Matikan Musik' : 'Nyalakan Musik'}
            className={`p-3 rounded-2xl border-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
              bgmPlaying
                ? 'bg-emerald-400 text-emerald-950 border-emerald-500 animate-pulse'
                : 'bg-white/90 hover:bg-white text-slate-700 border-white'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Zone: Bouncing Title, Subtitle, and Mascot Callout */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center my-4">
        {/* Animated Bouncing Main Title with colorful 3D children text effect */}
        <div className="animate-gentle-bounce mb-3">
          <div className="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border-3 border-yellow-300 shadow-md mb-2">
            <span className="text-sm sm:text-base font-extrabold text-blue-700 tracking-wide uppercase">
              ✨ Bahasa Indonesia • Menyimak & Membaca ✨
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wide leading-tight drop-shadow-lg text-white font-heading">
            <span className="text-yellow-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">PETUALANGAN </span>
            <span className="text-emerald-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">KEBERSIHAN </span>
            <span className="text-rose-300 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">DIRI</span>
          </h1>
        </div>

        {/* Sub-Title */}
        <div className="bg-sky-950/80 backdrop-blur-md px-6 py-3 rounded-3xl border-2 border-sky-300/80 shadow-2xl max-w-2xl mx-auto mb-6">
          <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
            Belajar Menyimak dan Suku Kata{' '}
            <span className="text-yellow-300 font-extrabold underline decoration-wavy decoration-yellow-400">
              'K'
            </span>{' '}
            Bersama <span className="text-rose-300 font-extrabold">Kiki si Kelinci</span> 🐰
          </p>
        </div>

        {/* Mascot Talking Bubble */}
        <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border-3 border-amber-400 rounded-3xl p-3.5 sm:p-4 shadow-xl max-w-xl mx-auto mb-8 animate-float">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-amber-100 shadow-sm">
            <img
              src={APP_IMAGES.mascotKiki}
              alt="Kiki si Kelinci"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="text-left flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase">Kiki Berkata:</span>
              {isPlayingAudio && (
                <span className="text-xs text-rose-600 font-bold animate-pulse">🔊 Bersuara...</span>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800">
              "{welcomeVoiceText}"
            </p>
          </div>
        </div>

        {/* Pulsing Big Red Main Button: "MULAI BELAJAR" */}
        <button
          onClick={handleStartClick}
          className="group relative inline-flex items-center justify-center px-10 py-5 sm:px-14 sm:py-6 text-2xl sm:text-3xl font-black text-white bg-gradient-to-r from-red-500 via-rose-600 to-red-600 rounded-full border-4 border-white shadow-2xl animate-pulse-glow hover:scale-105 active:scale-95 transition-all cursor-pointer font-heading tracking-wider"
        >
          <span className="absolute -top-3 -right-3 bg-yellow-400 text-amber-950 p-2 rounded-full shadow-lg border-2 border-white animate-spin">
            <Sparkles className="w-6 h-6 fill-amber-900" />
          </span>
          <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white mr-3 transition-transform group-hover:scale-110" />
          <span>MULAI BELAJAR</span>
        </button>
      </div>

      {/* Bottom Quiet Info */}
      <div className="relative z-10 p-4 text-center">
        <p className="text-xs sm:text-sm font-semibold text-white/90 drop-shadow">
          SDN Kurikulum Merdeka • Dirancang Khusus untuk Siswa Kelas 1
        </p>
      </div>
    </div>
  );
};
