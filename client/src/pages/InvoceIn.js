import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {Context} from "../index";
import InvoceInItem from "../components/InvoceInItem";
import { fetchInvoceIn } from '../service/InvoceInService';
import { INVOCE_IN_ROUTE } from '../utils/consts';


const InvoceIn = observer(() => {
    const {invoceIn} = useContext(Context)

    useEffect(() => {
        fetchInvoceIn().then(data => {
                    invoceIn.setInvocesIn(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <ListGroup >
                {invoceIn.invocesIn.map(invoceIn =>
                <ListGroup.Item key={invoceIn.id} invoceIn={invoceIn} action href={INVOCE_IN_ROUTE +'/'+ invoceIn.id}>
                {invoceIn.id} | {invoceIn.craete_at}</ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default InvoceIn;