import React, { useEffect, useState } from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import { useParams } from "react-router-dom"
import { fetchOnePartner } from '../service/PartnerService';

const PartnerItem = () => {
    const [partner, setPartner] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchOnePartner(id).then(data => setPartner(data))
    }, [])
    return (
        <Container className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>Данные</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>код -> {partner.id}</ListGroup.Item>
                        <ListGroup.Item>наименование -> {partner.name}</ListGroup.Item>
                    </ListGroup>          
                </Card>
        </Container>
    );
};

export default PartnerItem;