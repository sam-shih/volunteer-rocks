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
      comments: [{user: 'zack', comment: 'this opp sucks', date: '06/12/18'}, {user: 'feng', comment: 'this opp is great', date: '06/13/18'}]
    };
    this.addComment = this.addComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderView = this.renderView.bind(this);
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

  renderView() {
    console.log(this.props.user)
    if (this.props.isLoggedIn === false || this.props.user === {}) {
      // log user in through google account
      return (
        <div>
          <Button outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Comments</Button>
          <Collapse isOpen={this.state.collapse}>

            <Card>
              <CardBody>
                <Form >
                  <FormGroup>
                    <Label for="commentText"><img src={`https://image.ibb.co/nCj2xy/if_user_man_678132_1.png`}/> Anonymous</Label>
                    <a href="/auth/google"><Input type="textarea" name="text" id="commentText" placeholder="Comment on this volunteer opportunity..." /></a>
                  </FormGroup>
                  <Button disabled>Submit</Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              {this.state.comments.map(comment => {
                return (
                  <CardBody>
                    <h3>Comment list goes here</h3>
                    {comment.user} {comment.comment} {comment.date}
                  </CardBody>
                )
              })}
            </Card>
          </Collapse>
        </div>
      )
    } else {
      return (
        <div>
          <Button outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>View Comments</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <Form >
                  <FormGroup>
                    <Label for="commentText"><img src={this.props.user.picture}/> {this.props.user.name}</Label>
                    <Input type="textarea" name="text" id="commentText" placeholder="Comment on this volunteer opportunity..." onChange={this.addComment} onClick={this.renderView}/>
                  </FormGroup>
                  <Button onClick={(e) => this.handleSubmit(e, this.state.comment)}>Submit</Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              {this.state.comments.map(comment => {
                return (<CardBody>
                  <h3>Comment list goes here</h3>
                  {comment.user} {comment.comment} {comment.date}
                </CardBody>
                )
              })}
            </Card>
          </Collapse>
        </div>
      )
    }
  }

  render() {
    return (
      this.renderView()
    );
  }
}

export default Comment;