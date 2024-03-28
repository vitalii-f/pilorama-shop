import { createClient } from '@/utils/supabase/server';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const getProfiles = async () => {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError) throw new Error(userError.message);

  const { data, error } = await supabase.from('profiles').select('*').eq('id', userData.user.id);
  if (error) throw new Error(error.message);
  
  return data;
};

const UserPage = async () => {
  const profiles = await getProfiles();

  return (
    <section style={{ width: '100%', padding: '10px' }}>
      <h1 style={{ fontSize: '22px' }}>PROFILES</h1>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>e-mail</TableCell>
              <TableCell>login</TableCell>
              <TableCell>role</TableCell>
              <TableCell>created_at</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {profiles.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell component='th' scope='row'>
                  {row.email}
                </TableCell>
                <TableCell>{row.login}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default UserPage;
