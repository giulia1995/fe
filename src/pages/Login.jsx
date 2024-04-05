import React, {useState} from 'react'
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
    const [showSignupForm, setShowSignupForm] = useState(false)

    const toggleForm = () => setShowSignupForm(!showSignupForm)

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 col-lg-5">
                    <h2 className="text-center text-dark mt-5">
                        Epibook Login
                    </h2>
                    <div className="card my-5">
                        {showSignupForm ? (
                            <SignupForm toggleForm={toggleForm} />
                        ) : <LoginForm toggleForm={toggleForm} />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
