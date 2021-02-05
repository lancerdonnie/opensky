import { fireEvent, render, screen } from '@testing-library/react';
import Nav from './Nav';
import { BrowserRouter as Router } from 'react-router-dom';

test('Logout works properly', () => {
  jest.spyOn(localStorage, 'getItem');

  render(
    <Router>
      <Nav />
    </Router>
  );

  const text1 = screen.getByText(/dashboard/i);
  const text2 = screen.getByText(/logout/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  fireEvent.click(text2);
  expect(localStorage.auth).toEqual('false');
});
