import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import Cookies from 'universal-cookie';


class Login extends Component {

  constructor(props){
    super(props);

    this.routeChangeRegister = this.routeChangeRegister.bind(this);

  }

  routeChangeRegister(){
    let path = `register`;
    this.props.history.push(path);
  }

  routeChangeLogin(){
    /* Set cookies!!
    document.cookie = "userName=" + this.state.search_input_userName;
    document.cookie = "password=" + this.state.search_input_password1;
    */
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.routeChangeLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="primary" className="px-0">Administrator</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0"><a href="https://anonymouspoweruser.herokuapp.com">Continue as a guest!</a></Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Don't have an account?</h2>
                      <p>Register and gain access to your pee wee league!</p>
                      <Button color="primary" className="mt-3" active onClick={this.routeChangeRegister}>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
