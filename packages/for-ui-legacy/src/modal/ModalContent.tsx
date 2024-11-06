import React from 'react';

export type ModalContentProps = {
  children: React.ReactNode;
};

export const ModalContent: React.FC<ModalContentProps> = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
