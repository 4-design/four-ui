import {
  ButtonHTMLAttributes,
  cloneElement,
  CSSProperties,
  FC,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { MdClose, MdMoreVert } from 'react-icons/md';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { Button } from '../button';
import { fsx } from '../system/fsx';

export const drawerAnchorPositions = {
  left: 'left',
  right: 'right',
  leading: 'leading',
  trailing: 'trailing',
} as const;

export type DrawerAnchorPosition = (typeof drawerAnchorPositions)[keyof typeof drawerAnchorPositions];

export type DrawerProps = MuiDrawerProps & {
  /**
   * Drawerが開く起点となる方向を指定
   *
   * leftとrightは使わず、leadingとtrailingで表現してください。
   *
   * @default 'trailing'
   */
  anchor?: DrawerAnchorPosition;

  /**
   * Drawerをリサイズ不可能にする場合に指定
   *
   * @default false
   */
  disableResizing?: boolean;

  /**
   * ヘッダー部分に置くコンテンツを指定
   *
   * @deprecated かわりにnavigationを使ってください
   */
  headerChildren?: ReactNode;

  /**
   * ナビゲーションエリアに表示するコンテンツを指定
   */
  navigation?: ReactNode;

  /**
   * Drawerの固定の横幅を指定
   *
   * 指定するとdefaultWidthやminWidthは無視されリサイズできなくなります。
   *
   * @default 320
   */
  width?: CSSProperties['width'];

  /**
   * Drawerのデフォルトの横幅を指定
   *
   * @default 320
   */
  defaultWidth?: number;

  /**
   * Drawerの最小の横幅を指定
   *
   * @default "fit-content"
   */
  minWidth?: CSSProperties['minWidth'];

  /**
   * Drawerの最大の横幅を指定
   *
   * 最大幅を100%にして画面全体を覆ってしまうとユーザーが今いる場所を見失う可能性があるため、画面全体を覆わない値を設定してください
   *
   * @default "calc(100% - 16px)"
   */
  maxWidth?: CSSProperties['maxWidth'];

  /**
   * Drawerを閉じたときに実行する関数を指定
   */
  onClose?: () => void;

  /**
   * 操作の起点となるコンポーネントを指定
   */
  TriggerComponent?: ReactElement<{ onClick: () => void }>;

  className?: string;
};

const defaultMinWidth = 320;

const DragHandle: FC<{ dragging: boolean } & ButtonHTMLAttributes<HTMLButtonElement>> = ({ dragging, ...rest }) => (
  <button
    {...rest}
    aria-label="左右にドラッグしてドロワーのサイズを調整"
    title="左右にドラッグしてドロワーのサイズを調整"
    tabIndex={-1}
    className={fsx([
      `user-select-[none] bg-shade-white-default hover:bg-shade-white-hover [&_svg]:fill-shade-medium-default focus-visible:bg-shade-white-active border-shade-light-default sticky top-0 flex h-full w-4 cursor-[ew-resize] items-center justify-center border-x focus-visible:outline-none`,
      dragging && `bg-shade-white-active [&_svg]:fill-shade-medium-active`,
    ])}
  >
    <MdMoreVert size={24} className={fsx(`shrink-0`)} />
  </button>
);

export const Drawer: FC<DrawerProps> = ({
  anchor = drawerAnchorPositions.trailing,
  headerChildren,
  navigation,
  defaultWidth = defaultMinWidth,
  minWidth = `fit-content`,
  maxWidth = `calc(100% - 16px)`,
  width: fixedWidth,
  children,
  onClose,
  className,
  open,
  TriggerComponent,
  ...rest
}) => {
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(defaultWidth);
  const [internalOpen, setInternalOpen] = useState(false);

  const internalAnchor = (
    {
      left: 'left',
      right: 'right',

      // FIXME: To support RTL, values for leading and trailing must be set regarding the direction of writing
      leading: 'left',
      trailing: 'right',
    } as const
  )[anchor];

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      setWidth(
        {
          left: e.pageX + 8,
          right: window.innerWidth - e.pageX + 8,
        }[internalAnchor],
      );
    },
    [internalAnchor],
  );

  const onDragEnd = useCallback(() => {
    document.removeEventListener('pointerup', onDragEnd, true);
    document.removeEventListener('pointermove', handleDrag, true);
    setDragging(false);
  }, [handleDrag]);

  const onDragStart = useCallback(() => {
    document.addEventListener('pointerup', onDragEnd, true);
    document.addEventListener('pointermove', handleDrag, true);
    setDragging(true);
  }, [handleDrag, onDragEnd]);

  const Trigger =
    isValidElement(TriggerComponent) &&
    cloneElement(TriggerComponent, {
      onClick: () => {
        setInternalOpen(true);
      },
    });

  return (
    <Fragment>
      {Trigger}
      <MuiDrawer
        anchor={internalAnchor}
        onClose={onClose}
        classes={{
          root: fsx([
            `z-modal w-fit [&_.MuiBackdrop-root]:bg-[#0000004D]`,
            dragging && `cursor-[ew-resize]`,
            className,
          ]),
          paper: fsx([
            `shadow-more border-shade-light-default flex h-full flex-row`,
            {
              left: fixedWidth && `border-r`,
              right: fixedWidth && `border-l`,
            }[internalAnchor],
          ]),
        }}
        PaperProps={{
          sx: {
            minWidth,
            width: fixedWidth || width,
            maxWidth,
          },
        }}
        SlideProps={{
          easing: {
            enter: 'cubic-bezier(.05, .95, .05, .95)',
            exit: 'cubic-bezier(.95, .05, .05, .95)',
          },
        }}
        transitionDuration={200}
        open={open ?? internalOpen}
        {...rest}
      >
        {!fixedWidth && internalAnchor === 'right' && <DragHandle onPointerDown={onDragStart} dragging={dragging} />}
        <div className={fsx(`flex w-full flex-col`)}>
          <nav
            className={fsx(
              `border-shade-light-default bg-shade-white-default sticky top-0 flex items-center justify-between gap-2 border-b p-2`,
            )}
          >
            <Button
              variant="text"
              size="medium"
              intention="subtle"
              onClick={(e) => {
                onClose?.(e, 'escapeKeyDown');
                setInternalOpen(false);
              }}
            >
              <MdClose />
              閉じる
            </Button>
            {(navigation || headerChildren) && (
              <div className={fsx(`flex items-center gap-2`)}>{navigation || headerChildren}</div>
            )}
          </nav>
          <article className={fsx(`flex flex-col`)}>{children}</article>
        </div>
        {!fixedWidth && internalAnchor === 'left' && <DragHandle onPointerDown={onDragStart} dragging={dragging} />}
      </MuiDrawer>
    </Fragment>
  );
};
