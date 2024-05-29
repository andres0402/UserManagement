import logo from './logo.svg';
import React from 'react';
import UserTable from './components/UserTable';
import './App.css';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <UserTable />
    </Container>
  );
}

export default App;
