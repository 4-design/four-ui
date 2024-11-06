import React from 'react';
import { MdDeleteOutline, MdOutlineEdit, MdOutlineMail, MdOutlinePhone } from 'react-icons/md';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MenuItem } from './MenuItem';

const sampleIcons = {
  undefined,
  MdDeleteOutline: <MdDeleteOutline />,
  MdOutlineEdit: <MdOutlineEdit />,
  MdOutlinePhone: <MdOutlinePhone />,
  MdOutlineMail: <MdOutlineMail />,
};

export default {
  title: 'Navigation / Menu / MenuItem',
  component: MenuItem,
  argTypes: {
    icon: {
      options: Object.keys(sampleIcons),
      mapping: sampleIcons,
    },
  },
  decorators: [
    (Story: Story) => (
      <div className="m-4 flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Playground = {
  args: {
    children: 'メニューアイテム',
    intention: 'shade',
    icon: <MdDeleteOutline />,
    description: '説明文',
  },
};
