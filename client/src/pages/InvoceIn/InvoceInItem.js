import React, { useEffect, useState } from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams } from "react-router-dom"
import { Box, Button, Checkbox, Container, FormGroup, List, ListItem} from '@mui/material';
import { FormControl } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/ru';
// replace
import { fetchOne, update } from '../../service/InvoceInService';
import { fetch as fetchCompany } from '../../service/CompanyService';
import { fetch as fetchPartner } from '../../service/PartnerService';
import { fetch as fetchContract } from '../../service/ContractService';
import dayjs from 'dayjs';
// import DatePicker from 'react-datepicker';



const InvoceInItem = () => {

    const [item, setItem] = useState({'number': '','is_active':'', 'date':dayjs(), 
            'created_at':'', 'company':'', 'partner':'',  'contract':''})
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
    const [companyItems, setCompany] = useState([]);
    const [partnerItems, setPartner] = useState([]);
    const [contractItems, setContract] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOne(id).then(data => setItem(data)).finally(() => setLoading(false))
        fetchCompany().then(data => setCompany(data))
        fetchPartner().then(data => setPartner(data))
        fetchContract(null, null, null).then(data => setContract(data))
    }, [])

    useEffect(() => {
        fetchContract(null, item.company.id, item.partner.id).then(data => setContract(data));
        setItem({...item, contract: null});
        
    }, [item.company.id, item.partner.id])

    
    const updateItem = () => {
                update(id, item).then(data => {
                    setItem('')
                })
                navigate(-1)
    }
 
    console.log(contractItems);
    // console.log(getArrOptions);
  
    return (
        <Container className="mt-3">
            <h4>{item.number} (приход)</h4>
            <Box>
                <Button variant="contained"
                        onClick={updateItem} >
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
                        id="outlined-basic" 
                        label="Номер" 
                        variant="outlined" 
                        value={item.number}
                    />
                    <FormControl
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
                        {loading ? (
            <p>Товары...</p>
            )    : (
                <div>
                    <List>
                        <ListItem >Товары</ListItem>
                            {item.invoice_in_list.map(item =>
                            <Box>                             
                                <ListItem key={item.number}  >
                                {item.goods.name} | {item.price} | {item.price}
                                </ListItem>   
                            </Box>)}
                    </List>
                </div>
            )}
        </Container>
    );
};

export default observer(InvoceInItem);