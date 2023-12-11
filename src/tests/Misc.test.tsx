import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import { BookmarkProvider } from '../context/bookmarkContext';
import { HomePage } from '../routes/HomePage';

describe('Misc tets', () => {
  test('Checking so trending movies does NOT show up in recommendations', async () => {
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <HomePage />
        </BookmarkProvider>
      </MemoryRouter>
    );

    const trending = await screen.getAllByText('Trending Now');
    const trendingParentElements = trending.map(element => element.parentNode);

    // Get all title elements within each parent element and put them into an array
    const trendingTitles = trendingParentElements.flatMap(parentElement =>
      Array.from(parentElement!.querySelectorAll('h2')).map(
        titleElement => titleElement.textContent
      )
    );

    const recommendations = await screen.getByText('Recommended for you');
    const recommendationsParentElement = recommendations.parentNode;

    const recommendationsTitles = Array.from(
      recommendationsParentElement!.querySelectorAll('h3')
    ).map(titleElement => titleElement.textContent);

    // Check if any of the trending titles are in the recommendations titles
    const isAnyTrendingInRecommendations = trendingTitles.some(trendingTitle =>
      recommendationsTitles.includes(trendingTitle)
    );

    // If it's false it means theres no trending titles in the recommendations
    expect(isAnyTrendingInRecommendations).toBe(false);
  });
});
