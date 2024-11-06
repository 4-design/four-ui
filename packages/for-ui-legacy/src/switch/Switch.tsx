import { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import { fsx } from '../system/fsx';
import { TextDefaultStyler } from '../system/TextDefaultStyler';
import { Text } from '../text';

export type SwitchProps = ComponentPropsWithRef<'input'> & {
  label?: ReactNode;
  className?: string;
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({ label, disabled, className, ...rest }, ref) => (
  <Text as="label" className={fsx(`group inline-flex w-[max-content] flex-row items-center gap-1`, className)}>
    <input
      type="checkbox"
      ref={ref}
      className={fsx([
        `bg-shade-medium-default focus-visible:shadow-focused h-5 w-8 cursor-pointer appearance-none rounded-full p-0.5 transition-all duration-100 focus-visible:outline-none`,
        `before:bg-shade-white-default before:block before:h-4 before:w-4 before:rounded-full before:content-['']`,
        `checked:bg-primary-dark-default checked:pl-3.5`,
        `disabled:bg-shade-medium-disabled disabled:cursor-not-allowed`,
        `disabled:checked:bg-primary-dark-disabled`,
      ])}
      disabled={disabled}
      {...rest}
    />
    <TextDefaultStyler
      content={label}
      defaultRenderer={(props) => (
        <Text size="r" className={fsx(`text-shade-dark-default`, disabled && `text-shade-dark-disabled`)} {...props} />
      )}
    />
  </Text>
));
