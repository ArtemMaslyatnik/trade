import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
    // replace
import { WAREHOUSE_ROUTE } from '../../utils/consts';
import {create} from "../../service/WarehouseService";
import { Box, Button, Container, FormGroup, TextField } from '@mui/material';

const WarehouseCreate = () => {
    // replace
    const ROUTE = WAREHOUSE_ROUTE
    
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    const addItem = () => {
        create({name: value}).then(data => {
            setValue('')
        })
        navigate(ROUTE)
    }

    return (
        <Container className="mt-3">
            <h4>Товар (создание)</h4>
            <Box className="mb-3">
                <Button variant="contained"
                        onClick={addItem} >
                    Сохранить
                </Button >
                <Button size="small"
                        onClick={() => navigate(ROUTE)} >
                    Отменить
                </Button >
            </Box>
            <Box>
                <FormGroup className="mb-3">
                    <TextField
                        label="Наименование" 
                        type="text"
                        variant="outlined" 
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </FormGroup>
              </Box>
        </Container>

    );
};

export default WarehouseCreate;