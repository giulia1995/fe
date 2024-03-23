import './App.css';
import Home from './pages/Home';
import ProtectedRoutes from "../src/middlewares/protectedRoutes";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';



function App() {
  return (
    <Router>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route element={<ProtectedRoutes/>}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </Router>
  );
}

export default App;
