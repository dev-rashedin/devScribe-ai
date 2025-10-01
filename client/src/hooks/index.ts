import { useActionState, useContext, useEffect } from 'react';
import { AuthContext, ThemeContext } from '../utils';
import { useLocation } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

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

const useCustomLocation = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes('signin') ||
    location.pathname.includes('signup');
  const subScriptionPage = location.pathname.includes('subscription');
  const isArticleGenerator = location.pathname.includes('article-generator');
  const isCodeExplainer = location.pathname.includes('code-explainer');
  const isCodeReactor = location.pathname.includes('code-refactor');
  const isDocSummarizer = location.pathname.includes('doc-summarizer');
  const isEmailHelper = location.pathname.includes('email-helper');
  const isResumeAssistant = location.pathname.includes('resume-assistant');
  const isService = location.pathname.includes('service');
  const serviceName = location.pathname.split('/')[2] || 'Service';
  const isSignUp = location.pathname.includes('/signup');
  const authType = isSignUp ? 'Sign Up' : 'Sign In';
  const from = location?.state || '/';

  return {
    noHeaderFooter,
    subScriptionPage,
    isArticleGenerator,
    isCodeExplainer,
    isCodeReactor,
    isDocSummarizer,
    isEmailHelper,
    isResumeAssistant,
    isService,
    serviceName,
    isSignUp,
    authType,
    from,
  };
};

const useCustomForm = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionFn: (prev: unknown, formData: FormData, uid: string) => Promise<any>,
  service: string
) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

   const [formState, formAction, isPending] = useActionState(
     (prev: unknown, formData: FormData) => actionFn(prev, formData, user.uid),
     null
   );

  useEffect(() => {
    if (formState?.success) {
      queryClient.invalidateQueries({
        queryKey: ['history', user.uid, service],
      });
    }
  }, [formState?.success, queryClient, user.uid, service]);

  return { formState, formAction, isPending };
}

export { useTheme, useAuth, useCustomLocation, useCustomForm };
