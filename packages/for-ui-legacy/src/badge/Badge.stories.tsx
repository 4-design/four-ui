import React from 'react';
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineMail,
  MdOutlinePhone,
  MdPersonOutline,
  MdPriorityHigh,
} from 'react-icons/md';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Badge } from './Badge';

const sampleIcons = {
  undefined,
  MdDeleteOutline: <MdDeleteOutline />,
  MdOutlineEdit: <MdOutlineEdit />,
  MdOutlinePhone: <MdOutlinePhone />,
  MdOutlineMail: <MdOutlineMail />,
  MdPersonOutline: <MdPersonOutline />,
  MdPriorityHigh: <MdPriorityHigh />,
};

export default {
  title: 'Data Display / Badge',
  component: Badge,
  argTypes: {
    icon: {
      options: Object.keys(sampleIcons),
      mapping: sampleIcons,
    },
  },
} as Meta;

export const Playground = {
  args: {
    label: 'バッジ',
    variant: 'text',
    intention: 'subtle',
    icon: MdDeleteOutline,
  },
};

export const Constant: Story = () => (
  <div className="flex flex-row gap-8">
    <div className="flex flex-col gap-4">
      <Badge variant="constant" intention="subtle" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="shade" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="primary" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="secondary" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="positive" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="negative" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="notice" label="注意書き" icon={<MdPriorityHigh />} />
      <Badge variant="constant" intention="informative" label="注意書き" icon={<MdPriorityHigh />} />
    </div>
  </div>
);

export const Text: Story = () => (
  <div className="flex flex-row gap-8">
    <div className="flex flex-col gap-4">
      <Badge variant="text" intention="subtle" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="shade" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="primary" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="secondary" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="positive" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="negative" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="notice" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="text" intention="informative" label="神田 柚奈" icon={<MdPersonOutline />} />
    </div>
  </div>
);

export const Outlined: Story = () => (
  <div className="flex flex-row gap-8">
    <div className="flex flex-col gap-4">
      <Badge variant="outlined" intention="subtle" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="shade" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="primary" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="secondary" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="positive" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="negative" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="notice" label="神田 柚奈" icon={<MdPersonOutline />} />
      <Badge variant="outlined" intention="informative" label="神田 柚奈" icon={<MdPersonOutline />} />
    </div>
  </div>
);
