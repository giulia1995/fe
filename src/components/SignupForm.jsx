import React, { useState } from "react";

// SignupForm component for user registration
const SignupForm = ({ toggleForm }) => {
  // State variables for managing form data and error
  const [signupFormData, setSignupFormData] = useState({});
  const [error, setError] = useState(null);

  // Function to handle input change
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    // Converting age input value to number
    const newValue = name === "age" ? Number(value) : value;
    setSignupFormData({
      ...signupFormData,
      [name]: newValue,
    });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending registration request
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_BASE_URL}/createUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupFormData),
        }
      );

      // Handling response status
      if (!response.ok) {
        throw new Error(
          `La richiesta non è andata a buon fine. Stato: ${response.status} ${response.statusText}`
        );
      }
      setError(null);
    } catch (error) {
      console.error("Si è verificato un errore durante la richiesta:", error);

      setError("Si è verificato un errore. Ricarica la pagina e Riprova.");
    }
  };

  // Style for positioning error alert
  const alertStyle = {
    position: "absolute",
    top: "610px",
    left: "0px",
  };

  // JSX for rendering the component
  return (
    <>
      {error && (
        <div
          style={alertStyle}
          className="text-center alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="card-body cardbody-color p-lg-5">
        <div className="text-center">
          <img
            src="https://picsum.photos/340/340"
            className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
            width="200px"
            alt="profile"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="text"
            className="form-control"
            name="firstName"
            aria-describedby="firstNameHelp"
            placeholder="Inserisci il tuo nome"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="text"
            className="form-control"
            name="lastName"
            aria-describedby="lastNameHelp"
            placeholder="Inserisci il tuo cognome"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Inserisci la tua email"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="password"
            className="form-control"
            name="password"
            aria-describedby="passwordHelp"
            placeholder="Inserisci la tua password"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={onChangeInput}
            type="age"
            className="form-control"
            name="age"
            aria-describedby="ageHelp"
            placeholder="Inserisci la tua età"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5 mb-5 w-100">
            Registrati
          </button>
        </div>

        <div
          onClick={() => toggleForm()}
          id="emailHelp"
          className="form-text text-center mb-5 text-dark"
        >
          Ti sei registrato?
          <a href="#" className="text-dark fw-bold ms-1">
            Effettua il login!
          </a>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
