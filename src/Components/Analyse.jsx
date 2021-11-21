import React, { Component } from "react";
import { Switch, Route, Redirect} from "react-router-dom";
import {Bar}  from 'react-chartjs-2'
import {  Container, Row, Col, Button, Modal, ButtonGroup} from "react-bootstrap";
// import * from 'font-awesome'

class Analyse extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }
    
    
    render(){
        const lab = this.props.labels;
        const dat = this.props.data;
        return(
            <>
            
            <Modal
                size="lg"
                show={true}
                // onHide={() => setLgShow(false)}
                // aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Analysis
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                    <Bar
                        data={{
                            
                            labels: {lab},
                            datasets: [
                            {
                                // label: "total count/value",
                                data: {dat},
                                backgroundColor: ["aqua", "green", "red", "yellow"],
                                borderColor: ["aqua", "green", "red", "yellow"],
                                borderWidth: 0.5,
                            },
                            ],
                        }}
                        height={400}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                            yAxes: [
                                {
                                ticks: {
                                    beginAtZero: true,
                                },
                                },
                            ],
                            },
                            legend: {
                            labels: {
                                fontSize: 15,
                            },
                            },
                        }}
                        />
                    </div>

                </Modal.Body>
            </Modal>
            </>
        );
    }
}


export default Analyse;