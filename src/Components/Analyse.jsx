import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import {Bar, Doughnut, canvas}  from 'react-chartjs-2'
import {  Container, Row, Col, Button, Modal, ButtonGroup, Table} from "react-bootstrap";
// import * from 'font-awesome'

class Analyse extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    
    geturlname=(id)=>{
        if(this.props.top5shorturls.length<=id)
        return "No Data";
        else{
            return this.props.top5shorturls[id];
        }
    }

    
    render(){
        const labels = ["1st bar"];
        const data = [1552];
        const devicesData=[this.props.mobile, this.props.computer];
        const browserData = [this.props.chrome, this.props.firefox, this.props.ie, this.props.other];
        const top5shorturlclciks=this.props.top5shorturlclciks;
        const top5shorturls=this.props.top5shorturls;
        
        return(
            <>
            <Container>
            <Row>
                <Col md={6} sm={12}> <h2
                    style={{marginTop:"50px"}}
                > Analysis </h2></Col>
            </Row>
            <Row>
                <Col md={6} sm={12}> <h3
                    style={{marginTop:"50px"}}
                > Quick View </h3></Col>
            </Row>
            <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>Average Clicks per Site</th>
                        <th>{this.props.avgClick}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                        <th colSpan="2">Browser Analysis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Chrome </td>
                        <td>{this.props.chrome} </td>
                        </tr>

                        <tr>
                        <td>FireFox </td>
                        <td>{this.props.firefox} </td>
                        </tr>

                        <tr>
                        <td>Others </td>
                        <td>{this.props.other} </td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                        <th colSpan="2">Device Analysis</th>
                        </tr>
                        <tr style={{backgroundColor:"#f2f2f2"}}>
                        <td>Mobile </td>
                        <td>{this.props.mobile} </td>
                        </tr>

                        <tr>
                        <td>Computer </td>
                        <td>{this.props.computer} </td>
                        </tr>
                    </thead>
                    </Table>
            <Row> <Col>  </Col> </Row>
            
                <Row>
                <Col md={6}>
                <div>
                <Bar
                data={{
                    // Name of the variables on x-axies for each bar
                    labels: top5shorturls,
                    datasets: [{
                        // Label for bars
                        label: "Short-url Vs Clicks ",
                        // Data or value of your each variable
                        data: top5shorturlclciks,
                        // Color of each bar
                        backgroundColor: ["#262A53", "#583e6b", "#995c85", "#c77692", "#f2959d"],
                        // Border color of each bar
                        borderColor: ["#262A53", "#583e6b", "#995c85", "#c77692", "#f2959d"],
                        borderWidth: 0.5,
                    }],
                }}
                // Height of graph
                // height={400}
                height={300}
               
                />
        </div>
                </Col>
                <Col md={6} sm={12}
                    style={{textAlign:"left"}}
                >
                    <h3 centered> Top Shrinks </h3>
                    <div>
                    <Row> <Col style={{marginTop:"20px"}}> <i style={{color:"#262A53"}} class="fas fa-square-full fa-2x"></i> <span> {this.geturlname(0)}</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i style={{color:"#583e6b"}} class="fas fa-square-full fa-2x"></i> <span> {this.geturlname(1)}</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i style={{color:"#995c85"}} class="fas fa-square-full fa-2x"></i> <span> {this.geturlname(2)}</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i style={{color:"#c77692"}} class="fas fa-square-full fa-2x"></i> <span> {this.geturlname(3)}</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i style={{color:"#ffa0a0"}} class="fas fa-square-full fa-2x"></i> <span> {this.geturlname(4)}</span></Col></Row>
                    </div>
                </Col>
                </Row>

                <hr
                    style={{
                        color: "gray",
                        height: 5
                    }}
                />


                <Row style={{margin:"50px 0px"}}>
                <Col md={6} sm={12}
                    style={{textAlign:"right"}}
                >
                    <h3 centered> Multiple Device Analysis </h3>
                    <h6> Mobiles vs Computers </h6>
                    <div>
                    <Row> <Col style={{marginTop:"20px"}}> <span> Mobile</span> <i  style={{color:"#262a53"}} class="fas fa-square-full fa-2x"></i> </Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <span> Computers</span> <i  style={{color:"#b86d8e"}} class="fas fa-square-full fa-2x"></i> </Col></Row>
                    </div>
                </Col>
                <Col md={6}>
                <div>
                <Doughnut
                data={{
                    // Name of the variables on x-axies for each bar
                    // labels: ["Mobiles", "Computers"],
                    datasets: [{
                        // Label for bars
                        label: "total count/value",
                        // Data or value of your each variable
                        data: devicesData,
                        // Color of each bar
                        backgroundColor: ["#262a53", "#b86d8e"],
                        // Border color of each bar
                        borderColor: ["#262a53", "#b86d8e"],
                        borderWidth: 0.5,
                    }],
                }}
                // Height of graph
                // height={400}
                height={200}
                
                /></div>
                </Col>
                
                </Row>
                <hr
                    style={{
                        color: "gray",
                        height: 5
                    }}
                />
                <Row style={{marginTop:"50px"}}>
                <Col md={6}>
                <div>
                <Bar
                data={{
                    // Name of the variables on x-axies for each bar
                    labels: ["Chrome", "FireFox", "Internet Explorer", "Others"],
                    datasets: [{
                        // Label for bars
                        label: "total count/value",
                        // Data or value of your each variable
                        data: browserData,
                        // Color of each bar
                        backgroundColor: ["#262A53", "#583e6b", "#995c85", "#c77692"],
                        // Border color of each bar
                        borderColor: ["#262A53", "#583e6b", "#995c85", "#c77692"],
                        borderWidth: 0.5,
                    }],
                }}
                // Height of graph
                // height={400}
                height={200}
                
                /></div>
                </Col>
                <Col md={6} sm={12}
                    style={{textAlign:"left"}}
                >
                    <h3 centered> Top Accessing Browsers </h3>
                    <div>
                    <Row> <Col style={{marginTop:"20px"}}> <i  style={{color:"#262a53"}} class="fas fa-square-full fa-2x"></i> <span> Chrome </span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i  style={{color:"#583e6b"}} class="fas fa-square-full fa-2x"></i> <span> Fire Fox</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i  style={{color:"#995c85"}} class="fas fa-square-full fa-2x"></i> <span> Internet Explorer</span></Col></Row>
                    <Row> <Col style={{marginTop:"20px"}}> <i  style={{color:"#c77692"}} class="fas fa-square-full fa-2x"></i> <span> Others </span></Col></Row>
                    </div>
                </Col>
                </Row>
            </Container>    
           
            </>
        );
    }
}


export default Analyse;