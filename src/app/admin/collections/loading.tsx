import { CircularProgress } from '@mui/material';

const loading = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default loading;
