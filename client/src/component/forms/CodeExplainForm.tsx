import { useState, useActionState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { explain } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, LanguageSelect, PulseGrid } from '../ui';
import { useAuth } from '../../hooks';

const CodeExplainForm = () => {
   const { user } = useAuth();
  const [formState, formAction, isPending] = useActionState(
    (prev: unknown, formData: FormData) => explain(prev, formData, user.uid),
    null
  );
  const [code, setCode] = useState('');

   const queryClient = useQueryClient();

   useEffect(() => {
     if (formState?.success) {
       queryClient.invalidateQueries({
         queryKey: ['history', user.uid, 'code-explainer'],
       });
     }
   }, [formState?.success, queryClient, user.uid]);

  return (
    <form action={formAction}>
      {/* select box */}
      <LanguageSelect />

      {/* text area */}
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
          label={isPending ? 'Explaining...' : 'Explain Code'}
          type='primary'
          isSubmit
          isChecked
          className='mt-4'
        />
      </div>
      {isPending ? (
        <PulseGrid />
      ) : formState?.success ? (
        <AIOutput explanation={formState.data.explanation} />
      ) : (
        formState?.success === false && <Error error={formState.error} />
      )}
    </form>
  );
};
export default CodeExplainForm;
