import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Shop = observer(() => {
  
    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                  Левая
                </Col>
                <Col md={9}>
                  Правя              
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;