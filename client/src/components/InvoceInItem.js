import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom"
import {INVOCE_IN_ROUTE} from "../utils/consts";

const InvoceInItem = ({invoceIn}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(INVOCE_IN_ROUTE + '/' + invoceIn.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{invoceIn.id}</div>
            </Card>
        </Col>
    );
};

export default InvoceInItem;