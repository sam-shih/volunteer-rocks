import React, { Component } from 'react';
import axios from 'axios';

import Filter from './Filter.jsx';
import OpsList from './OpsList.jsx';
import Main from './Main.jsx';
import NavBar from './NavBar.jsx';
import LoadAllMarkers from './LoadAllMarkers.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
      organizations: [],
      opportunities: [],
      filteredOpps: [],
      oppsToPassDown: [],
      howManyPages: [0],
      isLoggedIn: false,
      isOrganization: false,
      user: '',
      userId: '',
      zipcode: ''
    }
    this.getLatLngByZipcode = this.getLatLngByZipcode.bind(this);
    this.logOut = this.logOut.bind(this);
    this.findOppsByZip = this.findOppsByZip.bind(this);
    this.changeView = this.changeView.bind(this);
    this.passDownOpps = this.passDownOpps.bind(this);
    this.setOpsListView = this.setOpsListView.bind(this);
    this.myOpportunities = this.myOpportunities.bind(this);
    this.volunteerForOpp = this.volunteerForOpp.bind(this);
    this.organizationLoggedIn = this.organizationLoggedIn.bind(this);
    this.isLoggedInToggleForTesting = this.isLoggedInToggleForTesting.bind(this);
  }

  componentDidMount() {
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAceVbYzIL8yvIXoltC1dQzg40sDVlxtuE&libraries=places`
    document.querySelector(`body`).insertAdjacentElement(`beforeend`, gmapScriptEl)

    this.getOrganizations()
    axios.get('/main')
      .then((response) => {
        if ('googleId' in response.data) {
          console.log("volunteer logged in", response.data)
          this.setState({
            user: response.data,
            userId: response.data._id,
            isLoggedIn: true
          });
        } else {
          console.log("organization logged in", response.data)
          this.setState({
            user: response.data.name,
            isOrganization: true
          });
        }
      })
      .catch((err) => {
        console.log("Error in main page GET request ", err);
      })
  }

  passDownOpps(pageNumber) {
    let allOpps = this.state.opportunities;
    let numOfPages = Math.ceil(allOpps.length / 5);
    numOfPages = [...Array(numOfPages).keys()];
    let numberToEnd = pageNumber * 5;
    let numberToStart = numberToEnd - 5;
    let portionOfOpps = allOpps.slice(numberToStart, numberToEnd);

    this.setState({
      oppsToPassDown: portionOfOpps,
      howManyPages: numOfPages
    });
  };

  organizationLoggedIn(org) {
    this.setState({
      user: org,
      isOrganization: true
    });
  }

  isLoggedInToggleForTesting() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
      isOrganization: !this.state.isOrganization
    });
  }

  changeView(option) {
    if (this.state.view !== option) {
      this.setState({
        view: option
      });
    }
  }

  handleSearch(e) {
    this.setState({
      zipcode: e.target.value
    });
  }

  volunteerForOpp(opportunity) {
    axios.put('/api/users', { opportunity: opportunity })
      .then((response) => {
        let responseData = response.data;
        if (responseData === 'login') {
          alert('Please login before enrolling');
        } else if (responseData === 'enrolled') {
          alert('Successfully enrolled in opportunity');
        } else if (responseData === 'already') {
          alert('You have already enrolled in this opportunity');
        } else if (view === 'loadAllMarkers') {
          return <LoadAllMarkers opportunities={this.state.opportunities} />
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  getLatLngByZipcode(zipcode) {
    let geocoder = new google.maps.Geocoder();
    let address = zipcode;
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let latitude = results[0].geometry.location.lat();
          let longitude = results[0].geometry.location.lng();
          resolve([longitude, latitude]);
        } else {
          reject(status);
        }
      });
    });
  }

  findOppsByZip(e, zipcode) {
    e.preventDefault();
    this.getLatLngByZipcode(zipcode)
    .then((coords) => {
      axios.put('/api/opportunities', {
        coords: coords
      }).then((response) => {
          this.setState({
            view: 'opportunities',
            opportunities: response.data,
            zipcode: ''
          })
          this.passDownOpps(1);
        }).catch((err) => {
          throw(err)
        })
    })
  }

  createOrganization(form) {
    axios.post('/api/organizations', {form})
      .then((response) => {
        alert('New Organization Saved');
        this.getOrganizations();
      })
      .catch((err) => {
        throw (err);
      });
  }

  getOrganizations(){
    axios.get('/api/organizations')
      .then(orgs=>{
        this.setState({
          organizations: orgs.data,
        })
      })
  }

  joinOrganization(orgId){
    axios.put(`/api/organizations/`,
      {orgId, userId: this.state.user._id})
      .then(()=>{
      })
  }

  logOut() {
    axios.get('/api/logout')
      .then(response => {
        this.setState({
          view: 'main',
          opportunities: [],
          oppsToPassDown: [],
          isLoggedIn: false,
          isOrganization: false,
          user: {},
          zipcode: ''
        });
      });
  }

  setOpsListView(option, ops) {
    this.setState({
      view: option,
      filteredOpps: ops
    })
  }

  myOpportunities() {
    axios.get('/api/users')
      .then(response => {
        this.setState({
          view: 'myOpportunities',
          filteredOpps: response.data
        });
      });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'main') {
      return <Main findOppsByZip={this.findOppsByZip} getOpp={this.getOpps} />
    } else if (view === 'opportunities') {
      return <OpsList numOfPages={this.state.howManyPages} passDownOpps={this.passDownOpps} 
      volunteerForOpp={this.volunteerForOpp} opportunities={this.state.oppsToPassDown} 
      setOpsListView={this.setOpsListView} zipcode={this.state.zipcode} user={this.state.user} 
      userId={this.state.userId} isLoggedIn={this.state.isLoggedIn}/>
    } else if (view === 'loadAllMarkers') {
      return <LoadAllMarkers opportunities={this.state.opportunities} />
    } else if (view === 'filteredOpps') {
      return <OpsList volunteerForOpp={this.volunteerForOpp} opportunities={this.state.filteredOpps} setOpsListView={this.setOpsListView} />
    } else if (view === 'myOpportunities') {
      return <OpsList opportunities={this.state.filteredOpps} setOpsListView={this.setOpsListView} />
    }
  }

  render() {
    return (
      <div>
        <NavBar
          orgs={this.state.organizations}
          changeView={this.changeView}
          isLoggedIn={this.state.isLoggedIn}
          user={this.state.user}
          isLoggedInToggleForTesting={this.isLoggedInToggleForTesting}
          isOrganization={this.state.isOrganization}
          logOut={this.logOut}
          organizationLoggedIn={this.organizationLoggedIn}
          myOpportunities={this.myOpportunities}
          createOrganization={this.createOrganization.bind(this)}
          joinOrganization={this.joinOrganization.bind(this)}
        />
      <header className="masthead text-white text-center">
        <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h3 className="mb-5">Search for volunteer opportunities in your area now!</h3>
              </div>
              <div className="col-lg-6 mx-auto">
                <form>
                  <div className="form-row">
                    <div className="col-12 col-md-9 mb-2 mb-md-0">
                      <input type="text" className="form-control form-control-sm" placeholder="Enter your zip code..." onChange={this.handleSearch.bind(this)} />
                    </div>
                    <div className="col-12 col-md-3">
                      <button type="submit" className="btn btn-block btn-sm btn-primary" onClick={(e) => this.findOppsByZip(e, this.state.zipcode)}>Search</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
        {this.renderView()}
      </div>
    );
  }
};

export default App;