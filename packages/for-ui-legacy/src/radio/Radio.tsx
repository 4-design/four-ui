import { FC, forwardRef, ReactNode } from 'react';
import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import { fsx } from '../system/fsx';
import { TextDefaultStyler } from '../system/TextDefaultStyler';
import { Text } from '../text';

export type RadioProps = Omit<MuiRadioProps, 'ref'> & {
  label?: ReactNode;
  nopadding?: boolean;
  className?: string;
};

const Indicator: FC<{ checked: boolean; disabled: boolean }> = ({ checked, disabled }) => (
  <span
    className={fsx([
      `bg-shade-white-default [.Mui-focusVisible_&]:shadow-focused border-shade-medium-default h-4 w-4 rounded-full border-2 transition-[border-width,border-color] duration-100`,
      checked && `border-primary-dark-default border-6`,
      disabled && `border-shade-medium-disabled`,
    ])}
  />
);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ nopadding, label, value, disabled, className, ...rest }, ref) => (
    <Text as="label" className={fsx(`inline-flex w-fit flex-row items-center gap-1`, className)}>
      <MuiRadio
        disableRipple
        value={value}
        disabled={disabled}
        inputRef={ref}
        icon={<Indicator checked={false} disabled={!!disabled} />}
        checkedIcon={<Indicator checked={true} disabled={!!disabled} />}
        classes={{
          root: fsx(nopadding ? `p-0` : `p-1`),
        }}
        {...rest}
      />
      <TextDefaultStyler
        content={label}
        defaultRenderer={(props) => (
          <Text
            size="r"
            className={fsx(`text-shade-dark-default`, disabled && `text-shade-dark-disabled`)}
            {...props}
          />
        )}
      />
    </Text>
  ),
);
