import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useCustomLocation } from "../hooks";
import {ArticleGeneratorForm, CodeExplainForm, CodeRefactorForm} from "../component/forms";
import { fetchHistoryById } from "../api";
import { AIOutput, Error } from "../component";
import { LoadingDots } from "../component/ui";

type ContextType = { activeChatId: string | null };


const ServicesPage = () => {

  const { activeChatId } = useOutletContext<ContextType>();
  const { isArticleGenerator, isCodeExplainer, isCodeReactor, isDocSummarizer, isEmailHelper, isResumeAssistant } = useCustomLocation()
  
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
            explanation={history?.messages?.[1]?.content ?? 'no message yet'}
          />
        </div>
      ) : (
        <>
          {isArticleGenerator && <ArticleGeneratorForm />}
          {isCodeExplainer && <CodeExplainForm />}
          {isCodeReactor && <CodeRefactorForm />}
          {isDocSummarizer && <div>Doc Sumarizer</div>}
          {isEmailHelper && <div>Email Helper</div>}
          {isResumeAssistant && <div>Resume Assistant</div>}
        </>
      )}
    </>
  );
}
export default ServicesPage