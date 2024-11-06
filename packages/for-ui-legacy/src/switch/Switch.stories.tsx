import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { Switch } from './Switch';
import { SwitchGroup } from './SwitchGroup';

export default {
  title: 'Form / Switch',
  component: Switch,
  argTypes: {},
} as Meta;

export const Basic = (): JSX.Element => {
  const { control, handleSubmit } = useForm<{
    default1: boolean;
    default2: boolean;
    disable1: boolean;
    disable2: boolean;
  }>({
    reValidateMode: 'onChange',
  });

  const onSubmit = (data: unknown) => console.info(data);

  return (
    <div className="flex flex-row gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <SwitchGroup required label="サービス名">
          <Controller
            control={control}
            name="default1"
            defaultValue={false}
            render={({ field: { name, value, onChange } }) => {
              return <Switch name={name} label="default1" checked={value} onChange={onChange} />;
            }}
          />
          <Controller
            control={control}
            name="default2"
            defaultValue={true}
            render={({ field: { name, value, onChange } }) => {
              return <Switch name={name} label="default2" checked={value} onChange={onChange} />;
            }}
          />
          <Controller
            control={control}
            name="disable1"
            defaultValue={false}
            render={({ field: { name, value, onChange } }) => {
              return <Switch name={name} label="disable1" checked={value} disabled onChange={onChange} />;
            }}
          />
          <Controller
            control={control}
            name="disable2"
            defaultValue={true}
            render={({ field: { name, value, onChange } }) => {
              return <Switch name={name} label="disable2" checked={value} disabled onChange={onChange} />;
            }}
          />
        </SwitchGroup>

        <div className="mt-8">
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </div>
  );
};

export const WithReactHookForm = () => {
  const schema = yup.object({
    autosave: yup.string().required(),
  });
  type FieldValue = yup.InferType<typeof schema>;

  const { register, handleSubmit } = useForm<FieldValue>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: unknown) => {
    console.info(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Switch label="自動保存" {...register('autosave')} />
      <Button type="submit">送信</Button>
    </form>
  );
};

export const WithSwitchGroup = () => {
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
      <SwitchGroup
        required
        label="好きな季節"
        error={!!errors['preferences']}
        helperText={errors['preferences'] && '必須です'}
      >
        <Switch label="春" {...register('preferences.spring')} />
        <Switch label="夏" {...register('preferences.summer')} />
        <Switch label="秋" {...register('preferences.autumn')} />
        <Switch label="冬" {...register('preferences.winter')} />
        <Switch label="雨季" disabled />
      </SwitchGroup>
      <Button type="submit">保存</Button>
    </form>
  );
};

export const CustomLabel = () => (
  <Switch
    label={
      <Text size="xl" weight="bold" className="text-shade-medium-default">
        ラベル
      </Text>
    }
  />
);
