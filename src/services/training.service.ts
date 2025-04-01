import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { authService } from './auth.service';

export interface TrainingSession {
  id: string;
  userId: string;
  type: 'pilot' | 'cabin_crew';
  scenario: {
    name: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    type: 'emergency' | 'normal' | 'weather' | 'technical';
    description: string;
    duration: number;
    objectives: string[];
  };
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  performance: {
    score: number;
    time: number;
    mistakes: {
      type: string;
      description: string;
      severity: 'low' | 'medium' | 'high';
    }[];
    achievements: string[];
  };
  vrData: {
    headsetId: string;
    sessionId: string;
    recordingUrl?: string;
  };
  aiFeedback: {
    overallScore: number;
    strengths: string[];
    areasForImprovement: string[];
    recommendations: string[];
    nextScenarios: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingProfile {
  id: string;
  userId: string;
  role: 'pilot' | 'cabin_crew';
  level: 'trainee' | 'junior' | 'senior' | 'instructor';
  certifications: {
    name: string;
    issuedDate: Date;
    expiryDate: Date;
    status: 'active' | 'expired' | 'pending';
  }[];
  statistics: {
    totalSessions: number;
    averageScore: number;
    completedScenarios: number;
    emergencyHandling: number;
    communication: number;
    decisionMaking: number;
  };
  learningPath: {
    currentModule: string;
    completedModules: string[];
    nextModules: string[];
    progress: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

class TrainingService {
  private static instance: TrainingService;
  private db = getFirestore();

  private constructor() {}

  public static getInstance(): TrainingService {
    if (!TrainingService.instance) {
      TrainingService.instance = new TrainingService();
    }
    return TrainingService.instance;
  }

  public async createTrainingProfile(profileData: Omit<TrainingProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<TrainingProfile> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to create training profile');
    }

    const profileRef = await addDoc(collection(this.db, 'training_profiles'), {
      ...profileData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getTrainingProfileById(profileRef.id) as Promise<TrainingProfile>;
  }

  public async getTrainingProfileById(id: string): Promise<TrainingProfile | null> {
    const profileDoc = await getDocs(doc(this.db, 'training_profiles', id));
    if (!profileDoc.exists()) return null;

    return this.transformTrainingProfileData(profileDoc);
  }

  public async getTrainingProfileByUserId(userId: string): Promise<TrainingProfile | null> {
    const profilesRef = collection(this.db, 'training_profiles');
    const q = query(profilesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;
    return this.transformTrainingProfileData(querySnapshot.docs[0]);
  }

  public async updateTrainingProfile(id: string, updates: Partial<TrainingProfile>): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to update training profile');
    }

    const profileRef = doc(this.db, 'training_profiles', id);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  public async scheduleTrainingSession(sessionData: Omit<TrainingSession, 'id' | 'createdAt' | 'updatedAt'>): Promise<TrainingSession> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to schedule training session');
    }

    // Verify user's training profile
    const profile = await this.getTrainingProfileByUserId(sessionData.userId);
    if (!profile) {
      throw new Error('Training profile not found');
    }

    // Check if user is eligible for the scenario
    if (!this.isScenarioEligible(sessionData.scenario, profile)) {
      throw new Error('User is not eligible for this scenario');
    }

    const sessionRef = await addDoc(collection(this.db, 'training_sessions'), {
      ...sessionData,
      status: 'scheduled',
      performance: {
        score: 0,
        time: 0,
        mistakes: [],
        achievements: []
      },
      aiFeedback: {
        overallScore: 0,
        strengths: [],
        areasForImprovement: [],
        recommendations: [],
        nextScenarios: []
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getTrainingSessionById(sessionRef.id) as Promise<TrainingSession>;
  }

  public async getTrainingSessionById(id: string): Promise<TrainingSession | null> {
    const sessionDoc = await getDocs(doc(this.db, 'training_sessions', id));
    if (!sessionDoc.exists()) return null;

    return this.transformTrainingSessionData(sessionDoc);
  }

  public async getTrainingSessionsByUser(userId: string): Promise<TrainingSession[]> {
    const sessionsRef = collection(this.db, 'training_sessions');
    const q = query(sessionsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc: FirebaseFirestore.QueryDocumentSnapshot) => this.transformTrainingSessionData(doc));
  }

  public async updateTrainingSessionStatus(id: string, status: TrainingSession['status']): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to update training session status');
    }

    const sessionRef = doc(this.db, 'training_sessions', id);
    await updateDoc(sessionRef, {
      status,
      updatedAt: Timestamp.now()
    });
  }

  public async submitTrainingPerformance(
    id: string,
    performance: TrainingSession['performance'],
    vrData: TrainingSession['vrData']
  ): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to submit training performance');
    }

    // Generate AI feedback based on performance
    const aiFeedback = await this.generateAIFeedback(performance);

    const sessionRef = doc(this.db, 'training_sessions', id);
    await updateDoc(sessionRef, {
      performance,
      vrData,
      aiFeedback,
      status: 'completed',
      updatedAt: Timestamp.now()
    });
  }

  private async generateAIFeedback(performance: TrainingSession['performance']): Promise<TrainingSession['aiFeedback']> {
    // This is a placeholder for AI feedback generation
    // In a real implementation, this would:
    // 1. Analyze performance metrics
    // 2. Compare with historical data
    // 3. Generate personalized feedback
    // 4. Suggest next scenarios
    return {
      overallScore: performance.score,
      strengths: ['Good communication', 'Quick decision making'],
      areasForImprovement: ['Emergency procedures', 'Weather handling'],
      recommendations: ['Practice emergency scenarios', 'Review weather protocols'],
      nextScenarios: ['Severe weather landing', 'Engine failure']
    };
  }

  private isScenarioEligible(scenario: TrainingSession['scenario'], profile: TrainingProfile): boolean {
    const difficultyLevels = {
      beginner: 0,
      intermediate: 1,
      advanced: 2
    };

    const userLevel = difficultyLevels[profile.level as keyof typeof difficultyLevels];
    const scenarioLevel = difficultyLevels[scenario.difficulty];

    return userLevel >= scenarioLevel;
  }

  private transformTrainingProfileData(doc: any): TrainingProfile {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      certifications: data.certifications.map((cert: any) => ({
        ...cert,
        issuedDate: cert.issuedDate.toDate(),
        expiryDate: cert.expiryDate.toDate()
      })),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }

  private transformTrainingSessionData(doc: any): TrainingSession {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
}

export const trainingService = TrainingService.getInstance(); 