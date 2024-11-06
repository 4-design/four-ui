import React from 'react';
import {
  MdAttachFile,
  MdDeleteOutline,
  MdOutlineDownload,
  MdOutlineEdit,
  MdOutlineMail,
  MdOutlinePhone,
} from 'react-icons/md';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Text } from '../text';
import { Chip } from './Chip';

const sampleIcons = {
  undefined,
  MdAttachFile: <MdAttachFile />,
  MdDeleteOutline: <MdDeleteOutline />,
  MdOutlineEdit: <MdOutlineEdit />,
  MdOutlinePhone: <MdOutlinePhone />,
  MdOutlineMail: <MdOutlineMail />,
};

export default {
  title: 'Form / Chip',
  component: Chip,
  decorators: [
    (Story: Story) => (
      <div className="flex h-full w-full flex-col gap-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    icon: {
      options: Object.keys(sampleIcons),
      mapping: sampleIcons,
    },
    onClick: {
      control: 'select',
      options: ['action'],
      mapping: { action: action('chip') },
    },
  },
} as Meta;

export const Playground = {
  args: {
    label: 'ラベル',
    onClick: 'action',
  },
};

export const Base = () => (
  <div className="flex flex-col gap-4">
    <Text as="h3" weight="bold" size="l">
      Chip
    </Text>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Shade</Text>
      <Chip label="yuzuna_kanda.pdf" intention="shade" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="shade" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="shade" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="shade"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Primary</Text>
      <Chip label="yuzuna_kanda.pdf" intention="primary" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="primary" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="primary" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="primary"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Secondary</Text>
      <Chip label="yuzuna_kanda.pdf" intention="secondary" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="secondary" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="secondary" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="secondary"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Positive</Text>
      <Chip label="yuzuna_kanda.pdf" intention="positive" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="positive" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="positive" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="positive"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Negative</Text>
      <Chip label="yuzuna_kanda.pdf" intention="negative" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="negative" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="negative" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="negative"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Notice</Text>
      <Chip label="yuzuna_kanda.pdf" intention="notice" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="notice" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="notice" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="notice"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
    <div className="flex flex-col gap-4">
      <Text weight="bold">Informative</Text>
      <Chip label="yuzuna_kanda.pdf" intention="informative" onClick={action('chip')} />
      <Chip label="yuzuna_kanda.pdf" intention="informative" onClick={action('chip')} icon={<MdAttachFile />} />
      <Chip label="yuzuna_kanda.pdf" intention="informative" onClick={action('chip')} clickableArea="limited" />
      <Chip
        label="yuzuna_kanda.pdf"
        intention="informative"
        onClick={action('chip')}
        clickableArea="limited"
        icon={<MdOutlineDownload />}
      />
    </div>
  </div>
);
