import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { configure } from '@testing-library/dom';

import App from './App';

configure({ testIdAttribute: 'name' });

test('Expect to login successfully and view grid', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  const user = screen.getByTestId('username');
  expect(user).toBeInTheDocument();
  const pass = screen.getByTestId('password');
  expect(pass).toBeInTheDocument();
  const login = screen.getByText(/Login/i);
  expect(login).toBeInTheDocument();

  fireEvent.change(user, { target: { value: 'demo' } });
  fireEvent.change(pass, { target: { value: 'demo' } });
  fireEvent.click(login);

  const dash = screen.getByText(/dashboard/i);
  expect(dash).toBeInTheDocument();

  const text = screen.getByText('London');
  expect(text).toBeInTheDocument();
});
