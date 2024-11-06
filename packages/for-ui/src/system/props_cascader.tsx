import { Children, cloneElement, FC, ForwardedRef, forwardRef, HTMLAttributes, isValidElement, ReactNode } from 'react';

type PropsCascaderProps<T extends HTMLAttributes<HTMLElement>> = T & {
  children: ReactNode;
};

type PropsCascaderComponent = <T extends HTMLAttributes<HTMLElement>>(props: PropsCascaderProps<T>) => ReturnType<FC>;

export const PropsCascader: PropsCascaderComponent = forwardRef(
  <T extends HTMLAttributes<HTMLElement>>(
    { children, ...props }: PropsCascaderProps<T>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    return Children.map(children, (child: ReactNode) => {
      if (!isValidElement(child)) {
        return child;
      }
      return cloneElement(child, { ...props, ...child.props, ref });
    });
  },
);
