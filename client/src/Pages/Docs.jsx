import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Documentation from '../components/documentation/documentation'

function Docs() {
    return (
        <>
            <Navbar />
            <Documentation />
            <Footer />
        </>
    )
}

export default Docs
