import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddBookModal from './AddBookModal';
import React from "react";
import { LiaSwatchbookSolid } from "react-icons/lia";

const MyNav = () => {

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <div className='d-flex'>
          <Navbar.Brand  href="#home"><LiaSwatchbookSolid />EpiBooks</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav>
          </div>
         <AddBookModal/>
        </Container>
      </Navbar>
      
    </>
  );
}

export default MyNav;