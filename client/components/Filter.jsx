import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';
import _ from 'underscore';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.searchOpps = this.searchOpps.bind(this);

    this.state = {
      currFilter: {
        mile: 60,
        cause: [],
        start_date: '',
        end_date: ''
      }
    }
  }
  //after user entering the submit button of filter, it will change the opportunity view at OrsList.jsx

  searchOpps(currFilter) {
    // if mile > currFilter.mile
    //        result is the Get request from database baseon the new search.
    // else filter the props.opportunities based on new mile
    return (this.props.opps.filter((opp) => {
      opp.start_date > currFilter.start_date && opp.end_date < currFilter.end_date && opp.cause.indexOf(currFilter.cause) !== -1
    }))
  }

  updateInput(e) {
    console.log(e.target.value);
    const currFilter = this.state.currFilter; // Copy current state to currFilter
    currFilter[e.target.name] = e.target.value; // Set  key:value to currFilter
    this.setState({ currFilter: currFilter });
  }

  render() {

    var causes = [];
    this.props.opps.forEach(op => {
      causes.push(op.cause);
    });

    let causeOptions = _.uniq(causes).map((cause) => {
      return (
        <label>{cause}
          <Input type="checkbox"
            value={cause}
            onChange={e => this.state.currFilter.cause.push(e.target.value)} />
          <span class="checkmark"></span>
        </label>
      )
    })

    return (
      <div>
        <label>Miles </label>
        <Input
          name="mile"
          type="number"
          value={this.state.mile}
          onChange={this.updateInput} />
        <span class="checkmark"></span>
        <label> Choose Your Cause </label>
        <div> {causeOptions}</div>
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
        <Button onClick={() => this.searchOpps(this.state.currFilter)}>Submit</Button>
      </div>
    );
  }
};


export default Filter;