import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import { fetch} from '../../service/InvoceOutService';
import { INVOCE_OUT_ADD_ROUTE, INVOCE_OUT_ROUTE } from '../../utils/consts';
import { Box, Link, Container, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { GridDeleteForeverIcon } from '@mui/x-data-grid';

const InvoceOutList = observer(() => {

    const [loading, setLoading] = useState(true)
    const [items, setItem] = useState()
    const navigate = useNavigate();
    useEffect(() => {
        fetch().then(data => setItem(data)).finally(() =>setLoading(false))
    }, [])


    const columns = [
        { field: 'number', headerName: '№', width: 100, 
            renderCell: (params) => (
            <Link href={INVOCE_OUT_ROUTE + `/${params.row.id}` } >
                {params.value} {/* params.value would be the 'name' in this case */}
            </Link>
        ),
        },
        { field: 'is_delete', headerName: 'Метка удаления', width: 100},
        { field: 'is_active', headerName: 'Активный', width: 100,
        },
        { field: 'date', headerName: 'дата', width: 100,
        },
        { field: 'company', headerName: 'компания', width: 300,
            valueGetter: (row) => (row?.name)
        },
        { field: 'partner', headerName: 'партнеры', width: 300,
            valueGetter: (row) => (row?.name)
        },
        { field: 'contract', headerName: 'Договор', width: 300,
            valueGetter: (row) => (row?.name)
        },
        {
        field: 'actions',
        type: 'actions',
        headerName: 'Действе',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            return [
            <GridActionsCellItem
                icon={<GridDeleteForeverIcon />}
                label="Delete"
                // onClick={handleDeleteClick(id)}
                color="inherit"
            />,
            ];
        },
        },

    ];
    return (
        <Container className="mt-3">
            <Box sx={{ height: 600, width: '100%' }}>
                <Button variant="contained" onClick={() => navigate(INVOCE_OUT_ADD_ROUTE)}>Добавить</Button>   
                <DataGrid
                    showToolbar
                    rows={items}
                    loading={loading} 
                    slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress', // or 'circular-progress', 'skeleton'
                        noRowsVariant: 'skeleton', // displayed when loading and no rows are present
                        },
                    }}
                    columns={columns}
                    initialState={{
                    pagination: {
                         paginationModel: {
                         pageSize: 20,
                         },
                     },
                     }}
                     pageSizeOptions={[20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Container>
    );
});

export default InvoceOutList;