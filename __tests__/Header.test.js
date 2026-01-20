import { render, screen } from '@testing-library/react';
import Header from '../app/components/layout/Header';

describe('Header component', () => {
  it('should render the header with title and navigation', () => {
    render(<Header />);
    
    const titleLink = screen.getByRole('link', { name: /Brewery Explorer 🍻/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');

    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
  });
});
