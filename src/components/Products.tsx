import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Product name', width: 150 },
  { field: 'price', headerName: 'Product Price', width: 150 },
  { field: 'description', headerName: 'Product Description', width: 500 },
];

export default function Products() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [rowCountState, setRowCountState] = useState(0);
  const [loading, setLoading] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        
        if (!rows.length || rows.length < rowCountState) {
          const response = await fetch(
            `https://4a6onckre7.execute-api.eu-west-1.amazonaws.com/products?page=${page + 1}`
          );

          if (!response.ok) {
            console.error(`${response.status} ${response.statusText}`);
            throw new Error(`${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          setRows([].concat(rows, data.products));

          if (firstRender) {
            setRowCountState(data.meta.totalItems);
            setPageSize(data.meta.itemsPerPage);
            setFirstRender(false);
          }
        }

        setLoading(false);
      } catch (error: any) {
        console.error(`${error.message}`);
      }
    })();
  }, [page]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowCount={rowCountState}
            loading={loading}
            rowsPerPageOptions={[pageSize]}
            pagination
            page={page}
            pageSize={pageSize}
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </div>
      </div>
    </div>
  );
}
