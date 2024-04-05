import React, {useState} from 'react'
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Login = () => {
    const containerStyle={
        backgroundImage:`url("https://orgoglionerd.it/wp-content/uploads/2020/12/libri-natale.jpg")`,
        backgroundSize: `cover`
    }
    const [showSignupForm, setShowSignupForm] = useState(false)

    const toggleForm = () => setShowSignupForm(!showSignupForm)

    return (
        <div style={containerStyle}>
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5 col-lg-5">
                    <div className="card my-5">
                        {showSignupForm ? (
                            <SignupForm toggleForm={toggleForm} />
                        ) : <LoginForm toggleForm={toggleForm} />
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
    )
}

export default Login
