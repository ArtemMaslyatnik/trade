import React, {useState} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
    // replace
import { GOODS_ROUTE } from '../../utils/consts';
import {create} from "../../service/GoodsService";

const GoodsCreate = () => {
    // replace
    const ROUTE = GOODS_ROUTE
    
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    const addItem = () => {
        create({name: value}).then(data => {
            setValue('')
        })
        navigate(ROUTE)
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
                        onClick={() => navigate(ROUTE)} >
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

export default GoodsCreate;
