import { render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { Footer } from '../components';

describe('Footer', () => {
  it('should exist a footer', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const footer = await waitFor(() => screen.getByRole('footer'));
    expect(footer).toBeInTheDocument();
  });

  it('should exist links within the footer', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const footer = await waitFor(() => screen.getByRole('footer'));
    const links = within(footer).getAllByRole('link');
    expect(links[3]).toBeInTheDocument();
  });

  it('should exist links to our social channels in the footer', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const footer = await waitFor(() => screen.getByRole('footer'));
    const socialLinks = within(footer).getAllByTestId('social-link');
    expect(socialLinks).toHaveLength(4);
  });

  it('should exist a logo in the footer', async () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const footer = await waitFor(() => screen.getByRole('footer'));
    const logo = within(footer).getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });
});
