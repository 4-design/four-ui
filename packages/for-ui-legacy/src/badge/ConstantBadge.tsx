import { FC } from 'react';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { ConstantBadgeProps } from './Badge';

export const ConstantBadge: FC<Omit<ConstantBadgeProps, 'variant'>> = ({
  intention = 'subtle',
  icon,
  label,
  className,
}) => (
  <span
    className={fsx([
      `flex h-fit w-fit flex-row items-start gap-1`,
      {
        shade: `text-shade-dark-default`,
        subtle: `text-shade-medium-default`,
        primary: `text-primary-dark-default`,
        secondary: `text-secondary-dark-default`,
        positive: `text-positive-dark-default`,
        negative: `text-negative-dark-default`,
        notice: `text-notice-dark-default`,
        informative: `text-informative-dark-default`,
      }[intention],
      className,
    ])}
  >
    <span
      className={fsx([
        `icon-shade-white-default my-1 flex w-4 flex-row items-start rounded-full p-0.5 [&>svg]:h-full [&>svg]:w-full`,
        {
          subtle: `bg-shade-medium-default`,
          shade: `bg-shade-dark-default`,
          primary: `bg-primary-dark-default`,
          secondary: `bg-secondary-dark-default`,
          positive: `bg-positive-dark-default`,
          negative: `bg-negative-dark-default`,
          notice: `bg-notice-dark-default`,
          informative: `bg-informative-dark-default`,
        }[intention],
      ])}
    >
      {icon}
    </span>
    <Text size="r" weight="bold">
      {label}
    </Text>
  </span>
);
