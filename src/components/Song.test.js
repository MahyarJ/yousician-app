import React from 'react';
import { render } from '@testing-library/react';
import Song from './Song';

const song = {
  id: '5b8e47deb3984c68ed8192e3',
  title: 'Easter Oratorio (in Am)',
  artist: 'Johann Sebastian Bach',
  images:
    'https://d3mzlbmn9ukddk.cloudfront.net/songs/image/586a75fa-99df-4ce0-af71-55f6a474c404.jpg',
  level: 6,
  search: 'johann sebastian bach easter oratorio (in am)',
};

test('renders lighter song items truely', () => {
  const { getByTestId } = render(<Song song={song} isDark={false} />);
  expect(getByTestId('songContainer')).toHaveStyle(`background: #101010`);
});

test('renders darker song items truely', () => {
  const { getByTestId } = render(<Song song={song} isDark={true} />);
  expect(getByTestId('songContainer')).toHaveStyle(`background: #000000`);
});
