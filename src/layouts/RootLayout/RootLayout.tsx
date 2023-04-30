import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
