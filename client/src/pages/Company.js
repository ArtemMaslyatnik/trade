import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchCompany} from '../service/CompanyService';
import {Context} from "../index";
import CompanytItem from "../components/CompanyItem";
import { COMPANY_ROUTE } from '../utils/consts';


const Company = observer(() => {
    const {company} = useContext(Context)

    useEffect(() => {
        fetchCompany().then(data => {
                    company.setCompanies(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <ListGroup >
                {company.companies.map(company =>
                <ListGroup.Item key={company.id} company={company} action href={COMPANY_ROUTE +'/'+ company.id}>
                {company.id} | {company.name}
                </ListGroup.Item> )}
            </ListGroup>
        </Container>
    );
});

export default Company;