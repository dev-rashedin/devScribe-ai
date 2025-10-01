import { useState } from 'react';
import { emailHelper } from '../../actions';
import { AIOutput } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';


const DocSummarizerForm = () => {
  const [text, setText] = useState('');
  const { formState, formAction, isPending } = useCustomForm(
    emailHelper,
    'doc-summarizer'
  );

  console.log('text', text);
  

  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Summarize Now'
      renderInputs={
        <>
          <label className='block mb-2 font-semibold'>
            Upload Document (or paste text):
          </label>
          <input
            type='file'
            accept='.txt,.pdf,.doc,.docx'
            className='border  rounded-lg p-2 w-60 mb-4 cursor-pointer '
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              if (file.type === 'text/plain') {
                const text = await file.text();
                setText(text);
              } else {
                // For PDFs or DOCX, you might need a library like pdfjs or mammoth
                alert('Only plain text supported in this demo');
              }
            }}
            
          />

          <textarea
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Or paste text here...'
            className='border rounded-lg w-full p-3 min-h-[250px]'
          />
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data.email} />}
    />
  );
};

export default DocSummarizerForm;
