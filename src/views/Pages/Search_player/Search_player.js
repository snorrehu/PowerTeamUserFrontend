import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}


class Search_player extends Component {
  constructor(props) {
    super(props);


    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      items: [],
      isLoaded: false,
      playerForRendering: [],
      players: [],
      search_input: '',
      name_rendered: [],
      team_rendered: [],
      position_rendered: [],
      number_rendered: [],
      birthDate_rendered: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFindAllPlayers = this.handleFindAllPlayers.bind(this);
    this.routeChangeLogin = this.routeChangeLogin.bind(this);

    if(localStorage.getItem("jwt")==null){
      return this.routeChangeLogin();
    }

  }

  routeChangeLogin(){
    let path = 'login';
    this.props.history.push(path);
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  handleChange(event) {
    this.setState({search_input: event.target.value});
  }

  //Fetching and other stuff
  async handleSubmit(event){
    console.log("handleSubmit() started");
    event.preventDefault();

    //Fetch person  info:
    await fetch('https://api-powerteam.herokuapp.com/playersForUser/' + this.state.search_input,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(personRes=>personRes.json())
      .then(personRes=>{
        this.setState({
          playerForRendering: personRes
        });
        console.log(this.state.playerForRendering);
      });

    console.log("handleSubmit() finished");
  }

  async handleFindAllPlayers(event){
    console.log("handleFindAllPlayers() started");
    event.preventDefault();

    //Fetch person  info:
    await fetch('https://api-powerteam.herokuapp.com/playersForUser/',{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(personRes=>personRes.json())
      .then(personRes=>{
        this.setState({
          playerForRendering: personRes
        });
        console.log(this.state.playerForRendering);
      });

    console.log("handleFindAllPlayers() finished");
  }

  render() {
    console.log("Rendering!");

    this.state.team_rendered = this.state.playerForRendering.map((player) =>
      <ul>{player["team"]}</ul>
    );

    this.state.name_rendered = this.state.playerForRendering.map((player) =>
      <ul>{player["name"]}</ul>
    );

    this.state.position_rendered = this.state.playerForRendering.map((player) =>
      <ul>{player["position"]}</ul>
    );

    this.state.birthDate_rendered = this.state.playerForRendering.map((player) =>
      <ul>{player["birthDate"]}</ul>
    );


    this.state.number_rendered = this.state.playerForRendering.map((player) =>
      <ul>{player["number"]}</ul>
    );

    return (
      <div className="animated fadeIn">
        <form name="search_player_form" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} placeholder="Name"/>
          </label>
          <input type="submit" value="Search" />
        </form>
        <button onClick={this.handleFindAllPlayers}>List all players</button>
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3">
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-dark">
                  <tr>
                    <th className="text-center">Name</th>
                    <th className="text-center">Team</th>
                    <th className="text-center">Position</th>
                    <th className="text-center">Number</th>
                    <th className="text-center">Born</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div>
                        {this.state.name_rendered}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>
                        {this.state.team_rendered}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>
                        {this.state.position_rendered}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>
                        {this.state.number_rendered}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>
                        {this.state.birthDate_rendered}
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}



export default Search_player;
