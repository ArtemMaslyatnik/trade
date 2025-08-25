import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchContract} from '../service/ContractService';
import {Context} from "../index";
import ContractItem from "../components/ContractItem";


const Contract = observer(() => {
    const {contract} = useContext(Context)

    useEffect(() => {
        fetchContract().then(data => {
                    contract.setContracts(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {contract.contracts.map(contract =>
                <ContractItem key={contract.id} contract={contract}/>
                )}
             </Row>
        </Container>
    );
});

export default Contract;