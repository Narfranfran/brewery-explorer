import { render } from '@testing-library/react';
import RootLayout from '../app/layout.js';

describe('DaisyUI Theme', () => {
  it('should apply the "cupcake" theme', () => {
    const { baseElement } = render(
      <RootLayout>
        <div />
      </RootLayout>
    );
    const htmlElement = baseElement.parentElement;
    expect(htmlElement).toHaveAttribute('data-theme', 'cupcake');
  });
});
