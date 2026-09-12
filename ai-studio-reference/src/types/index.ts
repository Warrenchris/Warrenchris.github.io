export type ProjectCategory = 'all' | 'fullstack' | 'backend' | 'infrastructure' | 'business' | 'security';

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  status?: 'active' | 'queued' | 'synced';
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory[];
  isFlagship: boolean;
  featuredOrder: number;
  period: string;
  role: string;
  brief: string;
  
  // Case Study Sections
  problem: {
    overview: string;
    keyChallenges: string[];
  };
  solution: {
    overview: string;
    coreCapabilities: string[];
  };
  architecture: {
    description: string;
    flowSteps: { step: number; title: string; description: string; tech: string }[];
    diagramType?: 'isp-flow' | 'procurement-matrix' | 'pos-ledger' | 'hrm-rbac' | 'network-ids';
  };
  engineeringDecisions: {
    decision: string;
    rationale: string;
    impact: string;
  }[];
  securityAndReliability: string[];
  outcomes: string[];
  
  // Tech stack
  tags: string[];
  coreTech: {
    frontend?: string[];
    backend?: string[];
    data?: string[];
    infra?: string[];
    protocols?: string[];
  };
  
  // Links
  githubUrl?: string;
  liveUrl?: string;
  hasInteractiveDemo?: boolean;
  snippets?: CodeSnippet[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Proficient' | 'Advanced' | 'Core Competency';
    context: string;
    highlight?: boolean;
  }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  badgeCode: string;
  skillsCovered: string[];
  description: string;
  verificationLink?: string;
  iconName: string;
}

export interface EngineeringPrinciple {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  implementation: string;
  iconName: string;
}
