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
  Notifications <span class = "badge bg-primary"></span>
  {/*<button onclick="location.href='page2.html'">
  Add transactions*/}

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
              


  {/*<div class="card text-center">
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
    <li class="nav-item">
        <a class="nav-link active" aria-current="true" href="#">Pending</a>
        
      </li>
      <li class="nav-item">
        <a class="nav-link" href= "#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Inactive</a>
      </li>
    </ul>
</div>*/}
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Pending</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Active</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Inactive</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
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
        

    )
}

export default withRouter(Dashboard);