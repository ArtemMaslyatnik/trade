import React, { useEffect, useState } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
// replace
import { GOODS_ROUTE } from '../../utils/consts';
import { fetchOne, update } from '../../service/GoodsService';

const GoodsItem = () => {
    // replace
    const ROUT = GOODS_ROUTE
    
    const [item, setItem] = useState({'name': '','is_active':'','is_group':''})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOne(id).then(data => setItem(data))
    }, [])
    const updateItem = () => {
            update(id, item).then(data => {
                setItem('')
            })
            navigate(ROUT)
        }
    return (
         <Container className="mt-3">
            <h4>{item.name} (товар)</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        value={item.name}
                        onChange={event => setItem({...item, name: event.target.value})}
                    />
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
                <Button variant="outline-success"
                        onClick={updateItem} >
                    Сохранить
                </Button >
                <Button variant="outline-danger"
                        onClick={() => navigate(ROUT)} >
                    Отменить
                </Button >
            </Form>
        </Container>
    );
};

export default GoodsItem;