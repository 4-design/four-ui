import {
  cloneElement,
  forwardRef,
  Fragment,
  isValidElement,
  ReactElement,
  SyntheticEvent,
  useId,
  useState,
} from 'react';
import MuiSnackbar, { SnackbarProps as MuiSnackbarProps, SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiSnackbarContent, { SnackbarContentProps as MuiSnackbarContentProps } from '@mui/material/SnackbarContent';
import { Button } from '../button';
import { fsx } from '../system/fsx';
import { Text } from '../text';

export type SnackbarProps = MuiSnackbarProps & {
  /**
   * 自動的にSnackbarが消えるまでの時間を指定
   *
   * 指定されているときは閉じるボタンは表示されません。
   * 消えるまでの時間はミリ秒で指定します。_message_を読むのに十分な時間を与えるようにしてください。
   *
   * @default 5000
   */
  autoHideDuration?: MuiSnackbarProps['autoHideDuration'];

  /**
   * 自動的にSnackbarを消すかどうかを指定
   *
   * ユーザーが閉じるボタンを押す あるいは SnackbarProvider下では新しいSnackbarが開かれる ことでのみ閉じられます。
   */
  autoHide?: boolean;

  /**
   * 表示するメッセージを指定
   */
  message: MuiSnackbarProps['message'];

  /**
   * 操作の起点となるコンポーネントを指定
   *
   * ボタンを押すと即座に表示のように使うことができますが、通常はユーザーの操作と処理の完了は完全に同義ではないため、そのような場面では使用は非推奨です。
   */
  TriggerComponent?: ReactElement<{ onClick: () => void }>;

  className?: string;
};

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      TriggerComponent,
      autoHideDuration = 5000,
      autoHide = false,
      onClose,
      onClick,
      message,
      action,
      className,
      TransitionProps,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(true);
    const handleClose = (e: Event | SyntheticEvent<HTMLDivElement, Event>, reason: SnackbarCloseReason) => {
      onClose?.(e, reason);
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const Trigger =
      isValidElement(TriggerComponent) &&
      cloneElement(TriggerComponent, {
        onClick: handleOpen,
      });
    return (
      <Fragment>
        {Trigger}
        <MuiSnackbar
          ref={ref}
          open={open}
          transitionDuration={150}
          autoHideDuration={autoHide ? autoHideDuration : undefined}
          className={fsx(className)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          TransitionProps={{
            ...TransitionProps,
            onExited(node) {
              setOpen(false);
              TransitionProps?.onExited?.(node);
            },
          }}
          ClickAwayListenerProps={{
            // To disable being closed by clicking outside of snackbar
            onClickAway() {
              undefined;
            },
          }}
          onClose={handleClose}
          // If autoHideDuration is specified, closable when clicking the snackbar
          onClick={(e) => {
            onClick?.(e);
            autoHide && handleClose(e, 'escapeKeyDown');
          }}
          {...rest}
        >
          <SnackbarContent autoHide={autoHide} message={message} onClose={handleClose} action={action} />
        </MuiSnackbar>
      </Fragment>
    );
  },
);

export type SnackbarContentProps = MuiSnackbarContentProps & {
  autoHide?: boolean;
  onClose?: SnackbarProps['onClose'];
  message?: MuiSnackbarContentProps['message'];
  action?: MuiSnackbarContentProps['action'];
};

export const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(
  ({ autoHide, message, action, onClose, onClick, className, ...rest }, ref) => {
    const messageId = useId();
    return (
      <MuiSnackbarContent
        ref={ref}
        aria-describedby={messageId}
        role={autoHide ? 'alert' : 'alertdialog'}
        className={fsx(
          `rounded-2 bg-shade-dark-default shadow-more text-shade-white-default text-r flex w-[40rem] flex-nowrap items-center justify-between gap-4 p-4 font-sans`,
          `[&_.MuiSnackbarContent-message]:m-0 [&_.MuiSnackbarContent-message]:py-1`,
          `[&_.MuiSnackbarContent-action]:m-0 [&_.MuiSnackbarContent-action]:shrink-0 [&_.MuiSnackbarContent-action]:p-0`,
          className,
        )}
        onClick={(e) => {
          onClick?.(e);
          autoHide && onClose?.(e, 'escapeKeyDown');
        }}
        message={<Text id={messageId}>{message}</Text>}
        action={
          action ||
          (!autoHide && (
            <Button
              intention="shade"
              variant="filled"
              size="medium"
              onClick={(e) => {
                onClose?.(e, 'escapeKeyDown');
              }}
            >
              閉じる
            </Button>
          ))
        }
        {...rest}
      />
    );
  },
);
