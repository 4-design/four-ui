import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Text } from '../text';
import { Step } from './Step';
import { Stepper } from './Stepper';

export default {
  title: 'Navigation / Stepper',
  component: Stepper,
  argTypes: {
    activeStep: { control: { min: 1 } },
    alternativeLabel: { control: 'boolean' },
    backgroundColor: { control: 'color' },
  },
  decorators: [(Story: Story) => <Story />],
} as Meta;

const steps = ['First', 'Second', 'Third', 'Last'];

export const LabelBottom: Story = (args) => (
  <div className="flex flex-col gap-6">
    <Text as="h3" size="l" weight="bold">
      Stepper
    </Text>
    <Stepper labelPosition="bottom" activeStep={0} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="bottom" activeStep={1} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="bottom" activeStep={2} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="bottom" activeStep={3} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
  </div>
);

export const LabelTrailing: Story = (args) => (
  <div className="flex flex-col gap-6">
    <Text as="h3" size="l" weight="bold">
      Stepper
    </Text>
    <Stepper labelPosition="trailing" activeStep={0} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="trailing" activeStep={1} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="trailing" activeStep={2} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
    <Stepper labelPosition="trailing" activeStep={3} {...args}>
      {steps.map((step, index) => (
        <Step key={index}>{step}</Step>
      ))}
    </Stepper>
  </div>
);
