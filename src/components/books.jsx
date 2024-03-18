import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Books = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3030/books");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchBooks();
  }, []);
  console.log(Books)

  return (
    <Container>
      <Row>
        {books?.map((book) => (
          <Col key={book._id}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={book.cover} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  {book.author}
                </Card.Text>
                <Button variant="primary">Delete</Button>
                <Button variant="primary">Modify</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Books;