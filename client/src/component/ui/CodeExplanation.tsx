import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIOutput = ({ explanation }: { explanation: string }) => {
  return (
    <div className='w-full max-w-4xl mt-6 bg-gray-50  p-6 rounded-2xl shadow-lg'>
      <h2 className='text-xl font-semibold mb-2'>Explanation:</h2>
      <Markdown remarkPlugins={[remarkGfm]}>{explanation}</Markdown>
    </div>
  );
};

export default AIOutput;
