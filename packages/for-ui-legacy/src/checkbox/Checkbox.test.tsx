import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRHF } from '../testing/rhf';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('can be rendered', async () => {
    render(<Checkbox label="checkbox" />);
    expect(screen.queryByRole('checkbox', { name: 'checkbox' })).toBeInTheDocument();
  });
  it('can have indeterminate state', async () => {
    render(<Checkbox label="checkbox" indeterminate />);
    expect(screen.queryByRole('checkbox', { name: 'checkbox' })).toBeInTheDocument();
  });
  it('can have disabled state', async () => {
    render(<Checkbox label="checkbox" disabled />);
    expect(screen.queryByRole('checkbox', { name: 'checkbox' })).toBeInTheDocument();
    expect(screen.queryByRole('checkbox', { name: 'checkbox' })).toBeDisabled();
  });
  it('is clickable', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="checkbox" />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
  });
  it('is not clickable when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="checkbox" disabled />);
    expect(() => user.click(screen.getByRole('checkbox', { name: 'checkbox' }))).rejects.toThrow(
      /pointer-events: none/,
    );
  });
  it('generates onChange event when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="checkbox" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onChange).toHaveBeenCalledOnce();
  });
  it('does not generate onChange event when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="checkbox" disabled onChange={onChange} />);
    expect(() => user.click(screen.getByRole('checkbox', { name: 'checkbox' }))).rejects.toThrow(
      /pointer-events: none/,
    );
    expect(onChange).not.toHaveBeenCalledOnce();
  });
  it('changes the state from false to true by clicking', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn((_, checked) => checked);
    render(<Checkbox label="checkbox" checked={false} onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onChange).toHaveReturnedWith(true);
  });
  it('changes the state from true to false by clicking', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn((_, checked) => checked);
    render(<Checkbox label="checkbox" checked={true} onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onChange).toHaveReturnedWith(false);
  });
  it('becomes checked when clicking indeterminate checkbox', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn((_, checked) => checked);
    render(<Checkbox label="checkbox" indeterminate onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onChange).toHaveReturnedWith(true);
  });
  it('does not change the state when value field is given', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn((_, checked) => checked);
    render(<Checkbox label="checkbox" value={true} onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    expect(onChange).toHaveReturnedWith(true);
  });
});

describe('Uncontrolled Checkbox with RHF', () => {
  it('can be checked', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((value) => value);
    const { Form, submit } = withRHF<{ checkbox: boolean }>({
      onSubmit,
      Component: ({ register }) => <Checkbox label="checkbox" {...register('checkbox')} />,
    });
    render(<Form />);
    await user.click(screen.getByRole('checkbox', { name: 'checkbox' }));
    await submit();
    expect(onSubmit).toHaveReturnedWith({
      checkbox: true,
    });
  });
  it('cannot be checked when disabled', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((value) => value);
    const { Form } = withRHF<{ checkbox: boolean }>({
      onSubmit,
      Component: ({ register }) => <Checkbox disabled label="checkbox" {...register('checkbox')} />,
    });
    render(<Form />);
    expect(() => user.click(screen.getByRole('checkbox', { name: 'checkbox' }))).rejects.toThrow(
      /pointer-events: none/,
    );
  });
  it('is checked if defaultValue is checked', async () => {
    const onSubmit = vi.fn((value) => value);
    const { Form, submit } = withRHF<{ checkbox: boolean }>({
      onSubmit,
      useFormOptions: {
        defaultValues: {
          checkbox: true,
        },
      },
      Component: ({ register }) => <Checkbox label="checkbox" {...register('checkbox')} />,
    });
    render(<Form />);
    await submit();
    expect(onSubmit).toHaveReturnedWith({
      checkbox: true,
    });
  });
});
