import React, { useState, useEffect } from 'react';
import { AppScreen, UserProfile, ProgressState } from './types';
import { HeaderNav } from './components/HeaderNav';
import { LandingScreen } from './components/LandingScreen';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { BelajarScreen } from './components/BelajarScreen';
import { BermainScreen } from './components/BermainScreen';
import { BerlatihScreen } from './components/BerlatihScreen';
import { RefleksiScreen } from './components/RefleksiScreen';
import { SumberBelajarScreen } from './components/SumberBelajarScreen';
import { PengembangScreen } from './components/PengembangScreen';
import { SertifikatScreen } from './components/SertifikatScreen';
import { sound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>(['landing']);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bgmPlaying, setBgmPlaying] = useState(false);

  // User student profile
  const [user, setUser] = useState<UserProfile>({
    name: '',
    className: '1A',
    avatar: 'boy',
    isLoggedIn: false,
  });

  // Learning progress
  const [progress, setProgress] = useState<ProgressState>({
    learnedTopics: [],
    simulationDone: false,
    gamesCompleted: [],
    assessmentScore: 100,
    assessmentAnswers: {},
    starsEarned: 5,
    reflectionMood: null,
    reflectionKnowsHygiene: null,
    completionDate: new Date().toLocaleDateString('id-ID'),
  });

  // Navigation handlers
  const handleNavigate = (screen: AppScreen) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen || 'home');
    } else {
      setCurrentScreen('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSubmit = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    handleNavigate('home');
  };

  const handleLogout = () => {
    sound.speak('Sampai jumpa! Siapa nama teman yang mau belajar sekarang?');
    setUser({
      name: '',
      className: user.className || '1A',
      avatar: 'boy',
      isLoggedIn: false,
    });
    setProgress({
      learnedTopics: [],
      simulationDone: false,
      gamesCompleted: [],
      assessmentScore: 100,
      assessmentAnswers: {},
      starsEarned: 5,
      reflectionMood: null,
      reflectionKnowsHygiene: null,
      completionDate: new Date().toLocaleDateString('id-ID'),
    });
    setScreenHistory(['landing', 'login']);
    setCurrentScreen('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.setSoundEnabled(nextState);
  };

  const handleToggleBgm = () => {
    const isPlaying = sound.toggleBgm();
    setBgmPlaying(isPlaying);
  };

  const handleEarnStar = (amount = 1) => {
    setProgress((prev) => ({
      ...prev,
      starsEarned: prev.starsEarned + amount,
    }));
  };

  const handleAssessmentCompleted = (score: number, stars: number) => {
    setProgress((prev) => ({
      ...prev,
      assessmentScore: score,
      starsEarned: prev.starsEarned + stars,
    }));
  };

  const handleSaveReflection = (
    mood: 'senang' | 'sedih' | 'bingung',
    knowsHygiene: boolean
  ) => {
    setProgress((prev) => ({
      ...prev,
      reflectionMood: mood,
      reflectionKnowsHygiene: knowsHygiene,
      starsEarned: prev.starsEarned + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-amber-50/30 flex flex-col font-sans text-slate-800">
      {/* Global Header Navigation (Active from Home onwards) */}
      <HeaderNav
        currentScreen={currentScreen}
        user={user}
        progress={progress}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onLogout={handleLogout}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        bgmPlaying={bgmPlaying}
        onToggleBgm={handleToggleBgm}
      />

      <main className="flex-1 w-full">
        {/* 1. Halaman Awal (Menu Utama) */}
        {currentScreen === 'landing' && (
          <LandingScreen
            onStart={() => {
              if (user.isLoggedIn) {
                handleNavigate('home');
              } else {
                handleNavigate('login');
              }
            }}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            bgmPlaying={bgmPlaying}
            onToggleBgm={handleToggleBgm}
          />
        )}

        {/* 2. Halaman Login (Masukan Nama dan Kelas) */}
        {currentScreen === 'login' && (
          <LoginScreen
            initialUser={user}
            onLogin={handleLoginSubmit}
            onBack={() => handleNavigate('landing')}
          />
        )}

        {/* 3. Halaman Beranda (Menu Pilihan - 6 Hati) */}
        {currentScreen === 'home' && (
          <HomeScreen
            user={user}
            progress={progress}
            onSelectScreen={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {/* 4. Menu Belajar */}
        {currentScreen === 'belajar' && (
          <BelajarScreen
            onModuleCompleted={(mod) => {
              if (!progress.learnedTopics.includes(mod)) {
                setProgress((prev) => ({
                  ...prev,
                  learnedTopics: [...prev.learnedTopics, mod],
                  starsEarned: prev.starsEarned + 1,
                }));
              }
            }}
          />
        )}

        {/* 5. Menu Bermain */}
        {currentScreen === 'bermain' && (
          <BermainScreen onEarnStar={handleEarnStar} />
        )}

        {/* 6. Menu Berlatih */}
        {currentScreen === 'berlatih' && (
          <BerlatihScreen
            onAssessmentCompleted={handleAssessmentCompleted}
            onGoToCertificate={() => handleNavigate('sertifikat')}
          />
        )}

        {/* 7. Menu Refleksi */}
        {currentScreen === 'refleksi' && (
          <RefleksiScreen onSaveReflection={handleSaveReflection} />
        )}

        {/* 8. Menu Sumber Belajar */}
        {currentScreen === 'sumber' && <SumberBelajarScreen />}

        {/* 9. Menu Profil Pengembang */}
        {currentScreen === 'pengembang' && <PengembangScreen />}

        {/* 10. Menu Sertifikat Hasil Belajar */}
        {currentScreen === 'sertifikat' && (
          <SertifikatScreen user={user} progress={progress} />
        )}
      </main>
    </div>
  );
}
