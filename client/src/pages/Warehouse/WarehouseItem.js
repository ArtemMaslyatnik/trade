import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// replace
import { WAREHOUSE_ROUTE } from '../../utils/consts';
import { fetchOne, update, create} from '../../service/WarehouseService';
import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField } from '@mui/material';

const WarehoseItem = () => {
    // replace
    const ROUTE = WAREHOUSE_ROUTE
    
    const [item, setItem] = useState({'name': '','is_delete':false,'is_group':false})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        if (typeof id !== 'undefined' && id !== null){
            fetchOne(id).then(data => setItem(data))
        }
    }, [])
    const save = () => {
        if (typeof id !== 'undefined' && id !== null){
            update(id, item).then(data => {setItem('')})            
        } else {
            create(item).then(data => {setItem('')})
        }
        navigate(-1)
    }
    // console.log(item)
    return (
         <Container className="mt-3">
            <h4>{item.name} (склад)</h4>
            <Box className="mb-3">
                <Button variant="contained"
                        onClick={save} >
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
                        value={item.name}
                        onChange={event => setItem({...item, name: event.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                     <FormControlLabel
                        control={<Checkbox 
                        checked={item.is_delete}
                        onChange={event => setItem({...item, is_delete: event.target.checked})}
                        />}
                        label="Удален"
                    />
                     <FormControlLabel
                        control={<Checkbox 
                        checked={item.is_group}
                        disabled
                        onChange={event => setItem({...item, is_group: event.target.checked})}
                        />}
                        label="Группа"
                    />
                </FormGroup>
            </Box>
        </Container>
    );
};

export default WarehoseItem;