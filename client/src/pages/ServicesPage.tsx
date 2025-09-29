import {   useOutletContext } from "react-router";
import { useCustomLocation } from "../hooks";
import {ArticleGeneratorForm, CodeExplainForm, CodeRefactorForm} from "../component/forms";

type ContextType = { activeChatId: string | null };


const ServicesPage = () => {

  const { activeChatId } = useOutletContext<ContextType>();
  const { isArticleGenerator, isCodeExplainer, isCodeReactor, isDocSummarizer, isEmailHelper, isResumeAssistant } = useCustomLocation()
  

  return (
    <>
      {activeChatId ? (
        <div>Active Chat: {activeChatId}</div>
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