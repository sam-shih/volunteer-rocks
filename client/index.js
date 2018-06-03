import React, { Component } from 'react';
import style from "./css/main.css";
import $ from 'jquery';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import Filter from './components/Filter.jsx';
import OpsList from './components/OpsList.jsx';
import Main from './components/Main.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      opportunity: ''
    }

    this.getOpps = this.getOpps.bind(this);
  }

  componentDidMount() {
    this.getOpps();
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  getOpps() {
    axios.get('/opportunities')
      .then($.proxy(function(response) {
        this.setState({
          opportunities: response.data
        })
      }, this))
      .catch(function(err) {
        throw err;
      });
  }

  renderView() {
    const {view} = this.state;
    if (view === 'main') {
      return <Main />
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-light bg-light static-top">
          <div className="container">
            <a className="navbar-brand" href="#">Volunteer Rocks</a>
            <a className="btn btn-primary" href="#">Sign In</a>
          </div>
        </nav>
        <div className="main">
          {this.renderView()}
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));