import { useActionState } from 'react';
import { useState } from 'react';
import { writeArticle } from '../../actions';
import Error from '../Error';
import {LoadingDots, Button, CodeExplanation} from '../ui';



const ArticleGeneratorForm = () => {
  const [formState, formAction, isPending] = useActionState(writeArticle, null);
  const [topic, setTopic] = useState('');
  

  return (
    <div className='pt-20'>
      <form action={formAction} className='form-ui'>
        {/* input field */}
        <label className='block mb-2 font-semibold'>Article Topic:</label>
        <input
          name='topic'
          required
          placeholder='Enter a topic for your article...'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className='border rounded-lg p-3 w-full mb-4'
        />

        {/* submit button */}
        <Button
          label={isPending ? 'Generating...' : 'Generate Article'}
          type='primary'
          isSubmit
          isChecked
        />

        {/* results */}
        {isPending ? (
          <LoadingDots />
        ) : formState?.success ? (
          <div className='mt-6 whitespace-pre-wrap leading-relaxed'>
            <CodeExplanation explanation={formState.data.article} />
          </div>
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};

export default ArticleGeneratorForm;
