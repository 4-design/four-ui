// Retrieved from https://github.com/mui/material-ui/blob/master/packages/mui-base/src/utils/prepareForSlot.tsx
import * as React from 'react';

export function prepareForSlot<ComponentType extends React.ElementType>(Component: ComponentType) {
  type Props = React.ComponentProps<ComponentType>;

  return React.forwardRef<HTMLElement, Props>(function Slot(props, ref) {
    const { ownerState: _, ...other } = props;
    return React.createElement<Props>(Component, {
      ...(other as Props),
      ref,
    });
  });
}
