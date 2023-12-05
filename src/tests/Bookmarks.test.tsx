import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, test } from 'vitest';
import { BookmarkProvider } from '../context/bookmarkContext';
import { Bookmarks } from '../routes/Bookmarks';

describe('Bookmark related tests:', () => {
  test('User can add and remove a bookmark', async () => {
    render(
      <BookmarkProvider>
        <Bookmarks />
      </BookmarkProvider>
    );

    const user = userEvent.setup();

    // Checks if we're on the right page
    const pageHeader = screen.getByText('My bookmarks');
    expect(pageHeader).toBeInTheDocument();

    // Finds the Element which cointains the text 'Inception'
    // and the parent element it's in
    const inceptionElement = await screen.findByText('Inception');
    const parentElement = inceptionElement.closest('p');

    if (!parentElement) {
      throw new Error('Parent element not found');
    }

    // Find the "Add bookmark" button within the parentElement
    const addBookmarkButton = within(parentElement).getByText('Add bookmark');

    await user.click(addBookmarkButton);

    // Check if the button is disabled after clicking
    expect(addBookmarkButton).toBeDisabled();

    // Checks theres now two elements with the text 'Inception'
    let inceptionElements = await screen.findAllByText('Inception');
    expect(inceptionElements.length).toBe(2);

    // Find the "Remove bookmark"
    const removeBookmarkButton = await screen.findByRole('button', {
      name: 'Remove bookmark',
    });
    expect(removeBookmarkButton).toBeInTheDocument();

    // Clicks the remove bookmark button
    await user.click(removeBookmarkButton);

    // Now the button does not exist in the element
    expect(removeBookmarkButton).not.toBeInTheDocument();

    // Now there's only one element with the text 'Inception'
    inceptionElements = await screen.findAllByText('Inception');
    expect(inceptionElements.length).toBe(1);
  });
});
