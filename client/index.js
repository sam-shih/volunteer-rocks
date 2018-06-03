
import style from "./css/main.css";

import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import ReactDOM from 'react-dom';

import Filter from './components/Filter.jsx';
import OpsList from './components/OpsList.jsx';

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

  render() {
    return (
      <div>
        <p>Bunch of Frooty Tooties</p>
        <div className='filter'>
          <Filter />
        </div>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('app'));