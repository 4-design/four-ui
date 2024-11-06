import { Children, cloneElement, ComponentProps, forwardRef, isValidElement, PropsWithoutRef, ReactNode } from 'react';
import FormControl from '@mui/material/FormControl';
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import { fsx } from '../system/fsx';
import { TextDefaultStyler } from '../system/TextDefaultStyler';
import { Text } from '../text';
import { Radio } from './Radio';

export type RadioGroupProps = Omit<PropsWithoutRef<MuiRadioGroupProps>, 'color'> & {
  name?: string;
  row?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
  className?: string;
  children: ReactNode;
};

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    { className, name, label, row, defaultValue, error, helperText, children, required = false, disabled, ...rest },
    ref,
  ) => (
    <FormControl
      component="fieldset"
      required={required}
      disabled={disabled}
      error={error}
      className={fsx(`flex flex-col gap-2`, className)}
    >
      <TextDefaultStyler
        content={label}
        defaultRenderer={({ children, ...props }) => (
          <Text as="legend" size="s" weight="bold" className={fsx(`text-shade-medium-default contents`)} {...props}>
            {/* due to the CSS bug, legend element cannot be styled if contents not specified. But contents makes difficult to style, so wrap by Text. */}
            <Text>
              {children}
              {required && <Text className={fsx(`text-negative-dark-default`)}>*</Text>}
            </Text>
          </Text>
        )}
      />
      <MuiRadioGroup
        name={name}
        row={row}
        defaultValue={defaultValue}
        className={fsx(`flex flex-wrap gap-x-6 gap-y-2`, row && `flex-row`)}
        ref={ref}
        {...rest}
      >
        {
          // Pass ref to children (Radio) if provided to RadioGroup
          Children.map(children, (child) =>
            isValidElement<ComponentProps<typeof Radio>>(child)
              ? cloneElement(child, { ref: ref ? ref : undefined })
              : child,
          )
        }
      </MuiRadioGroup>
      <TextDefaultStyler
        content={helperText}
        defaultRenderer={(props) => (
          <Text
            size="s"
            weight="regular"
            className={fsx(`text-shade-dark-default`, error && `text-negative-dark-default`)}
            {...props}
          />
        )}
      />
    </FormControl>
  ),
);
