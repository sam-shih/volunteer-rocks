import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';
import _ from 'underscore';

class Filter extends React.Component {
  constructor (props){
    super(props);
    this.updateInput = this.updateInput.bind(this);

  this.state = {
    currFilter: {
    cause:[],
    start_date:'',
    end_date:''
    }
  }
}

  updateInput(e) {
    console.log(e.target.value);
    const currFilter = this.state.currFilter; // Copy current state to object 'form'
    currFilter[e.target.name] = e.target.value; // Set  key:value to form
    this.setState({ currFilter: currFilter });
  }

  render () {

var causes = [];
this.props.opp.forEach(op => {
  causes.push(op.cause);
});

let causeOptions = _.uniq(causes).map((cause,index) => {
        return (
          <label class="container" key={index}>{cause}
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
        )})

    return (
      <div>
        <label> Choose Your Cause </label>
           <div> {causeOptions} </div>
        <label> Choose Your Time </label>
           <Input
                  name="start_date"
                  type="date"
                  value={this.state.start_date}
                  onChange={this.updateInput} />
            <Input
                  name="end_date"
                  type="date"
                  value={this.state.end_date}
                  onChange={this.updateInput} />
      </div>
    );
 }
};


export default Filter;