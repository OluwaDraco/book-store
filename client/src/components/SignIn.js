import React, {Component} from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class SignIn extends Component{
    state ={
        emailAddress: '',
        password: '',
        errors: [],
    }

    render(){
        const{
            emailAddress,
            password,
            errors,
        }= this.state;

        return (
            <div>
                <div className="form--centered">
                <h2>Sign In</h2>
                <Form
                    cancel ={this.cancel}
                    submit={this.submit}
                    errors = {errors}
                    submitButtonText ="Sign In"
                    elements={ ()=>(
                        <React.Fragment>
                            <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={emailAddress}
                            onChange={this.change}
                            placeholder="Email" />
                            <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={this.change}
                            placeholder="Enter Password" />
                        </React.Fragment>
                    )}
                 />   
                <p>Don't have a user account? Click here to <Link to="/signUp">sign up</Link>!</p>
                
                
            </div>
            </div>
        )
    }


    change=(event)=>{
        const name= event.target.name;
        const value = event.target.value;
        this.setState(()=>{
            return{
                [name]:value
            }
        })
    }

    submit = ()=>{
        const {context} = this.props
        // const {from} = this.props.location.value || {from:{path:"/"}}
        const {emailAddress,password} = this.state
        context.actions.signIn(emailAddress,password)
        .then(user=>{
            if(user == null){
                this.setState(()=>{
                    return{
                        errors: "Unsuccessful Sign-up"
                    }
                })
            }
            else{
                this.props.history.push('/')
            }
        })
        .catch(err=>{
            console.log(err)
            this.props.history.push('/error')
        })

    }

    cancel = ()=>{
        this.props.history.push("/");
    }
}
