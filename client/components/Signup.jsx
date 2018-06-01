import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        street:'',
        city: '',
        state: '',
        zipcode: '',
        phone: '',
        email: ''
      }
    }
    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  updateInput(e) {
    console.log(e.target.value);
    const form = this.state.form; // Copy current state to object 'form'
    form[e.target.name] = e.target.value; // Set  key:value to form
    this.setState({ form: form }); // Replace state.form to form from above
  }

  submitForm (form) {
    axios.post('/signup', form) // Send form to server
    .then(response => console.log('Form posted to server', form)) 
    .catch(err => console.log('Err', err));
  }

  render() {
    return (
      <form >
        Organization Name:
          <br />
          <input
            name="name"
            type="text"
            value={this.state.form.name}
            onChange={this.updateInput} />
          <br />
        Street:
          <br />
          <input
            name="street"
            type="text"
            value={this.state.form.street}
            onChange={this.updateInput} />
          <br />
        City:
          <br />
          <input
            name="city"
            type="text"
            value={this.state.form.city}
            onChange={this.updateInput} />
          <br />
        State:
          <br />
          <input
            name="state"
            type="text"
            value={this.state.form.state}
            onChange={this.updateInput} />
          <br />
        Zip Code:
          <br />
          <input
            name="zipcode"
            type="text"
            value={this.state.form.zipcode}
            onChange={this.updateInput} />
          <br />
        Phone Number:
          <br />
          <input
            name="phone"
            type="text"
            value={this.state.form.phone}
            onChange={this.updateInput} />
          <br />
        E-mail:
          <br />
          <input
            name="email"
            type="text"
            value={this.state.form.email}
            onChange={this.updateInput} />
          <br />
        <button onClick={this.submitForm(this.state.form)}>Submit</button>
      </form>
    );
  }
}