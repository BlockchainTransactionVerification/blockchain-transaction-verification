import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios'
import "./Home.css"
function Dashboard(props) {
    /*useEffect(() => {
        axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
          //redirectToLogin()
        });
      })*/
    function redirectToLogin() {
    props.history.push('/login');
    }
    return(
      
      
      
        <div className="mt-2">
            Home page content
            <div className="card" style={{width: '80rem'}}>
  <ul class="nav nav-tabs">
  {/*<li role="presentation" class="btn"><a href="#">Home</a></li>

  <li role="presentation" class="btn"><a href="#">Profile</a></li>
  {/*<li role="presentation" class="btn"><a href="#">Messages</a></li>-->*/}
  <button type="button" class="btn primary">
  Home <span class="badge bg-primary"></span>
  <button type="button" class="btn primary">
  Profile <span class="badge bg-primary">2</span>
  <button type="button" class="btn primary">
  Messages <span class="badge bg-primary">7</span>
  <button type="button" class="btn primary">
  Notifications <span class = "badge bg-primary">12</span>
  </button>
  </button>
  </button>
  </button>
</ul>

<div class="input-group">
  <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
    aria-describedby="search-addon" />
  <button type="button" class="btn btn-outline-primary">search</button>
</div>
              
  {/*<div className="card-body">
    <h5 className="card-title">Active Transactions</h5>
    <p className="card-text">
    <ul className="list-group">
  <li className="list-group-item">An item</li>
  <li className="list-group-item">A second item</li>
  <li className="list-group-item">A third item</li>
  <li className="list-group-item">A fourth item</li>
    <li className="list-group-item">And a fifth one</li>*/}

  <div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Inactive</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Active Transactions</h5>
    <p className="card-text">
    <ul className="list-group">
  <li className="list-group-item"></li>
  <li className="list-group-item">An item</li>
  <li className="list-group-item">A second item</li>
  <li className="list-group-item">A third item</li>
  <li className="list-group-item">A fourth item</li>
  <li className="list-group-item">And a fifth one</li>

</ul>

    </p>
    </div>
    <div className="d-flex justify-content-center mb-1 ">

    <a href="#" className="btn btn-primary custom-width">Go somewhere</a>
    </div>
  </div>
</div>
        </div>

    )
}

export default withRouter(Dashboard);