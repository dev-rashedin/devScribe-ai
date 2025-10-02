import { useState } from 'react';
import { docSummarizer } from '../../actions';
import { AIOutput, FileUpload } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';
import { submitFormOnEnter } from '../../utils';


const ResumeAssistantForm = () => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { formState, formAction, isPending } = useCustomForm(
    docSummarizer,
    'resume-assistant'
  );
  
   const handleFileUpload = (files: File[]) => {
     setFiles(files);
   };


  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Summarize Now'
      renderInputs={
        <>
          <label className='block text-lg'>
            Select or drag and drop your document:
          </label>
          <FileUpload
            files={files}
            setFiles={setFiles}
            onChange={handleFileUpload}
          />

          {!files.length && (
            <textarea
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Or paste text here...'
              className='border rounded-lg w-full p-3 min-h-[250px]'
              onKeyDown={(e) => submitFormOnEnter(e)}
            />
          )}
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.summary} />}
    />
  );
};

export default ResumeAssistantForm;
