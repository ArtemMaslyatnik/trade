import React, {useEffect, useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchCompany} from '../service/CompanyService';
import {Context} from "../index";
import CompanytItem from "../components/CompanyItem";


const Company = observer(() => {
    const {company} = useContext(Context)

    useEffect(() => {
        fetchCompany().then(data => {
                    company.setCompanies(data)
                })
    }, [])
    return (
        <Container className="mt-3">
            <Row className="d-flex">
                {company.companies.map(company =>
                <CompanytItem key={company.id} company={company}/>
                )}
             </Row>
        </Container>
    );
});

export default Company;