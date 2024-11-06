import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { Text } from '../text';
import { Drawer, drawerAnchorPositions } from './Drawer';

export default {
  title: 'Feedback / Drawer',
  component: Drawer,
  argTypes: {
    backgroundcolor: { control: 'color' },
    open: { control: 'boolean' },
    anchor: { options: ['left', 'right'], control: 'select' },
    onClose: { action: 'onClose' },
  },
  decorators: [
    (Story: Story) => (
      <div className="w-full">
        <div className="mb-4 border-b">
          <Text as="h3" size="l" weight="bold">
            Drawer
          </Text>
        </div>

        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story = (args) => (
  <Drawer open={args.open} {...args}>
    <Text as="h4" size="xr" weight="bold">
      Title
    </Text>
    <Text>Children</Text>
    <Text>Children1/Children2</Text>
  </Drawer>
);

export const Base = Template.bind({});
Base.args = {
  open: true,
  backgroundcolor: '#fff',
};

export const WithNavigation = Template.bind({});
WithNavigation.args = {
  open: true,
  navigation: (
    <Button size="medium">
      <MdOutlineEdit />
      編集
    </Button>
  ),
};

export const AnchorLeading = Template.bind({});
AnchorLeading.args = {
  open: true,
  anchor: drawerAnchorPositions.leading,
};

export const AnchorTrailing = Template.bind({});
AnchorTrailing.args = {
  open: true,
  anchor: drawerAnchorPositions.trailing,
};

export const FixedWidthLeading = Template.bind({});
FixedWidthLeading.args = {
  open: true,
  width: 640,
  anchor: drawerAnchorPositions.leading,
};

export const FixedWidthTrailing = Template.bind({});
FixedWidthTrailing.args = {
  open: true,
  width: 640,
  anchor: drawerAnchorPositions.trailing,
};

export const WithTriggerComponent = Template.bind({});
WithTriggerComponent.args = {
  TriggerComponent: <Button>開く</Button>,
  onClose: undefined,
};

export const WithoutBackdrop = Template.bind({});
WithoutBackdrop.args = {
  TriggerComponent: <Button>開く</Button>,
  onClose: undefined,
  hideBackdrop: true,
};
