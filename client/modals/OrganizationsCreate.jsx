import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';

class OrganizationsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
      }
    }
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    console.log(e.target.value);
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  }

  handleSubmit(){
    this.props.createOrganization(this.state.form)
  }

  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Create an Organization</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="name" sm={2}>Organization</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.form.name}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="street" sm={2}>Street Address</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="street"
                    id="street"
                    value={this.state.form.street}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="city" sm={2}>City</Label>
                <Col sm={10}>
                  <Input
                    name="city"
                    type="text"
                    value={this.state.form.city}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="state" sm={2}>State</Label>
                <Col sm={10}>
                  <Input
                    name="state"
                    type="text"
                    value={this.state.form.state}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="zipcode" sm={2}>Zip Code</Label>
                <Col sm={10}>
                  <Input
                    name="zipcode"
                    type="text"
                    value={this.state.form.zipcode}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="number" sm={2}>Phone</Label>
                <Col sm={10}>
                  <Input
                    name="phone"
                    type="text"
                    value={this.state.form.phone}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default OrganizationsCreate;