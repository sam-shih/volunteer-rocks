import React from 'react';
import axios from 'axios';
import AddressAutoComplete from './AddressAutoComplete.jsx'
import { Button, Modal, ModalHeader, ModalBody, NavLink, Input, Form, FormGroup, Label, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CreateOpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      form: {
        title: '',
        createBy: [this.props.user._id, this.props.user.name],
        description: '',
        cause: '',
        address: '',
        start_date: '',
        end_date: '',
        phone: '',
        email: ''
      },
      dropdownOpen: false,
      currentOrg: 'Please choose an organization...'
    }

    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleDD = this.toggleDD.bind(this);
  }

  setOrg(sthn) {
    this.setState({
      currentOrg: sthn
    })
    console.log('hey!', sthn)
  }

  toggleDD() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateInput(e) {
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  }

  updateAddress(address) {
    const form = this.state.form;
    form.address = address;
    this.setState({ form: form })
  }

  submitForm(form) {
    if (form.title === '') {
      alert('Please add a title for this opportunity!')
    } else if (this.state.currentOrg === 'Please choose an organization...'){
      alert('Please select an organization. If you do not have one yet, please create one in order to proceed.')
    } else {
      console.log(form, 'newOp creation form')
      axios.post('api/opportunities', {
          title: form.title,
          organization: this.state.currentOrg,
          createdBy: [this.props.user._id, this.props.user.name],
          description: form.description,
          cause: form.cause,
          address: form.address,
          start_date: form.start_date,
          end_date: form.end_date,
          phone: form.phone,
          email: form.email
      })
        .then(response => {
          console.log('Form posted to server')
          this.toggle();
        })
        .catch(err => console.log('Err', err));
    }
  }

  render() {
    console.log(this.props.user.organizations);
    let uniqOrgs = this.props.user.organizations.filter((thing,index,self) =>
      index === self.findIndex(t => t.id === thing.id && t.name ===thing.name) === index)
    console.log(uniqOrgs);
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>Create New Opportunity</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create a New Opportunity</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <FormGroup row>
                <Label for="title" sm={2}>Title</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={this.state.form.title}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="title" sm={2}>Organization</Label>
                <Col sm={10}>
                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDD} >
                    <DropdownToggle caret outline color="secondary">
                      {this.state.currentOrg}
                    </DropdownToggle>
                    <DropdownMenu>
                      {this.props.user.organizations.map((org, index)=> <DropdownItem key={org.id} onClick={this.setOrg.bind(this, org.name)}>{org.name}</DropdownItem>)}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="address" sm={2}>Address</Label>
                <Col sm={10}>
                  <AddressAutoComplete
                    updateAddress={this.updateAddress}
                  >{this.state.form.address}</AddressAutoComplete>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="start_date" sm={2}>Start Date</Label>
                <Col sm={4}>
                  <Input
                    name="start_date"
                    type="date"
                    value={this.state.form.start_date}
                    onChange={this.updateInput} />
                </Col>
                <Label for="end_date" sm={1.5}>End Date</Label>
                <Col sm={4}>
                  <Input
                    name="end_date"
                    type="date"
                    value={this.state.form.end_date}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="number" sm={2}>Phone</Label>
                <Col sm={3}>
                  <Input
                    name="phone"
                    type="tel"
                    value={this.state.form.phone}
                    onChange={this.updateInput} />
                </Col>
                <Label for="email" sm={1.5}>E-mail</Label>
                <Col sm={5}>
                  <Input
                    name="email"
                    type="email"
                    value={this.state.form.email}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="description" sm={2}>Description</Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={this.state.form.description}
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

                // <Label for="cause" sm={2}>Organization</Label>
                // <Col sm={10}>
                //   <Input
                //     type="text"
                //     name="cause"
                //     id="cause"
                //     value={this.state.form.cause}
                //     onChange={this.updateInput} />
                // </Col>

export default CreateOpModal;