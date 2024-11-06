import { forwardRef } from 'react';
import { StepConnector } from '@mui/material';
import MuiStepper, { StepperProps as MuiStepperProps } from '@mui/material/Stepper';
import { fsx } from '../system/fsx';

export type StepperProps = Omit<MuiStepperProps, 'alternativeLabel'> & {
  /**
   * ラベルを表示する位置を指定
   *
   * @default 'bottom'
   */
  labelPosition?: 'bottom' | 'trailing';

  /**
   * @deprecated labelPositionを使用してください
   */
  alternativeLabel?: MuiStepperProps['alternativeLabel'];

  className?: string;
};

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep, alternativeLabel, labelPosition = 'bottom', children, className, ...rest }, ref) => (
    <MuiStepper
      ref={ref}
      activeStep={activeStep}
      alternativeLabel={alternativeLabel || { bottom: true, trailing: false }[labelPosition]}
      connector={
        <StepConnector
          classes={{
            root: fsx(
              `[&:is(.Mui-active,.Mui-completed)>.MuiStepConnector-line]:border-primary-dark-default -left-2/4 right-0 top-0 flex h-6 w-full items-center px-0 [&.MuiStepConnector-alternativeLabel]:pl-3 [&.MuiStepConnector-alternativeLabel]:pr-4`,
            ),
            line: fsx(`border-shade-dark-disabled w-full border-t-2`),
          }}
        />
      }
      className={fsx(`gap-1`, className)}
      {...rest}
    >
      {children}
    </MuiStepper>
  ),
);
