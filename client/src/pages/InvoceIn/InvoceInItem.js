import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams } from "react-router-dom"
import { Box, Button, Checkbox, Container, FormGroup, Tooltip} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
// replace
import { fetchOne, update, create } from '../../service/InvoceInService';
import { fetch as fetchCompany } from '../../service/CompanyService';
import { fetch as fetchPartner } from '../../service/PartnerService';
import { fetch as fetchContract } from '../../service/ContractService';
import { fetch as fetchWarehouse } from '../../service/WarehouseService';
import dayjs from 'dayjs';

import { gridStringOrNumberComparator } from '@mui/x-data-grid';
import { renderEditGoods, renderGoods } from '../../components/UI/AutocompleteGoods';
import { Toolbar, ToolbarButton } from '@mui/x-data-grid';
import { GridAddIcon } from '@mui/x-data-grid';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { GridDeleteForeverIcon } from '@mui/x-data-grid';

// import DatePicker from 'react-datepicker';



const InvoceInItem = () => {

    const [item, setItem] = useState({'number': 0,'is_active':false, 'date':dayjs(), 'total':0,
            'invoice_in_list':[],'company':'', 'warehouse':'', 'partner':'',  'contract':null})
    const [companyItems, setCompany] = useState([]);
    const [partnerItems, setPartner] = useState([]);
    const [contractItems, setContract] = useState([]);
    const [warehouseItems, setWarehouse] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate();
     
    useEffect(() => {
        console.log(id)
        if (typeof id !== 'undefined' && id !== null){
            fetchOne(id).then(data => setItem(data))
        }
        fetchCompany().then(data => setCompany(data))
        fetchPartner().then(data => setPartner(data))
        fetchWarehouse().then(data => setWarehouse(data))
        fetchContract(null, null, null).then(data => setContract(data))
     }, [])

    useEffect(() => {
        if (item.company === null || item.partner === null) {
        fetchContract(null, null, null).then(data => setContract(data));
        } else
        fetchContract(null, item.company.id, item.partner.id).then(data => setContract(data));
        // setItem({...item, contract: null});        
    }, [item.company, item.partner])

    const save = () => {
        if (typeof id !== 'undefined' && id !== null){
            update(id, item).then(data => {setItem('')})            
        } else {
            create(item).then(data => {setItem('')})
        }
        navigate(-1)
    }
 
   const handleProcessRowUpdate =(newRow, oldRow) => {
        const updatedItems = item.invoice_in_list.map((itemList) => {
            if (itemList.number === oldRow.number) {
                newRow.sum = newRow.price * newRow.quantity;
                return newRow
            } else 
                return itemList
        });
        const totalTab = updatedItems.reduce((sum, item) => {
            return sum + item.sum;
        }, 0); // 0 - начальное значение для sum
        setItem({...item, invoice_in_list: updatedItems, total: totalTab}); 
        //console.log(totalTab);
        return newRow
    }
   
    const handleProcessRowUpdateError = (error) => {
        //console.log(error);
    }

    function EditToolbar(props) {
        
        const { setItem } = props;
        const handleClick = () => {
            const updatedItems = item.invoice_in_list.map((itemList) => itemList);
            const number = updatedItems.length+1;
            updatedItems.push({ number:number, goods: null, price: 0, quantity: 0, sum:0, })

             setItem({...item, invoice_in_list: updatedItems}); 
            
        };

        return (
            <Toolbar>
                <Tooltip title="Add record">
                    <ToolbarButton onClick={handleClick}>
                    <GridAddIcon fontSize="small" />
                    </ToolbarButton>
                </Tooltip>
            </Toolbar>
        );
    }
    const handleDeleteClick = (id) => () => {
        const updatedItems = item.invoice_in_list.filter((row) => row.number !== id);
        let i=1;
        const newCountItems = updatedItems.map((itemList) => {
            itemList.number= i++;
            return itemList
        });
        const totalTab = updatedItems.reduce((sum, item) => {
            return sum + item.sum;
        }, 0); // 0 - начальное значение для sum
        setItem({...item, invoice_in_list: newCountItems, total: totalTab}); 
    };

    const columns = [
    { field: 'number', headerName: '№', width: 90 },
    {
        field: 'goods',
        headerName: 'Товары',
        type: 'singleSelect',
        valueFormatter: (value) => value?.name,
        renderCell: renderGoods,
        renderEditCell: renderEditGoods,
        sortComparator: (v1, v2, param1, param2) =>
            gridStringOrNumberComparator(v1.name, v2.name, param1, param2),
        width: 300,
        editable: true,
    },
        {
        field: 'price',
        headerName: 'Цена',
        type: "number",
        width: 150,
        editable: true,
     },
    {
        field: 'quantity',
        headerName: 'Количество',
        type: "number",
        width: 150,
        editable: true,

    },
    {
        field: 'sum',
        headerName: 'Сумма',
        type: "number",
        width: 150,
        editable: true,

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
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
   ];

    //console.log(contractItems);
   //console.log(item);
  
    return (
        <Container className="mt-3">
            <h4>{item.number} (приход)</h4>
            <Box>
                <Button variant="contained"
                        onClick={save} >
                    Сохранить
                </Button >
                <Button variant="outlined"
                        onClick={() => navigate(-1)} >
                    Отменить
                </Button >
                <FormGroup className="mb-3">
                    <Checkbox
                        type="checkbox" 
                        label="Активный" 
                        checked={item.is_active}
                        onChange={event => setItem({...item, is_active: event.target.checked})}
                    />
                    <TextField 
                        label="Номер" 
                        type="number"
                        variant="outlined" 
                        value={item.number}
                        onChange={event => setItem({...item, number: event.target.value})}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DateTimePicker
                            label="Дата"
                            value={dayjs(item.date)}
                            onChange={(newValue) => setItem({...item, date: newValue.$d})} 
                        /> 
                    </LocalizationProvider>
                </FormGroup>
                <FormGroup className="mb-3">
                    {/* <Select 
                        value={item.company}
                        onChange={(event)  => setItem({...item, company: event.target.value})}
                        >
                            {companyItems.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                    </Select> */}
                    <Autocomplete
                        getOptionLabel={(option) => option.name || ""}
                        options={companyItems}
                        value={item.company}
                        onChange={(event, newValue)  => setItem({...item, company: newValue})}
                        renderInput={(params) => <TextField {...params} label="Копания"  />}
                        
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Autocomplete
                        getOptionLabel={(option) => option.name || ""}
                        options={warehouseItems}
                        value={item.warehouse}
                        onChange={(event, newValue)  => setItem({...item, warehouse: newValue})}
                        renderInput={(params) => <TextField {...params} label="Склад" />}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Autocomplete
                        getOptionLabel={(option) => option.name || ""}
                        options={partnerItems}
                        value={item.partner}
                        onChange={(event, newValue)  => setItem({...item, partner: newValue})}
                        renderInput={(params) => <TextField {...params} label="Партнер" />}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Autocomplete
                        getOptionLabel={(option) => option.name || ""}
                        options={contractItems}
                        value={item.contract}
                        onChange={(event, newValue)  => setItem({...item, contract: newValue})}
                        renderInput={(params) => <TextField {...params} label="Договор" />}
                    />
                </FormGroup>
            </Box>
            <p>Товары</p>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={item.invoice_in_list}
                    columns={columns}
                    getRowId={(row) => row.number} 
                    processRowUpdate={(updatedRow, originalRow) => handleProcessRowUpdate(updatedRow, originalRow)}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        toolbar: { setItem},
                    }}
                    showToolbar
                    hideFooter
                />            
            </Box>
            <TextField 
                disabled
                type="number"
                variant="filled" 
                value={item.total}
                onChange={event => setItem({...item, total: Number(event.target.value)})}
                
            />
        </Container>
    );
};

export default observer(InvoceInItem);