import { Meta } from '@storybook/react/types-6-0';
import { Text } from './Text';

export default {
  title: 'General / Text',
  component: Text,
} as Meta;

export const Base = {
  args: {
    children: '「For Design System」で叶えるデザインシステムの夢。',
    as: 'span',
  },
};
