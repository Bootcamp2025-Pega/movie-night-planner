import React from 'react';
import { Container } from '@mui/material';
import MovieNightPlanner from './components/MoviePlanner';

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <MovieNightPlanner />
    </Container>
  );
}

export default App;