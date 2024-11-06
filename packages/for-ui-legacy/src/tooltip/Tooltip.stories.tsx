import { forwardRef } from 'react';
import { MdOutlineInfo } from 'react-icons/md';
import { Meta, StoryObj } from '@storybook/react/types-6-0';
import { Tooltip, TooltipFrame, TooltipProps } from './Tooltip';

type Story = StoryObj<TooltipProps>;

const TooltipIcon = forwardRef<HTMLSpanElement, object>((props, ref) => (
  <span ref={ref} {...props} className="items-self-end inline-flex w-fit">
    <MdOutlineInfo />
  </span>
));

export default {
  title: 'Feedback / Tooltip',
  component: Tooltip,
} as Meta<typeof Tooltip>;

export const Playground: Story = {
  args: {
    title: 'テキスト',
    children: <TooltipIcon />,
  },
};

export const FrameOnly: Story = {
  args: {
    title: 'テキスト',
  },
  render: (props) => <TooltipFrame {...props} />,
};
