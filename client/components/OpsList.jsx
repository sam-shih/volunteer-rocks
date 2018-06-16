import React from 'react';
import Ops from './Ops.jsx';

import { Container, Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
      <div className="opportunity">
        <Container>
          <Row>
            <Col md="12">
              {this.props.opportunities.map(op => {
                return <Ops volunteerForOpp={this.props.volunteerForOpp} opportunity={op} isLoggedIn={this.props.isLoggedIn} user={this.props.user} key={op._id} watchOpp={this.props.watchOpp}/>
              })}
            </Col>

            <Pagination aria-label="Opportunities navigation">
              {this.props.numOfPages.map(function (page, i) {
                return (
                  <PaginationItem onClick={() => this.props.passDownOpps(page + 1)} key={i}>
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