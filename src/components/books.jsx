import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const BooksFunction = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:3030/books");
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

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container>
      <Row>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          books.map((book) => (
            <Col className="col-3" key={book._id}>
              <Card className="my-3" style={{ width: "18rem" }}>
                <Card.Img variant="top" src={book.cover} />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Text>{book.price.$numberDecimal}&euro;</Card.Text>
                  <Button className="me-1" variant="danger">Delete</Button>
                  <Button className="me-1" variant="warning">Modify</Button>
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
