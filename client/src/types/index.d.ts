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

declare type FAQItem = {
  question: string;
  answer: string;
};


declare interface HomeSectionHeadingProps {title: string, subtitle?: string, ref: React.RefObject<HTMLDivElement | null>}



