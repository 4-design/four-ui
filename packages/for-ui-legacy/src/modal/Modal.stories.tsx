import React from 'react';
import { useState } from '@storybook/addons';
import { Meta } from '@storybook/react/types-6-0';
import { Modal } from '.';
import { Button } from '../button';
import { ModalContent } from './ModalContent';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

export default {
  title: 'Feedback / Modal',
  component: Modal,
} as Meta;

export const ModalDefault = (): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(true);

  const onSubmit = () => {
    console.error('submit');
  };

  return (
    <div className="flex flex-col">
      <h1>Default Modal</h1>
      <div className="mt-4 flex flex-col">
        <Button className="w-48" color="default" variant="filled" onClick={() => setShowModal(true)}>
          確認
        </Button>

        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <ModalHeader>本当に削除してよろしいですか？</ModalHeader>
          <ModalContent>
            <p className="text-shade-dark-default text-sm leading-5">
              アカウントを無効にしてもよろしいですか？すべてのデータは完全に削除されます。このアクションは元に戻せません。
            </p>
          </ModalContent>
          <ModalFooter>
            <Button type="submit" variant="filled" color="primary" className="ml-8" onClick={onSubmit}>
              登録
            </Button>
            <Button variant="text" color="default" onClick={() => setShowModal(false)}>
              キャンセル
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
