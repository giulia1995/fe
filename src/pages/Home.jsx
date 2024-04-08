import React from 'react'
import Books from "./../components/Books"
import MainLayouts from '../layouts/MainLayouts'
import { jwtDecode } from "jwt-decode";


const Home = () => {
    const session = JSON.parse(localStorage.getItem('auth'))
    const decodedSession = session ? jwtDecode(session) : null 
    console.log(decodedSession)


    return (
        <MainLayouts>
            <Books />
        </MainLayouts>
    )
}

export default Home