// ArticleList.test.js
import { render, screen, waitFor } from '@testing-library/react';
import RedditApi from '../RedditApi';

describe('ArticleList component', () => {
  it('renders articles correctly', async () => {
    const mockArticles = [
      {
        data: {
          id: 1,
          title: 'Article 1',
          thumbnail: 'https://example.com/image1.png',
          created: 1618586355,
          num_comments: 10,
          author: 'John Doe',
          score: 100,
          permalink: '/r/1'
        }
      },
      {
        data: {
          id: 2,
          title: 'Article 2',
          thumbnail: 'https://example.com/image2.png',
          created: 1618586355,
          num_comments: 5,
          author: 'Jane Doe',
          score: 50,
          permalink: '/r/2'
        }
      }
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: { children: mockArticles } })
    });

    const { getByTestId } = render(<RedditApi />);
    const articleList = screen.getByTestId('article-list');
  
    await waitFor(() => expect(articleList.children.length).toBe(2));

    global.fetch.mockRestore();
  });
});