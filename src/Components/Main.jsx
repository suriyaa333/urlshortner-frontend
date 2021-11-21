import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import {  Container, Row, Col, Button, Figure, Card,Dropdown} from "react-bootstrap";

import Search from "./Search"
import Navbar from "./Navbar";
import Urlshortner from "./Urlshortner";
import Loginsignup from "./Loginsignup";
import Errorpage from "./Errorpage";
class Main extends Component{
    constructor(props){
        super(props);
        this.state={
            authenticitystatus:0
        }
      this.rendercomponent=this.rendercomponent.bind(this);
      this.changeauthenticity=this.changeauthenticity.bind(this);
    }
    async changeauthenticity()
    {
        await this.setState({authenticitystatus:1});
    }
    rendercomponent()
    {
        if(this.state.authenticitystatus==0)
        {
            return <Loginsignup func={this.changeauthenticity} />
        }
        else{
            return <Urlshortner/>
        }
    }
    render(){
        return(
            <>
            <Navbar />
            <Route
              exact
              path="/"
              component={() => {return this.rendercomponent()}
               
              }
            />
           
            <Switch>
            <Route
              exact
              path="/errorpage"
              component={() => {
                return <Errorpage />;
              }}
            />
            <Route
            path="/:productid"
            component={({match})=>{  return <Search shorturl={match.params.productid}/> }}
            />
             <Redirect to="/" />
            </Switch>

            </>

        )
    }
}


export default Main;