import React from 'react'
import MyNav from '../components/MyNav'
import Footer from '../components/Footer'


const MainLayout = ({ children }) => {
    return (
        <>
            <MyNav/>
            {children}
            <Footer />
        </>
    )
}

export default MainLayout