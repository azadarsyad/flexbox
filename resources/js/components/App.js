import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Hero from './Hero'
import Estimate from './Estimate'
import Home from './Home'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Header />
        <Route 
            exact path='/' 
            component={Home}
        />
        <Route 
          exact path='/estimate' 
          component={Estimate}
        />
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))