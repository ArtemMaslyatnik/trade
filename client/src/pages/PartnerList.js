import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetch} from '../service/PartnerService';
import {Context} from "../index";
import PartnerItem from "../components/PartnerItem";
import { PARTNER_ROUTE } from '../utils/consts';


const PartnerList = observer(() => {
    const {partner} = useContext(Context)

    useEffect(() => {
        fetch().then(data => {
                    partner.setPartners(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <ListGroup >
                {partner.partners.map(partner =>
                <ListGroup.Item key={partner.id} partner={partner} action href={PARTNER_ROUTE +'/'+ partner.id}>
                {partner.id} | {partner.name}
                </ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default PartnerList;