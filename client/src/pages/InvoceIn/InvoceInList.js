import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'
import {Context} from "../../index";
import { fetch} from '../../service/InvoceInService';
import { INVOCE_IN_ADD_ROUTE, INVOCE_IN_ROUTE } from '../../utils/consts';
import { Box, Link, Container, Button} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { GridDeleteForeverIcon } from '@mui/x-data-grid';


const InvoceInList = observer(() => {
    const {invoceIn} = useContext(Context)
    //const [companyItems, setCompany] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch().then(data => {
                    invoceIn.setInvoceIns(data)
                })
    }, [])

    // const handleDeleteClick = (id) => () => {
    //     const updatedItems = invoceIn.filter((row) => row.id !== id);
    //     let i=1;
    //     const newCountItems = updatedItems.map((itemList) => {
    //         itemList.number= i++;
    //         return itemList
    //     });
    //     setInvoceIns({...item, invoice_in_list: newCountItems }); 
    // };

    const columns = [
        { field: 'number', headerName: '№', width: 100, 
            renderCell: (params) => (
            <Link href={INVOCE_IN_ROUTE + `/${params.row.id}` } >
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
            <Box sx={{ height: '100%', width: '100%' }}>
                <Button variant="contained" onClick={() => navigate(INVOCE_IN_ADD_ROUTE)}>Добавить</Button>   
                <DataGrid
                    showToolbar
                    rows={invoceIn.invoceIns}
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

export default InvoceInList;