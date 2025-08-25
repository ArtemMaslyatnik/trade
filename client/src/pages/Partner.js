import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchPartner} from '../service/PartnerService';
import {Context} from "../index";
import PartnerItem from "../components/PartnerItem";


const Partner = observer(() => {
    const {partner} = useContext(Context)

    useEffect(() => {
        fetchPartner().then(data => {
                    partner.setPartners(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {partner.partners.map(partner =>
                <PartnerItem key={partner.id} partner={partner}/>
                )}
             </Row>
        </Container>
    );
});

export default Partner;