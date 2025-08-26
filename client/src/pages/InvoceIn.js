import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {Context} from "../index";
import InvoceInItem from "../components/InvoceInItem";
import { fetchInvoceIn } from '../service/InvoceInService';


const InvoceIn = observer(() => {
    const {invoceIn} = useContext(Context)

    useEffect(() => {
        fetchInvoceIn().then(data => {
                    invoceIn.setInvocesIn(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {invoceIn.invocesIn.map(invoceIn =>
                <InvoceInItem key={invoceIn.id} invoceIn={invoceIn}/>
                )}
             </Row>
        </Container>
    );
});

export default InvoceIn;