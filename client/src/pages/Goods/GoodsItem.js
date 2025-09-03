import React, { useEffect, useState } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
// replace
import { GOODS_ROUTE } from '../../utils/consts';
import { fetchOne, update } from '../../service/GoodsService';

const GoodsItem = () => {
    // replace
    const ROUT = GOODS_ROUTE
    
    const [goods, setItem] = useState({'name': '','is_active':'','is_group':''})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOne(id).then(data => setItem(data))
    }, [])
    const updateItem = () => {
            update(id, goods).then(data => {
                setItem('')
            })
            navigate(ROUT)
        }
    return (
         <Container className="mt-3">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        value={goods.name}
                        onChange={event => setItem({...goods, name: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Активный" 
                        checked={goods.is_active}
                        onChange={event => setItem({...goods, is_active: event.target.checked})}

                    />
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Папка"
                        disabled
                        checked={goods.is_group}
                        onChange={event => setItem({...goods, is_group: event.target.checked})}
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