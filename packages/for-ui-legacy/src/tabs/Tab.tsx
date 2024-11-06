import { FC, ReactElement } from 'react';
import MuiTab, { TabProps as MuiTabProps } from '@mui/material/Tab';
import { fsx } from '../system/fsx';

export interface TabProps extends Omit<MuiTabProps, 'disableRipple' | 'icon' | 'iconPosition' | 'selected'> {
  minWidth?: number;
  badge?: ReactElement;
}

export const Tab: FC<TabProps> = ({ minWidth, tabIndex, className, badge, ...rest }) => (
  <MuiTab
    disableRipple
    className={fsx(
      `text-shade-dark-default hover:bg-shade-white-hover text-r [&:focus-visible]:bg-shade-white-active disabled:text-shade-dark-disabled flex min-h-min min-w-min gap-1 border-y-2 border-solid border-transparent px-4 py-1.5 normal-case opacity-100 transition-all duration-100 disabled:cursor-not-allowed`,
      className,
    )}
    tabIndex={tabIndex ?? 0}
    sx={{ minWidth }}
    icon={badge}
    iconPosition="end"
    {...rest}
  />
);
