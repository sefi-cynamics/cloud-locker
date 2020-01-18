import React from 'react';

import logo from './logo.svg';
import AwsCreds from './aws-creds'
import SecurityGroups from './security-groups'
import './App.css';
import _ from 'lodash';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.awsLoggedIn = !_.isEmpty(localStorage.getItem('awsUser')) && !_.isEmpty(localStorage.getItem('awsSecrert'));
    this.state.customerIp = null;
    this.state.isLoading = false;
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => this.setState({ customerIp: data["ip"], isLoading:false }));
  }

  onAwsStateChanged =  () => {
    this.setState({awsLoggedIn: !_.isEmpty(localStorage.getItem('awsUser')) && !_.isEmpty(localStorage.getItem('awsSecrert'))});
  }

  
  render() {

    //This code will be called if component is Loading
    if(this.state.isLoading){
      return(<div>Loading...</div>)
    }
    else{
      return (
        <div className="App">
          <div className="App-header">
          <b>IpAddress: </b>{this.state.customerIp}<br />
          <AwsCreds stateChanged={this.onAwsStateChanged} />
          <SecurityGroups awsLoggedIn={this.state.awsLoggedIn} customerIp={this.state.customerIp} />
          </div>  
        </div>
      );
    }
  }
}
