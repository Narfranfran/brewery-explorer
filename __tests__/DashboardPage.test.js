import { render, screen } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page.js';

describe('DashboardPage', () => {
  it('should render the main heading', () => {
    render(<DashboardPage />);
    const heading = screen.getByRole('heading', {
      name: /Dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
