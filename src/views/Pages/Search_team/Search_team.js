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

// Main Chart

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


class Search_team extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      isLoaded: false,
      info: [],
      association_info: [],
      coach_info: [],
      owner_info: [],
      team_id: '',
      team_name: '',
      association_id: '',
      association_name: '',
      person_id: '',
      coach_id: '',
      coach_name: '',
      location_id: '',
      location_name: '',
      search_input: '',
      teamsRendered: [],
      teams: [],
      coachesRendered: [],
      associationsRendered: [],
      locationsRendered: [],
      teamsForRender: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFindAll = this.handleFindAll.bind(this);

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

  async getAssociationInfo(){
    await fetch('https://api-powerteam.herokuapp.com/associations/' + this.state.association_id,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(assRes=>assRes.json())
      .then((assRes=>{
        this.setState({
          association_name: assRes[0].name
        });
      }));
    console.log(this.state.association_name);
  }

  async getCoachInfo(){
    await fetch('https://api-powerteam.herokuapp.com/coaches/' + this.state.coach_id,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(coachRes=>coachRes.json())
      .then((coachRes=>{
        this.setState({
          person_id: coachRes[0].person_id
        });
      }));
  }

  async getPersonInfo(){
    await fetch('https://api-powerteam.herokuapp.com/persons/' + this.state.person_id,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(personRes=>personRes.json())
      .then((personRes=>{
        this.setState({
          coach_name: personRes[0].first_name + " " +  personRes[0].last_name
        });
      }));
    console.log(this.state.coach_name);
  }

  async getLocationInfo(){
    await fetch('https://api-powerteam.herokuapp.com/locations/' + this.state.location_id,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(locationRes=>locationRes.json())
      .then((locationRes=>{
        this.setState({
          location_name: locationRes[0].name
        });
      }));
    console.log(this.state.location_name);
  }

  clearState(){
    this.setState ({
      info: [],
      association_info: [],
      coach_info: [],
      owner_info: [],
      team_id: '',
      team_name: '',
      association_id: '',
      association_name: '',
      person_id: '',
      coach_id: '',
      coach_name: '',
      location_id: '',
      location_name: '',
      teamsRendered: [],
      teams: [],
      coachesRendered: [],
      associationsRendered: [],
      locationsRendered: []
    });
  }

  async handleSubmit(event){
    console.log("handleSubmit() started");
    event.preventDefault();

    await fetch('https://api-powerteam.herokuapp.com/teamsForUser/',{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(teamRes=>teamRes.json())
      .then((teamRes=>{
        this.setState({
          teamsForRender: [],
          teams: teamRes
        });
        let search_input = this.state.search_input;
        let t = [];
        this.state.teams.forEach(function(team){
          if((team["team"])==(search_input)){
            t.push(team);
          }
        });
        this.setState({
          teamsForRender: t
        });
      }));

    console.log(this.state.teamsForRender);
    console.log("handleSubmit() finished");

  }


  async handleFindAll(event){
    console.log("handleSubmit2() started");
    event.preventDefault();
    document.getElementById("inputForm").reset();
    this.clearState();

    await fetch('https://api-powerteam.herokuapp.com/teamsForUser/',{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(teamRes=>teamRes.json())
      .then((teamRes=>{
        this.setState({
          teamsForRender: teamRes
        });
      }));

    console.log("handleSubmit2() finished");

  }

  render(){
    console.log("Rendering");

    this.state.teamsRendered = this.state.teamsForRender.map((team) =>
      <ul>{team["team"]}</ul>
    );

    this.state.associationsRendered = this.state.teamsForRender.map((team) =>
      <ul>{team["association"]}</ul>
    );

    this.state.coachesRendered = this.state.teamsForRender.map((team) =>
      <ul>{team["coach"]}</ul>
    );

    this.state.locationsRendered = this.state.teamsForRender.map((team) =>
      <ul>{team["location"]}</ul>
    );

    return (
      <div className="animated fadeIn">
        <form id="inputForm" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} placeholder="Team name"/>
          </label>
          <input type="submit" value="Search"/>
        </form>
        <button onClick={this.handleFindAll}>List all teams</button>
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3">

              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-dark">
                  <tr>
                    <th className="text-center">Team</th>
                    <th className="text-center">Association</th>
                    <th className="text-center">Coach</th>
                    <th className="text-center">Home</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div>
                        {this.state.teamsRendered}
                      </div>
                    </td>
                    <td className="text-center">
                      <div>{this.state.associationsRendered}</div>
                    </td>
                    <td className="text-center">
                      <div>{this.state.coachesRendered}</div>
                    </td>
                    <td className="text-center">
                      <div><a>{this.state.locationsRendered}</a></div>
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

export default Search_team;
