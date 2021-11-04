import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./screens/Login/Login";
import BuyerHome from "./screens/BuyerHome/BuyerHome";
import SellerHome from "./screens/SellerHome/SellerHome";
import AddProduct from "./screens/AddProduct/AddProduct";
import RegistrationForm from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Header from "./components/Header/header";
import NavBar from "./components/NavBar/index";
import ViewTransaction from "./screens/ViewTransaction/ViewTransaction";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/register">
              <RegistrationForm
                showError={updateErrorMessage}
                updateTitle={updateTitle}
              />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/buyerhome" component={BuyerHome} />
            <Route path="/transaction/:id" component={ViewTransaction} />
            <Route path="/sellerhome" component={SellerHome} />
            <Route path="/addProduct" component={AddProduct} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
