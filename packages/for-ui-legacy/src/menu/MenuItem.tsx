import { forwardRef, ReactNode } from 'react';
import { MdCheck } from 'react-icons/md';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import { fsx } from '../system/fsx';
import { Text } from '../text';

export type MenuItemProps = Omit<MuiMenuItemProps, 'divider'> & {
  /**
   * アイコンを表示したい場合にreact-iconsのアイコンや画像を指定
   */
  icon?: ReactNode;

  /**
   * MenuItemに説明を追加したい場合に指定
   */
  description?: ReactNode;

  /**
   * 操作の意図を示す場合に指定
   *
   * 通常、コンテンツの削除など取り返しのつかないユーザーの操作を赤色で表示しますが、その場合intentionにnegativeを設定してください。
   *
   * @default 'shade'
   */
  intention?: 'shade' | 'negative';

  /**
   * MenuItemがMenuやMenuListの開閉に関わらず有効な状態であることを示す場合に指定
   *
   * 通常、Selectで対象の選択肢を選択中であることを示すために使います
   *
   * @default false
   */
  selected?: boolean;

  className?: string;
};

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ icon, description, intention = 'shade', disabled, className, children, selected, ...rest }, ref) => (
    <MuiMenuItem
      disableRipple
      ref={ref}
      disabled={disabled}
      classes={{
        root: fsx([
          `bg-shade-white-default text-r hover:bg-shade-white-hover focus-visible:bg-shade-white-active [&.Mui-focused]:bg-shade-white-active flex min-h-[unset] flex-row items-start gap-2 whitespace-nowrap px-4 py-1 font-sans`,
          icon && `pl-2`,
          selected && `pr-2`,
          {
            shade: `text-shade-dark-default`,
            negative: `text-negative-dark-default`,
          }[intention],
          disabled && `text-shade-dark-disabled opacity-100 [&.opacity-100]:opacity-100`,
          className,
        ]),
      }}
      {...rest}
    >
      {icon && (
        <figure
          className={fsx([
            `my-1 h-4 w-4 shrink-0 [&>svg]:h-full [&>svg]:w-full`,
            {
              shade: `[&_svg]:fill-shade-medium-default`,
              negative: `[&_svg]:fill-negative-medium-default`,
            }[intention],
            disabled && `[&_svg]:fill-shade-medium-disabled`,
          ])}
        >
          {icon}
        </figure>
      )}
      <Text className={fsx(`flex w-full flex-col`)}>
        <Text weight={selected ? 'bold' : 'inherit'} className={fsx(`whitespace-pre-wrap`)}>
          {children}
        </Text>
        <Text
          size="s"
          className={fsx([`text-shade-medium-default whitespace-pre-wrap`, disabled && `text-shade-dark-disabled`])}
        >
          {description}
        </Text>
      </Text>
      {selected && (
        <figure
          className={fsx([
            `my-1 h-4 w-4 shrink-0 [&>svg]:h-full [&>svg]:w-full`,
            {
              shade: `[&_svg]:fill-shade-dark-default`,
              negative: `[&_svg]:fill-negative-dark-default`,
            }[intention],
            disabled && `[&_svg]:fill-shade-dark-disabled`,
          ])}
        >
          <MdCheck />
        </figure>
      )}
    </MuiMenuItem>
  ),
);
