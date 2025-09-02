import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchContract} from '../service/ContractService';
import {Context} from "../index";
import ContractItem from "../components/ContractItem";
import { CONTRACT_ROUTE } from '../utils/consts';


const ContractList = observer(() => {
    const {contract} = useContext(Context)

    useEffect(() => {
        fetchContract().then(data => {
                    contract.setContracts(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <ListGroup >
                {contract.contracts.map(contract =>
                <ListGroup.Item key={contract.id} contract={contract} action href={CONTRACT_ROUTE +'/'+ contract.id}>
                {contract.id} | {contract.name}</ListGroup.Item> )}
            </ListGroup>
         </Container>
    );
});

export default ContractList;