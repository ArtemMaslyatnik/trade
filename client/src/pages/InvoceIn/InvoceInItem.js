import React, { useEffect, useState } from 'react';
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom"

import "react-datepicker/dist/react-datepicker.css";
import { Context } from '../../index';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// replace
import { fetchOne, update } from '../../service/InvoceInService';
import context from 'react-bootstrap/esm/AccordionContext';
import { fetch } from '../../service/CompanyService';


const InvoceInItem = () => {
    interface AutocompleteOption {
        label: string;
    }
    const [item, setItem] = useState({'number': '','is_active':'', 
            'created_at':'', 'company':'', 'partner':'',  'contract':''})
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки
    const [loadingCompany, setLoadingCompany] = useState(true); // Состояние для отслеживания загрузки
    const [companyItems, setCompany] = useState([]);
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOne(id).then(data => setItem(data)).finally(() => setLoading(false))
    }, [])
    useEffect(() => {
        fetch().then(data => setCompany(data)).finally(() => setLoadingCompany(false))
    }, [])
    
    const updateItem = () => {
                update(id, item).then(data => {
                    setItem('')
                })
                navigate(-1)
    }
    // function getOptions(id, option) {
    //     return id === option.id ?(<option key={option.id} value={option.name} selected>
    //     {option.name}
    //     </option>):(<option key={option.id} value={option.name}>
    //     {option.name}
    //     </option>)
    // }
    const getArrOptions = companyItems.map(option => {
        return {label: option.name};
    })

    console.log(item);
    // console.log(getArrOptions);
  
    return (
        <Container className="mt-3">
            <h4>{item.number} (приход)</h4>
            <Form>
                <Button variant="outline-success"
                        onClick={updateItem} >
                    Сохранить
                </Button >
                <Button variant="outline-danger"
                        onClick={() => navigate(-1)} >
                    Отменить
                </Button >
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Активный" 
                        checked={item.is_active}
                        onChange={event => setItem({...item, is_active: event.target.checked})}
                    />
                    <Form.Control
                        value={item.number}
                        onChange={event => setItem({...item, number: event.target.value})}
                    />
                    <Form.Label>Дата :</Form.Label>
                    <DatePick
                        selected={item.date}
                        onChange={(date) => setItem({...item, date: date})}
                        dateFormat = "dd.MM.yyyy" />
                    <DatePicker 
                        selected={item.date} 
                        onChange={(date) => setItem({...item, date: date})} 
                        dateFormat = "dd.MM.yyyy"/>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Копания</Form.Label>
                    <Autocomplete
                        getOptionLabel={(option) => option.name || ""}
                        options={companyItems}
                        value={item.company}
                        onChange={(event, newValue)  => setItem({...item, company: newValue})}
                        renderInput={(params) => <TextField {...params} />}
                        
                    />

                {/* <Form.Select
                    value={item.company.id}
                    onChange={event => setItem({...item, company: event.target.value})}
                >
                    {loadingCompany ? (
                        <option>Загрузка...</option>
                    ) : companyItems.length > 0 ? (
                    companyItems.map(option => getOptions(item.company.id, option))
                    ) : (
                    <option>Нет данных</option>
                    )}
                </Form.Select>  */}
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Партнер</Form.Label>
                <Form.Select>
                    <option 
                        value={item.partner.id}>
                        {item.partner.name}
                    </option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Договор</Form.Label>
                <Form.Select>
                    <option 
                        value={item.contract.id}>
                        {item.contract.name}
                    </option>
                </Form.Select>
                </Form.Group>
            </Form>
                        {loading ? (
            <p>Товары...</p>
            )    : (
                <div>
                    <ListGroup >
                        <ListGroup.Item>Товары</ListGroup.Item>
                        {item.invoice_in_list.map(item =>
                        <ListGroup.Item key={item.number}  >
                        {item.goods.name} | {item.price} | {item.price}
                        </ListGroup.Item> )}
                    </ListGroup>
                </div>
            )}
        </Container>
    );
};

export default InvoceInItem;