import { useActionState, useEffect } from 'react';
import { useState } from 'react';
import { refactor } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';

const EmailHelperForm = () => {
  const { user } = useAuth();

  const [formState, formAction, isPending] = useActionState(
    (prev: unknown, formData: FormData) => refactor(prev, formData, user.uid),
    null
  );
  const [email, setEmail] = useState('');

  const queryClient = useQueryClient();

  useEffect(() => {
    if (formState?.success) {
      queryClient.invalidateQueries({
        queryKey: ['history', user.uid, 'email-helper'],
      });
    }
  }, [formState?.success, queryClient, user.uid]);

  return (
    <div>
      <form action={formAction}>
        <>
          <label className='block mb-2 font-semibold'>Tone:</label>
          <select
            name='tone'
            className='border rounded-lg p-2 w-full mb-4 '
          >
            <option value='professional'>Professional</option>
            <option value='friendly'>Friendly</option>
            <option value='informal'>Informal</option>
          </select>
        </>

        <label className='block mb-2 font-semibold'>Your Code:</label>
        <textarea
          name='code'
          required
          placeholder='Paste your email idea here...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='text-area'
        />

        <div className='flex justify-end'>
          <Button
            label={isPending ? 'Generating...' : 'Generate Email'}
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

export default EmailHelperForm;
