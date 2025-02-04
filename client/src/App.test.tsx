import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders loading test', () => {
  render(<App />);

  expect(
    screen.getByText(
      'Loading'
    )
  ).toBeInTheDocument()
});

test('check if we have the word equity displayed on screen', async () => {
  render(<App />);

  await screen.findByText('Equity');
  expect(
    screen.getByText(
      'Equity'
    )
  ).toBeInTheDocument()
});



