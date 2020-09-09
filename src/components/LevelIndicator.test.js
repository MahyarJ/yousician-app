import React from 'react';
import { render } from '@testing-library/react';
import LevelIndicator from './LevelIndicator';

test('renders colorized indicators when is not selected', () => {
  const { getByTestId } = render(<LevelIndicator value={5} isSelected={false} />);
  expect(getByTestId('colorIndicator')).toBeInTheDocument();
});
