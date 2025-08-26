import React, { useEffect, useState } from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import {useParams } from "react-router-dom"
import { fetchOneContract } from '../service/ContractService';


const ContractItem = () => {
    const [contract, setContract] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchOneContract(id).then(data => setContract(data))
    }, [])
    return (
        <Container className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>Данные</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>код -> {contract.id}</ListGroup.Item>
                        <ListGroup.Item>наименование -> {contract.name}</ListGroup.Item>
                    </ListGroup>          
                </Card>
        </Container>
    );
};

export default ContractItem;