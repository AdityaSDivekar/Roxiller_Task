import * as React from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

const columns = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'description', label: 'Description', minWidth: 200 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'category', label: 'Category', minWidth: 120 },
  { id: 'sold', label: 'Sold', minWidth: 80, align: 'right' },
  { id: 'image', label: 'Image', minWidth: 120 },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const fetchData = async (page) => {
    try {
      const response = await axios.get(`https://api/combined-data?page=${page}&limit=${rowsPerPage}`);
      setRows(response.data || []); // Set the fetched data or empty array
    } catch (error) {
      console.error('Error fetching data:', error);
      setRows([]); // In case of error, set rows to an empty array
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchData(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    fetchData(0); // Fetch first page data
  };

  // Fetch initial data when the component mounts
  React.useEffect(() => {
    fetchData(page);
  }, [page, rowsPerPage]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    borderRight: index < columns.length - 1 ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* If rows are empty, show 5 empty rows */}
            {(rows.length === 0 ? Array.from({ length: 5 }) : rows).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column, colIndex) => {
                  const value = row ? row[column.id] || '' : ''; // Access property or use empty string
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        borderRight: colIndex < columns.length - 1 ? '1px solid #e0e0e0' : 'none',
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={100} // Set to the total number of records available in your API
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={() => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <IconButton
              onClick={(event) => handleChangePage(event, page - 1)}
              disabled={page === 0}
              aria-label="previous page"
            >
              <span style={{ marginRight: '5px' }}>Previous</span>
            </IconButton>
            <IconButton
              onClick={(event) => handleChangePage(event, page + 1)}
              disabled={false} // Adjust this based on your API's response or total count
              aria-label="next page"
            >
              <span style={{ marginLeft: '5px' }}>Next</span>
            </IconButton>
          </div>
        )}
      />
    </Paper>
  );
}

