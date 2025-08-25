import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate } from "react-router-dom"
import {GOODS_ROUTE} from "../utils/consts";

const GoodsItem = ({goods}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(GOODS_ROUTE + '/' + goods.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{goods.name}</div>
            </Card>
        </Col>
    );
};

export default GoodsItem;