import { IconType } from 'react-icons';
declare interface ThemeContextType {
  dark: boolean;
  toggleDark: () => void;
}

declare interface ThemeProviderProps {
  children: ReactNode;
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
  isSubmit?: boolean;
  onClick?: () => void;
  className?: string;
}

declare interface SponsorLogo {
  id: number;
  name: string;
  href: string;
}

declare interface ServiceContent {
  title: string;
  desc: string;
  icon: IconType;
  path: string;
  cta: string;
  content?: React.ReactNode;
}
