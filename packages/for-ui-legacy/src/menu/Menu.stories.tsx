import React from 'react';
import { MdDeleteOutline, MdOutlineEdit, MdOutlineMail, MdOutlinePhone } from 'react-icons/md';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button/Button';
import { Text } from '../text';
import { Menu } from './Menu';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';
import { MenuList } from './MenuList';

export default {
  title: 'Navigation / Menu',
  component: Menu,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any) => (
      <div className="flex h-full w-full flex-col gap-4">
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Base = () => {
  return (
    <div className="flex flex-col gap-8">
      <Text as="h3" size="xl" className="border-b">
        Menu
      </Text>

      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        TriggerComponent={<Button variant="filled">プロジェクト</Button>}
      >
        <MenuItem>
          <a href="#">プロフィール</a>
        </MenuItem>
        <MenuItem>
          <a href="#">設定</a>
        </MenuItem>
        <MenuItem>
          <a href="#">プロフィール</a>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const WithIcon = () => {
  return (
    <div className="flex flex-col gap-8">
      <Text as="h3" size="xl" className="border-b">
        Menu
      </Text>

      <Menu
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        TriggerComponent={<Button>メニューを開く</Button>}
      >
        <MenuItem icon={<MdOutlineEdit />}>編集</MenuItem>
        <MenuItem intention="negative" icon={<MdDeleteOutline />}>
          削除
        </MenuItem>
        <MenuDivider />
        <MenuItem
          disabled
          description={
            <Text>
              電話での問い合わせは今年度末のリリース予定しています。
              <br />
              使用可能になり次第、ダッシュボードでお知らせします。
            </Text>
          }
          icon={<MdOutlinePhone />}
        >
          電話で問い合わせ
        </MenuItem>
        <MenuItem description="デフォルトのメーラーが開きます。" icon={<MdOutlineMail />}>
          メールで問い合わせ
        </MenuItem>
      </Menu>
    </div>
  );
};

export const WithMenuList = () => (
  <MenuList>
    <MenuItem>プロフィール</MenuItem>
    <MenuItem>設定</MenuItem>
    <MenuItem>コンタクト</MenuItem>
  </MenuList>
);
