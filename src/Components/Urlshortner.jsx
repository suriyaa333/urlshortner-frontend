import { Component } from "react";
import { Container, Form, Button, Row, Col,Image,Table} from "react-bootstrap";
import mainImage from "../Images/main.jpeg";
import Linkmodel from "./Linkmodel";
import Analyse from "./Analyse";
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
            finalavailability:0,
            transaction:[],
            chromeusers:0,
            firefoxusers:0,
            ieusers:0,
            otherusers:0,
            mobileusers:0,
            laptopusers:0,
            clickspersite:0,
            totalclicks:0,
            top5shorturls:[],
            top5shorturlclciks:[]
            
        }
        this.closeLinkModel = this.closeLinkModel.bind(this);
        this.copyToClipboard = this.copyToClipboard.bind(this);
        this.createbutton=this.createbutton.bind(this);
        this.createtransactions=this.createtransactions.bind(this);
        this.openLinkModel=this.openLinkModel.bind(this);
        this.getUrl=this.getUrl.bind(this);
      
    }
    closeLinkModel = async() => {
        await this.setState({isShow: false});
    }
    openLinkModel = async() => {
        await this.setState({isShow: true});
    }
   
    copyToClipboard = async() => {
        // await navigate.clipboard.writeText(this.state.selectedShortUrl);
        // alert("will copy to clipboardd");
        var text = "https://tallyurl.herokuapp.com/"+this.state.chosenshorturl;
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove();

    }
    componentDidMount()
    {
        this.setState({username:document.querySelector("#namee").innerText})
    }
    rendertable()
    {
       
       return(
            this.state.allrows.map((row,index)=>{
            
                return(
                    <tr>
                    <td>{index+1}</td>
                    <td>{row.longurl}</td>
                    <td>https://tallyurl.herokuapp.com/{row.shorturl}</td>
                    <td>{row.click}</td>
                    
                    </tr>
                    
                );
            })
       );
      
    }
    createtransactions()
    {
    var key={username:this.state.username};
        fetch('https://tallyurl-backend.herokuapp.com/getalltransactions',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(key)
        }).then((res)=>{
        if(res.ok)
        return res.json();
        }).then((res)=>{
           
        this.setState({transaction:res});
            console.log("res ")
            console.log(res);
            this.setState({chromeusers:0});
            this.setState({firefoxusers:0});
            this.setState({ieusers:0});
            this.setState({otherusers:0});
            this.setState({mobileusers:0});
            this.setState({laptopusers:0});
            this.setState({top5shorturlclciks:[]});
            this.setState({top5shorturls:[]});
            
        res.forEach(obj => {
            
            if(obj["browser"]==="Chrome")
            {
                var c=parseInt(this.state.chromeusers);
                c=c+1;
                this.setState({chromeusers:c});
            }
            if(obj["browser"]==="Firefox")
            {
                var c=parseInt(this.state.firefoxusers);
                c=c+1;
                this.setState({firefoxusers:c});
            }
            if(obj["browser"]==="Internet Explorer")
            {
                var c=this.state.ieusers;
                c=c+1;
                this.setState({ieusers:c});
            }
            if(obj["browser"]==="Other Browser")
            {
                var c=this.state.otherusers;
                c=c+1;
                this.setState({otherusers:c});
            }
            if(obj["ismobile"]===true)
            {
                var c=this.state.mobileusers;
                c=c+1;
                this.setState({mobileusers:c});
            }
            if(obj["ismobile"]===false)
            {
                var c=this.state.laptopusers;
                c=c+1;
                this.setState({laptopusers:c});
            }
           
            
            
            
        });
        var tlen=this.state.transaction.length;
        var sitescount=this.state.allrows.length;

        this.setState({clickspersite:Math.ceil(tlen/sitescount)});
        var allrows=this.state.allrows;
        allrows.sort((a,b)=>(a.click < b.click ? 1 : -1))
        console.log("allrows");
        allrows.slice(0,5).forEach((obj)=>{
            var topurl=obj["shorturl"];
            var temp=this.state.top5shorturls;
            temp.push(topurl);
            this.setState({top5shorturls:temp});

            var topclick=obj["click"];
            temp=this.state.top5shorturlclciks;
            temp.push(topclick);
            this.setState({top5shorturlclciks:temp});

        })
       

           
        })
    }
    createbutton()
    {
        if(this.state.finalavailability===1)
        {
            return "https://tallyurl.herokuapp.com/"+this.state.usershorturl;
        }
        if(this.state.rand===0)
        {
            return "https://tallyurl.herokuapp.com/"+this.state.shorturlA;
        
        }
        if(this.state.rand===1)
        {
            
               return "https://tallyurl.herokuapp.com/"+this.state.shorturlB;
            
        }
        if(this.state.rand===2)
        {
            return "https://tallyurl.herokuapp.com/"+this.state.shorturlC;
        }
      
        
    }
     getUrl = () => {
        if(this.state.usershorturl !== ""){
            return this.state.usershorturl;
        }
        return this.state.chosenshorturl;
    }
    render(){
        const isUrlValid = () => {
            
             var urlSelected = this.state.longurl;
             var res = urlSelected.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/g);
             if(res == null)
                 return false;
             else
                 return true;
        }

        const handleShrink = async() => {
           
            if(isUrlValid()===false){

                await this.setState({errorText: "Please input a valid Url"})
                await this.setState({isLinkActivate: false});
                await this.setState({isShow: true})

            }
            
            else{
                
                document.querySelector("#linkresult").hidden = false;
                document.querySelector("#shrink-btn").innerText = "Shrinked";
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
            }
           
                                   
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

            fetch('https://tallyurl-backend.herokuapp.com/insertshorturl',{
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
        const requestUrl = async() => {
            await this.setState({choicetype:1});

            document.querySelector("#choose-component").hidden = true;
            const key={choicetype:this.state.choicetype,longurl:this.state.longurl,userchoice:this.state.userchoice,chosenshorturl:this.state.usershorturl,username:this.state.username};

            fetch('https://tallyurl-backend.herokuapp.com/insertshorturl',{
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
                  ;
                }
                else{
                    document.querySelector("#choose-result").innerHTML = "<i class='fa fa-times'></i> Not Available  check for another one!";
                    document.querySelector("#choose-result").style.color = "red";
                }
            })
           
        }
        
        const closeLinkModel = async() => {
            await this.setState({isShow: false});
        }
       
        return(
            <>
            <Linkmodel show={this.state.isShow} error={this.state.errorText} closeModel={this.closeLinkModel} chosenurl={this.getUrl} isActive={this.state.isLinkActivate} copy={this.copyToClipboard}/>
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
                    <Image className="d-none d-md-block" src={mainImage} />
                </Col>
            </Row>
            </Container>

            
            <Container fluid id="shrink" style={{margin:"30px auto", backgroundColor:"#262A53", visible:"hidden"}}>
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
                     fetch('https://tallyurl-backend.herokuapp.com/gettable',{
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body:JSON.stringify(key)
                        }).then((res)=>{
                        if(res.ok)
                        return res.json();
                        }).then((res)=>{
                         
                        this.setState({allrows:res});
                            console.log(res.arr);
                         console.log(this.state.allrows);
                        })
                }}> Show Table </Button>

                <Table responsive striped bordered hover>
                    
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
                <Container>
                   
                    <Button onClick={()=>{
                        this.createtransactions();
                        console.log(this.state.top5shorturlclciks);
                       
                    }}>View Detailed Analytics</Button>
                    <Analyse 
                chrome={this.state.chromeusers} 
                firefox ={this.state.firefoxusers} 
                ie={this.state.ieusers} 
                other={this.state.otherusers} 
                mobile={this.state.mobileusers} 
                computer={this.state.laptopusers}
                avgClick={this.state.clickspersite}
                top5shorturls={this.state.top5shorturls}
                top5shorturlclciks={this.state.top5shorturlclciks}
                />
                 
                    
                </Container>

            </>
        )
    }
}


export default Urlshortner;