import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';
import { APP_IMAGES } from '../assets/images';

interface MascotSpeechProps {
  speechText: string;
  autoSpeak?: boolean;
  character?: 'kiki' | 'guru';
}

export const MascotSpeech: React.FC<MascotSpeechProps> = ({
  speechText,
  autoSpeak = true,
  character = 'kiki',
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (autoSpeak && sound.isSoundEnabled) {
      const timer = setTimeout(() => {
        setIsSpeaking(true);
        sound.speak(speechText, () => setIsSpeaking(false));
      }, 350);
      return () => {
        clearTimeout(timer);
        sound.stopSpeaking();
      };
    }
  }, [speechText, autoSpeak]);

  const handleSpeakClick = () => {
    if (isSpeaking) {
      sound.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      sound.speak(speechText, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="flex items-center gap-3 bg-amber-50/95 border-3 border-amber-300 rounded-3xl p-3.5 sm:p-4 shadow-lg mb-6 max-w-4xl mx-auto transition-transform hover:scale-[1.01]">
      {/* Mascot Avatar */}
      <div className="relative shrink-0">
        {character === 'kiki' ? (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-amber-400 shadow-md bg-yellow-100 flex items-center justify-center">
            <img
              src={APP_IMAGES.mascotKiki}
              alt="Kiki si Kelinci"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 border-emerald-400 shadow-md bg-emerald-100 flex items-center justify-center text-3xl">
            👩‍🏫
          </div>
        )}
        {/* Animated speaking badge */}
        {isSpeaking && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500"></span>
          </span>
        )}
      </div>

      {/* Speech text bubble */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-extrabold uppercase tracking-wide text-amber-800 bg-amber-200/90 px-2 py-0.5 rounded-full">
            {character === 'kiki' ? '🐰 Kiki si Kelinci' : '👩‍🏫 Ibu Guru'}
          </span>
          <span className="text-xs text-slate-500 font-medium">Petunjuk Suara</span>
        </div>
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
          "{speechText}"
        </p>
      </div>

      {/* Replay Sound Button */}
      <button
        onClick={handleSpeakClick}
        title={isSpeaking ? 'Hentikan Suara' : 'Dengarkan Suara Petunjuk'}
        className={`shrink-0 p-3 rounded-2xl border-2 shadow-md transition-all active:scale-95 cursor-pointer ${
          isSpeaking
            ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
            : 'bg-amber-400 hover:bg-amber-500 text-amber-950 border-amber-500'
        }`}
      >
        {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
    </div>
  );
};
