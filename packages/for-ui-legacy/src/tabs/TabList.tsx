import { FC } from 'react';
import MuiTabList, { TabListProps as MuiTabListProps } from '@mui/lab/TabList';
import { fsx } from '../system/fsx';
import { tabWrapperStyle } from './style';

export interface TabListProps extends MuiTabListProps {
  noBorder?: boolean;
  reverse?: boolean;
  intention?: 'primary' | 'secondary';
}

export const TabList: FC<TabListProps> = ({ intention = 'primary', className, ...rest }) => (
  <MuiTabList className={fsx(tabWrapperStyle(intention), className)} {...rest} />
);
