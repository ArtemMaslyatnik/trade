import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Row, Table} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchGoods}from "../service/GoodsService";
import {Context} from "../index";
import GoodsItem from "../components/GoodsItem";
import { GOODS_ROUTE } from '../utils/consts';

const Goods = observer(() => {
    const {goods} = useContext(Context)
    useEffect(() => {
        fetchGoods().then(data => {
                    goods.setGoods(data)
                })
    }, [])

    return (
        <Container className="mt-3">
            <ListGroup >
                {goods.goods.map(goods =>
                <ListGroup.Item key={goods.id} goods={goods} action href={GOODS_ROUTE +'/'+ goods.id}>
                {goods.id} | {goods.name}</ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default Goods;