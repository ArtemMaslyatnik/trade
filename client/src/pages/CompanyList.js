import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, ListGroup,} from "react-bootstrap";
import {fetch} from '../service/CompanyService';
import {Context} from "../index";
import { COMPANY_ADD_ROUTE, COMPANY_ROUTE, GOODS_ADD_ROUTE } from '../utils/consts';
import { useNavigate } from 'react-router-dom';


const CompanyList = observer(() => {
    const {company} = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        fetch().then(data => {
                    company.setCompanies(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Button variant="success" onClick={() => navigate(COMPANY_ADD_ROUTE)}>Добавить</Button>
            <ListGroup >
                {company.companies.map(company =>
                <ListGroup.Item key={company.id} company={company} action href={COMPANY_ROUTE +'/'+ company.id}>
                {company.id} | {company.name}
                </ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default CompanyList;