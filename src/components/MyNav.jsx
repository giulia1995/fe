import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddBookModal from './AddBookModal';
import React , {useState} from "react";


const MyNav = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false)
    
    const toggleAddBookModal = () => setIsAddBookModalOpen(!isAddBookModalOpen)
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <div className='d-flex'>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          </div>
          <button
          onClick={toggleAddBookModal} 
          className='btn btn-primary'>Aggiungi un Libro</button>
        </Container>
      </Navbar>
      {isAddBookModalOpen && (
                <AddBookModal />
            )}
    </>
  );
}

export default MyNav;