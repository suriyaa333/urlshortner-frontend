import { Component } from "react";
import { Container, Form, Button, Row, Col,Image } from "react-bootstrap";
import mainImage from "../Images/main.jpeg";
class Urlshortner extends Component{
    constructor(props){
        super(props);
        this.state={
          linkstatus:0
            
        }
        this.addcomponent=this.addcomponent.bind(this);
    }
    componentDidMount()
    {
        var key={shorturl:this.props.shorturl};
        fetch('http://192.168.1.6:8000/search',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(key)
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
           
           if(res.longurl.length>0){
           
            this.setState({linkstatus:1});
            window.location.href=res.longurl;
           
           }
           
        })
    }
    addcomponent()
    {
        if(this.state.linkstatus===0)
        {
            window.location.href="/errorpage";
        }
    }
    render(){
        return(
            <>
           
            </>
        )
    }
}


export default Urlshortner;