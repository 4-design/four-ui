import { FC, ReactNode } from 'react';
import { ConstantBadge } from './ConstantBadge';
import { OutlinedBadge } from './OutlinedBadge';
import { TextBadge } from './TextBadge';

type BadgeInterface = {
  /**
   * ユーザーに提示したい意図 (e.g. エラーならばnegative) を指定
   *
   * @default shade
   */
  intention?: 'subtle' | 'shade' | 'primary' | 'secondary' | 'positive' | 'negative' | 'notice' | 'informative';

  /**
   * 表示されるlabelを指定
   */
  label: string;

  className?: string;
};

export type ConstantBadgeProps = BadgeInterface & {
  /**
   * variantを指定
   *
   * @default text
   */
  variant: 'constant';

  /**
   * iconを指定
   */
  icon: ReactNode;
};

export type DynamicBadgeProps = BadgeInterface & {
  /**
   * variantを指定
   *
   * @default text
   */
  variant?: 'text' | 'outlined';

  /**
   * iconを指定
   */
  icon?: ReactNode;
};

export type BadgeProps = ConstantBadgeProps | DynamicBadgeProps;

export const Badge: FC<BadgeProps> = ({ variant = 'text', icon, ...rest }) => {
  switch (variant) {
    case 'text':
      return <TextBadge icon={icon} {...rest} />;
    case 'outlined':
      return <OutlinedBadge icon={icon} {...rest} />;
    case 'constant':
      return <ConstantBadge icon={icon} {...rest} />;
  }
};
