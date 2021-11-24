import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from 'components/views/Home'
import Project from 'components/views/Project/Project'
import Footer from 'components/templates/Footer'

import './_root.scss'

export default function App() {
    return (
        <Router>                
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:project" element={<Project />} />
            </Routes>
            <Footer />
        </Router>
    )
}
