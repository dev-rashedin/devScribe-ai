import { useEffect, useState } from 'react';
import { emailHelper } from '../../actions';
import { AIOutput, FileUpload } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';
import mammoth from 'mammoth';


const DocSummarizerForm = () => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { formState, formAction, isPending } = useCustomForm(
    emailHelper,
    'doc-summarizer'
  );
  
   const handleFileUpload = (files: File[]) => {
     setFiles(files);
     console.log(files);
   };



  useEffect(() => {
    if (!files.length) return;

    const file = files[0];
    const processFile = async () => {
      let textContent = '';

      if (file.type === 'text/plain') {
        textContent = await file.text();
        setText(textContent);
      } else if (file.type === 'application/pdf') {
        textContent = await readPDF(file);
        setText(textContent);
      } else if (
        file.type ===
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword'
      ) {
        textContent = await readDocx(file);
        setText(textContent);
      } else {
        alert('Unsupported file type');
      }

      setText(textContent);
    };

    processFile();
  }, [files]);

  console.log('files', files);
  
  

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

          {!files.length  && (
            <textarea
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Or paste text here...'
              className='border rounded-lg w-full p-3 min-h-[250px]'
            />
          )}
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data.email} />}
    />
  );
};

export default DocSummarizerForm;
