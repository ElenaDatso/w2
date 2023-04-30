import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout/RootLayout';
import { NotFound, Main, AboutUs, Form } from '../pages';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/form" element={<Form />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default Routing;
