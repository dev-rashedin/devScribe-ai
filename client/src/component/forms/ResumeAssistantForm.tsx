import { useEffect, useState } from 'react';
import { resumeAssistant } from '../../actions';
import { AIOutput, FileUpload } from '../ui';
import { useCustomForm } from '../../hooks';
import FormWrapper from './FormWrapper';
import { submitFormOnEnter } from '../../utils';

const ResumeAssistantForm = () => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [tone, setTone] = useState('professional');
  const [role, setRole] = useState('');

  const { formState, formAction, isPending } = useCustomForm(
    resumeAssistant,
    'resume-assistant'
  );

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

 

  useEffect(() => {
    if (formState?.success) {
      setText('');
      setFiles([]);
      setJobDescription('');
      setTone('professional');
      setRole('');
    }
  }, [formState?.success]);


  return (
    <FormWrapper
      formAction={formAction}
      isPending={isPending}
      formState={formState}
      buttonLabel='Optimize Resume'
      renderInputs={
        <>
          <label className='block text-lg'>
            Upload your resume (PDF, DOCX, or TXT):
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
              placeholder='Or paste resume text here...'
              className='border rounded-lg w-full p-3 min-h-[200px]'
              onKeyDown={(e) => submitFormOnEnter(e)}
              disabled={isPending}
            />
          )}

          <label className='block text-lg mt-4'>
            Job Description (optional):
          </label>
          <textarea
            name='jobDescription'
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder='Paste the job description here to tailor your resume...'
            className='border rounded-lg w-full p-3 min-h-[150px]'
            onKeyDown={(e) => submitFormOnEnter(e)}
            disabled={isPending}
          />

          <div className='mt-4'>
            <label className='block text-lg'>Tone:</label>
            <select
              name='tone'
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className='border rounded-lg p-2 w-full'
              disabled={isPending}
            >
              <option value='professional'>Professional</option>
              <option value='confident'>Confident</option>
              <option value='friendly'>Friendly</option>
              <option value='formal'>Formal</option>
            </select>
          </div>

          <div className='mt-4 mb-4'>
            <label className='block text-lg'>Target Role (optional):</label>
            <input
              type='text'
              name='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder='e.g., Software Engineer, Project Manager'
              className='border rounded-lg p-2 w-full'
              disabled={isPending}
            />
          </div>
        </>
      }
      renderOutput={<AIOutput explanation={formState?.data?.optimizedResume} />}
    />
  );
};

export default ResumeAssistantForm;
