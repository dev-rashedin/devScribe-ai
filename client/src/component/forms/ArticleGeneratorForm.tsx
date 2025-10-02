import { useState } from 'react';
import { writeArticle } from '../../actions';
import { AIOutput } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';
import { submitFormOnEnter } from '../../utils';

const ArticleGeneratorForm = () => {
  const [topic, setTopic] = useState('');
  const { formState, formAction, isPending } = useCustomForm(
    writeArticle,
    'article-generator'
  );

  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Generate Article'
      renderInputs={
        <>
          <label className='block mb-2 font-semibold'>Article Topic:</label>
          <input
            name='topic'
            required
            placeholder='Enter a topic for your article...'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className='border rounded-lg p-3 w-full mb-6'
            onKeyDown={(e) => submitFormOnEnter(e)}
            disabled={isPending}
          />
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.article} />}
    />
  );
};

export default ArticleGeneratorForm;
