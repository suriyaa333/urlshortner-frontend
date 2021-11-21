import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import {  Container, Row, Col, Button, Figure, Card,Dropdown, Tab, Tabs, Form, Image} from "react-bootstrap";
import mainImage from "../Images/main2.jpeg";

class Loginsignup extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentState: "Login",
            password:"",
            email:""
        };
        this.chooseLogin = this.chooseLogin.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        
        
    }
    chooseLogin = () => {
        if(this.state.currentState === "Login"){
            return(
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                            <Form.Control style={{height:"45px"}}  onChange={async(event)=>{
                                this.setState({email:event.target.value});
                            }}  type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Password</Form.Label>
                            <Form.Control style={{height:"45px"}} onChange={async(event)=>{
                                this.setState({password:event.target.value});
                            }}  type="password" placeholder="Password" />
                        </Form.Group>
                        
                        
                        <Button variant="dark" onClick={()=>{
                                var key={name:this.state.email.split("@")[0],password:this.state.password};
                              fetch('https://tallyurl-backend.herokuapp.com/login',{
                                method: 'POST',
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                body:JSON.stringify(key)
                                }).then((res)=>{
                                    return res.json();
                                }).then((res)=>{
                                    if(res.success==1)
                                    this.props.func();

                                })
                            

                        }}  style={{margin:"30px 20px 30px 0px", backgroundColor:"#262A53"}} >
                            Login
                        </Button>

                        <Button variant="light"  style={{}}>
                            Google 
                        </Button>
                    </Form>
                </>
            );
        }
        else{
            return(
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px"}}>Email address</Form.Label>
                            <Form.Control style={{height:"45px"}} onChange={async(event)=>{
                                this.setState({email:event.target.value});
                            }} type="email" placeholder="Your Email" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Password</Form.Label>
                            <Form.Control style={{height:"45px"}} onChange={async(event)=>{
                                this.setState({password:event.target.value});
                            }}  type="password" placeholder="Choose a Password" />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label style={{fontSize:"20px", marginTop:"30px"}}>Confirm Password</Form.Label>
                            <Form.Control style={{height:"45px"}}  type="password" placeholder="Confirm it" />
                        </Form.Group> 

                        <Button variant="dark" onClick={()=>{
                            
                            var key={name:this.state.email.split("@")[0],password:this.state.password};
                             fetch('https://tallyurl-backend.herokuapp.com/signup',{
                                method: 'POST',
                                headers: {
                                    'Content-Type' : 'application/json'
                                },
                                body:JSON.stringify(key)
                                })
                        }} style={{margin:"30px 20px 30px 0px", backgroundColor:"#262A53"}}>
                            Create Account
                        </Button>
                       
                    </Form>
                </>
            );
        }
    }
    login = async() => {
        await this.setState({currentState: "Login"})
        document.querySelector("#login-btn").classList.add("login-btn-active");
        document.querySelector("#signup-btn").classList.remove("login-btn-active");


    }
    signup = async() => {
        await this.setState({currentState: "Sign Up"})
        document.querySelector("#login-btn").classList.remove("login-btn-active");
        document.querySelector("#signup-btn").classList.add("login-btn-active");

    }
    render(){
        return(
            <>
                <Container>
                
                    
                    <Row style={{margin:"50px 10px"}}>
                    <Col md={5}>
                        <Image src={mainImage} style={{padding:"0px", textAlign:"left"}}/>
                    </Col>
                        <Col md={6}>
                        <Row> <Col> <h1 style={{fontSize:"80px", fontWeight:"bold", color:"#262A53"}}> Shrink it </h1></Col></Row>
                    {/* <Row> <Col> <h4 style={{width:"80%", fontSize:"20px"}}> Get the shortest version of URL with our best choices </h4></Col></Row> */}
                            <Row style={{marginTop:"30px"}}>
                                <Col md={6}> <Button className="login-btn login-btn-active" onClick={this.login} id="login-btn"> Login </Button></Col>
                                <Col md={6}> <Button className="login-btn" onClick={this.signup} id="signup-btn"> Sign Up </Button></Col>
                            </Row>
                            <Row style={{marginTop:"50px"}}>
                                <Col>
                                    {this.chooseLogin()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}


export default Loginsignup;