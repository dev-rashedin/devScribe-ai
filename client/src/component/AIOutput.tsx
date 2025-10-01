import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/obsidian.css';
import { CopyButton } from './ui';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from '../data/icons';

const AIOutput = ({ activeChatId, title, explanation }: TExplanation) => {
  const [showPrompt, setShowPrompt] = useState(true);
  return (
    <main>
      {activeChatId && (
        <div className=' mb-6'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Prompt: </h3>
            <button
              onClick={() => setShowPrompt((prev) => !prev)}
              className='hover:underline'
            >
              {showPrompt ? (
                <span className='flex-center gap-2'>
                  Hide <FaEyeSlash />
                </span>
              ) : (
                <span className='flex-center gap-2'>
                  Show <FaEye />
                </span>
              )}
            </button>
          </div>

          {showPrompt && (
            <div className='mt-2 p-4 rounded-lg bg-navbar border prose prose-sm prose-invert'>
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {title}
              </Markdown>
            </div>
          )}
        </div>
      )}
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
