import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      comment: '',
      comments: []
    };
    this.addComment = this.addComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  addComment(e) {
    this.setState({
      comment: e.target.value,
    });
    console.log(e.target.value);
    console.log(this.props.isLoggedIn)
  }

  handleSubmit(e, comment) {
    e.preventDefault();
    axios.post('/api/comments', {
      googleId: googleId,
      name: name,
      comment: comment
    }).then(response => {
      this.setState({
        comments: response.data
      });
    }).catch(err => {
      console.error(err);
    })
  }

  loginUser() {
    console.log('Clicked textarea!', this.props.isLoggedIn)
    if (this.props.isLoggedIn === false) {
      // log user in through google account
    }
  }

  render() {
    return (
      <div>
        <Button outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Comments</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Form >
                <FormGroup>
                  <Label for="commentText"></Label>
                  <Input type="textarea" name="text" id="commentText" placeholder="Comment on this volunteer opportunity..." onChange={this.addComment} onClick={this.loginUser}/>
                </FormGroup>
                <Button onClick={(e) => this.handleSubmit(e, this.state.comment)}>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default Comment;