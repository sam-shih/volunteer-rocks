import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';

// import { withScriptjs, StandaloneSearchBox } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'

class CreateOpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        title: '',
        description:'',
        cause: '',
        address: '',
        start_date: '',
        end_date: '',
        phone: '',
        email: ''
      }
    }
    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    console.log(e.target.value);
    const form = this.state.form; // Copy current state to object 'form'
    form[e.target.name] = e.target.value; // Set  key:value to form
    this.setState({ form: form }); // Replace state.form to form from above
  }

  submitForm (form) {
    console.log(form, 'newOp creation form')
    axios.post('/signup', {
      title: form.title,
      description: form.description,
      cause: form.cause,
      address: form.address,
      start_date: form.start_date,
      end_date: form.end_date,
      phone: form.phone,
      email: form.email
    }) // Send form to server
    .then(response => {
      console.log('Form posted to server')
      this.toggle

    })
    .catch(err => console.log('Err', err));
  }

  render() {
    return (
      <React.Fragment>
        <NavLink onClick={this.toggle}>Create New Opportunity</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Creat an Account for your Organization</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
            <StandaloneSearchBox
            >
            <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
            </StandaloneSearchBox>
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
              <FormGroup row>
                <Label for="email" sm={2}>E-mail</Label>
                <Col sm={10}>
                <Input
                  name="email"
                  type="text"
                  value={this.state.form.email}
                  onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <Button onClick={() => this.submitForm(this.state.form)}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateOpModal;