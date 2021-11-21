import { Component } from "react";
import { Container, Form, Button, Row, Col,Image,Table} from "react-bootstrap";
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
            isLinkActivate: false,
            allrows:[],
            choicetype:0,
            rand:Math.floor(Math.random() * 3),
            usershorturl:"",
            finalavailability:0
            
        }
        this.closeLinkModel = this.closeLinkModel.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.createbutton=this.createbutton.bind(this);
     
      
    }
    closeLinkModel = async() => {
        await this.setState({isShow: false});
    }
    copyToClipboard = async() => {
        // await navigate.clipboard.writeText(this.state.selectedShortUrl);
    }
   
   
    rendertable()
    {
       
       return(
            this.state.allrows.map((row,index)=>{
            
                return(
                    <tr>
                    <td>{index+1}</td>
                    <td>{row.longurl}</td>
                    <td><a href={row.longurl}>https://tallyurl.herokuapp.com/{row.shorturl}</a></td>
                    <td>{row.click}</td>
                    
                    </tr>
                    
                );
            })
       );
      
    }
    createbutton()
    {
        if(this.state.finalavailability===1)
        {
            return this.state.usershorturl;
        }
        if(this.state.rand===0)
        {
            return this.state.shorturlA;
        
        }
        if(this.state.rand===1)
        {
            
               return this.state.shorturlB;
            
        }
        if(this.state.rand===2)
        {
            return this.state.shorturlC;
        }
      
        
    }
    render(){

        const handleShrink = async() => {
            document.querySelector("#linkresult").hidden = false;
            document.querySelector("#shrink-btn").innerText = "Shrinked";
            const key={url:this.state.longurl};
           
            fetch('http://localhost:8000/',{
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
                                   
        }


    
        const highlightChosenOption = async(id) => {
            // var num = id.slice(-1);
            var num = parseInt(id.slice(-1));
           

            await this.setState({selectedShortUrl: document.querySelector("#"+id).innerText})
        }
        const fetchResult = async () => {
            if(this.state.rand===0){

                await this.setState({userchoice:"A"});
                await this.setState({chosenshorturl:this.state.shorturlA});
                }
                if(this.state.rand===1){

                    await this.setState({userchoice:"B"});
                    await this.setState({chosenshorturl:this.state.shorturlB});
                }
                if(this.state.rand===2){

                    await this.setState({userchoice:"C"});
                    await this.setState({chosenshorturl:this.state.shorturlC});
                }
            await this.setState({isShow: true});
            if(this.state.chosenshorturl !== "") {
                await this.setState({isLinkActivate: true});
            }
            else
            await this.setState({isLinkActivate: false});
            const key={choicetype:this.state.choicetype,longurl:this.state.longurl,userchoice:this.state.userchoice,chosenshorturl:this.state.chosenshorturl,username:this.state.username};

            fetch('http://localhost:8000/insertshorturl',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(key)
            })
            
        }
        const showChooseComponent = () => {
            document.querySelector("#choose-component").hidden = false;
        }
        const requestUrl = () => {
            this.setState({choicetype:1});

            document.querySelector("#choose-component").hidden = true;
            const key={choicetype:this.state.choicetype,longurl:this.state.longurl,userchoice:this.state.userchoice,chosenshorturl:this.state.usershorturl,username:this.state.username};

            fetch('http://localhost:8000/insertshorturl',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify(key)
            }).then((res)=>{
                return res.json();
            }).then(async (res)=>{
                if(res.output===1){
                    document.querySelector("#choose-result").innerHTML = "  <i class='fa fa-check'></i> Available  ";
                    document.querySelector("#choose-result").style.color = "green";    
                   await this.setState({finalavailability:1});
                   await this.setState({chosenshorturl:this.state.usershorturl});
                }
                else{
                    document.querySelector("#choose-result").innerHTML = "<i class='fa fa-times'></i> Not Available  check for another one!";
                    document.querySelector("#choose-result").style.color = "red";
                }
            })
           
        }
        const isUrlValid = () => {
            var userInput = "";
            var regexQuery = "/(http(s)?://.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/";
            var url = new RegExp(regexQuery,"g");
            if (url.test(userInput)) {
                alert('Great, you entered an E-Mail-address');
                return true;
            }
            return false;
        }
        const closeLinkModel = async() => {
            await this.setState({isShow: false});
        }

        return(
            <>
            <Linkmodel show={this.state.isShow} closeModel={this.closeLinkModel} chosenurl={this.state.chosenshorturl} isActive={this.state.isLinkActivate} copy={this.copyToClipboard}/>
              <Container>
            <Row>
                <Col md={7} style={{marginTop:"100px"}}>
                    <Row> <Col> <h1 style={{fontSize:"100px", fontWeight:"bold"}}> Shrink it up </h1></Col></Row>
                    <Row> <Col> <h3> Get the shortest version of URL with our best choices </h3></Col></Row>
                    <Row> 
                        {/* <Button style={{margin:"30px 10px", backgroundColor:"#262A53", padding:"10px", outline:"none", border:"1px solid #262A53"}}> Get Premium</Button> */}
                        <Button style={{margin:"30px 10px", backgroundColor:"white", color:"#262A53", outline:"none", border:"1px solid #262A53", padding:"10px 20px", fontSize:"20px"}}> 
                        Shrink Now </Button>
                        
                    </Row>
                </Col>
                <Col md={5}>
                    <Image src={mainImage} />
                </Col>
            </Row>
            </Container>

            
            <Container fluid id="shrink" style={{margin:"30px auto", padding:"50px 200px", backgroundColor:"#262A53", visible:"hidden"}}>
            <h2 
                    style={{color:"white"}}
                > Shrink here </h2>
             <Form>
                    <Form.Group className="">
                        <Row>
                            <Col md={9} >
                                <Form.Control  onChange={(event)=>{
                               this.setState({longurl:event.target.value});

                            }} type="url" placeholder="Paste here to see the Magic!" style={{height:"50px"}}/> 
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
                <div style={{color:"white"}} hidden={true} id="linkresult" >
                    
                    <Row> <Col>
                        <h3 style={{marginTop:"50px"}}> Choose the Link </h3> 
                        
                    </Col> </Row>

                    <div style={{backgroundColor:"white", padding:"50px 0px", borderRadius:"5px"}}>
                   
                    <Row>
                        <Col md={8}  style={{textAlign:"center"}}>
                            <Button  onClick={async (e) => {highlightChosenOption(e.target.id)
                                    

                                }} disabled variant="light" id="linkoption0" 
                                // onClick={(e) => highlightChosenOption(e.target.id)}
                                style={{fontSize:"18px", textAlign:"center", color:"#262A53", width:"100%", border:"none", padding:"15px 20px", borderRadius:"3px", marginLeft:"20px"}}  >
                                {this.createbutton()}
                            </Button>
                        </Col>
                        <Col md={4} style={{textAlign:"center"}}>
                        <Button variant="light" id="linkoption1" 
                                onClick={fetchResult}
                                style={{fontSize:"18px", textAlign:"center", color:"white", width:"80%", border:"2px solid black", padding:"15px 20px", borderRadius:"3px", margin:"auto", backgroundColor:"#262A53"}}  >
                                Get this Link
                            </Button>
                        </Col>
                     
                    </Row>
                    <Row>
                        <Col> 
                          
                            <h6
                                id="choose-result"
                                style={{color:"black", textAlign:"left", marginTop:"20px", marginLeft:"20px"}}
                                onClick={showChooseComponent}
                            > Not Satisfied? Click here to check for what you what.</h6>
                        </Col>
                    </Row>
                    <Row hidden id="choose-component"><Col>
                    <Form>
                    <Form.Group className="">
                        <Row
                            style={{marginLeft:"20px"}}
                        >
                            <Col md={6} >
                                <Form.Control onChange={async (event)=>{
                                    await this.setState({usershorturl:event.target.value})
                                }} type="text" placeholder="Enter here" style={{height:"40px"}}
                                /> 
                            </Col>
                            <Col md={2} >
                                <Button variant="primary"
                                onClick={requestUrl}
                                style={{height:"40px", backgroundColor:"#FFA0A0", border:"none", padding:"10px 20px", color:"#262A53"}} 
                                id="shrink-btn"
                                > 
                                Check </Button> 
                            </Col>
                        </Row>
                    </Form.Group>

                    
                </Form>
                </Col>
                    </Row>
                   
                    </div>
                        

                </div>
               
                   
                        
                </Container>
                <Container>
                <h2 className="mt-5 mb-5"> My Shrinkes </h2>
                <Button className="mb-5" onClick={()=>{
                    var key={username:this.state.username};
                     fetch('http://localhost:8000/gettable',{
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify(key)
                        }).then((res)=>{
                        if(res.ok)
                        return res.json();
                        }).then(async(res)=>{
                         
                        await this.setState({allrows:res});
                        console.log(this.state.allrows);
                        })
                }}> Show Table </Button>

                <Table striped bordered hover>
                    
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Long URL</th>
                        <th>Shrinked URL</th>
                        <th>Clicks</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.rendertable()}
                    </tbody>
                    </Table>
                    
                </Container>

            </>
        )
    }
}


export default Urlshortner;