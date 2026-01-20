import { render, screen } from '@testing-library/react';
import Footer from '../app/components/layout/Footer';

describe('Footer component', () => {
  it('should render the footer with the correct text', () => {
    render(<Footer />);
    
    const footerText = screen.getByText(/Proyecto para DWEC - 2024\/2025 - Brewery Explorer/i);
    expect(footerText).toBeInTheDocument();
  });
});
