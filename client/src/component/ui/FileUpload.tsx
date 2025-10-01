import React, { useRef} from 'react';
import { motion } from 'motion/react';
import { IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../lib/utils';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -10,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  files,
  setFiles,
  onChange,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
  onChange?: (files: File[]) => void;
}) => {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles([...files, ...newFiles]);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className='w-full' {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover='animate'
        className='py-6 mb-4 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden'
      >
        <input
          ref={fileInputRef}
          id='file-upload-handle'
          accept='.txt,.pdf,.doc,.docx,.odt'
          type='file'
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className='hidden'
        />
        <div className='relative w-full max-w-xl'>
          {files.length > 0 &&
            files.map((file, idx) => (
              <motion.div
                key={'file' + idx}
                layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                className={cn(
                  'relative overflow-hidden z-40 border  flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                  'shadow-sm'
                )}
              >
                <div className='flex justify-between w-full items-center gap-4'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className='text-base truncate max-w-xs'
                  >
                    {file.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className='rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-muted bg-card-secondary shadow-input'
                  >
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>

                <div className='flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-muted'>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                    className='px-1 py-0.5 rounded-md bg-navbar'
                  >
                    {file.type}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    layout
                  >
                    modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          {!files.length && (
            <motion.div
              layoutId='file-upload'
              variants={mainVariant}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              className={cn(
                'relative group-hover/file:shadow-2xl z-40 bg-primary flex items-center justify-center h-12 w-60 rounded-md',
                'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
              )}
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='text-white flex flex-col items-center'
                >
                  Drop it
                </motion.p>
              ) : (
                <IconUpload className='size-5 text-white' />
              )}
            </motion.div>
          )}

          {!files.length && (
            <motion.div
              variants={secondaryVariant}
              className='absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-12  w-60 rounded-md'
            ></motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


