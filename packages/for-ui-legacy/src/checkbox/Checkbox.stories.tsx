import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

export default {
  title: 'Form / Checkbox',
  component: Checkbox,
  decorators: [(Story) => <Story />],
} as Meta;

export const Playground = {
  args: {
    label: '',
    disabled: false,
    checked: false,
    indeterminate: false,
  },
};

export const Basic = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => console.info(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="border-shade-light-default rounded-md border p-6 pb-8">
          <Text as="p" weight="bold" className="mb-1">
            ラベル
          </Text>

          <div className="grid grid-cols-3">
            <Checkbox label="テスト A" {...register('sample-a')} />
            <Checkbox label="テスト B" {...register('sample-b')} />
            <Checkbox label="テスト C" {...register('sample-c')} />
            <Checkbox label="テスト D" {...register('sample-d')} />
          </div>
        </div>
      </div>

      <Button type="submit">登録</Button>
    </form>
  );
};

export const WithNopadding = (): JSX.Element => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => console.info(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="border-shade-light-default rounded-md border p-6 pb-8">
          <Text as="p" weight="bold" className="mb-1">
            ラベル
          </Text>

          <div className="grid grid-cols-3">
            <Checkbox nopadding label="テスト A" {...register('sample-a')} />
            <Checkbox nopadding label="テスト B" {...register('sample-b')} />
            <Checkbox nopadding label="テスト C" {...register('sample-c')} />
            <Checkbox nopadding label="テスト D" {...register('sample-d')} />
          </div>
        </div>
      </div>

      <Button type="submit">登録</Button>
    </form>
  );
};

const allPreferences = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
} as const;

const schema = yup.object({
  preferences: yup.object(Object.fromEntries(Object.keys(allPreferences).map((k) => [k, yup.boolean()]))),
});

type FieldValue = yup.InferType<typeof schema>;

export const WithCheckboxGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue>({
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback((data: unknown) => {
    console.info(data);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={fsx(`flex flex-col gap-8`)}>
      <CheckboxGroup
        required
        label="好きな季節"
        error={!!errors['preferences']}
        helperText={errors['preferences'] && '必須です'}
      >
        <Checkbox label="春" value={true} {...register('preferences.spring')} />
        <Checkbox label="夏" value={true} {...register('preferences.summer')} />
        <Checkbox label="秋" value={true} {...register('preferences.autumn')} />
        <Checkbox label="冬" value={true} {...register('preferences.winter')} />
        <Checkbox label="雨季" value={true} disabled />
      </CheckboxGroup>
      <Button type="submit">保存</Button>
    </form>
  );
};

export const CustomLabel = () => (
  <Checkbox
    label={
      <Text size="xl" weight="bold" className="text-shade-medium-default">
        ラベル
      </Text>
    }
  />
);
