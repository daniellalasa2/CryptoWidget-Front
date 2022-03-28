import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Get,GetById} from "./ApiHandler";

class ApiHOC extends Component{

    constructor(props){
        super(props);
        this.state ={
            loading:true,
            data:{}
        }   
    }
    ApiCall = async(route)=>{
        await Get(route).then(res=>{
            this.setState({
                ...this.state,
                data:res.data 
            });
        }).catch(err=>{ 
            console.log(err)
            if(err.status === 404){
                return <Redirect to="/404" />
            }else{
                return <Redirect to="/500" />
            }
        }).finally(()=>{
            this.setState({
                ...this.state,
                loading:false
            });
        });
    }
    ApiCallById = async(route,id)=>{
        await GetById(route,id).then(res=>{
            this.setState({
                ...this.state,
                data:res.data
            });
        }).catch(err=>{
            if(err.status === 404){
                return <Redirect to="/404" />
            }else{
                return <Redirect to="/500" />
            }
        }).finally(()=>{
            this.setState({
                ...this.state,
                loading:false
            });
        });
    }
    componentDidMount(){
        switch(this.props.type){
            case "call":
                this.ApiCall(this.props.route)
                break;
            case "callById":
                this.ApiCallById(this.props.route,this.props.id)
                break;
            case "paginate":
                break;
            case "count":
                break;
        }
    }
    render(){
        const {loading,data} = this.state;
        return(Object.keys(data).length && this.props.needsMap?
            data.map((item,key)=>
                <this.props.children key={key} data={item} loading={loading.toString()}/>
                )
            :
            ""
           // <this.props.children data={data} loading={loading.toString()}/>
        )
    }
}

export default ApiHOC;