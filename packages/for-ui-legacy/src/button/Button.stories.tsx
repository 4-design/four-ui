import React, { useState } from 'react';
import { MdCheck, MdSync } from 'react-icons/md';
import { Meta } from '@storybook/react/types-6-0';
import { Text } from '../text';
import { Button, ButtonProps } from './Button';

const childrenStructures = {
  text: 'ボタン',
  icon: <MdCheck />,
  textIcon: ['ボタン', <MdCheck key={0} />],
  iconText: [<MdCheck key={0} />, 'ボタン'],
};

export default {
  title: 'General / Button',
  component: Button,
  argTypes: {
    children: {
      options: Object.keys(childrenStructures),
      mapping: childrenStructures,
    },
  },
} as Meta;

export const Playground = {
  args: {
    children: 'text',
  },
};

export const Filled = (): JSX.Element => (
  <dl className="flex flex-col gap-8">
    <Text as="dt" size="l" weight="bold">
      Button/Filled/Large
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button variant="filled">ボタン</Button>
        <Button variant="filled" disabled>
          ボタン
        </Button>
        <Button variant="filled" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="filled">
          <MdCheck />
          ボタン
        </Button>
        <Button variant="filled" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button variant="filled" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="filled">
          ボタン
          <MdCheck />
        </Button>
        <Button variant="filled" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button variant="filled" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="filled">
          <MdCheck />
        </Button>
        <Button variant="filled" disabled>
          <MdCheck />
        </Button>
        <Button variant="filled" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Filled/Medium
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="filled">
          ボタン
        </Button>
        <Button size="medium" variant="filled" disabled>
          ボタン
        </Button>
        <Button size="medium" variant="filled" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="filled">
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="filled" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="filled" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="filled">
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="filled" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="filled" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="filled">
          <MdCheck />
        </Button>
        <Button size="medium" variant="filled" disabled>
          <MdCheck />
        </Button>
        <Button size="medium" variant="filled" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Filled/Small
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="small" variant="filled">
          ボタン
        </Button>
        <Button size="small" variant="filled" disabled>
          ボタン
        </Button>
        <Button size="small" variant="filled" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="filled">
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="filled" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="filled" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="filled">
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="filled" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="filled" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="filled">
          <MdCheck />
        </Button>
        <Button size="small" variant="filled" disabled>
          <MdCheck />
        </Button>
        <Button size="small" variant="filled" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>
  </dl>
);

export const Outlined = (): JSX.Element => (
  <dl className="flex flex-col gap-8">
    <Text as="dt" size="l" weight="bold">
      Button/Outlined/Large
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button variant="outlined">ボタン</Button>
        <Button variant="outlined" disabled>
          ボタン
        </Button>
        <Button variant="outlined" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="outlined">
          <MdCheck />
          ボタン
        </Button>
        <Button variant="outlined" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button variant="outlined" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="outlined">
          ボタン
          <MdCheck />
        </Button>
        <Button variant="outlined" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button variant="outlined" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="outlined">
          <MdCheck />
        </Button>
        <Button variant="outlined" disabled>
          <MdCheck />
        </Button>
        <Button variant="outlined" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Outlined/Medium
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="outlined">
          ボタン
        </Button>
        <Button size="medium" variant="outlined" disabled>
          ボタン
        </Button>
        <Button size="medium" variant="outlined" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="outlined">
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="outlined" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="outlined" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="outlined">
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="outlined" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="outlined" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="outlined">
          <MdCheck />
        </Button>
        <Button size="medium" variant="outlined" disabled>
          <MdCheck />
        </Button>
        <Button size="medium" variant="outlined" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Outlined/Small
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="small" variant="outlined">
          ボタン
        </Button>
        <Button size="small" variant="outlined" disabled>
          ボタン
        </Button>
        <Button size="small" variant="outlined" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="outlined">
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="outlined" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="outlined" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="outlined">
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="outlined" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="outlined" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="outlined">
          <MdCheck />
        </Button>
        <Button size="small" variant="outlined" disabled>
          <MdCheck />
        </Button>
        <Button size="small" variant="outlined" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>
  </dl>
);

export const _Text = (): JSX.Element => (
  <dl className="flex flex-col gap-8">
    <Text as="dt" size="l" weight="bold">
      Button/Text/Large
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button variant="text">ボタン</Button>
        <Button variant="text" disabled>
          ボタン
        </Button>
        <Button variant="text" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="text">
          <MdCheck />
          ボタン
        </Button>
        <Button variant="text" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button variant="text" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="text">
          ボタン
          <MdCheck />
        </Button>
        <Button variant="text" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button variant="text" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="text">
          <MdCheck />
        </Button>
        <Button variant="text" disabled>
          <MdCheck />
        </Button>
        <Button variant="text" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Text/Medium
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="text">
          ボタン
        </Button>
        <Button size="medium" variant="text" disabled>
          ボタン
        </Button>
        <Button size="medium" variant="text" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="text">
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="text" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="medium" variant="text" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="text">
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="text" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="medium" variant="text" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="medium" variant="text">
          <MdCheck />
        </Button>
        <Button size="medium" variant="text" disabled>
          <MdCheck />
        </Button>
        <Button size="medium" variant="text" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>

    <Text as="dt" size="l" weight="bold">
      Button/Text/Small
    </Text>
    <dd className="flex flex-row gap-8">
      <div className="flex flex-col gap-4">
        <Button size="small" variant="text">
          ボタン
        </Button>
        <Button size="small" variant="text" disabled>
          ボタン
        </Button>
        <Button size="small" variant="text" loading>
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="text">
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="text" disabled>
          <MdCheck />
          ボタン
        </Button>
        <Button size="small" variant="text" loading>
          <MdCheck />
          ボタン
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="text">
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="text" disabled>
          ボタン
          <MdCheck />
        </Button>
        <Button size="small" variant="text" loading>
          ボタン
          <MdCheck />
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Button size="small" variant="text">
          <MdCheck />
        </Button>
        <Button size="small" variant="text" disabled>
          <MdCheck />
        </Button>
        <Button size="small" variant="text" loading>
          <MdCheck />
        </Button>
      </div>
    </dd>
  </dl>
);

export const Loading = (args: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      }}
      {...args}
    >
      <MdSync />
      データを更新
    </Button>
  );
};
