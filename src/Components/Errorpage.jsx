import { Component } from "react";
import { Container, Form, Button, Row, Col,Image } from "react-bootstrap";
import mainImage from "../Images/main.jpeg";
class Errorpage extends Component{
    constructor(props){
        super(props);
        this.state={
         
            
        }
       
    }
    
    
    render(){
        return(
            <>
           <Container style={{textAlign:"center"}}>
                    <h1 style={{fontSize:"200px"}}>
                        404 Error
                    </h1>
                    <h3>
                        This short url is not active. Please Check Again!!
                    </h3>
                </Container>
            </>
        )
    }
}


export default Errorpage;