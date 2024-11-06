import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { MenuDivider } from './MenuDivider';

export default {
  title: 'Navigation / Menu / MenuDivider',
  component: MenuDivider,
  decorators: [
    (Story: Story) => (
      <div className="m-4 flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Playground = {};
