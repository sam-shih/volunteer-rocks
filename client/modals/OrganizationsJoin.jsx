import React, {Component} from 'react';
import axios from 'axios';
import {Form, Input,FormGroup, Label, NavLink, Button,
  Modal, ModalHeader, ModalBody} from 'reactstrap';

class OrganizationsJoin extends Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      selected: ''
    }
    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSelect(event){
    console.log(event.target.value)
    console.log(event.target)
    this.setState({
      selected: event.target.value,
    })
  }

  handleSubmit(){
    this.props.joinOrganization(this.state.selected)
  }

  render(){
    return(
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Join an Organization</NavLink>
        <Modal size="lg" isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Join an organization</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="orgs">{this.state.selected === '' ? false : `You have selected ${this.state.selected}`}</Label>
                <Input type="select" name="select" id="orgs"
                value={this.state.selected} multiple
                >
                  {
                    this.props.orgs.map(org=>
                      <option onChange={this.handleSelect} id={org._id}>{org.name}</option>
                    )
                  }
                </Input>
                <Button style={{'marginTop': '10px'}}onClick={this.handleSubmit}>Submit</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

export default OrganizationsJoin;