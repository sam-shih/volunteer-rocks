import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, NavLink, Input } from 'reactstrap';
import { GoogleLogin } from 'react-google-login';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  responseGoogle(response) {
    console.log(response);
  }
// "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MjMzOTczODFkOTU3NGJiODczMjAyYTkwYzMyYjdjZWVhZWQwMjcifQ.eyJhenAiOiIyNTIxMzI3MTM2NDItOXRoamVsN2FwOWp2ZXVtYjZodGR1cWh2OWtiamluamwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyNTIxMzI3MTM2NDItOXRoamVsN2FwOWp2ZXVtYjZodGR1cWh2OWtiamluamwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTU3OTk5NDU3ODUzNjE3NDc1NTMiLCJlbWFpbCI6InBhdGVscG1heWFuazIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiR09MYkNFOFJWZGRTVVFfT3FiQXZIUSIsImV4cCI6MTUyODU2ODE0NCwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6ImExMjJiNDgwYWIxZmE5NzZhNzA4YTVkYjJhYmI1MjFlNTE4MGQ5OTgiLCJpYXQiOjE1Mjg1NjQ1NDQsIm5hbWUiOiJNYXlhbmsgUGF0ZWwiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1GcWVRbEZzcmt0RS9BQUFBQUFBQUFBSS9BQUFBQUFBQUVQay9neWhwZnRkZU5KVS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiTWF5YW5rIiwiZmFtaWx5X25hbWUiOiJQYXRlbCIsImxvY2FsZSI6ImVuIn0.E7ppXCqMVBHqFHus09Kh7Xn9zNAE6rDtLf2QM2UBXDTP0eYXWJO9i8f8hiuh2xGjIPfdXPX7Jxx_9EyFxsRj7SDTWeFxffM_JvJ04RUAYZcafRkuDux5jw867ZSK7kdIxg1ol7gqPx9TkNrLsxX91lLRqIyijs3_YWUMjrprS501UGh8aymhdwO1SPLwODuxwHN1ioWskTIxJm5JJdwoKCaWM0ZyP-i1eeqDiCJRx4U9v4Xh2huTGnoao3C1EOsGbyVPDbg_shb4RSpF0sHB4gK8sVghU9squO04H4mo29J-EZ2MRApa3s_YPnGNAk17TiQ3W16LFXp-j3ucsrhZhA"

// "ya29.GlvVBcocm3cklCDLhMUoTYCow72AVvZLooclisjm_YfkfhjkMdDxMQSeCzvW4tyxCDPlFCbbe4Bo_jv6L3Qp6gA5ToyWfcXlv3divS2xFlj3sAHjRzuhJL4mrUD4"

  render() {
    return (
      <React.Fragment>
        <NavLink onClick={this.toggle}>Login</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Into Your Account</ModalHeader>
          <ModalBody>
            <Input placeholder="User Name"/>
            <Input placeholder="Password"/>
            <Button color="primary" onClick={() => this.toggle}>Sign In</Button>{' '}

            <Button color="sucess" onClick={() => this.toggle}><a href="/auth/google">Login with Google+</a></Button>{' '}

            <GoogleLogin
              clientId="252132713642-9thjel7ap9jveumb6htduqhv9kbjinjl.apps.googleusercontent.com "
              buttonText="Login"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
             />

          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LoginModal;