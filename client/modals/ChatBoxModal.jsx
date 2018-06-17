import React from 'react';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, NavLink, Input, Form, FormGroup, Label, Col } from 'reactstrap';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
console.log('hey',socket);

class ChatBoxModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      messages: [],
      room: null
    }
    this.toggle = this.toggle.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.socket
  }

  componentWillUnmount() {
    socket.off('something');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  joinRoom() {
    var rooms = $('#room').val();
    this.setState({
      room: rooms
    });
    $('#room').val('');
  }

  sendMessage() {
    var setRoom = `/${this.state.room}`;

      // var socket;
      // if(setRoom) {
      //   socket = io(`/${setRoom}`);
      //   socket.emit('chat message', $('#m').val());
      //     $('#m').val('');
      //   socket.on('chat message', function(msg){
      //     $('#messages').append($('<li>').text(msg));
      //   });
      // } else {
          // socket = io();
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          socket.on('chat message', (msg) => {
            var oneMessage = [msg];
            console.log(msg);
            this.setState({
              messages: this.state.messages.concat(oneMessage)
            });
          });
      // }
  }

  render() {
    console.log('settingRoom', `/${this.state.room}`);
    console.log('messages', this.state.messages);
    return (
      <React.Fragment>
        <NavLink href="#" onClick={this.toggle}>ChatBox</NavLink>
        <Modal size="lg" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>ChatBox</ModalHeader>
          <ModalBody>
          <Col sm={5}>
            <Input id="room" type="text" autoComplete="off" />
            <button onClick={this.joinRoom}>Join Room</button>
          </Col>
          <ul id="messages">{this.state.messages.map((msg) => {
            return <li>{msg}</li>
          })}</ul>
          <Col sm={10}>
            <Input id="m" type="text" autoComplete="off"/>
            <button onClick={this.sendMessage}>Send</button>
          </Col>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }

}



export default ChatBoxModal;