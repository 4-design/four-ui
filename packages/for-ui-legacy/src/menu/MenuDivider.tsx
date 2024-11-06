import { forwardRef } from 'react';
import MuiMenuDivider, { DividerProps } from '@mui/material/Divider';
import { fsx } from '../system/fsx';

export type MenuDividerProps = DividerProps<'li'> & {
  className?: string;
};

export const MenuDivider = forwardRef<HTMLLIElement, MenuDividerProps>(({ className, ...rest }, ref) => (
  <MuiMenuDivider
    ref={ref}
    component="li"
    className={fsx(`border-shade-light-default m-0 list-none border-b [&.m-0]:m-0`, className)}
    {...rest}
  />
));
