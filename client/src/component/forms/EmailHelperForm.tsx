import { useActionState, useEffect, useState } from 'react';
import { emailHelper } from '../../actions'; // update to match your actions
import Error from '../Error';
import { Button, AIOutput, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';
import { useQueryClient } from '@tanstack/react-query';

const EmailHelperForm = () => {
  const { user } = useAuth();

  const [formState, formAction, isPending] = useActionState(
    (prev: unknown, formData: FormData) =>
      emailHelper(prev, formData, user.uid),
    null
  );
  const [prompt, setPrompt] = useState('');

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
        <label className='block mb-2 font-semibold'>Tone:</label>
        <select
          name='tone'
          className='border rounded-lg p-2 w-full mb-4'
          defaultValue='professional'
        >
          <option value='professional'>Professional</option>
          <option value='friendly'>Friendly</option>
          <option value='informal'>Informal</option>
          <option value='persuasive'>Persuasive</option>
          <option value='apologetic'>Apologetic</option>
        </select>

        <label className='block mb-2 font-semibold'>
          What should the email say?
        </label>
        <textarea
          name='prompt'
          required
          placeholder='e.g., Decline a dinner invitation politely'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
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
          <AIOutput explanation={formState.data.email} />
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};

export default EmailHelperForm;
