import { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRHF } from '../testing/rhf';
import { Text } from '../text/Text';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('can be rendered', async () => {
    render(<TextArea label="TextArea" />);
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toBeInTheDocument();
  });
  it('with custom label can be rendered', async () => {
    render(<TextArea label={<Text>TextArea</Text>} />);
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toBeInTheDocument();
  });
  it('is focused when clicking label', async () => {
    const user = userEvent.setup();
    render(<TextArea label="TextArea" />);
    await user.click(screen.getByText('TextArea'));
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toHaveFocus();
  });
  it('can be typed', async () => {
    const user = userEvent.setup();
    render(<TextArea label="TextArea" />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    await user.type(textArea, 'Hello World');
    expect(textArea).toHaveValue('Hello World');
  });
  it('can have default value', async () => {
    render(<TextArea label="TextArea" defaultValue="Hello World" />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    expect(textArea).toHaveValue('Hello World');
  });
  it('cannot be typed when disabled', async () => {
    const user = userEvent.setup();
    render(<TextArea disabled label="TextArea" />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    await user.type(textArea, 'Hello World');
    expect(textArea).not.toHaveValue('Hello World');
  });
  it('accpects line breaks', async () => {
    const user = userEvent.setup();
    render(<TextArea label="TextArea" />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    await user.type(
      textArea,
      `Hello
World`,
    );
    expect(textArea).toHaveValue(`Hello
World`);
  });
  it('with error is invalid', async () => {
    render(<TextArea label="TextArea" error />);
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toBeInvalid();
  });
  it('with required shows error when value is empty', async () => {
    render(<TextArea label="TextArea" required />);
    expect(screen.getByRole('textbox', { name: 'TextArea *' })).toBeInvalid();
  });
  it('with helperText shows description', async () => {
    render(<TextArea label="TextArea" helperText="Description" />);
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toHaveAccessibleDescription('Description');
  });
  it('with error and helperText shows error message', async () => {
    render(<TextArea label="TextArea" error helperText="Something wrong" />);
    expect(screen.getByRole('textbox', { name: 'TextArea' })).toHaveAccessibleErrorMessage('Something wrong');
  });
});

describe('Controlled TextArea', () => {
  it('can handle onChange event callback', async () => {
    const user = userEvent.setup();
    const onChange: ComponentPropsWithoutRef<typeof TextArea>['onChange'] = vi.fn();
    render(<TextArea label="TextArea" onChange={onChange} />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    await user.type(textArea, 'Hello World');
    expect(onChange).toHaveBeenCalled();
  });
  it('can get typed value', async () => {
    const user = userEvent.setup();
    const onChange: ComponentPropsWithoutRef<typeof TextArea>['onChange'] = vi.fn((e) => e.target.value);
    render(<TextArea label="TextArea" onChange={onChange} />);
    const textArea = screen.getByRole('textbox', { name: 'TextArea' });
    await user.type(textArea, 'Hello World');
    expect(onChange).toHaveLastReturnedWith('Hello World');
  });
});

describe('Uncontrolled TextArea with RHF', () => {
  it('can be typed', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((value) => value);
    const { Form, submit } = withRHF<{ textArea: string }>({
      onSubmit,
      Component: ({ register }) => <TextArea label="TextArea" {...register('textArea')} />,
    });
    render(<Form />);
    await user.type(screen.getByRole('textbox', { name: 'TextArea' }), 'Hello World');
    await submit();
    expect(onSubmit).toHaveReturnedWith({
      textArea: 'Hello World',
    });
  });
});
