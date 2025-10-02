import { useOutletContext } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useCustomLocation } from '../hooks';
import {
  ArticleGeneratorForm,
  CodeExplainForm,
  CodeRefactorForm,
  DocSummarizerForm,
  EmailHelperForm,
  ResumeAssistantForm,
} from '../component/forms';
import { fetchHistoryById } from '../api';
import { AIOutput, Error } from '../component';
import { LoadingDots } from '../component/ui';

type ContextType = { activeChatId: string | null; formKey: number };

const ServicesPage = () => {
  const { activeChatId, formKey } = useOutletContext<ContextType>();
  const {
    isArticleGenerator,
    isCodeExplainer,
    isCodeReactor,
    isDocSummarizer,
    isEmailHelper,
    isResumeAssistant,
  } = useCustomLocation();

  const {
    data: history = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['history', activeChatId],
    queryFn: () => fetchHistoryById(activeChatId),
    enabled: !!activeChatId,
  });

  return (
    <>
      {activeChatId ? (
        <div>
          {isLoading && <LoadingDots />}
          {isError && <Error error='Failed to fetch history' />}

          <AIOutput
            key={history?.messages?.[1]?.content}
            title={history.title}
            activeChatId={activeChatId}
            explanation={history?.messages?.[1]?.content ?? 'no message yet'}
          />
        </div>
      ) : (
        <>
          {isArticleGenerator && <ArticleGeneratorForm key={formKey} />}
          {isCodeExplainer && <CodeExplainForm key={formKey} />}
          {isCodeReactor && <CodeRefactorForm key={formKey} />}
          {isDocSummarizer && <DocSummarizerForm key={formKey} />}
          {isEmailHelper && <EmailHelperForm key={formKey} />}
          {isResumeAssistant && <ResumeAssistantForm key={formKey} />}
        </>
      )}
    </>
  );
};
export default ServicesPage;
