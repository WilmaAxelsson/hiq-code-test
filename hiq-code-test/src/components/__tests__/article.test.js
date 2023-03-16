import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from '../Article';

describe('Article component', () => {
  const mockupArticle = {
    data: {
      id: '1',
      title: 'Test Article',
      thumbnail: 'https://example.com/image.jpg',
      created: 1678957902,
      num_comments: 10,
      author: 'Test Author',
      score: 100,
      permalink: '/r/'
    },
  };

  test('render article information', () => {
    const { getByText, getByAltText } = render(<Article article={mockupArticle} />);
    const thumbnail = getByAltText('Thumbnail');
    expect(thumbnail).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(getByText('Test Article')).toBeInTheDocument();
    expect(getByText('Created: 2023-03-16 10:11:42')).toBeInTheDocument();
    expect(getByText('10 comments')).toBeInTheDocument();
    expect(getByText('Author: Test Author')).toBeInTheDocument();
    expect(getByText('Score: 100')).toBeInTheDocument();
    expect(getByText('Click here to view full article!')).toHaveAttribute('href', 'https://www.reddit.com/r/');
  });

  test('formats created date', () => {
    render(<Article article={mockupArticle} />);
    const created = screen.getByText(/created:/i);
    expect(created).toHaveTextContent('Created: 2023-03-16 10:11:42'); // Tests time conversion (specific to toLocaleString())
  });

});