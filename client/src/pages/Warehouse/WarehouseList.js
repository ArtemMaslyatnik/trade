import React, {useEffect, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {fetch}from "../../service/WarehouseService";
import {Context} from "../../index";
import { WAREHOUSE_ADD_ROUTE, WAREHOUSE_ROUTE } from '../../utils/consts';
import { Box, Button, Container, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const WarehouseList = observer(() => {
    const {warehouse} = useContext(Context);
    const navigate = useNavigate ();
    const [items, setItem] = useState()

    useEffect(() => {
        fetch().then(data => {
                    warehouse.setWarehouses(data)
                })
    }, []);
    const columns = [
        { field: 'id', headerName: 'Код', width: 100, 
            renderCell: (params) => (
            <Link href={WAREHOUSE_ROUTE + `/${params.row.id}` } >
                {params.value} {/* params.value would be the 'name' in this case */}
            </Link>
        ), },
        { field: 'is_delete', headerName: 'Метка удаления', width: 100},
        { field: 'name', headerName: 'Наименование', width: 300},
    ];
    //console.log(goods)
    return (
        <Container className="mt-3">
            <Box sx={{ height: '100%', width: '100%' }}>
                <Button variant="contained" onClick={() => navigate(WAREHOUSE_ADD_ROUTE)}>Добавить</Button>   
                <Button size="small" 
                onClick={event => (console.log(event))}
                >Удалить</Button>
                <DataGrid
                    rows={warehouse.warehouses}
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
                    showToolbar
                />
            </Box>
        </Container>
    );
});

export default WarehouseList;