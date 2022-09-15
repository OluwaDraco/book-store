import React, {Component} from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class SignUp extends Component{
    state= {
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        errors:[]
    }

    render(){
        const {
            firstname,
            lastname,
            email,
            password,
            errors
        } =this.state;
    

    return(
        <div>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <Form 
                    cancel ={this.cancel}
                    submit={this.submit}
                    errors = {errors}
                    submitButtonText ="Sign Up"
                    elements={()=>(
                        <React.Fragment>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstname}
                            onChange={this.change}
                            placeholder="First Name" />

                            <input
                            id="lastName"
                            name="lastname"
                            type="text"
                            value={lastname}
                            onChange={this.change}
                            placeholder="Last Name" />

                            <input
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={email}
                            onChange={this.change}
                            placeholder="User Name" />

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
                 <p>Already have a user account? Click here to <Link to="sign-in.html">sign in</Link>!</p>
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

    submit =()=>{
        const {context} = this.props;
        const {
            firstname,
            lastname,
            email,
            password,

        }=this.state

        const user = {
            firstname,
            lastname,
            email,
            password,

        }

        context.data.createUser(user)
        .then(errors=>{
            if(errors.length){
                this.setState({errors})
            }
            else{
                this.props.history.push('/authenticated')
            }
        })
        .catch(err =>{
            console.log(err)
            this.props.history.push("/error")
        }

        )
    }

    cancel =()=>{
        this.props.history.push('/')
    }
}