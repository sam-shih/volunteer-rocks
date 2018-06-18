import React from 'react';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, Row, Col } from 'reactstrap';

class EditComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      comment: '',
    };
    this.updateInput = this.updateInput.bind(this);
    this.toggle = this.toggle.bind(this);
    this.submitForm = this.submitForm.bind(this);

  }

  updateInput(e) {
    this.setState({ comment: e.target.value });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  submitForm(e) {
    if (this.state.comment) {
      this.props.handleEditComment(e, this.props.commentObj, this.state.comment);
      this.toggle();
    }
  }

  render() {
    return (
      <div>
        <div>
          <Button className="btn btn-sm" color="primary" onClick={this.toggle}>Edit</Button>
          <Button className="btn btn-sm" color="danger" onClick={(e) => this.props.handleDeleteComment(e, this.props.commentObj)}>Delete</Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Comment</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.submitForm}>
              <FormGroup row>
                <Label for="editComment" sm={2}><img src={this.props.user.picture}/> {this.props.user.name}</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="editComment"
                    id="editComment"
                    value={this.state.comment}
                    placeholder={this.props.commentObj.comment}
                    onChange={this.updateInput} />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.submitForm(e)}>Confirm</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditComment;