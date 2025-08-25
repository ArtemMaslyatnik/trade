import React from 'react';
import {Card, Col} from "react-bootstrap";
import {useNavigate } from "react-router-dom"
import {COMPANY_ROUTE} from "../utils/consts";

const ContractItem = ({company}) => {
    const navigate = useNavigate ()
    return (
        <Col md={3} className={"mt-3"} onClick={() => navigate(COMPANY_ROUTE + '/' + company.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <div>{company.name}</div>
            </Card>
        </Col>
    );
};

export default ContractItem;