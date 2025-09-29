import { useState } from "react";
import { BiCopy } from "react-icons/bi";

const CopyButton = ({explanation} : TExplanation) => {

    const [copied, setCopied] = useState(false);
  
     const handleCopy = async () => {
       try {
         await navigator.clipboard.writeText(explanation);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
       } catch (err) {
         console.error('Failed to copy:', err);
       }
     };

  return (
    <button
      onClick={handleCopy}
      className='absolute top-4 right-4 flex items-center gap-1 px-3 py-1 text-lg rounded-lg
             transition-all duration-300 ease-in-out transform'
    >
      {copied ? (
        <p className='flex-center gap-1 text-primary scale-110 transition-transform duration-300 text-sm'>
          Copied <span className="-mt-1">✔️</span>
        </p>
      ) : (
        <p className='flex items-center gap-2 text-primary text-base'>
          Copy
          <BiCopy
            size={20}
            className='text-primary transition-transform duration-300 hover:scale-110'
          />
        </p>
      )}
    </button>
  );
}
export default CopyButton;