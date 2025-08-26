import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {Context} from "../index";
import { fetchInvoceOut } from '../service/InvoceOutService';
import InvoceOutItem from "../components/InvoceOutItem";

const InvoceOut = observer(() => {
    const {invoceOut} = useContext(Context)

    useEffect(() => {
        fetchInvoceOut().then(data => {
                    invoceOut.setInvocesOut(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {invoceOut.invocesOut.map(invoceOut =>
                <InvoceOutItem key={invoceOut.id} invoceOut={invoceOut}/>
                )}
             </Row>
        </Container>
    );
});

export default InvoceOut;