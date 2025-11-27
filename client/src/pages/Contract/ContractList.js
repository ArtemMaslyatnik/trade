import React, {useEffect, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

// replace
import {fetch} from '../../service/ContractService';
import { CONTRACT_ROUTE} from '../../utils/consts';
import { Box, Container, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const ContractList = observer(() => {

    const [loading, setLoading] = useState(true)
    const [items, setItem] = useState()

    useEffect(() => {
        fetch().then(data => setItem(data)).finally(() =>setLoading(false))
    }, []);

    const columns = [
            { field: 'id', headerName: 'Код', width: 100, 
                renderCell: (params) => (
                <Link href={CONTRACT_ROUTE + `/${params.row.id}` } >
                    {params.value} {/* params.value would be the 'name' in this case */}
                </Link>
            ), },
            { field: 'is_delete', headerName: 'Метка удаления', width: 100},
            { field: 'name', headerName: 'Наименование', width: 300},
        ];
    return (
        <Container className="mt-3">
            <h4>Договора</h4>
            <Box sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    loading={loading} 
                    slotProps={{
                    loadingOverlay: {
                        variant: 'linear-progress', // or 'circular-progress', 'skeleton'
                        noRowsVariant: 'skeleton', // displayed when loading and no rows are present
                        },
                    }}
                    rows={items}
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

export default ContractList;