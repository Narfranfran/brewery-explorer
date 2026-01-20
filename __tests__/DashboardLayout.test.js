import { render, screen } from '@testing-library/react';
import DashboardLayout from '../app/dashboard/layout.js';

describe('DashboardLayout', () => {
  it('should render breadcrumbs and children', () => {
    render(
      <DashboardLayout>
        <div>Child Content</div>
      </DashboardLayout>
    );

    const breadcrumbLink = screen.getByRole('link', { name: /Inicio/i });
    expect(breadcrumbLink).toBeInTheDocument();

    const breadcrumbText = screen.getByText(/Dashboard/i);
    expect(breadcrumbText).toBeInTheDocument();
    
    const childContent = screen.getByText(/Child Content/i);
    expect(childContent).toBeInTheDocument();
  });
});
