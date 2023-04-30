import React from 'react';
import { render } from '@testing-library/react';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should render "404 NotFound" text', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText('404 NotFound')).toBeInTheDocument();
  });
});
