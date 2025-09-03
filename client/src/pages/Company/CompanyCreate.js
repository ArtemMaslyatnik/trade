import React, {useState} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { COMPANY_ROUTE } from '../../utils/consts';
import { create } from '../../service/CompanyService';

const CompanyCreate = () => {
    // replace
    const ROUT = COMPANY_ROUTE
        
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    const addItem = () => {
        create({name: value}).then(data => {
            setValue('')
        })
        navigate(ROUT)
    }

    return (
        <Container className="mt-3">
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Наименование</Form.Label>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                </Form.Group>
                <Button variant="outline-danger"
                        onClick={() => navigate(ROUT)} >
                    Отменить
                </Button >
                <Button variant="outline-success" 
                        onClick={addItem} >
                    Submit
                </Button >
            </Form>
        </Container>

    );
};

export default CompanyCreate;
