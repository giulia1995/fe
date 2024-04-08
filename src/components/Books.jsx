import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

// Functional component for displaying books
const BooksFunction = () => {
  // State variables for managing books data, loading state, and error state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch books data from the server
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

  // Function to handle book deletion
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/books/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Update books state after successful deletion
      setBooks(books.filter((book) => book._id !== id));

      // Show success message after deletion
      window.alert("Libro eliminato con successo");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Effect hook to fetch books data when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // JSX for rendering the component
  return (
    <Container>
      <Row className="d-flex">
        {loading ? (
          // Display loading message while data is being fetched
          <div>Loading...</div>
        ) : error ? (
          // Display error message if an error occurs during data fetching
          <div>{error}</div>
        ) : (
          // Render book cards if data is successfully fetched
          books.map((book) => (
            <Col className="col-lg-3 col-md-6 col-sm-12 mb-4" key={book._id}>
              <Card
                className="mt-5 h-100 shadow-lg p-3 bg-body-tertiary rounded"
                style={{ width: "18rem" }}
              >
                <Card.Img variant="top" src={book.cover} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.author}</Card.Text>
                  <Card.Text>{book.description}</Card.Text>
                  <Card.Text>{book.price.$numberDecimal}&euro;</Card.Text>
                  {/* Button to delete the book */}
                  <Button
                    className="me-1 mt-auto"
                    variant="danger"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
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
