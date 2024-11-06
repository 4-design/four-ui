import { FC } from 'react';
import { fsx } from '../system/fsx';
import { Loading } from './Loading';

export const Loader: FC<{ className?: string }> = ({ className }) => (
  <Loading className={fsx(`h-4 w-4 motion-safe:animate-spin`, className)} role="img" aria-label="処理中" aria-busy />
);
