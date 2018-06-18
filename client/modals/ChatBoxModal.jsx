import React from 'react';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';
import io from 'socket.io-client';
let socket = io.connect('http://localhost:3000');

class ChatBoxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      chat: [],
      message: '',
      roomInput: '',
      currentRoom: this.props.name
    }
    this.toggle = this.toggle.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.handleRoomInput = this.handleRoomInput.bind(this);

    socket.on('chat message', (msg, name) => {
      var oneMessage = [name': 'msg];
      console.log(msg);
      this.setState({
        chat: this.state.chat.concat(oneMessage)
      });
    });
  }

  componentDidMount() {
    socket.emit('logInRoom', this.state.currentRoom);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  joinRoom(e) {
    e.preventDefault();
    this.setState({
      currentRoom: this.state.roomInput,
      roomInput: ''
    });
  }

  handleRoomInput(e) {
    e.preventDefault();
    this.setState({
      roomInput: e.target.value
    });
  }

  handleMessageInput(e) {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  }

  sendMessage(e) {
    e.preventDefault();
      socket.emit('chat message', this.state.message, this.state.currentRoom, this.props.name);
      this.setState({
        message: ''
      });
  }

  render() {
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>ChatBox</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>ChatBox</ModalHeader>
          <ModalBody>
          <Col sm={5}>
            <Input autoComplete="off" name="room" value={this.state.roomInput} onChange={this.handleRoomInput}/>
            <button onClick={this.joinRoom}>Join Room</button>
            <h2>{this.state.currentRoom}</h2>
          </Col>
          <ul id="messages">{this.state.chat.map((msg) => {
            return <li>{msg}</li>
          })}</ul>
          <Col sm={10}>
            <Input value={this.state.message} autoComplete="off" name="message" onChange={this.handleMessageInput}/>
            <button onClick={this.sendMessage}>Send</button>
          </Col>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

}


export default ChatBoxModal;