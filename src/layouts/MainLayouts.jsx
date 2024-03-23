import React from 'react'
import Footer from '../components/Footer'
import MyNav from '../components/MyNav'

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