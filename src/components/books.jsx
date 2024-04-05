import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const BooksFunction = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/books`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setBooks(data.books);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/books/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
     
      setBooks(books.filter(book => book._id !== id));
    
      window.alert('Libro eliminato con successo');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container>
      <Row className="d-flex">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          books.map((book) => (
            <Col className="col-lg-3 col-md-6 col-sm-12 mb-4" key={book._id}>
              <Card className="mt-5 h-100 shadow-lg p-3 bg-body-tertiary rounded" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.cover} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Text>{book.price.$numberDecimal}&euro;</Card.Text>
                  <Button className="me-1 mt-auto" variant="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default BooksFunction;
