import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Filter from './Filter.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      opportunities: []
    }

    this.getOpps = this.getOpps.bind(this);
  }

  componentDidMount() {
    this.getOpps();
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

export default App;
ReactDOM.render(<App />, document.getElementById('app'));