import { fsx } from '../system/fsx';

export const tabWrapperStyle = (intention: 'primary' | 'secondary') =>
  fsx([
    `border-shade-light-default h-10 min-h-min w-full overflow-visible border-b border-solid [&_.MuiTabs-indicator]:hidden [&_.MuiTabs-scroller]:h-10`,
    {
      primary: `[&_[aria-selected=true]]:text-primary-dark-default [&_[aria-selected=true]]:border-b-primary-dark-default`,
      secondary: `[&_[aria-selected=true]]:text-secondary-dark-default [&_[aria-selected=true]]:border-b-secondary-dark-default`,
    }[intention],
  ]);
