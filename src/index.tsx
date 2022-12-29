import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createRoutesFromElements, createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import Products from './components/Products';
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='products' element={<Products />} />
    </Route>
  )
);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
);
