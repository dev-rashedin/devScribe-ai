import { useContext } from 'react';
import { AuthContext, ThemeContext } from '../utils';
import { useLocation } from 'react-router';

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};

const useCustomLocation = ()  => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes('signin') ||
    location.pathname.includes('signup');
  const subScriptionPage = location.pathname.includes('subscription');
  const articleGenarator = location.pathname.includes('article-generator');
  const codeExplainer = location.pathname.includes('code-explainer');
  const codeReactor = location.pathname.includes('code-refactor');
  const docSumarizer = location.pathname.includes('doc-summarizer');
  const emailHelper = location.pathname.includes('email-helper');
  const resumeAssistant = location.pathname.includes('resume-assistant');
  const isService = location.pathname.includes('service');
  const serviceName = location.pathname.split('/')[2] || 'Service';
  const isSignUp = location.pathname.includes('/signup');
  const authType = isSignUp ? 'Sign Up' : 'Sign In';
  const from = location?.state || '/';


  return { noHeaderFooter, subScriptionPage, articleGenarator, codeExplainer, codeReactor, docSumarizer, emailHelper, resumeAssistant, isService, serviceName, isSignUp, authType, from };
};

export { useTheme, useAuth, useCustomLocation };
