import { useActionState } from 'react';
import { useState } from 'react';
import { explain } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, LanguageSelect, PulseGrid } from '../ui';

const CodeExplainForm = () => {
  const [formState, formAction, isPending] = useActionState(explain, null);
  const [code, setCode] = useState('');

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
