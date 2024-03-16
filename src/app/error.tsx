'use client';

import { Alert, Button } from '@mui/material';
import { useEffect } from 'react';
import styled from 'styled-components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100vh - var(--navbar-height));
    padding: 5px;

    h2 {
      line-height: 100%;
    }

    p {
      font-size: 1rem;
      line-height: 150%;
    }
  `;

  return (
    <ErrorWrapper>
      <Alert severity='error' sx={{ maxWidth: '500px' }}>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <Button color='inherit' onClick={() => reset()}>
          Try again
        </Button>
      </Alert>
    </ErrorWrapper>
  );
}
