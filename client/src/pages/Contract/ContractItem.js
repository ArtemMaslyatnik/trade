import React, { useEffect, useState } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate, useParams } from "react-router-dom"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// replace
import { fetchOne, update } from '../../service/ContractService';


const ContractItem = () => {

    
    const [item, setItem] = useState({'name': '','is_active':'','is_group':'', 
            'created_at':'', 'partner':'', 'company':''})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOne(id).then(data => setItem(data))
    }, [])
    console.log(item)
    
    const updateItem = () => {
                update(id, item).then(data => {
                    setItem('')
                })
                navigate(-1)
    }

    return (
        <Container className="mt-3">
            <h4>{item.name} (договор)</h4>
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
                <Form.Label>Партнер</Form.Label>
                <Form.Select disabled>
                    <option 
                        value={item.partner.id}>
                        {item.partner.name}
                    </option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Организация</Form.Label>
                <Form.Select disabled>
                    <option 
                        value={item.company.id}>
                        {item.company.name}
                    </option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        value={item.name}
                        onChange={event => setItem({...item, name: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Дата договора :</Form.Label>
                    <DatePicker 
                        selected={item.date} 
                        onChange={(date) => setItem({...item, date: date})} 
                        dateFormat = "dd.MM.yyyy"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Активный" 
                        checked={item.is_active}
                        onChange={event => setItem({...item, is_active: event.target.checked})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Группа"
                        disabled
                        checked={item.is_group}
                        onChange={event => setItem({...item, is_group: event.target.checked})}
                    />
                </Form.Group>
            </Form>
        </Container>
    );
};

export default ContractItem;