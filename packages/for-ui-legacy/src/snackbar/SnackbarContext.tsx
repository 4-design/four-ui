import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Snackbar, SnackbarProps } from './Snackbar';

type SnackbarContextValue = {
  inProvider: boolean;
  snackbar?: SnackbarProps;
  enqueue: (props: SnackbarProps) => void;
};

// TODO: Rewrite using `satisfies` once jest supports TypeScript v4.9
const initialSnackbarContextValue: SnackbarContextValue = {
  inProvider: false,
  enqueue: () => undefined,
};

const SnackbarContext = createContext<SnackbarContextValue>(initialSnackbarContextValue);

// TODO: Refactor using Portal. See https://react.dev/reference/react-dom/createPortal
const SnackbarView = () => {
  const { snackbar } = useContext(SnackbarContext);
  if (!snackbar) {
    return null;
  }
  return <Snackbar key={`${Date.now() + Math.random()}`} {...snackbar} ref={undefined} />;
};

export type SnackbarProviderProps = {
  children: ReactNode;
};

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children, ...rest }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps | undefined>();
  const enqueue = (props: SnackbarProps) => {
    setSnackbar(props);
  };
  return (
    <SnackbarContext.Provider
      value={{
        inProvider: true,
        snackbar,
        enqueue,
      }}
      {...rest}
    >
      {children}
      <SnackbarView />
    </SnackbarContext.Provider>
  );
};

type UseSnackbar = {
  inProvider: boolean;
  openSnackbar: (props: SnackbarProps) => void;
};

export const useSnackbar = (): UseSnackbar => {
  const { inProvider, enqueue } = useContext(SnackbarContext);
  return {
    inProvider,
    openSnackbar: enqueue,
  };
};
