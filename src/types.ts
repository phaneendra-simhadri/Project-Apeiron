export interface Topic {
  id: string;
  title: string;
  shortDescription: string;
  iconName: string; // We'll map string names to Lucide icons
  difficulty: 'High' | 'Very High' | 'Infinite';
}

export interface CodeSnippet {
  language: string;
  code: string;
  explanation: string;
}

export interface TopicDetail {
  title: string;
  description: string;
  whyItIsABlackHole: string;
  keyConcepts: Array<{
    name: string;
    description: string;
  }>;
  learningRoadmap: string[];
  philosophicalImplications: string;
  codeSnippet?: CodeSnippet;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum AppState {
  HOME = 'HOME',
  DETAIL = 'DETAIL',
  LOADING_DETAIL = 'LOADING_DETAIL',
}