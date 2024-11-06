import { render, screen } from '@testing-library/react';
import { Callout } from './Callout';

describe('Callout', () => {
  it('is rendered', () => {
    render(<Callout>Hello</Callout>);
    expect(screen.queryByRole('status', { description: 'Hello' })).toBeInTheDocument();
  });
  it('of negative intention is rendered', () => {
    render(<Callout intention="negative">Hello</Callout>);
    expect(screen.queryByRole('alert', { description: 'Hello' })).toBeInTheDocument();
  });
});
