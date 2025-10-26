import React, { useEffect, useState } from 'react';
import {Button, Container, Form, ListGroup} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
// replace
import { fetchOne, update } from '../../service/PartnerService';
import { CONTRACT_ADD_ROUTE, CONTRACT_ROUTE, PARTNER_ROUTE } from '../../utils/consts';

const PartnerItem = () => {
    // replace
    const ROUT = PARTNER_ROUTE
    
    const [item, setItem] = useState({'name': '','is_delete':'','is_group':''})
    const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

    const {id} = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        fetchOne(id).then(data => setItem(data)).finally(() => setLoading(false))
    }, [])
    const updateItem = () => {
            update(id, item).then(data => {
                setItem('')
            })
            navigate(ROUT)
        }
    return (
         <Container className="mt-3">
            <h4>{item.name} (партнер)</h4>
            <Form>
                <Button variant="outline-success"
                        onClick={updateItem} >
                    Сохранить
                </Button >
                <Button variant="outline-danger"
                        onClick={() => navigate(ROUT)} >
                    Отменить
                </Button >
                <Form.Group className="mb-3">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        value={item.name}
                        onChange={event => setItem({...item, name: event.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Активный" 
                        checked={item.is_delete}
                        onChange={event => setItem({...item, is_delete: event.target.checked})}

                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check 
                        type="checkbox" 
                        label="Группа"
                        disabled
                        checked={item.is_group}
                        onChange={event => setItem({...item, is_group: event.target.checked})}
                    />
                </Form.Group>
            </Form>
            {loading ? (
            <p>Договора...</p>
            )    : (
                <div>
                    <Button 
                        variant="outline-success" 
                        onClick={() => navigate(CONTRACT_ADD_ROUTE, { state : { partner: item } })}>
                            +
                    </Button>
                    <ListGroup >
                        <ListGroup.Item>Договора</ListGroup.Item>
                        {item.contracts.map(contract =>
                        <ListGroup.Item key={contract.id} contract={contract} action href={CONTRACT_ROUTE +'/'+ contract.id}>
                        {contract.id} | {contract.name}
                        </ListGroup.Item> )}
                    </ListGroup>
                </div>
            )}
        </Container>
    );
};


export default PartnerItem;