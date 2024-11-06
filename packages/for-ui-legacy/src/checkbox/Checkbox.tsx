import { FC, forwardRef, ReactNode } from 'react';
import { MdCheck, MdRemove } from 'react-icons/md';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import { fsx } from '../system/fsx';
import { TextDefaultStyler } from '../system/TextDefaultStyler';
import { Text } from '../text';

export type CheckboxProps = MuiCheckboxProps & {
  label?: ReactNode;
  nopadding?: boolean;
  className?: string;
};

const Indicator: FC<{ state: 'default' | 'checked' | 'intermediate'; disabled: boolean }> = ({ state, disabled }) => (
  <span
    className={fsx([
      `[.Mui-focusVisible_&]:shadow-focused bg-shade-white-default h-4 w-4 rounded transition duration-100`,
      {
        default: [`border-shade-medium-default border-2`, disabled && `border-shade-medium-disabled`],
        checked: [`bg-primary-dark-default`, disabled && `bg-primary-dark-disabled`],
        intermediate: [`bg-primary-dark-default`, disabled && `bg-primary-dark-disabled`],
      }[state],
    ])}
  >
    {
      {
        default: null,
        checked: <MdCheck size={16} className="fill-shade-white-default" />,
        intermediate: <MdRemove size={16} className="fill-shade-white-default" />,
      }[state]
    }
  </span>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, nopadding = false, disabled, className, ...rest }, ref) => (
    <Text as="label" className={fsx(`group inline-flex w-fit flex-row items-center gap-1`, className)}>
      <MuiCheckbox
        disableRipple
        icon={<Indicator state="default" disabled={!!disabled} />}
        checkedIcon={<Indicator state="checked" disabled={!!disabled} />}
        indeterminateIcon={<Indicator state="intermediate" disabled={!!disabled} />}
        disabled={disabled}
        className={fsx(nopadding ? 'p-0' : 'p-1')}
        inputRef={ref}
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
