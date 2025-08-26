import React, { useEffect, useState } from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import { fetchOneGoods } from '../service/GoodsService';
import { useParams } from 'react-router-dom';

const GoodsItem = () => {
    const [goods, setGoods] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchOneGoods(id).then(data => setGoods(data))
    }, [])
    return (
        <Container className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>Данные</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>код -> {goods.id}</ListGroup.Item>
                        <ListGroup.Item>наименование -> {goods.name}</ListGroup.Item>
                    </ListGroup>          
                </Card>
        </Container>
    );
};

export default GoodsItem;