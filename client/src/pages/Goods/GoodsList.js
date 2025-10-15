import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {fetch}from "../../service/GoodsService";
import {Context} from "../../index";
import { GOODS_ADD_ROUTE, GOODS_ROUTE } from '../../utils/consts';

const GoodsList = observer(() => {
    const {goods} = useContext(Context);
    const navigate = useNavigate ();

    useEffect(() => {
        fetch().then(data => {
                    goods.setGoods(data)
                })
    }, [])
    //console.log(goods)
    return (
        <Container className="mt-3">
            <h4>Товары</h4>
            <Button variant="success" onClick={() => navigate(GOODS_ADD_ROUTE)}>Добавить</Button>
            <ListGroup >
                {goods.goods.map(goods =>
                <ListGroup.Item key={goods.id} goods={goods} action href={GOODS_ROUTE +'/'+ goods.id}>
                {goods.id} | {goods.name}</ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default GoodsList;