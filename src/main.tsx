import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { BookmarkProvider } from './context/bookmarkContext';
import './index.css';
import { Bookmarks } from './routes/Bookmarks';
import { CategoryPage } from './routes/CategoryPage';
import ErrorPage from './routes/ErrorPage';
import { HomePage } from './routes/HomePage';
import { MovieView } from './routes/MovieView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/movieview', element: <MovieView /> },
      {
        path: '/categories',
        element: <CategoryPage />,
        children: [
          { path: 'categories/:categoryId', element: <h1>Category</h1> },
        ],
      },
      { path: '/bookmarks', element: <Bookmarks /> },
      { path: '/movie/:id', element: <MovieView /> },
    ],
  },

  { path: '*', element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BookmarkProvider>
      <RouterProvider router={router} />
    </BookmarkProvider>
  </React.StrictMode>
);
