import React from 'react';

import Ops from './Ops.jsx';

import { Container, Row, Col } from 'reactstrap';
import Filter from './Filter.jsx';


//First render the props.opportunities view,
// if the user clicks the filter submit button on Filter.jsx, render the filter view.
class OpsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'opportunities'
    }
  }

   changeView(option) {
    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
  }

  renderView() {
    const {view} = this.state;
    let currOpp = [];
    if (view === 'opportunities') {
       currOpp= this.props.opportunities
    } else {
       currOpp= this.props.filtedOpps
    }
    return <Ops enroll={this.props.enroll} opportunity={currOpp} />
  }

  render(){
      return (
          <Container>
            <Row>
              <Col xs="8">
                {this.renderView}
              </Col>
              <Col xs="4">
              <Filter opp = {this.props.opportunities} filtedOpps = {this.props.filtedOpps}/>
              </Col>
              </Row>
          </Container>
        );
  }

};

export default OpsList;






