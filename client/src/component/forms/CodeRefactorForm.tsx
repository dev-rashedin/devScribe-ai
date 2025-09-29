import { useActionState } from 'react';
import { useState } from 'react';
import { refactor } from '../../actions';
import Error from '../Error';
import { Button, AIOutput, LanguageSelect, PulseGrid } from '../ui';

const CodeRefactorForm = () => {
  const [formState, formAction, isPending] = useActionState(refactor, null);
  const [code, setCode] = useState('');

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
