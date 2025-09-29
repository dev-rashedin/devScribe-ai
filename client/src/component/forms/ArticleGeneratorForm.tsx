import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import { writeArticle } from '../../actions';
import Error from '../Error';
import { Button, CodeExplanation, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';

const ArticleGeneratorForm = () => {
  const { user } = useAuth();

  const [formState, formAction, isPending] = useActionState(
    (prev: unknown, formData: FormData) =>
      writeArticle(prev, formData, user.uid),
    null
  );
  const [topic, setTopic] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState?.success) {
      queryClient.invalidateQueries({
        queryKey: ['history', user.uid, 'article-generator'],
      });
    }
  }, [formState?.success, queryClient, user.uid]);

  return (
    <div>
      <form action={formAction}>
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
          <PulseGrid />
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
