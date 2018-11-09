import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';

class Search extends Component {

  constructor(props) {
    super(props);

    this.listGroupItems = [];
    this.tabPanes = [];

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1,
      search_input: '',
      locationForRendering: [],
      show_listGroupItems: this.listGroupItems,
      show_tabPanes: this.tabPanes

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFindAllLocations = this.handleFindAllLocations.bind(this);
    this.renderListGroupItems= this.renderListGroupItems.bind(this);
    this.routeChangeLogin = this.routeChangeLogin.bind(this);
    if(localStorage.getItem("jwt")==null){
      return this.routeChangeLogin();
    }
  }

  routeChangeLogin(){
    let path = 'login';
    this.props.history.push(path);
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
        //console.log(this.state.locationForRendering);
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
        //console.log(this.state.locationForRendering);
      });

    console.log("handleFindAllLocations() finished");

  }

  renderListGroupItems(){
    let listGroupItems = [];

    for(let i = 0; i < this.state.locationForRendering.length; i++){
      listGroupItems.push(<ListGroupItem onClick={() => this.toggle(i)} action active={this.state.activeTab === i} >{this.state.locationForRendering[i]["name"]}</ListGroupItem>)
    }
    console.log(listGroupItems);
    return listGroupItems;
  }

  renderTabPaneItems(){
    let tabPaneItems = [];
    for(let i = 0; i < this.state.locationForRendering.length; i++){
      let tabPaneItemContent = [];
      for(let j = 0; j < this.state.locationForRendering[i]["matches"].length;j++){
        tabPaneItemContent.push(<p>{this.state.locationForRendering[i]["matches"][j]["date"]}: {this.state.locationForRendering[i]["matches"][j]["homeTeam"]} {this.state.locationForRendering[i]["matches"][j]["homeTeamScore"]} / {this.state.locationForRendering[i]["matches"][j]["awayTeamScore"]} {this.state.locationForRendering[i]["matches"][j]["awayTeam"]}</p>);

      }
      tabPaneItems.push(<TabPane tabId={i}>{tabPaneItemContent}</TabPane>);
    }
    return tabPaneItems;
  }

  render() {

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
                      {this.renderListGroupItems()}
                    </ListGroup>
                  </Col>
                  <Col xs="8">
                    <TabContent activeTab={this.state.activeTab}>
                      {this.renderTabPaneItems()}
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
