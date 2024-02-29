'use client';

import * as React from 'react';
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
import { FetchedData, FieldFormat, TableType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { deleteRequest, getRequest, updateRequest } from './ActionHandler';
import { Backdrop } from '@mui/material';
import {
  CalncelButton,
  Container,
  Form,
  FormControl,
  Label,
  SubmitButton,
} from './Backdrop.styled';
import submitForm from './submitEditForm';

const DataTable = ({
  data,
  collection,
}: {
  data: TableType[];
  collection: string;
}) => {
  const router = useRouter();
  const headers = Object.keys(data[0]) as Array<keyof TableType>;
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [editItem, setEditItem] = React.useState<number | string | null>(null);

  const handleDelete = async (id: number | string, collection: string) => {
    await deleteRequest(id, collection);
    router.refresh();
  };

  const handleBackdrop = async () => {
    setOpenBackdrop(!openBackdrop);
  };

  const Row = (props: {
    row: TableType;
    headers: Array<keyof TableType>;
    collection: string;
  }) => {
    const { row, headers, collection } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
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
                <Typography variant='h6' gutterBottom component='div'>
                  {/* Control */}
                </Typography>
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
                            setEditItem(row.id);
                            handleBackdrop();
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
      </React.Fragment>
    );
  };

  const noRenderList = ['id', 'created_at'];

  const RenderBackdrop = () => {
    const [requestData, setRequestData] = React.useState<FetchedData | null>(
      null
    );
    React.useEffect(() => {
      fetch(
        `http://localhost:3000/api/collection?collection=${collection}`
      ).then((value) => value.json().then((result) => setRequestData(result)));
    }, []);

    const currentRow = data.find((row) => {
      if (row.id === editItem) {
        return row;
      }
    });

    if (requestData && currentRow)
      return (
        <Backdrop open={openBackdrop}>
          <Container>
            <h2>
              Edit ID: <u>{editItem}</u>
            </h2>
            <Form
              action={(formData) => {
                submitForm(formData, collection, editItem!);
                setOpenBackdrop(false);
                router.refresh();
              }}
            >
              {headers.map(
                (field, index) =>
                  !noRenderList.find((item) => item === field) && (
                    <Label key={field}>
                      {field}
                      <input
                        disabled={field === 'id'}
                        type={
                          FieldFormat[
                            requestData.types[index] as keyof typeof FieldFormat
                          ]
                        }
                        name={field}
                        defaultValue={currentRow[field]}
                      />
                    </Label>
                  )
              )}
              <FormControl>
                <SubmitButton type='submit'>Edit</SubmitButton>
                <CalncelButton type='reset' onClick={handleBackdrop}>
                  Cancel
                </CalncelButton>
              </FormControl>
            </Form>
          </Container>
        </Backdrop>
      );
  };

  return (
    <TableContainer component={Paper}>
      <RenderBackdrop />
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
