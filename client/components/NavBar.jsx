import React from 'react';
import axios from 'axios';
import OrgSignupModal from '../modals/OrgSignupModal.jsx';
import SignupModal from '../modals/SignupModal.jsx';
import LoginModal from '../modals/LoginModal.jsx';
import CreateOpModal from '../modals/CreateOpModal.jsx';


import { NavbarToggler,  NavbarBrand,  NavItem,  Navbar, Collapse, UncontrolledDropdown, DropdownToggle,
  DropdownMenu,  DropdownItem, Nav, NavLink, Button } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const isOrganization = this.props.isOrganization;
    const navView = isLoggedIn ? (
      <React.Fragment>
        <NavItem>
          <NavLink href="#" onClick={this.props.isLoggedInToggleForTesting}>Click Me</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
          <img 
            src={this.props.user.picture} 
            alt={this.props.user.name} 
            className={'img-circle'}/>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              My Opportunities
            </DropdownItem>
            <DropdownItem>
              More Stuff?
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#" onClick={() => this.props.logOut() }>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> 
      </React.Fragment>
    ) : isOrganization ? (
      <React.Fragment>
        <NavItem>
          <NavLink href="#" onClick={this.props.isLoggedInToggleForTesting}>Click Me</NavLink>
        </NavItem>
        <NavItem>
          <CreateOpModal />
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {this.props.user}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              My Opportunities
            </DropdownItem>
            <DropdownItem>
              More Stuff?
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem href="#" onClick={() => this.props.logOut() }>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> 
      </React.Fragment>
    ) : (
      <React.Fragment>
        <NavItem>
          <NavLink href="#" onClick={this.props.isLoggedInToggleForTesting}>Click Me</NavLink>
        </NavItem>
        <NavItem>
          <OrgSignupModal />
        </NavItem>
        <NavItem>
          <LoginModal orginizationLoggedIn={this.props.orginizationLoggedIn}/>
        </NavItem>
        <NavItem>
          <Button outline color="secondary">Sign Up</Button>{' '}
        </NavItem>
      </React.Fragment>
    );
    return (
        <Navbar color="white" light expand="md">
          <NavbarBrand href="/">VolunteerRocks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {navView}
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

export default NavBar;