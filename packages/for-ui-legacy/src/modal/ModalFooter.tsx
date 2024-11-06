import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  /** The contents of the Dialog. */
  children: ReactNode;
};

export const ModalFooter: React.FC<Props> = ({ children }) => {
  return <div className="border-shade-light-default flex flex-row-reverse border-t p-4">{children}</div>;
};
