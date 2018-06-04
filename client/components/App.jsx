import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';
import Signup from './Signup.jsx';

import {
  Collapse,
  Navbar,
  Form,
  FormGroup,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Input,
  NavItem,
  NavLink,
  Label,
  Container,
  Row,
  Col,
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      opportunities: [],
      opportunity: '',
      newOrgModal: false,
      signUpModal: false,
      loginModal: false,
      isOpen: false
    }
    this.getOpps = this.getOpps.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.getOpps();
  }

  changeView(option) {
    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
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
    } else if (view === 'opportunities') {
      return <OpsList opportunities={this.state.opportunities} />
    }
  }

  toggleModal(option) {
    this.setState({
      [option]: !this.state[option]
    });
  }

  render() {
    return (
      <div>
      <Navbar color="inverse" light expand="md">
          <NavbarBrand href="/">VolunteerRocks</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={() => this.toggleModal('newOrgModal')}>Org Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.toggleModal('signupModal')}>Sign Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.toggleModal('loginModal')}>Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.changeView('opportunities')}>Opportunities</NavLink>
              </NavItem>
            </Nav>

            {/* NEW ORG SIGNUP MODAL */}

            <Modal isOpen={this.state.newOrgModal} toggle={() => this.toggleModal('newOrgModal')} className={this.props.className}>
              <ModalHeader toggle={() => this.toggleModal('newOrgModal')}>Organization Signup</ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup row>
                    <Label for="name" sm={2}>Organization</Label>
                    <Col sm={10}>
                      <Input type="name" name="name" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="Street" sm={2}>Street</Label>
                    <Col sm={10}>
                      <Input type="street" name="street" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="city" sm={2}>City</Label>
                    <Col sm={10}>
                      <Input type="city" name="city" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="state" sm={2}>State</Label>
                    <Col sm={10}>
                      <Input type="state" name="state" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="zipcode" sm={2}>Zip Code</Label>
                    <Col sm={10}>
                      <Input type="zipcode" name="zipcode" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="number" sm={2}>Phone Number</Label>
                    <Col sm={10}>
                      <Input type="number" name="number" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="email" id="email" />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label for="password" sm={2}>Password</Label>
                    <Col sm={10}>
                    <Input type="password" name="password" id="password" />
                    </Col>
                  </FormGroup>
                </Form>
                <Button color="primary" onClick={() => this.toggleModal('newOrgModal')}>Sign Up</Button>{' '}
              </ModalBody>
            </Modal>

            {/* SIGNUP MODAL */}

            <Modal isOpen={this.state.signupModal} toggle={() => this.toggleModal('signupModal')} className={this.props.className}>
              <ModalHeader toggle={() => this.toggleModal('signupModal')}>Signup</ModalHeader>
              <ModalBody>
                <Input placeholder="User Name"/>
                <Input placeholder="Password"/>
                <Button color="primary" onClick={() => this.toggleModal('signupModal')}>Sign Up</Button>{' '}
                <Button color="sucess" onClick={() => this.toggleModal('signupModal')}>Sign Up with Google+</Button>{' '}
              </ModalBody>
            </Modal>

            {/* LOGIN MODAL */}

            <Modal isOpen={this.state.loginModal} toggle={() => this.toggleModal('loginModal')} className={this.props.className}>
              <ModalHeader toggle={() => this.toggleModal('loginModal')}>Login</ModalHeader>
              <ModalBody>
                <Input placeholder="User Name"/>
                <Input placeholder="Password"/>
                <Button color="primary" onClick={() => this.toggleModal('loginModal')}>Login</Button>{' '}
                <Button color="sucess" onClick={() => this.toggleModal('loginModal')}>Login with Google+</Button>{' '}
              </ModalBody>
            </Modal>

      </Navbar>
      {this.renderView()}
      </div>
    );
  }
};

export default App;