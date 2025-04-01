export type TrainingType = 'pilot' | 'cabin-crew' | 'ground-staff' | 'maintenance';
export type TrainingStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
export type TrainingFormat = 'classroom' | 'simulator' | 'vr' | 'online' | 'hybrid';
export type PerformanceLevel = 'excellent' | 'good' | 'satisfactory' | 'needs-improvement' | 'unsatisfactory';

export interface TrainingProfile {
  id: string;
  userId: string;
  type: TrainingType;
  certifications: Array<{
    name: string;
    number: string;
    issuedDate: string;
    expiryDate: string;
    status: 'active' | 'expired' | 'pending';
  }>;
  qualifications: Array<{
    name: string;
    level: string;
    institution: string;
    completionDate: string;
  }>;
  experience: {
    totalHours: number;
    simulatorHours: number;
    actualFlightHours: number;
    lastTrainingDate: string;
  };
  performance: {
    overall: PerformanceLevel;
    recentScores: Array<{
      trainingId: string;
      score: number;
      date: string;
    }>;
    strengths: string[];
    areasForImprovement: string[];
  };
  preferences: {
    preferredFormat: TrainingFormat;
    preferredSchedule: string[];
    specialRequirements: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSession {
  id: string;
  profileId: string;
  type: TrainingType;
  format: TrainingFormat;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    expertise: string[];
  };
  schedule: {
    startDate: string;
    endDate: string;
    duration: number;
    frequency: string;
  };
  location: {
    type: 'physical' | 'virtual';
    address?: string;
    room?: string;
    platform?: string;
    link?: string;
  };
  materials: Array<{
    type: string;
    title: string;
    url: string;
    required: boolean;
  }>;
  objectives: string[];
  prerequisites: string[];
  status: TrainingStatus;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    status: 'registered' | 'attended' | 'absent' | 'completed';
  }>;
  assessments: Array<{
    type: string;
    title: string;
    weight: number;
    passingScore: number;
    deadline: string;
  }>;
  feedback: Array<{
    participantId: string;
    rating: number;
    comments: string;
    date: string;
  }>;
  aiAnalysis?: {
    performanceMetrics: Record<string, number>;
    recommendations: string[];
    riskAssessment: {
      level: 'low' | 'medium' | 'high';
      factors: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSearchParams {
  type?: TrainingType;
  format?: TrainingFormat;
  status?: TrainingStatus;
  instructorId?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}

export interface TrainingUpdateParams {
  status?: TrainingStatus;
  schedule?: {
    startDate?: string;
    endDate?: string;
    duration?: number;
    frequency?: string;
  };
  location?: {
    type?: 'physical' | 'virtual';
    address?: string;
    room?: string;
    platform?: string;
    link?: string;
  };
  materials?: Array<{
    type: string;
    title: string;
    url: string;
    required: boolean;
  }>;
  participants?: Array<{
    id: string;
    name: string;
    role: string;
    status: 'registered' | 'attended' | 'absent' | 'completed';
  }>;
  assessments?: Array<{
    type: string;
    title: string;
    weight: number;
    passingScore: number;
    deadline: string;
  }>;
  feedback?: Array<{
    participantId: string;
    rating: number;
    comments: string;
    date: string;
  }>;
  aiAnalysis?: {
    performanceMetrics: Record<string, number>;
    recommendations: string[];
    riskAssessment: {
      level: 'low' | 'medium' | 'high';
      factors: string[];
    };
  };
}

export interface TrainingSummary {
  totalSessions: number;
  sessionsByType: Record<TrainingType, number>;
  sessionsByFormat: Record<TrainingFormat, number>;
  sessionsByStatus: Record<TrainingStatus, number>;
  recentSessions: TrainingSession[];
  topInstructors: Array<{
    id: string;
    name: string;
    sessions: number;
    averageRating: number;
  }>;
  performance: {
    averageScore: number;
    completionRate: number;
    satisfactionRate: number;
  };
} 