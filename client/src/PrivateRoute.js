//code from previous mini project
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

export default ({ component: Component, ...rest }) => {
  return (

        //if user is logged in, they are allowed in the protected route and if not then redirect to login page

    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props=>context.authenticatedUser ? (
            <Component {...props}/>
          ) : (
          <Redirect to={{
            pathname:'/signIn',
            state: {from: props.location},
            
            }} />
          )
          }
        />
      )}
    </Consumer>
);
        }