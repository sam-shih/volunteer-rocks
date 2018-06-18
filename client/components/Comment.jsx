import React from 'react';
import { Collapse, Button, CardBody, Card, Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
import EditComment from '../modals/EditComment.jsx';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      comment: '',
      comments: [],
    };
    this.addComment = this.addComment.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderView = this.renderView.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
  }

  componentDidMount(){
    axios.put('/api/comments', {
      opportunityId: this.props.oppId
    }).then(response => {
      this.setState({
        comments: response.data,
      });
    }).catch(err => {
      console.error(err);
    })
  }

  toggle() {
    axios.put('/api/comments', {
      opportunityId: this.props.oppId
    }).then(response => {
      this.setState({
        comments: response.data,
        collapse: !this.state.collapse,
      });
    }).catch(err => {
      console.error(err);
    })
  }

  addComment(e, comment) {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit(e, comment) {
    e.preventDefault();
    axios.post('/api/comments', {
      name: this.props.user.name,
      opportunityId: this.props.oppId,
      userId: this.props.user._id,
      picture: this.props.user.picture,
      comment: comment
    }).then(response => {
      this.setState({
        comments: response.data,
        comment: '',
      });
    }).catch(err => {
      console.error(err);
    });
  }

  handleEditComment(e, commentObj, editComment) {
    e.preventDefault();
    let commentId = commentObj._id;
    let oppId = commentObj.opportunityId;
    axios.put('/api/editComment', {
      editComment: editComment,
      commentId: commentId,
      oppId: oppId
    }).then(response => {
      this.setState({
        comments: response.data
      });
    }).catch(err => {
      console.error(err);
    })
  }

  handleDeleteComment(e, comment) {
    e.preventDefault();
    let commentId = comment._id;
    let oppId = comment.opportunityId;
    axios.post('/api/deleteComment', {
      commentId: commentId,
      oppId: oppId
    }).then(response => {
      this.setState({
        comments: response.data
      });
    }).catch(err => {
      console.error(err);
    })
  }

  renderView() {
    if (this.props.isLoggedIn === false) {
      return (
        <div>
          <Button outline color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{`${this.state.comments.length} Comments`}</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="createComment"><a href="/auth/google" style={{textDecoration: 'none'}}><img src={`http://www.stickpng.com/assets/images/58e91c61eb97430e8190650b.png`} style={{width: 30, height: 30}}/> Please log in to comment</a></Label>
                    <Input type="textarea" name="text" ref="createComment" placeholder="Comment on this volunteer opportunity..." disabled/>
                  </FormGroup>
                  <Button disabled>Submit</Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              {this.state.comments.map((comment, i) => {
                return (
                  <CardBody key={i}>
                  <Container>
                    <Row>
                      <Col xs="2">
                        <img className="image-circle" src={comment.picture}/> {comment.name}
                      </Col>
                      <Col xs="10">
                        <div className="comment">
                          <div className="innerComment">
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                        <br/>
                        <div className="sub-text">{moment(comment.date).fromNow()}</div>
                      </Col>
                      <hr/>
                    </Row>
                  </Container>
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
                    <Label for="createComment"><img className="image-circle" src={this.props.user.picture}/> {this.props.user.name}</Label>
                    <Input type="textarea" name="text" ref="createComment" placeholder="Comment on this volunteer opportunity..." onChange={this.addComment} value={this.state.comment}/>
                  </FormGroup>
                  <Button onClick={(e) => this.handleSubmit(e, this.state.comment)}>Submit</Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              {this.state.comments.map((comment, i) => {
                let deleteComment;
                let editComment;
                if (this.props.user._id === comment.userId) {
                  editComment = <EditComment user={this.props.user} commentObj={comment} handleEditComment={this.handleEditComment} handleDeleteComment={this.handleDeleteComment}/>
                }
                return (<CardBody key={i}>
                  <Container>
                    <Row>
                      <Col xs="2">
                        <img className="image-circle" src={comment.picture}/> {comment.name}
                      </Col>
                      <Col xs="10">
                        <div className="comment">
                        <div className="innerComment">
                            <p>{comment.comment}</p>
                          </div>
                        </div>
                        <br/>
                        <div className="sub-text">{moment(comment.date).fromNow()}</div>
                        <div className="float-right">
                          {editComment}
                        </div>
                      </Col>
                      <hr/>
                    </Row>
                  </Container>
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