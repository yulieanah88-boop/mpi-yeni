export type AppScreen =
  | 'landing'
  | 'login'
  | 'home'
  | 'belajar'
  | 'bermain'
  | 'berlatih'
  | 'refleksi'
  | 'sumber'
  | 'pengembang'
  | 'sertifikat';

export interface UserProfile {
  name: string;
  className: string;
  avatar: string; // 'boy' | 'girl' | 'kiki'
  isLoggedIn: boolean;
}

export interface ProgressState {
  learnedTopics: string[];
  simulationDone: boolean;
  gamesCompleted: string[];
  assessmentScore: number;
  assessmentAnswers: Record<number, number>;
  starsEarned: number;
  reflectionMood: 'senang' | 'sedih' | 'bingung' | null;
  reflectionKnowsHygiene: boolean | null;
  completionDate: string;
}
