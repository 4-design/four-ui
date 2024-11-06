import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  height?: number | string;
}>;

export const TableScroller = ({ height, ...rest }: Props) => (
  <div
    style={{
      height: height ? height : 'auto',
    }}
    {...rest}
  />
);
