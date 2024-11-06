import { MdErrorOutline } from 'react-icons/md';
import { Meta } from '@storybook/react/types-6-0';
import { Text } from '../text';
import { Callout } from './Callout';

const sampleIcons = {
  undefined,
  MdErrorOutline: <MdErrorOutline />,
};

export default {
  title: 'Feedback / Callout',
  component: Callout,
  argTypes: {
    intention: ['subtle', 'positive', 'negative', 'notice', 'informative'],
    icon: {
      options: Object.keys(sampleIcons),
      mapping: sampleIcons,
    },
  },
} as Meta;

export const Playground = {
  args: {
    children: 'テキスト',
    icon: 'MdErrorOutline',
  },
};

export const Default = () => (
  <div className="flex flex-col gap-4">
    <Text as="h3" size="l">
      アイコンなし
    </Text>
    <Callout intention="subtle">自動診断がオフになっています。</Callout>
    <Callout intention="positive">自動診断がオフになっています。</Callout>
    <Callout intention="negative">自動診断がオフになっています。</Callout>
    <Callout intention="notice">自動診断がオフになっています。</Callout>
    <Callout intention="informative">自動診断がオフになっています。</Callout>
    <Text as="h3" size="l">
      アイコン付き
    </Text>
    <Callout icon={<MdErrorOutline />} intention="subtle">
      自動診断がオフになっています。
    </Callout>
    <Callout icon={<MdErrorOutline />} intention="positive">
      自動診断がオフになっています。
    </Callout>
    <Callout icon={<MdErrorOutline />} intention="negative">
      自動診断がオフになっています。
    </Callout>
    <Callout icon={<MdErrorOutline />} intention="notice">
      自動診断がオフになっています。
    </Callout>
    <Callout icon={<MdErrorOutline />} intention="informative">
      自動診断がオフになっています。
    </Callout>
  </div>
);
