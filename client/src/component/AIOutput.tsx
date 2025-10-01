import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/obsidian.css';
import { CopyButton } from './ui';

const AIOutput = ({ title, explanation }: TExplanation) => {
  return (
    <main>
      <div className=''>
        <h3 className='text-lg font-semibold'>Prompt</h3>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {title}
        </Markdown>
      </div>
      <div className='w-full max-w-4xl mt-6  p-6 rounded-2xl  prose prose-lg dark:prose-invert leading-loose tracking-wide relative'>
        <CopyButton explanation={explanation} />
        <h2 className='text-xl font-semibold mb-6'>AI Output:</h2>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {explanation}
        </Markdown>
      </div>
    </main>
  );
};

export default AIOutput;
