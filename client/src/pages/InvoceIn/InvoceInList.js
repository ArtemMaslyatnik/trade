import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {Context} from "../../index";
import { fetch} from '../../service/InvoceInService';
import { INVOCE_IN_ADD_ROUTE, INVOCE_IN_ROUTE } from '../../utils/consts';


const InvoceInList = observer(() => {
    const {invoceIn} = useContext(Context)
    const navigate = useNavigate();
    useEffect(() => {
        fetch().then(data => {
                    invoceIn.setInvoceIns(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <h4>Приход</h4>
            <Button variant="success" onClick={() => navigate(INVOCE_IN_ADD_ROUTE)}>Добавить</Button>   
            <ListGroup >
                {invoceIn.invoceIns.map(invoceIn =>
                <ListGroup.Item key={invoceIn.id} invocein={invoceIn} action href={INVOCE_IN_ROUTE +'/'+ invoceIn.id}>
                {invoceIn.id}
                </ListGroup.Item> )} 
            </ListGroup>
        </Container>
    );
});

export default InvoceInList;