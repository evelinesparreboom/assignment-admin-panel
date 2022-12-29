import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { Outlet } from 'react-router-dom';

import Nav from './components/Nav';

export default function App() {
  return (
    <>
      <Nav />
      <Container maxWidth='lg'>
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
