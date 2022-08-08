import React, { forwardRef } from 'react'
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu'
import clsx from 'clsx'

export type MenuProps = MuiMenuProps & {
  className?: string
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      open,
      anchorEl,
      anchorOrigin = {
        vertical: 'bottom',
        horizontal: 'right',
      },
      transformOrigin = {
        vertical: 'top',
        horizontal: 'right',
      },
      onClose,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <MuiMenu
        ref={ref}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={onClose}
        classes={{
          root: clsx(['translate-y-2']),
          paper: clsx(['z-modal min-w-min  rounded-[4px] py-1 shadow-menu']),
          list: clsx([
            'grid grid-cols-1 divide-y divide-shade-light-default py-0',
          ]),
        }}
        {...rest}
      >
        {children}
      </MuiMenu>
    )
  }
)
