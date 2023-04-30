import React from 'react';
import { render } from '@testing-library/react';
import BookCard from './Card';

describe('BookCard component', () => {
  const mockData = {
    // cover: new File([], 'test.png', { type: 'image/png' }),
    cover: '',
    title: 'Test title',
    author: 'Test author',
    type: ['Fiction'],
    dateArrived: '2022-04-01',
    isUsed: 'false',
    reading: 'Test reading',
  };

  it('renders with given data', () => {
    const { getByText, getByAltText } = render(<BookCard {...mockData} />);

    expect(getByAltText(mockData.title)).toBeInTheDocument();
    expect(getByText(mockData.title)).toBeInTheDocument();
    expect(getByText(`by ${mockData.author}`)).toBeInTheDocument();
    expect(getByText(mockData.type[0])).toBeInTheDocument();
    expect(getByText(`Arrived: ${mockData.dateArrived}`)).toBeInTheDocument();
    expect(getByText(`Condition: New`)).toBeInTheDocument();
    expect(getByText(`Now reading: ${mockData.reading}`)).toBeInTheDocument();
  });
});
