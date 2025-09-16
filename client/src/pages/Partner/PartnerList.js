import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {fetch} from '../../service/PartnerService';
import {Context} from "../../index";
import { PARTNER_ADD_ROUTE, PARTNER_ROUTE } from '../../utils/consts';


const PartnerList = observer(() => {
    const {partner} = useContext(Context)
    const navigate = useNavigate();
    console.log(partner)
    useEffect(() => {
        fetch().then(data => {
                    partner.setPartners(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <h4>Партнеры</h4>
            <Button variant="success" onClick={() => navigate(PARTNER_ADD_ROUTE)}>Добавить</Button>   
            <ListGroup >
                {partner.partners.map(partner =>
                <ListGroup.Item key={partner.id} partner={partner} action href={PARTNER_ROUTE +'/'+ partner.id}>
                {partner.id} | {partner.name}
                </ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default PartnerList;