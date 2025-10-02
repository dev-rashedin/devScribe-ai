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
      {formState?.success && buttonLabel.includes('Summarize') ? (
        ''
      ) : (
        <Button
          label={isPending ? 'Loading...' : buttonLabel}
          type='primary'
          isSubmit
          isChecked
          className='mt-4'
        />
      )}
    </div>
    {isPending ? (
      <PulseGrid />
    ) : formState?.success ? (
      renderOutput
    ) : (
      formState?.success === false && <Error error={formState.error} />
    )}
  </form>
);

export default FormWrapper;