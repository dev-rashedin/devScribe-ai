import { useState } from 'react';
import { explain } from '../../actions';
import { AIOutput, LanguageSelect } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';

const CodeExplainForm = () => {
  const [code, setCode] = useState('');
  const { formState, formAction, isPending } = useCustomForm(
    explain,
    'code-explainer'
  );

  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Explain Code'
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
          />
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.explanation} />}
    />
  );
};

export default CodeExplainForm;
