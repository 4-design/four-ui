import { ComponentPropsWithRef, forwardRef } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

const Trigger = forwardRef<HTMLSpanElement, ComponentPropsWithRef<'span'>>((props, ref) => (
  <span ref={ref} {...props} />
));

describe('Tooltip', () => {
  it('has rendered children', async () => {
    render(
      <Tooltip title="description">
        <Trigger>trigger</Trigger>
      </Tooltip>,
    );
    expect(await screen.findByText('trigger')).toBeInTheDocument();
  });
  it('has children with accessible description', async () => {
    render(
      <Tooltip title="description">
        <Trigger>trigger</Trigger>
      </Tooltip>,
    );
    expect(await screen.findByText('trigger')).toHaveAccessibleDescription('description');
  });
  it('is appeared when focusing trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip title="description">
        <Trigger>trigger</Trigger>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();
  });
});
