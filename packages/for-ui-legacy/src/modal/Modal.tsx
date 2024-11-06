import React, { forwardRef } from 'react';
import MuiBackdrop, { BackdropProps as MuiBackdropProps } from '@mui/material/Backdrop';
import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal';

type BackdropProps = MuiBackdropProps;

export type ModalProps = Omit<MuiModalProps, 'children'> & {
  /** Whether the Dialog is open */
  open: boolean;

  children: React.ReactNode | React.ReactNode[];

  /** Handler that is called when the 'cancel' button of a dismissable Dialog is clicked. */
  onClose?(event: React.MouseEvent | React.KeyboardEvent): void;

  className?: string;
};

const Backdrop: React.FC<BackdropProps> = ({ open, children, onClick }) => {
  return (
    <MuiBackdrop
      open={open}
      onClick={onClick}
      classes={{
        root: 'bg-[#0000004D]',
      }}
    >
      {children}
    </MuiBackdrop>
  );
};

export const Modal: React.FC<ModalProps> = forwardRef(({ open, onClose, children, className, ...props }, ref) => {
  return (
    <MuiModal
      ref={ref}
      open={open}
      onClose={onClose}
      slots={{
        backdrop: Backdrop,
      }}
      slotProps={{
        backdrop: { onClick: onClose },
      }}
      className={className}
      {...props}
    >
      <div className="flex min-h-screen justify-center focus-visible:outline-none focus-visible:ring-0">
        <div className="z-modal bg-shade-white-default shadow-more m-auto flex flex-col break-all rounded-lg transition-all">
          {children}
        </div>
      </div>
    </MuiModal>
  );
});
