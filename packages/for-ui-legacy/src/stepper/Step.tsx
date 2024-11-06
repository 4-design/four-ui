import { forwardRef } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import MuiStep, { StepProps as MuiStepProps } from '@mui/material/Step';
import { StepIconProps as MuiStepIconProps } from '@mui/material/StepIcon';
import MuiStepLabel, { StepLabelProps as MuiStepLabelProps } from '@mui/material/StepLabel';
import { fsx } from '../system/fsx';
import { Text } from '../text';

export type StepProps = MuiStepProps;

export type StepLabelProps = MuiStepLabelProps;

export const Step = forwardRef<HTMLDivElement, StepProps>(({ children, active, className, ...rest }, ref) => (
  <MuiStep ref={ref} active={active} className={fsx(`p-0`, className)} {...rest}>
    <MuiStepLabel
      className={fsx(`m-0 flex gap-1`)}
      StepIconComponent={Icon}
      classes={{
        label: fsx(`m-0 font-sans`),
        iconContainer: fsx(`p-0`),
        active: fsx(`font-bold`),
      }}
    >
      <Text size="r" className="text-shade-dark-default">
        {children}
      </Text>
    </MuiStepLabel>
  </MuiStep>
));

const Icon = ({ completed, active, icon }: Partial<MuiStepIconProps>) => (
  <span
    className={fsx([
      `grid h-6 w-6 place-content-center rounded-full`,
      completed && `bg-primary-dark-default [&_svg]:fill-shade-white-default [&_svg]:h-4 [&_svg]:w-4`,
      active && `border-primary-dark-default border-2`,
      !active && !completed && `border-shade-dark-disabled border-2`,
    ])}
  >
    <Text
      weight={active ? 'bold' : 'regular'}
      className={fsx([active && `text-primary-dark-default`, !active && !completed && `text-shade-dark-default`])}
    >
      {completed ? <MdOutlineDone /> : icon}
    </Text>
  </span>
);
