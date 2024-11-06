import { FC } from 'react';
import MuiTabPanel, { TabPanelProps as MuiTabPanelProps } from '@mui/lab/TabPanel';
import { fsx } from '../system/fsx';

export type TabPanelProps = MuiTabPanelProps;

export const TabPanel: FC<TabPanelProps> = ({ className, ...rest }) => (
  <MuiTabPanel className={fsx(`flex w-full p-0 [&[hidden]]:hidden`, className)} {...rest} />
);
