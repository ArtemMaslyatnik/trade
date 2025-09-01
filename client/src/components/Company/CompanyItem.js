import React, { useEffect, useState } from 'react';
import {Card, Container, ListGroup} from "react-bootstrap";
import { fetchOneCompany } from '../../service/CompanyService';
import { useParams } from 'react-router-dom';


const CompanyItem = () => {
    const [company, setCompany] = useState([])
    const {id} = useParams()
    useEffect(() => {
        fetchOneCompany(id).then(data => setCompany(data))
    }, [])
    return (
        <Container className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>Данные</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>код -> {company.id}</ListGroup.Item>
                        <ListGroup.Item>наименование -> {company.name}</ListGroup.Item>
                    </ListGroup>          
                </Card>
        </Container>
    );
};
export default CompanyItem;