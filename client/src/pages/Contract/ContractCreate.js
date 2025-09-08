import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import DatePicker from 'react-datepicker';
// replace
import { create } from '../../service/ContractService';
import { fetch } from '../../service/CompanyService';
import { observer } from 'mobx-react-lite';



const ContractCreate = () => {
    const {company} = useContext(Context)
    const { state } = useLocation();
    const navigate = useNavigate();
    const [item, setItem] = useState( {
            name: '',
            date: '',
            partner: state.partner.id,
            company: '',
            },
    )
    useEffect(() => {
        fetch().then(data => {
                    company.setCompanies(data)
                })
    }, [])
    console.log(item)
    const addItem = () => {
        create(item).then(data => {
            setItem('')
        })
        navigate(-1)
    }

    return (
        <Container className="mt-3">
            <h4>Договор (создание)</h4>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Партнер</Form.Label>
                <Form.Select disabled>
                    <option 
                        value={state.partner.id}>
                        {state.partner.name}
                    </option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Копания</Form.Label>
                <Form.Select
                    value={'DEFAULT'}
                    onChange={event => setItem({...item, company: event.target.value})}
                >
                    <option disabled value="DEFAULT" ></option>
                    {company.companies.map(company =>
                        <option 
                        key={company.id}
                        value={company.id}
                        >
                            {company.name}
                        </option>)
                    }
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Наименование</Form.Label>
                <Form.Control
                    value={item.name}
                    onChange={e => setItem({...item, name: e.target.value})}
                />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Дата договора :</Form.Label>
                    <DatePicker 
                        selected={item.date} 
                        onChange={(date) => setItem({...item, date: date})} 
                        dateFormat = "dd.MM.yyyy"/>
                </Form.Group>
                <Button variant="outline-danger"
                        onClick={() => navigate(-1)} >
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

export default observer(ContractCreate);
