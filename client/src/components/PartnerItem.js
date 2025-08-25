import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useNavigate } from "react-router-dom"
import {PARTNER_ROUTE} from "../utils/consts";

const PartnerItem = ({partner}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(PARTNER_ROUTE + '/' + partner.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{partner.name}</div>
            </Card>
        </Col>
    );
};

export default PartnerItem;