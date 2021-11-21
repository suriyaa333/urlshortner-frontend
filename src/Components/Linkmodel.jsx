import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";

import {  Container, Row, Col, Button, Modal, ButtonGroup} from "react-bootstrap";
// import * from 'font-awesome'

class Linkmodel extends Component{
    constructor(props){
        super(props);
        this.state={

        };
        this.renderModalContent = this.renderModalContent.bind(this);
    }
    renderModalContent = () => {
        // alert("alerted");
        if(this.props.isActive === false){
            return(
                <>
                <Modal.Header>
                <Modal.Title>Your Link is Active</Modal.Title>
                <Button variant="light"
                    onClick={this.props.closeModel}
                ><i class="fas fa-times" 
                ></i></Button>
                </Modal.Header>
                <Modal.Body>Please do select a Short URL</Modal.Body>
                
                </>
            )
        }

        else{
            return(
                <>
                <Modal.Header>
                <Modal.Title>Your Link is Active</Modal.Title>
                <Button variant="light"
                    onClick={this.props.closeModel}
                ><i class="fas fa-times" 
                ></i></Button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={10} style={{ paddingRight:"0px"}}>
                             <Button disabled variant="light"
                             style={{width:"100%"}}
                             > shr.nk/hiuoJ </Button>                            
                        </Col>
                        <Col md={2} style={{paddingLeft:"0px"}}>
                            <Button variant="light" onClick={this.props.copy}
                                style={{width:"100%", backgroundColor:"white", border:"none", outline:"none"}} > <i class="fas fa-copy"></i></Button>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}><Col><h4>Share </h4></Col></Row>
                    <Row>
                        <Col style={{textAlign:"center"}}> 
                            <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook fa-2x share-icon" ></i> </a>
                            <a href="https://www.instagram.com/"  target="_blank"><i class="fab fa-instagram fa-2x share-icon"></i></a>
                            <a href="mailto:iraianbut20@gmail.com" target="_blank"><i class="fas fa-envelope fa-2x share-icon"></i></a>
                            <a href="https://web.whatsapp.com/" target="_blank"><i class="fab fa-whatsapp fa-2x share-icon"></i></a>
                            
                        </Col>
                        {/* <Col> <i class="fab fa-instagram"></i> </Col> */}
                        {/* <Col> <i class="fab fa-email"></i> </Col> */}
                        {/* <Col> <i class="fab fa-whatsapp"></i> </Col> */}
                    </Row>
                </Modal.Body>
                
                </>
            )
        }
    }
    render(){
        return(
            <>
            
            <Modal show={this.props.show} onHide={this.props.closeModel} centered>
                {this.renderModalContent()}
            </Modal>
            </>
        );
    }
}


export default Linkmodel;