import React, {useState} from 'react';
import {Form, Button, Container} from "react-bootstrap";
import {createGoods} from "../../service/GoodsService";
import { useNavigate } from 'react-router-dom';
import { GOODS_ROUTE } from '../../utils/consts';

const CreateGoods = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    const addGoods = () => {
        createGoods({item: value}).then(data => {
            setValue('')
        })
        navigate(GOODS_ROUTE)
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
                        onClick={() => navigate(GOODS_ROUTE)} >
                    Отменить
                </Button >
                <Button variant="outline-success" 
                        onClick={addGoods} >
                    Submit
                </Button >
            </Form>
        </Container>

    );
};

export default CreateGoods;
