import { FC } from 'react';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { BadgeProps } from './Badge';

export const TextBadge: FC<Omit<BadgeProps, 'variant'>> = ({ intention = 'subtle', icon, label, className }) => (
  <span
    className={fsx([
      `flex h-fit w-fit flex-row items-center justify-center gap-1 rounded px-2`,
      {
        subtle: `bg-shade-light-default text-shade-dark-default`,
        shade: `bg-shade-white-default text-shade-dark-default`,
        primary: `bg-primary-light-default text-primary-dark-default`,
        secondary: `bg-secondary-light-default text-secondary-dark-default`,
        positive: `bg-positive-light-default text-positive-dark-default`,
        negative: `bg-negative-light-default text-negative-dark-default`,
        notice: `bg-notice-light-default text-notice-dark-default`,
        informative: `bg-informative-light-default text-informative-dark-default`,
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
