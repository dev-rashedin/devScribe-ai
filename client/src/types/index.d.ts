// context types

declare interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

declare interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  createUser: (email: string, password: string) => Promise<unknown>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  logInUser: (email: string, password: string) => Promise<unknown>;
  logOutUser: () => Promise<void>;
  googleLogin: () => Promise<unknown>;
  githubLogin: () => Promise<unknown>;
  updateUserPass: (user: User, currentPassword: string) => Promise<void>;
  resetUserPass: (email: string) => Promise<void>;
}

declare interface ExplanationData {
  explanation: string;
  language: string;
}

declare interface ExplainResult {
  success: boolean;
  data?: unknown;
  error?: string;
}

declare type TExplanation = { explanation: string };

declare interface ButtonProps {
  label: string;
  type: string;
  href?: string;
  loading?: boolean;
  isChecked?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
  className?: string;
}

declare interface SponsorLogo {
  id: number;
  name: string;
  href: string;
}

declare type FAQItem = {
  question: string;
  answer: string;
};


declare interface LogoProps { size?: 'sm' | 'md' | 'lg', isService?: boolean }


declare interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

declare interface AuthButtonProps {
  type: string;
  provider: string;
}

declare interface UserInfo {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

declare interface Message  {
  role: 'user' | 'assistant';
  content: string;
  _id: string;
  createdAt: string;
};

declare interface HistoryItem  {
  title: string;
  messages: Message[];
};

declare interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
 history: HistoryItem[];
  onNewChat: () => void;
}








