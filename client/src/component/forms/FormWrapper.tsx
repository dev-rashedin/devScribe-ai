/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, PulseGrid } from '../ui';
import Error from '../Error';

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
}: FormWrapperProps) => (
  <form action={formAction}>
    {renderInputs}

    <div className='flex justify-end'>
      <Button
        label={isPending ? 'Loading...' : buttonLabel}
        type='primary'
        isSubmit
        isChecked
        className='mt-4'
      />
    </div>

    {isPending ? (
      <PulseGrid />
    ) : formState?.success === 'false' ? (
    <Error error={formState.error}/>
    ) : formState?.success === true ? (
      <>{renderOutput}</>
    ) : null}
  </form>
);

export default FormWrapper;