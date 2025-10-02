import { useState } from 'react';
import { refactor } from '../../actions';
import { AIOutput, LanguageSelect } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';
import { submitFormOnEnter } from '../../utils';

const CodeRefactorForm = () => {
  const [code, setCode] = useState('');
  const { formState, formAction, isPending } = useCustomForm(
    refactor,
    'code-refactor'
  );

  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Refactor Code'
      renderInputs={
        <>
          <LanguageSelect />
          <label className='block mb-2 font-semibold'>Your Code:</label>
          <textarea
            name='code'
            required
            placeholder='Paste your code here...'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='text-area'
            onKeyDown={(e) => submitFormOnEnter(e)}
          />
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.refactoredCode} />}
    />
  );
};

export default CodeRefactorForm;
