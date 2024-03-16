import { CircularProgress } from '@mui/material';

const loading = () => {
  return (
    <div
      style={{
        width: '250px',
        height: '300px',
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
