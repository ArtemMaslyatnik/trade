import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {GOODS_ROUTE, CONTRACT_ROUTE, COMPANY_ROUTE, PARTNER_ROUTE, MAIN_ROUTE, INVOCE_IN_ROUTE, INVOCE_OUT_ROUTE, WAREHOUSE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {

  return (
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href={MAIN_ROUTE}>Главная</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href={GOODS_ROUTE}>Товары</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={PARTNER_ROUTE}>Партнеры</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={CONTRACT_ROUTE}>Договора</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={COMPANY_ROUTE}>Компании</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={WAREHOUSE_ROUTE}>Складs</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={INVOCE_IN_ROUTE}>Приход</Nav.Link> 
          </Nav> 
          <Nav className="me-auto">
            <Nav.Link href={INVOCE_OUT_ROUTE}>Расход</Nav.Link> 
          </Nav> 
        </Container>
      </Navbar>
  );
});

export default NavBar;