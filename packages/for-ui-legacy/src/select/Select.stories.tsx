import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { Select, SelectOption } from './Select';

export default {
  title: 'Form / Select',
  component: Select,
  decorators: [(Story) => <Story />],
} as Meta;

const countries: SelectOption[] = [
  {
    label: '日本',
    inputValue: 'japan',
  },
  {
    label: 'アメリカ',
    inputValue: 'usa',
  },
  {
    label: 'イギリス',
    inputValue: 'england',
  },
  {
    label: 'スペイン',
    inputValue: 'spain',
  },
];

const skills: Record<string, string> = {
  csharp: 'C#',
  cpp: 'C++',
  cobol: 'COBOL',
  css: 'CSS',
  clang: 'C言語',
  golang: 'Go言語',
  grpc: 'gRPC',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  kotlin: 'Kotlin',
  perl: 'Perl',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  rlang: 'R言語',
  scala: 'Scala',
  swift: 'Swift',
  typescript: 'TypeScript',
} as const;

export const Playground = {
  args: {
    options: countries,
    multiple: false,
    clearable: false,
  },
};

export const Single: Story = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      country1: countries[0],
      country2: countries[0],
    },
  });
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="country1"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              name={name}
              options={countries}
              value={value}
              label="国名1"
              placeholder="選択"
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Controller
        name="country2"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              name={name}
              options={countries}
              value={value}
              label="国名2"
              size="medium"
              placeholder="選択"
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};

export const Multiple: Story = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country1: [],
      country2: [],
    },
  });
  const rules = {
    required: '入力してください',
  };
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="country1"
        rules={rules}
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              name={name}
              options={countries}
              value={value}
              multiple
              label="国名1"
              placeholder="選択"
              error={Boolean(errors.country1)}
              helperText={errors.country1?.message}
              onChange={(_, values) => {
                onChange(values);
              }}
            />
          );
        }}
      />
      <Controller
        name="country2"
        control={control}
        rules={rules}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              name={name}
              options={countries}
              value={value}
              multiple
              label="国名2"
              size="medium"
              placeholder="選択"
              error={Boolean(errors.country2)}
              helperText={errors.country2?.message}
              onChange={(_, values) => {
                onChange(values);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};

export const Disabled: Story = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      country1: countries[0],
      country2: countries[0],
    },
  });
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="country1"
        control={control}
        render={({ field: { onChange, ...fields } }) => {
          return (
            <Select
              {...fields}
              options={countries}
              disabled
              label="国名1"
              placeholder="選択"
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Controller
        name="country2"
        control={control}
        render={({ field: { onChange, ...fields } }) => {
          return (
            <Select
              {...fields}
              options={countries}
              disabled
              label="国名2"
              size="medium"
              placeholder="選択"
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};

export const MultipleFreeSolo: Story = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      skills1: Object.entries(skills).map(([inputValue, label]) => ({
        label,
        inputValue,
      })),
      skills2: Object.entries(skills).map(([inputValue, label]) => ({
        label,
        inputValue,
      })),
    },
  });
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="skills1"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              freeSolo
              multiple
              placeholder="選択"
              name={name}
              value={value}
              options={Object.entries(skills).map(([inputValue, label]) => ({
                label,
                inputValue,
              }))}
              onChange={(_, values) => {
                onChange(values);
              }}
            />
          );
        }}
      />
      <Controller
        name="skills2"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <Select
              freeSolo
              multiple
              size="medium"
              placeholder="選択"
              name={name}
              value={value}
              options={Object.entries(skills).map(([inputValue, label]) => ({
                label,
                inputValue,
              }))}
              onChange={(_, values) => {
                onChange(values);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};

export const DisableFilter: Story = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      country: countries[0],
    },
  });
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="country"
        control={control}
        render={({ field: { onChange, ...fields } }) => {
          return (
            <Select
              {...fields}
              disableFilter
              name={fields.name}
              label="国名"
              placeholder="選択"
              options={countries}
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録</Button>
    </form>
  );
};

export const Clearable = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      country: null,
      countries: [],
    },
  });
  const onSubmit = (data: unknown) => console.info(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="country"
        control={control}
        render={({ field: { onChange, name, ref: _, ...fields } }) => {
          return (
            <Select
              {...fields}
              name={name}
              label="国名"
              clearable
              placeholder="未選択"
              options={countries}
              onChange={(_, value) => {
                onChange(value);
              }}
            />
          );
        }}
      />
      <Controller
        name="countries"
        control={control}
        render={({ field: { onChange, name, ...fields } }) => {
          return (
            <Select
              {...fields}
              name={name}
              label="国名"
              clearable
              multiple
              placeholder="未選択"
              options={countries}
              onChange={(_, values) => {
                onChange(values);
              }}
            />
          );
        }}
      />
      <Button type="submit">登録する</Button>
    </form>
  );
};

export const NoData = () => <Select name="hello" open options={[]} />;
