import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

describe('Main', () => {
  it('should render a message when search value is empty', () => {
    const { getByText } = render(<App />);
    expect(getByText('List is empty')).toBeInTheDocument();
  });
});
