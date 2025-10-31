import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom"
import {INVOCE_OUT_ROUTE} from "../../utils/consts";

const InvoceOutItem = ({invoceOut}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(INVOCE_OUT_ROUTE + '/' + invoceOut.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{invoceOut.number}</div>
            </Card>
        </Col>
    );
};

export default InvoceOutItem;