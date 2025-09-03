import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Container, ListGroup} from "react-bootstrap";
import {Context} from "../../index";

// replace
import {fetch} from '../../service/ContractService';
import { CONTRACT_ROUTE } from '../../utils/consts';

const ContractList = observer(() => {
    const {contract} = useContext(Context)

    useEffect(() => {
        fetch().then(data => {
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