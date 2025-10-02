/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, PulseGrid } from '../ui';
import Error from '../Error';
import { generateButtonLabel } from '../../utils';


type FormWrapperProps = {
  formAction: (formData: FormData) => void;
  isPending: boolean;
  formState: any;
  renderInputs: React.ReactNode;
  renderOutput: React.ReactNode;
  buttonLabel: string;
};


const FormWrapper = ({
  formAction,
  isPending,
  formState,
  renderInputs,
  renderOutput,
  buttonLabel,
}: FormWrapperProps) => {

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