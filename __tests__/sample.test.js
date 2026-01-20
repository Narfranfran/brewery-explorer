import { render, screen } from '@testing-library/react';
import Home from '../app/page.js';

describe('Home page', () => {
  it('should render the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', {
      name: /Bienvenido a Brewery Explorer/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
