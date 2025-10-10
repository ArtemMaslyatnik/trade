import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {Context} from "../../index";
import { fetch} from '../../service/InvoceInService';
import { INVOCE_IN_ADD_ROUTE, INVOCE_IN_ROUTE } from '../../utils/consts';
import { Box, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


const InvoceInList = observer(() => {
    const {invoceIn} = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        fetch().then(data => {
                    invoceIn.setInvoceIns(data)
                })
    }, [])
    const columns = [
        { field: 'number', headerName: '№', width: 90, 
            renderCell: (params) => (
            <Link href={INVOCE_IN_ROUTE + `/${params.row.id}` } >
                {params.value} {/* params.value would be the 'name' in this case */}
            </Link>
        ),
        },
        { field: 'is_active', headerName: 'Активный', width: 90,
        },
        { field: 'date', headerName: 'дата', width: 90,
        },
        { field: 'company', headerName: 'компания', width: 90,
            valueGetter: (row) => (row.name)
        },
        { field: 'partner', headerName: 'партнеры', width: 90,
            valueGetter: (row) => (row.name)
        },
        { field: 'contract', headerName: 'партнеры', width: 90,
            valueGetter: (row) => (row.name)
        },




    ];
    return (
            <Box sx={{ height: 400, width: '100%' }}>
                <Button variant="success" onClick={() => navigate(INVOCE_IN_ADD_ROUTE)}>Добавить</Button>   
                <DataGrid
                    rows={invoceIn.invoceIns}
                    columns={columns}
                    initialState={{
                    pagination: {
                         paginationModel: {
                         pageSize: 5,
                         },
                     },
                     }}
                     pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
    );
});

export default InvoceInList;