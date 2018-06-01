import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        address: {
          street:'',
          city: '',
          State: '',
          zip_code: ''
        },
        phone: '',
        email: ''
      }
    }
    this.updateInput = this.updateInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  updateInput(e) {
    const form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({ form: form });
  }

  submitForm () {
    this.props.formSubmit(this.state.form);
  }

  render() {
    return (

      <form >
        Username:
          <br />
          <input
            name="username"
            type="text"
            value={this.state.form.username}
            onChange={this.updateInput} />
          <br />
        Number:
          <br />
          <input
            name="number1"
            type="text"
            value={this.state.form.number1}
            onChange={this.updateInput} />
          <br />
        Message:
          <br />
          <input
            name="message"
            type="text"
            value={this.state.form.message}
            onChange={this.updateInput} />
          <br />
        <button onClick={this.submitForm}>Submit</button>
      </form>
    );
  }

}