import { Component } from "react";
import { Container, Form, Button, Row, Col,Image } from "react-bootstrap";
import mainImage from "../Images/main.jpeg";
import Linkmodel from "./Linkmodel";
class Urlshortner extends Component{
    constructor(props){
        super(props);
        this.state={
            longurl:"",
            shorturlA:"",
            shorturlB:"",
            shorturlC:"",
            userchoice:"A",
            username:"surya",
            chosenshorturl:"",
            isShow : false,
            selectedShortUrl: "",
            isLinkActivate: false
            
        }
        this.closeLinkModel = this.closeLinkModel.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
    }
    closeLinkModel = async() => {
        await this.setState({isShow: false});
    }
    copyToClipboard = async() => {
        // await navigate.clipboard.writeText(this.state.selectedShortUrl);
    }
    render(){

        const handleShrink = () => {
            document.querySelector("#linkresult").hidden = false;
            document.querySelector("#shrink-btn").innerText = "Shrinked";
        }
        
        const highlightChosenOption = async(id) => {
            // var num = id.slice(-1);
            var num = parseInt(id.slice(-1));
            // document.querySelector("#linkoption"+num).style.border = "2px solid #4fd88d";
            document.querySelector("#linkoption"+num).classList.add("selected-option");
            document.querySelector("#linkoption"+((num+1)%3)).classList.remove("selected-option");
            document.querySelector("#linkoption"+((num+2)%3)).classList.remove("selected-option");
            
            // document.querySelector("#linkoption"+((num+2)%3)).style.border = "2px solid black";
            // document.querySelector("#get-link-btn").disabled = false;

            await this.setState({selectedShortUrl: document.querySelector("#"+id).innerText})
        }
        const fetchResult = async () => {
            await this.setState({isShow: true});
            if(this.state.selectedShortUrl !== "") {
                await this.setState({isLinkActivate: true});
            }
            
        }

        const closeLinkModel = async() => {
            await this.setState({isShow: false});
        }

        return(
            <>
              <Container>
            <Row>
                <Col md={7} style={{marginTop:"100px"}}>
                    <Row> <Col> <h1 style={{fontSize:"100px", fontWeight:"bold"}}> Shrink it up </h1></Col></Row>
                    <Row> <Col> <h3> Get the shortest version of URL with our best choices </h3></Col></Row>
                    <Row> 
                        <Button style={{margin:"30px 10px", backgroundColor:"#456268"}}>Get Premium</Button>
                        <Button variant="outline-dark" style={{margin:"30px 10px"}}> Shrink Now </Button>
                        {/* <Col md="4"> </Col>
                        <Col md="4"> <Button> Smash Now </Button></Col> */}
                    </Row>
                </Col>
                <Col md={5}>
                    <Image src={mainImage} />
                </Col>
            </Row>
            </Container>

            
             <Container>
             <Form>
                    <Form.Group className="">
                        <Row>
                            <Col md={9} >
                                <Form.Control type="url" placeholder="Paste here to see the Magic!" style={{height:"50px"}}/> 
                            </Col>
                            <Col md={3} >
                                <Button variant="primary"
                                onClick={handleShrink}
                                
                                style={{height:"50px", backgroundColor:"#FFA0A0", border:"none", padding:"10px 20px", color:"#262A53"}} 
                                id="shrink-btn"
                                > 
                                Shrink it </Button> </Col>
                        </Row>
                    </Form.Group>
                    
                </Form>
                <Form>
                    
                    <Form.Group className="">
                      
                        <Row>
                            <Col md={8} ><Form.Control type="url" onChange={(event)=>{
                               this.setState({longurl:event.target.value});

                            }} placeholder="Url" /> </Col>
                            <Col md={4} ><Button variant="primary" onClick={async()=>{

                                    const key={url:this.state.longurl};
                                   
                                    fetch('https://tallyurl-backend.herokuapp.com/',{
                                    method: 'POST',
                                    headers: {
                                        'Content-Type' : 'application/json'
                                    },
                                    body:JSON.stringify(key)
                                    }).then((res)=>{
                                    if(res.ok)
                                    return res.json();
                                    }).then(async(res)=>{
                                        console.log(res[0].Ahash);
                                       await this.setState({shorturlA:res[0].Ahash});
                                       await this.setState({shorturlB:res[0].Bhash});
                                       await this.setState({shorturlC:res[0].Chash});
                                       
                                   
                                    })

                            }}> Shrink it </Button> </Col>
                        </Row>
                    </Form.Group>
                    
                 </Form>
                   <p onClick={async()=>{
                       await this.setState({userchoice:"A"});
                       await this.setState({chosenshorturl:this.state.shorturlA});
                       
                            
                   }}>{this.state.shorturlA}</p>
                   <p onClick={async()=>{
                       await this.setState({userchoice:"B"});
                       await this.setState({chosenshorturl:this.state.shorturlB});
                   
                   }}>{this.state.shorturlB}</p>
                   <p onClick={async()=>{
                       await this.setState({userchoice:"C"});
                       await this.setState({chosenshorturl:this.state.shorturlC});
                   
                   }}>{this.state.shorturlC}</p>
                   <Button onClick={()=>{
                      
                       const key={longurl:this.state.longurl,userchoice:this.state.userchoice,chosenshorturl:this.state.chosenshorturl,username:this.state.username};

                       fetch('https://tallyurl-backend.herokuapp.com/insertshorturl',{
                       method: 'POST',
                       headers: {
                           'Content-Type' : 'application/json'
                       },
                       body:JSON.stringify(key)
                       })
                   }} variant="outline-dark" style={{margin:"30px 10px"}}> Generate link </Button>
                        
                </Container>

            </>
        )
    }
}


export default Urlshortner;