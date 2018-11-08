import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Register extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [],
      user_names: [],
      search_input_userName: '',
      search_input_password2: '',
      search_input_password1: '',
      password_1: '',
      password_2: ''
    };

    this.getUserNames = this.getUserNames.bind(this);
    this.checkInput = this.checkInput.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.handleChangePassword1 = this.handleChangePassword1.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.routeChangeLogin = this.routeChangeLogin.bind(this);



  }

  handleChangeUserName(event) {
    this.setState({search_input_userName: event.target.value});
  }

  handleChangePassword2(event) {
    this.setState({search_input_password2: event.target.value});
  }

  handleChangePassword1(event) {
    this.setState({search_input_password1: event.target.value});
  }

  routeChangeLogin(){
    let path = `login`;
    this.props.history.push(path);
  }

  async saveNewUser(pswrd){
    await fetch('https://testing-api-sh.herokuapp.com/users/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.state.search_input_userName,
        password: pswrd,
        admin_flag: "USER",
        active_flag: true
      })
    });

    alert("Thank you for registering!");
    this.routeChangeLogin();
  }

  async getUserNames(){
    await fetch('https://api-powerteam.herokuapp.com/users/',{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res=>res.json())
      .then((res=>{
        this.setState({
          users: res
        });
      }));

    this.state.users.forEach((user)=>
      this.state.user_names.push(user["user_name"])
    );

    console.log(this.state.user_names);

  }

  checkPasswords(){
    let passIsOk = false;
    let pass1 = this.state.search_input_password1;
    let pass2 = this.state.search_input_password2;

    if(pass1 === ''){
      alert("Please fill in both password fields.");
      return false;
    }
    if(pass2 === ''){
      alert("Please fill in both password fields.");
      return false;
    }

    if(pass1===pass2){
      passIsOk = true;
    }
    else{
      alert("Passwords do not match! Please try again.");
    }
    return passIsOk;
  }

  //Mother check
  async checkInput() {
    let inputIsOk = true;
    let passWordStatus = this.checkPasswords();

    this.setState({
      users: [],
      user_names: []
    });

    await this.getUserNames();

    let input = this.state.search_input_userName;
    this.state.user_names.forEach(function (u) {
      if(u === input){
        inputIsOk =  false;
        console.log("Username exists!!");
        alert("Username already exists! Please try again.");
      }
    });

    if(this.state.search_input_userName === ''){
      inputIsOk = false;
      alert("Please input a username!");
    }

    if(!passWordStatus){
      inputIsOk = false;
    }

    console.log("Password is okay: " + passWordStatus);

    console.log("Input is okay: " + inputIsOk);

    if(inputIsOk){
      return await this.saveNewUser(this.state.search_input_password1);
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={this.state.value} onChange={this.handleChangeUserName}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password" value={this.state.value} onChange={this.handleChangePassword1}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password" value={this.state.value} onChange={this.handleChangePassword2}/>
                    </InputGroup>
                    <Button color="success" block onClick={this.checkInput}>Create Account</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
