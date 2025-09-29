import { useState, useActionState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { writeArticle } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';

type ContextType = { activeChatId: string | null };

const ArticleGeneratorForm = () => {
  const { user } = useAuth();
  const { activeChatId } = useOutletContext<ContextType>();

  console.log('activeChatId', activeChatId);

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
        <div className='flex justify-end'>
          <Button
            label={isPending ? 'Generating...' : 'Generate Article'}
            type='primary'
            isSubmit
            isChecked
          />
        </div>

        {/* results */}

        {/* {activeChatId ? (
          ''
        ) : isPending ? (
          <PulseGrid />
        ) : formState?.success ? (
          <div className='mt-6 whitespace-pre-wrap leading-relaxed'>
            <AIOutput explanation={formState.data.article} />
          </div>
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )} */}

        {isPending ? (
          <PulseGrid />
        ) : formState?.success ? (
          <div className='mt-6 whitespace-pre-wrap leading-relaxed'>
            <AIOutput explanation={formState.data.article} />
          </div>
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};

export default ArticleGeneratorForm;
