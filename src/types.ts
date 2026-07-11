export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  city?: string;
  country?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  personalWebsite?: string;
  profilePhoto?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  university?: string;
  cgpa?: string;
  percentage?: string;
  grade?: string;
  startYear?: string;
  endYear?: string;
  current: boolean;
  location?: string;
  coursework?: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  githubUrl?: string; // Repository link or public project URL
  liveUrl?: string;
  technologies: string; // Comma separated or string
  description: string;
  descriptionType?: 'manual' | 'ai'; // 'manual' (Option B) vs 'ai' (Option A)
  aiGeneratedDescription?: string;
  manualDescription?: string;
  repoAnalysis?: {
    success?: boolean;
    error?: string;
    professionalDescription?: string;
    atsOptimizedDescription?: string;
    technicalHighlights?: string[];
    keyFeatures?: string[];
    summary?: {
      projectType: string;
      primaryLanguage: string;
      framework: string;
      database: string;
      complexity: string;
      atsValue: string;
    };
    score?: {
      overall: number;
      codeQuality: number;
      architecture: number;
      documentation: number;
      security: number;
      scalability: number;
      atsValue: number;
    };
    improvementSuggestions?: string[];
    resumeImpactSuggestions?: string[];
    learningRecommendations?: string[];
  };
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface LeadershipActivity {
  id: string;
  role: string;
  organization: string;
  description: string;
  title?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumeData {
  selectedGoal: string;
  customGoal?: string;
  template: string;
  personalInfo: PersonalInfo;
  jobDescription: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[]; // List of skills
  projects: Project[];
  achievements: string[];
  certifications: Certification[];
  activities: LeadershipActivity[];
  interests: string[];
}

export interface ResumeAuditResult {
  atsScore: number;
  recruiterScore: number;
  readabilityScore: number;
  keywordScore: number;
  weakBulletsCount: number;
  grammarIssuesCount: number;
  feedback: string[];
  weakBulletsFeedback: { original: string; reason: string; suggested: string }[];
  missingKeywords: string[];
  atsRisks: string[];
}

export interface SuggestionItem {
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: string;
}

export interface KeywordAnalysis {
  existingKeywords: string[];
  missingKeywords: string[];
  strongRecommendations: string[];
}

export interface AtsRiskItem {
  issue: string;
  impact: string;
  recommendation: string;
}

export interface OptimizationSummary {
  currentScore: number;
  potentialScore: number;
  improvementOpportunities: string[];
}

export interface ImprovementSimulationItem {
  id: string;
  action: string;
  atsGain: number;
}

export interface AtsScoreBreakdown {
  structure: number;       // /15
  skills: number;          // /20
  experience: number;      // /20
  keywords: number;        // /20
  summary: number;         // /5
  achievements: number;    // /10
  education: number;       // /5
  additional: number;      // /5
}

export interface ResumeAnalyzerResult {
  overallScore: number;
  scoreBreakdown?: AtsScoreBreakdown;
  scores: {
    formatting: number;
    keywords: number;
    readability: number;
    contentQuality: number;
    impact: number;
    structure: number;
    completeness?: number;
    experienceQuality?: number;
  };
  suggestions: SuggestionItem[];
  keywordAnalysis: KeywordAnalysis;
  atsRisks: AtsRiskItem[];
  optimizationSummary: OptimizationSummary;
  simulatedImprovements: ImprovementSimulationItem[];
  parsedData?: {
    personalInfo?: {
      fullName?: string;
      email?: string;
      phone?: string;
      location?: string;
    };
    summary?: string;
    skills?: string[];
    experiences?: {
      company: string;
      role: string;
      dates: string;
      description: string;
    }[];
    education?: {
      institution: string;
      degree: string;
      specialization?: string;
      startYear?: string;
      endYear?: string;
      cgpa?: string;
    }[];
    projects?: {
      name: string;
      technologies: string;
      description: string;
    }[];
    certifications?: string[];
    activities?: string[];
  };
  resumeSummary?: string;
  gapAnalysis?: {
    currentReadiness: number;
    targetReadiness: number;
    gap: number;
    explanation: string;
  };
  companyAnalysis?: {
    companyInsights: string[];
    missingSkills: string[];
    hiringExpectations: string[];
  };
}

export interface TailoringResult {
  matchScore: number;
  tailoredSummary: string;
  suggestedBulletChanges: { original: string; tailored: string; reason: string }[];
  missingSkills: string[];
  targetKeywords: string[];
}

export interface JDAnalysis {
  requiredSkills: string[];
  preferredSkills: string[];
  keywords: string[];
  responsibilities: string[];
  matchScore: number;
  missingSkills: string[];
}

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  jobLink?: string;
  salaryRange?: string;
  appliedDate: string;
  notes?: string;
  status: 'Saved' | 'Applied' | 'Screening' | 'Interview Scheduled' | 'Final Round' | 'Offer Received' | 'Rejected';
}

export interface InterviewQuestion {
  id: string;
  text: string;
  category: 'Technical' | 'HR' | 'Behavioral';
  priority?: 'high' | 'medium' | 'low';
  subcategory?: 'Technical' | 'HR' | 'Behavioral';
  hint: string;
  userAnswer?: string;
  attemptsCount?: number;
  feedback?: {
    evaluation: string;
    score: number;
    modelAnswer: string;
    strengths: string[];
    weaknesses: string[];
    suggestions?: string[];
    ratingBreakdown?: {
      technicalAccuracy: number;
      completeness: number;
      clarity: number;
      communication: number;
    };
  };
}

export interface LearningStep {
  title: string;
  steps: string[];
  certs: string[];
}

export interface CareerCopilotResult {
  skillGap: string[];
  roadmap: LearningStep[];
  certifications: string[];
  suitableRoles: string[];
  salaryEstimation: string;
  demandAnalysis: string;
}

export interface PortfolioResult {
  htmlCode: string;
  cssStyles: string;
  previewUrl?: string;
}
