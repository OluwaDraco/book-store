import React, {Component} from "react";
import Data from './contexts/Data'
import Cookies from 'js-cookie' 

const Context = React.createContext();


export class Provider extends Component{
    
    constructor(){
        super();
        this.data = new Data();

        this.cookie = Cookies.get("authenticatedUser")

        this.state ={
            authenticatedUser:this.cookie ? JSON.parse(this.cookie) : null
        }

    }

    render(){
        const {authenticatedUser} =this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions:{
                signIn: this.signIn,
                signOut:this.signOut,

            }
        }
        return(
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async(emailAddress, password) =>{
        const user = await this.data.getUser(emailAddress, password)
        const unhashed = password;
        if(user !== null){
            user.password = unhashed;
            this.setState(()=>{
                return{
                    authenticatedUser:user
                }
            })

            Cookies.set('authenticatedUser',JSON.stringify(user),{expires:1})
        }

        return user;
    

        
    }

    signOut =()=>
    {
        this.setState(()=>{
        return {
            authenticatedUser: null 
        }    
    })

    Cookies.remove('authenticatedUser')
    
}

}



export const Consumer = Context.Consumer;

// AN HOC that wraps the  component in a context consumer  component

export default function withContext(Component){
    return function ContextComponent(props){
        return(
            <Context.Consumer>
            {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
        )
    }
}