import React, { ReactNode } from 'react';
import { Text } from '../text';

type Props = {
  /** The contents of the Dialog. */
  children: ReactNode | string;
};

export const ModalHeader: React.FC<Props> = ({ children }) => {
  return (
    <div className="border-shade-light-default border-b p-4">
      <Text as="p" className="text-shade-dark-default font-bold">
        {children}
      </Text>
    </div>
  );
};
