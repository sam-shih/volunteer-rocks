import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import axios from 'axios';
import $ from 'jquery';

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';
import NavBar from './NavBar.jsx';
import LoadAllMarkers from './LoadAllMarkers.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      filtedOpps: [],
      isLoggedIn: false,
      isOrganization: false,
      user: {},
      zipcode: ''
    }
    this.logOut = this.logOut.bind(this);
    this.getOpps = this.getOpps.bind(this);
    this.changeView = this.changeView.bind(this);
    this.setOpsListView = this.setOpsListView.bind(this);
    this.volunteerForOpp = this.volunteerForOpp.bind(this);
    this.isLoggedInToggleForTesting = this.isLoggedInToggleForTesting.bind(this);
    this.orginizationLoggedIn = this.orginizationLoggedIn.bind(this);
  }

  componentDidMount() {
    axios.get('/main')
    .then((response) => {
      if ('googleId' in response.data) {
        console.log("volunteer logged in", response.data)
        this.setState({
          user: response.data,
          isLoggedIn: true
        });
      } else {
        console.log("organization logged in", response.data)
        this.setState({
          user: response.data.name,
          isOrganization: true
        });
      }
    })
    .catch((err) => {
      console.log("Error in main page GET request ", err);
    })
  }

  orginizationLoggedIn(org) {
    this.setState({
      user: org,
      isOrganization: true
    });
  }

  isLoggedInToggleForTesting() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      isOrganization: !this.state.isOrganization
    });
  }

  changeView(option) {
    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
  }

  zip(e) {
    this.setState({
      zipcode: e.target.value
    });
  }

  volunteerForOpp(oppId) {
    axios.post('/enroll', { oppId: oppId })
      .then((response) => {
        let responseData = response.data;
        if (responseData === 'login') {
          alert('Please login before enrolling');
        } else if (responseData === 'enrolled') {
          alert('Successfully enrolled in opportunity');
        } else if (responseData === 'already') {
          alert('You have already enrolled in this opportunity');
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getOpps(e, zipcode) {
    e.preventDefault();
    axios.post('/opportunities', {zipcode:zipcode})
      .then((response) => {
          console.log(response.data);
          this.setState({
            view: 'opportunities',
            opportunities: response.data,
          });
      })
      .catch((err) => {
        throw(err)
      });
  }

  postNewOrganizationForm(form) {
    axios.post('/organization', {

    })
      .then((response) => {
        alert('New Organization Saved');
      })
      .catch((err) => {
        throw(err);
      });
  }

  logOut() {
    axios.get('/logout')
      .then(response => {
        this.setState({
          view: 'main',
          opportunities: [],
          isLoggedIn: false,
          isOrganization: false,
          user: {},
          zipcode: ''
        });
      });
  }

  setOpsListView(option, ops) {
    this.setState({
      view: option,
      filtedOpps: ops
    })
  }

  renderView() {
    const {view} = this.state;
    if (view === 'main') {
      return <Main getOpp={this.getOpps} zipcodeState={this.state.zipcode} zipcode={this.zip.bind(this)} />
    } else if (view === 'opportunities') {
      return <OpsList enroll={this.volunteerForOpp} opportunities={this.state.opportunities} setOpsListView={this.setOpsListView} />
    } else if (view === 'loadAllMarkers') {
      return <LoadAllMarkers opportunities={this.state.opportunities} />
    } else if (view === 'filtedOpps') {
      return <OpsList enroll={this.volunteerForOpp} opportunities={this.state.filtedOpps} setOpsListView={this.setOpsListView}  />
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <NavBar
            changeView={this.changeView}
            isLoggedIn={this.state.isLoggedIn}
            user={this.state.user}
            isLoggedInToggleForTesting={this.isLoggedInToggleForTesting}
            isOrganization={this.state.isOrganization}
            logOut={this.logOut}
            orginizationLoggedIn={this.orginizationLoggedIn}
          />
          {this.renderView()}
        </div>
      </ Provider>
    );
  }
};

export default App;