import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchGoods}from "../service/GoodsService";
import {Context} from "../index";
import GoodsItem from "../components/GoodsItem";

const Goods = observer(() => {
    const {goods} = useContext(Context)
    useEffect(() => {
        fetchGoods().then(data => {
                    goods.setGoods(data)
                })
    }, [])

    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {goods.goods.map(goods1 =>
                <GoodsItem key={goods1.id} goods={goods1}/>
                )}
             </Row>
        </Container>
    );
});

export default Goods;