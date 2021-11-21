import react, { Component } from "react";

import { Container, Navbar, Nav, Image } from "react-bootstrap";
import logo from '../Images/logo.png';
import "../App.css";
class Navcomp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
     <Navbar collapseOnSelect expand="lg" style={{background:"#262A53", width:"100%"}} className="navbar">
            <Container>
            <Navbar.Brand href="#home"> <Image src={logo} style={{height:"40px", weight:"40px"}}/> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto" >
                <Nav.Link  style={{color:"white", margin:"0px 10px"}} className="navlink">Get Premium</Nav.Link>
                <Nav.Link style={{color:"white", margin:"0px 10px"}} className="navlink">My Smashes </Nav.Link>
                <Nav.Link id="namee" style={{color:"white", margin:"0px 10px", borderBottom:"1px solid #FFA0A0"}} className="navlink"> Login </Nav.Link>
                </Nav>  
            </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
    );
  }
}

export default Navcomp;