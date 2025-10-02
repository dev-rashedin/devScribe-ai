import { useState } from 'react';
import { emailHelper } from '../../actions';
import { AIOutput } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';


const EmailHelperForm = () => {
  const [prompt, setPrompt] = useState('');
  const { formState, formAction, isPending } = useCustomForm(
    emailHelper,
    'email-helper'
  );

  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Generate Email'
      renderInputs={
        <>
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
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.email} />}
    />
  );
};

export default EmailHelperForm;
