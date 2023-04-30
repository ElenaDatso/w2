import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout/RootLayout';
import { NotFound, Main, AboutUs, Form } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <Main />, errorElement: <NotFound /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'form', element: <Form /> },
    ],
  },
]);

export default router;
