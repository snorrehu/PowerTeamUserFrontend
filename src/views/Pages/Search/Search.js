import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';

class Search extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
      search_input: '',
      locationForRendering: [],
      listGroupItems: [],
      tabPanes: []

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFindAllLocations = this.handleFindAllLocations.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

    console.log("handleFindAllLocations() finished");

  }

  render() {

    this.state.listGroupItems = this.state.locationForRendering.map((locations)=>
      <ListGroupItem onClick={() => this.toggle(0)} action active={this.state.activeTab === 0} ></ListGroupItem>
    );

    return (
      <div className="animated fadeIn">
        <form name="search_player_form" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} placeholder="Location"/>
          </label>
          <input type="submit" value="Search" />
        </form>
        <button onClick={this.handleFindAllLocations}>List all Locations</button>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                Locations
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="4">
                    <ListGroup id="list-tab" role="tablist">
                      {this.state.listGroupItems}
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId={0} >
                        <p>Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt sit sunt
                          nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim
                          tempor sunt voluptate consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip
                          eiusmod dolor. Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.</p>
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
