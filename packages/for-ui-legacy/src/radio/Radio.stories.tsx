import React, { ChangeEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Meta } from '@storybook/react/types-6-0';
import { Button } from '../button';
import { fsx } from '../system/fsx';
import { Text } from '../text';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Form / Radio',
  component: Radio,
} as Meta;

export const Playground = {};

export const Base = (): JSX.Element => {
  const [selected, setSelected] = React.useState<string>();

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 border-b">
        <Text as="h3" weight="bold" size="l">
          Radio
        </Text>
      </div>

      <div>
        <Radio name="radio-buttons" value="a" checked={selected === 'a'} onChange={handleRadioChange} />
        <Radio name="radio-buttons" value="b" checked={selected === 'b'} onChange={handleRadioChange} />
        <Radio name="radio-buttons" value="c" disabled checked={selected === 'c'} onChange={handleRadioChange} />
        <Radio name="radio-buttons" value="d" disabled checked onChange={handleRadioChange} />
      </div>

      <div>
        <RadioGroup row required label="サービス名" onChange={handleRadioChange} error helperText="必須項目です">
          <Radio label="Relance" value="relance" />
          <Radio label="Sreake Sonar" value="sreake-sonar" />
          <Radio label="Reckoner" value="reckoner" disabled />
        </RadioGroup>
      </div>
    </div>
  );
};

export const WithLabel = (): JSX.Element => {
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.info(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 border-b">
        <Text as="h3" weight="bold" size="l">
          Radio
        </Text>
      </div>

      <div>
        <RadioGroup row required label="サービス名" onChange={handleRadioChange}>
          <Radio label="Relance" value="relance" />
          <Radio label="Sreake Sonar" value="sreake-sonar" />
          <Radio label="Reckoner" value="reckoner" disabled />
        </RadioGroup>
      </div>

      <div>
        <RadioGroup row required label="サービス名" onChange={handleRadioChange} error helperText="必須項目です">
          <Radio label="Relance" value="relance" />
          <Radio label="Sreake Sonar" value="sreake-sonar" />
          <Radio label="Reckoner" value="reckoner" disabled />
        </RadioGroup>
      </div>
    </div>
  );
};

export const WithNopadding = (): JSX.Element => {
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.info(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="mb-4 border-b">
        <Text as="h3" weight="bold" size="l">
          Radio
        </Text>{' '}
      </div>

      <div>
        <RadioGroup row required label="サービス名" onChange={handleRadioChange}>
          <Radio nopadding label="Relance" value="relance" />
          <Radio nopadding label="Sreake Sonar" value="sreake-sonar" />
          <Radio nopadding label="Reckoner" value="reckoner" disabled />
        </RadioGroup>
      </div>
    </div>
  );
};

const preferences = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
} as const;

const schema = yup.object({
  preference: yup.string().oneOf(Object.keys(preferences)).required(),
});

type FieldValue = yup.InferType<typeof schema>;

export const WithRadioGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValue>({
    resolver: yupResolver(schema),
  });
  const onSubmit = useCallback((data: FieldValue) => {
    console.info(data);
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={fsx(`flex flex-col gap-8`)}>
      <RadioGroup
        required
        label="好きな季節"
        error={!!errors['preference']}
        helperText={errors['preference'] && '選択してください'}
        defaultValue="summer"
        {...register('preference')}
      >
        <Radio label="春" value="spring" />
        <Radio label="夏" value="summer" />
        <Radio label="秋" value="autumn" />
        <Radio label="冬" value="winter" />
        <Radio label="雨季" value="rainy_season" disabled />
      </RadioGroup>
      <Button type="submit">保存</Button>
    </form>
  );
};

export const CustomLabel = () => <Radio label={<p className={fsx(`text-shade-medium-default text-xl`)}>hello</p>} />;
