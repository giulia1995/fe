import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

const AddBookModal = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errorAlert, setErrorAlert] = useState(false); 
  const onChangeHandleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const onChangeHandleInput = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "price" ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const uploadFile = async () => {
    const fileData = new FormData();
    fileData.append("uploadImg", file);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/books/cloudUploadImg`,
        {
          method: "POST",
          body: fileData,
        }
      );
      return await response.json();
    } catch (e) {
      console.log(e.message);
    }
  };

  const submitBook = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const uploadedFile = await uploadFile(file);
        const bodyToSend = {
          ...formData,
          cover: uploadedFile.source,
        };
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/books/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyToSend),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAlertMessage("Libro aggiunto correttamente!");
          setShowAlert(true);
          setErrorAlert(false); 
        } else {
          setAlertMessage(data.error || "Si è verificato un errore, controlla che i campi siano tutti compilati correttamente!");
          setShowAlert(true);
          setErrorAlert(true); 
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Aggiungi un libro
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi un nuovo libro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form encType="multipart/form-data" onSubmit={submitBook}>
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="author"
              type="text"
              placeholder="Inserisci autore"
            />
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="title"
              type="text"
              placeholder="Inserisci titolo"
            />
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              name="editor"
              type="text"
              placeholder="Inserisci editore"
            />
            <input
              className="m-2"
              onChange={onChangeHandleFile}
              type="file"
              name="uploadImg"
            />
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="price"
              placeholder="Inserisci prezzo(cifra)"
            />
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="text"
              name="description"
              placeholder="Inserisci descrizione"
            />
            <input
              className="m-2"
              onChange={onChangeHandleInput}
              type="datetime"
              name="pubDate"
              placeholder="Inserisci data"
            />
          
            <button type="submit" className="btn btn-primary pt-2 m-2">
              Aggiungi Libro
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        show={showAlert}
        variant={errorAlert ? "danger" : "success"} 
        onClose={() => setShowAlert(false)}
        dismissible
        style={{
          position: "fixed",
          bottom: 250,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
      >
        {alertMessage}
      </Alert>
    </>
  );
};

export default AddBookModal;
