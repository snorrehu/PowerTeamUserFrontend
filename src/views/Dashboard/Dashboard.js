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
import Widget03 from '../../views/Widgets/Widget03'
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



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
    };
    this.routeChangeLogin = this.routeChangeLogin.bind(this);
    if(localStorage.getItem("jwt")==null){
      return this.routeChangeLogin();
    }

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

  routeChangeLogin(){
    let path = 'login';
    this.props.history.push(path);
  }

  /*

  async validateUser(){

    let response = await fetch('https://api-powerteam.herokuapp.com/validate',{
      method:'GET',
      headers:{
        'Authorization': localStorage.getItem("jwt"),
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

  }
*/

  render() {

    return (
      <div className="animated fadeIn">


        <Row>
          <Col>
            <Card>
              <CardHeader className="h3">
                Favorite Players
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-dark">
                  <tr>
                    <th className="text-center"><i className="icon-people"></i></th>
                    <th className="text-center">Team</th>
                    <th className="text-center">Goals Scored This Season</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div>Player name</div>
                    </td>
                    <td className="text-center">
                      <div>Player team</div>
                    </td>
                    <td className="text-center">
                      <div>Goals This Season</div>
                    </td>
                  </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <Card>
              <CardHeader className="h3">
                Favorite Teams
              </CardHeader>
              <CardBody>
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-dark">
                  <tr>
                    <th className="text-center">Team</th>
                    <th className="text-center">Coach</th>
                    <th className="text-center">Win/Loss</th>
                    <th className="text-center"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td className="text-center">
                      <div>Team name</div>
                    </td>
                    <td className="text-center">
                      <div>Coach name</div>
                    </td>
                    <td className="text-center">
                      <div>Win/Loss</div>
                    </td>
                    <td className="text-center">
                      <div><a>Match Schedule</a></div>
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

export default Dashboard;
