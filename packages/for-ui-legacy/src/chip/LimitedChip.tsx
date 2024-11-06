import { ElementType, forwardRef } from 'react';
import { MdClose } from 'react-icons/md';
import { Element, Ref } from '../system/componentType';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { ChipProps } from './Chip';

type LimitedChipProps<As extends ElementType = 'span'> = Omit<ChipProps<As>, 'clickableArea'>;

type LimitedChipComponent = <As extends ElementType = 'span'>(props: LimitedChipProps<As>) => Element;

export const LimitedChip: LimitedChipComponent = forwardRef(
  <As extends ElementType = 'span'>(props: LimitedChipProps<As>, ref: Ref<As>) => {
    const { as, label, icon = <MdClose />, intention = 'shade', onClick, className, ...rest } = props;
    const Component: ElementType = as || 'button';

    return (
      <span
        ref={ref}
        className={fsx([
          `shadow-attractive inline-flex h-fit w-fit flex-row items-center justify-center gap-1 break-keep rounded px-2 pr-0 outline outline-1 -outline-offset-1`,
          {
            shade: `bg-shade-white-default outline-shade-medium-default`,
            primary: `bg-primary-light-default outline-primary-medium-default`,
            secondary: `bg-secondary-light-default outline-secondary-medium-default`,
            positive: `bg-positive-light-default outline-positive-medium-default`,
            negative: `bg-negative-light-default outline-negative-medium-default`,
            notice: `bg-notice-light-default outline-notice-medium-default`,
            informative: `bg-informative-light-default outline-informative-medium-default`,
          }[intention],
          className,
        ])}
      >
        <Text
          size="r"
          className={fsx([
            `flex items-center`,
            {
              shade: `text-shade-dark-default`,
              primary: `text-primary-dark-default`,
              secondary: `text-secondary-dark-default`,
              positive: `text-positive-dark-default`,
              negative: `text-negative-dark-default`,
              notice: `text-notice-dark-default`,
              informative: `text-informative-dark-default`,
            }[intention],
          ])}
        >
          {label}
        </Text>
        <Component
          onClick={onClick}
          className={fsx([
            `focus-visible:shadow-focused flex h-6 w-6 flex-row items-start rounded-r p-1 outline outline-1 -outline-offset-1 [&_svg]:h-full [&_svg]:w-full`,
            {
              shade: `icon-shade-dark-default hover:bg-shade-white-hover focus-visible:bg-shade-white-hover outline-shade-light-default hover:outline-shade-medium-default focus-visible:outline-shade-medium-default`,
              primary: `icon-primary-dark-default hover:bg-primary-light-hover focus-visible:bg-primary-light-hover outline-primary-light-default hover:outline-primary-medium-default focus-visible:outline-primary-medium-default`,
              secondary: `icon-secondary-dark-default hover:bg-secondary-light-hover outline-secondary-light-default hover:outline-secondary-medium-default focus-visible:outline-secondary-medium-default`,
              positive: `icon-positive-dark-default hover:bg-positive-light-hover focus-visible:bg-positive-light-hover outline-positive-light-default hover:outline-positive-medium-default focus-visible:outline-positive-medium-default`,
              negative: `icon-negative-dark-default hover:bg-negative-light-hover focus-visible:bg-negative-light-hover outline-negative-light-default hover:outline-negative-medium-default focus-visible:outline-negative-medium-default`,
              notice: `icon-notice-dark-default hover:bg-notice-light-hover focus-visible:bg-notice-light-hover outline-notice-light-default hover:outline-notice-medium-default focus-visible:outline-notice-medium-default`,
              informative: `icon-informative-dark-default hover:bg-informative-light-hover focus-visible:bg-informative-light-hover outline-informative-light-default hover:outline-informative-medium-default focus-visible:outline-informative-medium-default`,
            }[intention],
          ])}
          {...rest}
        >
          {icon}
        </Component>
      </span>
    );
  },
);
