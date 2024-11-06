import { cloneElement, Fragment, isValidElement, MouseEvent, ReactElement, ReactNode } from 'react';
import { bindPopper, bindTrigger } from 'material-ui-popup-state';
import { usePopupState } from 'material-ui-popup-state/hooks';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MuiPopper from '@mui/material/Popper';
import { fsx } from '../system/fsx';

type PoppeChildrenProps<Element extends HTMLElement> = {
  onClick: (e: MouseEvent<Element>) => void;
};

export type PopperProps<Element extends HTMLElement> = {
  TriggerComponent: ReactNode;

  children: ReactElement | ((props: PoppeChildrenProps<Element>) => ReactElement);
};

export const Popper = <Element extends HTMLElement>(props: PopperProps<Element>) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: undefined,
  });

  const trigger = bindTrigger(popupState);
  let _TriggerComponent = <></>;
  if (isValidElement<unknown>(props.TriggerComponent)) {
    _TriggerComponent = cloneElement(props.TriggerComponent, {
      ...trigger,
    });
  }

  return (
    <Fragment>
      {_TriggerComponent}

      <MuiPopper {...bindPopper(popupState)} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              classes={{
                root: fsx(['z-modal shadow-more  min-w-min translate-y-2 rounded-[4px] p-1']),
              }}
            >
              {typeof props.children === 'function' ? props.children({ onClick: popupState.close }) : props.children}
            </Paper>
          </Fade>
        )}
      </MuiPopper>
    </Fragment>
  );
};
