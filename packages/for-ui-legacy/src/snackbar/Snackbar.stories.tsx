import { Fragment, useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { Text } from '../text';
import { Snackbar, SnackbarProps } from './Snackbar';
import { SnackbarProvider, useSnackbar } from './SnackbarContext';

export default {
  title: 'Feedback / Snackbar',
  component: Snackbar,
} as Meta<SnackbarProps>;

export const Playground = {
  args: {
    open: true,
    message: 'テスト',
    autoHide: true,
    autoHideDuration: null,
  },
};

export const Stateless = () => <Snackbar TriggerComponent={<Button>開く</Button>} message="操作が完了しました" />;

export const StatelessAutoHide = () => (
  <Snackbar TriggerComponent={<Button>開く</Button>} autoHide message="操作が完了しました" />
);

export const Stateful = () => {
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={openHandler}>開く</Button>
      <Snackbar open={open} onClose={closeHandler} message="操作が完了しました" />
    </Fragment>
  );
};

export const StatefulAutoHide = () => {
  const [open, setOpen] = useState(false);
  const openHandler = () => {
    setOpen(true);
  };
  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={openHandler}>開く</Button>
      <Snackbar open={open} onClose={closeHandler} autoHide message="操作が完了しました" />
    </Fragment>
  );
};

export const WithContext = () => {
  const App = () => {
    const { openSnackbar } = useSnackbar();
    return (
      <div className="flex gap-2">
        <Button onClick={() => openSnackbar({ autoHide: true, message: '5秒後に閉じるSnackbar' })}>
          自動的に閉じるSnackbarを開く
        </Button>
        <Button onClick={() => openSnackbar({ message: '閉じるボタンを押さないと消えないSnackbar' })}>
          自動的に閉じないSnackbarを開く
        </Button>
      </div>
    );
  };
  return (
    <SnackbarProvider>
      <Text>
        Snackbarは1画面に1つのみ表示することを強く推奨しています。この挙動はSnackbarProviderを使うことで簡単に実現できます。
      </Text>
      <App />
    </SnackbarProvider>
  );
};
