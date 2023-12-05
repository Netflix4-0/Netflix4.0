import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { CategoryPage } from './routes/CategoryPage';
import ErrorPage from './routes/ErrorPage';
import { HomePage } from './routes/HomePage';
import MovieView from './routes/MovieView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/categories',
        element: <CategoryPage />,
        children: [
          { path: 'categories/:categoryId', element: <h1>Category</h1> },
        ],
      },
      { path: '/bookmarks', element: <h1>Bookmarks</h1> },
      { path: '/movie/:id', element: <MovieView /> },
    ],
  },

  { path: '*', element: <ErrorPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
