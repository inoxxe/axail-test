import React from 'react';
import {render} from '@testing-library/react-native';
import App from '../App';
import {findCheapestPrice} from '../helper/utils';

describe('App Component', () => {
  it('renders correctly', () => {
    const {getByText} = render(<App />);
    expect(getByText('Question Answer App')).toBeTruthy();
    expect(getByText('Upload JSON File')).toBeTruthy();
  });

  it('should return the correct cheapest price', () => {
    const flights = [
      [0, 1, 100],
      [1, 2, 100],
      [0, 2, 500],
    ];
    const input = {
      n: 3,
      edges: flights,
      start: 0,
      end: 2,
      expected: 1,
    };

    const result = findCheapestPrice(
      input.n,
      flights,
      input.start,
      input.end,
      input.expected,
    );

    expect(result).toBe(200);
  });
});
