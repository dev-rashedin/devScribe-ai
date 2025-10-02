/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, PulseGrid } from '../ui';
import Error from '../Error';
import { generateButtonLabel } from '../../utils';
import { useOutletContext } from 'react-router';
import { useEffect } from 'react';


type FormWrapperProps = {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  formState: any;
  renderInputs: React.ReactNode;
  renderOutput: React.ReactNode;
  buttonLabel: string;
};

type ContextType = { isFormVisible: boolean; setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>> };

const FormWrapper = ({
  formAction,
  isPending,
  formState,
  renderInputs,
  renderOutput,
  buttonLabel,
}: FormWrapperProps) => {
  // const { isFormVisible } = useOutletContext<ContextType>();

  const { isFormVisible, setIsFormVisible } = useOutletContext<ContextType>();
  
  useEffect(() => {
    if (formState?.success) {
      setIsFormVisible(false);
    }
  }, [formState?.success, setIsFormVisible]);


  console.log('isFormVisible', isFormVisible);
  
  



  return (
    <form action={formAction}>
    {!formState?.success && (
      <div className={isPending ? 'bg-opacity-50' : ''}>
        {renderInputs}
        <div className='flex justify-end'>
          <Button
            label={isPending ? generateButtonLabel(buttonLabel) : buttonLabel}
            type='primary'
            isSubmit
            isChecked
            className='mt-4'
            isPending={isPending}
          />
        </div>
      </div>
    )}

    {isPending ? (
      <PulseGrid />
    ) : formState?.success ? (
      renderOutput
    ) : (
      formState?.success === false && <Error error={formState.error} />
    )}
  </form>
  )
}

export default FormWrapper;