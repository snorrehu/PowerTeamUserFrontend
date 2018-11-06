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


class Search extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      locationForRendering: [],
      matchDate_rendered: [],
      homeTeam_rendered: [],
      awayTeam_rendered: [],
      location_rendered: [],

      locationsAsId: []

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFindAllLocations = this.handleFindAllLocations.bind(this);
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

  async handleSubmit(event){
    console.log("handleSubmit() started");
    event.preventDefault();

    await fetch('https://api-powerteam.herokuapp.com/locationsForUser/' + this.state.search_input,{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res=>res.json())
      .then(res=>{
        this.setState({
          locationForRendering: res
        });
        console.log(this.state.locationForRendering);
      });

    console.log("handleSubmit() finished");
  }

  async handleFindAllLocations(event){
    console.log("handleFindAllLocations() started");
    event.preventDefault();

    //Fetch person  info:
    await fetch('https://api-powerteam.herokuapp.com/locationsForUser/',{
      method:'GET',
      headers:{
        'Authorization': 'Basic ' + btoa('admin:adminPass'),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(res=>res.json())
      .then(res=>{
        this.setState({
          locationForRendering: res
        });
        console.log(this.state.locationForRendering);
      });

    this.state.locationsAsId = this.state.locationForRendering.map((location)=>
      location["name"]
    );

    console.log("handleFindAllLocations() finished");
  }


  render() {

    this.state.location_rendered = this.state.locationForRendering.map((location)=>
      <ul>{location["name"]}</ul>
    );


    return (
      <div className="animated fadeIn">
        <form name="search_location_form" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" placeholder="Location" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Search" />
        </form>
        <button onClick={this.handleFindAllLocations}>List all Locations</button>
        <Row>
          <Col>
            <Card>
              <CardHeader className="h3">
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-dark">
                  <tr>
                    <th className="text-center"></th>
                    <th className="text-center">Match Date</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div>

                      </div>
                    </td>
                    <td className="text-center">
                      <div>

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

export default Search;
