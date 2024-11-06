import { ComponentPropsWithoutRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRHF } from '../testing/rhf';
import { Text } from '../text/Text';
import { TextField } from './TextField';

describe('TextField', () => {
  it('can be rendered', async () => {
    render(<TextField label="TextField" />);
    expect(screen.getByRole('textbox', { name: 'TextField' })).toBeInTheDocument();
  });
  it('with custom label can be rendered', async () => {
    render(<TextField label={<Text>TextField</Text>} />);
    expect(screen.getByRole('textbox', { name: 'TextField' })).toBeInTheDocument();
  });
  it('is focused when clicking label', async () => {
    const user = userEvent.setup();
    render(<TextField label="TextField" />);
    await user.click(screen.getByText('TextField'));
    expect(screen.getByRole('textbox', { name: 'TextField' })).toHaveFocus();
  });
  it('can be typed', async () => {
    const user = userEvent.setup();
    render(<TextField label="TextField" />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    await user.type(textField, 'Hello World');
    expect(textField).toHaveValue('Hello World');
  });
  it('can have default value', async () => {
    render(<TextField label="TextField" defaultValue="Hello World" />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    expect(textField).toHaveValue('Hello World');
  });
  it('cannot be typed when disabled', async () => {
    const user = userEvent.setup();
    render(<TextField disabled label="TextField" />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    await user.type(textField, 'Hello World');
    expect(textField).not.toHaveValue('Hello World');
  });
  it('does not accpect line breaks', async () => {
    const user = userEvent.setup();
    render(<TextField label="TextField" />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    await user.type(
      textField,
      `Hello
World`,
    );
    expect(textField).toHaveValue('HelloWorld');
  });
  it('with isPriceFormat does not accept value except for numbers', async () => {
    const user = userEvent.setup();
    render(<TextField label="TextField" isPriceFormat />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    await user.type(textField, '1,2,3');
    expect(textField).toHaveValue('123');
  });
  it('with isPriceFormat does not accept value except for numbers', async () => {
    const user = userEvent.setup();
    render(<TextField label="TextField" isPriceFormat />);
    const textField = screen.getByRole('textbox', { name: 'TextField' });
    await user.type(textField, 'Hello World');
    expect(textField).toHaveValue('');
  });
  it('with error is invalid', async () => {
    render(<TextField label="TextField" error />);
    expect(screen.getByRole('textbox', { name: 'TextField' })).toBeInvalid();
  });
  it('with required shows error when value is empty', async () => {
    render(<TextField label="TextField" required />);
    expect(screen.getByRole('textbox', { name: 'TextField *' })).toBeInvalid();
  });
  it('with helperText shows description', async () => {
    render(<TextField label="TextField" helperText="Description" />);
    expect(screen.getByRole('textbox', { name: 'TextField' })).toHaveAccessibleDescription('Description');
  });
  it('with error and helperText shows error message', async () => {
    render(<TextField label="TextField" error helperText="Something wrong" />);
    expect(screen.getByRole('textbox', { name: 'TextField' })).toHaveAccessibleErrorMessage('Something wrong');
  });
});

describe('Controlled TextField', () => {
  it('can handle onChange event callback', async () => {
    const user = userEvent.setup();
    const onChange: ComponentPropsWithoutRef<typeof TextField>['onChange'] = vi.fn();
    render(<TextField label="TextField" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'TextField' }), 'Hello World');
    expect(onChange).toHaveBeenCalled();
  });
  it('can get typed value', async () => {
    const user = userEvent.setup();
    const onChange: ComponentPropsWithoutRef<typeof TextField>['onChange'] = vi.fn((e) => e.target.value);
    render(<TextField label="TextField" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'TextField' }), 'Hello World');
    expect(onChange).toHaveLastReturnedWith('Hello World');
  });
});

describe('Uncontrolled TextField', () => {
  it('can get typed value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((value) => value);
    const { Form, submit } = withRHF<{ textField: string }>({
      onSubmit,
      Component: ({ register }) => <TextField label="TextField" {...register('textField')} />,
    });
    render(<Form />);
    await user.type(screen.getByRole('textbox', { name: 'TextField' }), 'Hello World');
    await submit();
    expect(onSubmit).toHaveLastReturnedWith({
      textField: 'Hello World',
    });
  });
  it('can get value when default value is set', async () => {
    const onSubmit = vi.fn((value) => value);
    const { Form, submit } = withRHF<{ textField: string }>({
      onSubmit,
      useFormOptions: {
        defaultValues: {
          textField: 'Hello World',
        },
      },
      Component: ({ register }) => <TextField label="TextField" {...register('textField')} />,
    });
    render(<Form />);
    await submit();
    expect(onSubmit).toHaveLastReturnedWith({
      textField: 'Hello World',
    });
  });
});
