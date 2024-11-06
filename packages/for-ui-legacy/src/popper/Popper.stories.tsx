import * as React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button/Button';
import { MenuItem } from '../menu';
import { Text } from '../text';
import { Popper } from './Popper';

export default {
  title: 'Navigation / Popper',
  component: Popper,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <div className="mt-10 flex h-screen w-screen flex-col gap-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Base = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 border-b">
        <Text as="h3" size="l" weight="bold">
          Popper
        </Text>
      </div>

      <Popper TriggerComponent={<Button variant="filled">プロジェクト</Button>}>
        <div className="w-80">
          <div>こんにちは</div>
          <div>こんにちは</div>
          <div>こんにちは</div>
        </div>
      </Popper>
    </div>
  );
};

export const WithCustomClose = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 border-b">
        <Text as="h3" size="l" weight="bold">
          Popper
        </Text>
      </div>

      <Popper<HTMLLIElement> TriggerComponent={<Button variant="filled">プロジェクト</Button>}>
        {({ onClick }) => (
          <div>
            <MenuItem>プロフィール</MenuItem>
            <MenuItem>設定</MenuItem>
            <MenuItem onClick={onClick}>閉じる</MenuItem>
          </div>
        )}
      </Popper>
    </div>
  );
};
