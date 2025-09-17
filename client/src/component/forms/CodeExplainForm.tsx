import { useActionState } from 'react';
import { useState } from 'react';
import { explain } from '../../actions';
import Error from '../Error';
import CodeExplanation from '../CodeExplanation';
import LoadingDots from '../ui/LoadingDots';
import LanguageSelect from '../ui/LanguageSelect';
import Button from '../ui/button';

const CodeExplainForm = () => {
  const [formState, formAction, isPending] = useActionState(explain, null);
  const [code, setCode] = useState('');

  return (
    <div className='pt-20'>
      <form action={formAction} className='form-ui '>
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

        <Button
          label={isPending ? 'Explaining...' : 'Explain Code'}
          type='primary'
          isSubmit
          className='mt-4'
        />

        {isPending ? (
          <LoadingDots />
        ) : formState?.success ? (
          <CodeExplanation explanation={formState.data.explanation} />
        ) : (
          formState?.success === false && <Error error={formState.error} />
        )}
      </form>
    </div>
  );
};
export default CodeExplainForm;
