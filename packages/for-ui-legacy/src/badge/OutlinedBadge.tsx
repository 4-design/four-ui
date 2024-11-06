import { FC } from 'react';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { BadgeProps } from './Badge';

export const OutlinedBadge: FC<Omit<BadgeProps, 'variant'>> = ({ intention = 'subtle', icon, label, className }) => (
  <span
    className={fsx([
      `flex h-fit w-fit flex-row items-center justify-center gap-1 rounded px-2 ring-1 ring-inset`,
      {
        subtle: `bg-shade-light-default text-shade-dark-default ring-shade-light-default`,
        shade: `bg-shade-white-default text-shade-dark-default ring-shade-light-default`,
        primary: `bg-primary-light-default text-primary-dark-default ring-primary-light-default`,
        secondary: `bg-secondary-light-default text-secondary-dark-default ring-secondary-light-default`,
        positive: `bg-positive-light-default text-positive-dark-default ring-positive-light-default`,
        negative: `bg-negative-light-default text-negative-dark-default ring-negative-light-default`,
        notice: `bg-notice-light-default text-notice-dark-default ring-notice-light-default`,
        informative: `bg-informative-light-default text-informative-dark-default ring-informative-light-default`,
      }[intention],
      className,
    ])}
  >
    {icon && (
      <span
        className={fsx([
          {
            subtle: `icon-shade-medium-default`,
            shade: `icon-shade-medium-default`,
            primary: `icon-primary-medium-default`,
            secondary: `icon-secondary-medium-default`,
            positive: `icon-positive-medium-default`,
            negative: `icon-negative-medium-default`,
            notice: `icon-notice-medium-default`,
            informative: `icon-informative-medium-default`,
          }[intention],
        ])}
      >
        {icon}
      </span>
    )}
    <Text size="r" weight="regular">
      {label}
    </Text>
  </span>
);
