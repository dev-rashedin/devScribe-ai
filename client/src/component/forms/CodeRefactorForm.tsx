import { useActionState } from 'react';
import { useState } from 'react';
import { refactor } from '../../actions';
import Error from '../Error';
import { LoadingDots, Button, CodeExplanation, LanguageSelect } from '../ui';

const CodeRefactorForm = () => {
  const [formState, formAction, isPending] = useActionState(refactor, null);
  const [code, setCode] = useState('');

  return (
    <div className='pt-20'>
      <form action={formAction} className='form-ui '>
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

        <Button
          label={isPending ? 'Refactoring...' : 'Refactor Code'}
          type='primary'
          isSubmit
          isChecked
          className='mt-4'
        />

        {isPending ? (
          <LoadingDots />
        ) : formState?.success ? (
          <CodeExplanation explanation={formState.data.refactoredCode} />
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};

export default CodeRefactorForm;
