import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import { refactor } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, LanguageSelect, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';

const CodeRefactorForm = () => {

  const { user } = useAuth();

  const [formState, formAction, isPending] = useActionState(
    (prev: unknown, formData: FormData) => refactor(prev, formData, user.uid),
    null
  );
  const [code, setCode] = useState('');

    const queryClient = useQueryClient();

    useEffect(() => {
      if (formState?.success) {
        queryClient.invalidateQueries({
          queryKey: ['history', user.uid, 'code-refactor'],
        });
      }
    }, [formState?.success, queryClient, user.uid]);

  return (
    <div >
      <form action={formAction}>
        <LanguageSelect />

        <label className='block mb-2 font-semibold'>Your Code:</label>
        <textarea
          name='code'
          required
          placeholder='Paste your code here...'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className='text-area'
        />

        <div className='flex justify-end'>
          <Button
            label={isPending ? 'Refactoring...' : 'Refactor Code'}
            type='primary'
            isSubmit
            isChecked
            className='mt-4'
          />
        </div>

        {isPending ? (
          <PulseGrid />
        ) : formState?.success ? (
          <AIOutput explanation={formState.data.refactoredCode} />
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};

export default CodeRefactorForm;
