import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';
import axios from 'axios';
import $ from 'jquery';

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';
import OrgSignupModal from '../modals/OrgSignupModal.jsx';
import SignupModal from '../modals/SignupModal.jsx';
import LoginModal from '../modals/LoginModal.jsx';
import CreateOpModal from '../modals/CreateOpModal.jsx';

import { NavbarToggler,  NavbarBrand,  NavItem,  Navbar,  NavLink,  Nav } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      isOpen: false,
      zipcode: ''
    }
    this.getOpps = this.getOpps.bind(this);
    this.changeView = this.changeView.bind(this);
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

  renderView() {
    const {view} = this.state;
    if (view === 'main') {
      console.log("u how many times")
      return <Main getOpp={this.getOpps} zipcodeState={this.state.zipcode} zipcode={this.zip.bind(this)} />
    } else if (view === 'opportunities') {
      return <OpsList opportunities={this.state.opportunities} />
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div>
        <Navbar color="inverse" light expand="md">
            <NavbarBrand href="/">VolunteerRocks</NavbarBrand>
              <Nav className="ml-auto" navbar>
              <NavItem>
                <CreateOpModal />
              </NavItem>
                <NavItem>
                  <OrgSignupModal changeView={this.changeView}/>
                </NavItem>
                <NavItem>
                  <SignupModal />
                </NavItem>
                <NavItem>
                  <LoginModal />
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeView('opportunities')}>Opportunities</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => axios.get('/logout') }>Logout</NavLink>
                </NavItem>
              </Nav>
        </Navbar>
        {this.renderView()}
        </div>
      </ Provider>
    );
  }
};

export default App;