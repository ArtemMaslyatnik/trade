import React, { useEffect, useState } from 'react';
import {Button, Container, Form} from "react-bootstrap";
import { fetchOneGoods, updateGoods } from '../../service/GoodsService';
import { useNavigate, useParams } from 'react-router-dom';
import { GOODS_ROUTE } from '../../utils/consts';


const GoodsItem = () => {
    const [goods, setGoods] = useState({'name': '','is_active':'','is_group':''})
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        fetchOneGoods(id).then(data => setGoods(data))
    }, [])
    const upgradeGoods = () => {
            updateGoods(id, goods).then(data => {
                setGoods('')
            })
            navigate(GOODS_ROUTE)
        }
    return (
         <Container className="mt-3">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        value={goods.name}
                        onChange={event => setGoods({...goods, name: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Активный" 
                        checked={goods.is_active}
                        onChange={event => setGoods({...goods, is_active: event.target.checked})}

                    />
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Папка"
                        disabled
                        checked={goods.is_group}
                        onChange={event => setGoods({...goods, is_group: event.target.checked})}
                    />
                </Form.Group>
                <Button variant="outline-success"
                        onClick={upgradeGoods} >
                    Сохранить
                </Button >
                <Button variant="outline-danger"
                        onClick={() => navigate(GOODS_ROUTE)} >
                    Отменить
                </Button >
            </Form>
        </Container>
    );
};

export default GoodsItem;