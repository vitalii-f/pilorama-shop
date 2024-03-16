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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { TableRowType, Tables } from '@/types/types';
import { useRouter } from 'next/navigation';
import CollectionForm from '../collectionControl/CollectionForm';
import { Backdrop } from '@mui/material';
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
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [editItem, setEditItem] = useState<TableRowType>();

  const handleDelete = async (id: number | string, collection: string) => {
    await deleteFromCollection(id, collection);
    router.refresh();
  };

  const handleBackdrop = async () => {
    setOpenBackdrop(!openBackdrop);
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
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {headers.map((title, index) => (
            <TableCell component='th' scope='row' key={title + index}>
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
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <IconButton
                          onClick={() => {
                            router.push(`${collection}/edit/${row.id}`);
                          }}
                        >
                          <EditIcon />
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
      <Backdrop
        open={openBackdrop}
        sx={{ zIndex: '5' }}
        onClick={handleBackdrop}
      >
        {editItem && (
          <CollectionForm collectionName={collection} inputValues={editItem} />
        )}
      </Backdrop>
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
