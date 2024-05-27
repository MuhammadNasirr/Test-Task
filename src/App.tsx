// src/App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import FormulaInput from './components/FormulaInput';
import { Container, Typography } from '@mui/material';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Formula Input
        </Typography>
        <FormulaInput />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
