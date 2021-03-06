import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import HomePage from '../components/HomePage'
import RegisterPage from '../components/RegisterPage'

export default (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  )
}
