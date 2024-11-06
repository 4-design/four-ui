import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge label="badge" />);
    expect(screen.getByText('badge')).toBeInTheDocument();
  });
});
