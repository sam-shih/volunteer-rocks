import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';

import {
  Collapse,
  Navbar,
  Form,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Jumbotron,
  Button
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      opportunity: '',
      isOpen: false
    }
    this.getOpps = this.getOpps.bind(this);
    this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
      <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">VolunteerRocks</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
      </Navbar>
      {this.renderView()}
      </div>
    );
  }
};

export default App;