import React from 'react';
import Ops from './Ops.jsx';

import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Filter from './Filter.jsx';
import _ from 'underscore';

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
    console.log('Opps: ', this.props.opportunities);
    console.log('Num of pages: ', this.props.numOfPages);
    return (
      <div className="opportunity">
        <Container>
          <Row>
            <Col md="12">
              {this.props.opportunities.map(op => {
                return <Ops volunteerForOpp={this.props.volunteerForOpp} opportunity={op} isLoggedIn={this.props.isLoggedIn}/>
              })}
            </Col>

            <Pagination aria-label="Opportunities navigation">
              {this.props.numOfPages.map(function (page) {
                return (
                  <PaginationItem onClick={() => this.props.passDownOpps(page + 1)}>
                    <PaginationLink>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              }.bind(this))}
            </Pagination>
          </Row>
        </Container>
      </div>
    );
  }
};

export default OpsList;