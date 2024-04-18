'use client';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteForever,
  Edit,
} from '@mui/icons-material';
import { TableRowType, Tables } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteFromCollection } from '../collectionControl/CollectionActions';

const DataTable = ({
  data,
  collection,
}: {
  data: TableRowType[];
  collection: Tables;
}) => {
  const router = useRouter();
  const headers = Object.keys(data[0]) as Array<keyof TableRowType>;

  const handleDelete = async (id: number | string, collection: string) => {
    await deleteFromCollection(id, collection);
    router.refresh();
  };

  const Row = (props: {
    row: TableRowType;
    headers: Array<keyof TableRowType>;
    collection: string;
  }) => {
    const { row, headers, collection } = props;
    const [open, setOpen] = useState(false);

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          {headers.map((title, index) => (
            <TableCell
              component='th'
              scope='row'
              key={title + index}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '300px',
              }}
              height={20}
            >
              {row[title]}
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  component='div'
                ></Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>DELETE</TableCell>
                      <TableCell>EDIT</TableCell>
                      <TableCell sx={{ width: '100%' }} />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={() => handleDelete(row.id, collection)}
                        >
                          <DeleteForever />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={() => {
                            router.push(`${collection}/edit/${row.id}`);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ width: '100%' }} />
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            {headers.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
            <TableCell sx={{ width: '100%' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <Row
              key={row.id}
              row={row}
              headers={headers}
              collection={collection}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
