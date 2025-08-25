import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom"
import {CONTRACT_ROUTE} from "../utils/consts";

const ContractItem = ({contract}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(CONTRACT_ROUTE + '/' + contract.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{contract.name}</div>
            </Card>
        </Col>
    );
};

export default ContractItem;