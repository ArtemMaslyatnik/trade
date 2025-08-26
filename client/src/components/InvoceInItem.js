import React, { useEffect, useState } from 'react';
import {Card, Col, Container, ListGroup} from "react-bootstrap";
import {data, useParams } from "react-router-dom"
import {INVOCE_IN_ROUTE} from "../utils/consts";
import { fetchOneInvoceIn } from '../service/InvoceInService';

const InvoceInItem = () => {
    const [invoceIn, setinvoceIn] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchOneInvoceIn(id).then(data => setinvoceIn(data))
    }, [])
    console.log(invoceIn)
    return (
        <Container className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>Данные</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>код -> {invoceIn.id}</ListGroup.Item>
                        <ListGroup.Item>Rjv -> {invoceIn.id}</ListGroup.Item>
                        
                        company
                        <ListGroup.Item>наименование -> {invoceIn.name}</ListGroup.Item>
                    </ListGroup>          
                </Card>
        </Container>
    );
};

export default InvoceInItem;