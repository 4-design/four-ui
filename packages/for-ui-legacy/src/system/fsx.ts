// fsx merges tailwind classes and other classes along with For Design System Token.
import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [
      {
        text: ['xs', 's', 'r', 'xr', 'l', 'xl'],
      },
    ],
  },
});

export const fsx = (...classes: ClassValue[]): string => twMerge(clsx(classes));
