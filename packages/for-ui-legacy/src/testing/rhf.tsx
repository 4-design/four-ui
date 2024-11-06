import { FC } from 'react';
import { FieldValues, useForm, UseFormProps, UseFormRegister } from 'react-hook-form';
import { act, fireEvent, screen } from '@testing-library/react';

export const withRHF = <Value extends FieldValues>({
  useFormOptions,
  onSubmit,
  Component,
}: {
  useFormOptions?: UseFormProps<Value>;
  onSubmit: (value: Value) => void;
  Component: FC<{ register: UseFormRegister<Value> }>;
}): {
  Form: FC;
  submit: () => Promise<void>;
} => {
  return {
    Form: (): JSX.Element => {
      const { register, handleSubmit } = useForm<Value>(useFormOptions);
      return (
        <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
          <Component register={register} />
        </form>
      );
    },
    submit: async () => {
      await act(async () => {
        fireEvent.submit(screen.getByRole('form', { name: 'form' }));
      });
    },
  };
};
