import React from 'react';
import Ops from './Ops.jsx';


import { Container, Row, Col } from 'reactstrap';
import Filter from './Filter.jsx';


//First render the props.opportunities view,
// if the user clicks the filter submit button on Filter.jsx, render the filter view.
class OpsList extends React.Component {
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

  render() {
    return (
        <Container>
          <Row>
            <Col xs="8">
              {this.props.opportunities.map(op => { return <Ops key={op._id} opportunity={op} /> } )}
            </Col>
            <Col xs="4">
              {/* <Filter opps={this.props.opportunities} filtedOpps={this.props.filtedOpps}/> */}
            </Col>
            </Row>
        </Container>
      );
    }

};

export default OpsList;






