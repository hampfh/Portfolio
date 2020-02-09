import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from 'components/templates/Header'
import Home from 'components/views/Home'
import Project from 'components/views/Project'
import Footer from 'components/templates/Footer'

import './_root.scss'

export class App extends Component {
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/"
                        component={Home}
                    />
                    <Route exact path="/:project" 
                        component={Project}
                    />
                    <Route 
                        component={() => {
                            return <div><h1>404</h1><h2>This page cannot be found</h2></div>
                        }}
                    />
                </Switch>
                <Footer />
            </Router>
        )
    }
}

export default App

