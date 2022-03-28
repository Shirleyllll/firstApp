import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { hasToken } from 'utils/storage';
import { Redirect } from 'react-router-dom'
class AuthRoute  extends Component {
    render() {
        // console.log( this.props)
        //...rest: 结构的剩余属性
        const { component: Component, ...rest } = this.props
        return (
            <Route 
                {...rest} 
                render={(props) => {
                    if(hasToken()){
                        return <Component {...props} />
                    }else {
                        console.log(props)
                        return <Redirect to={
                            {
                                pathname:'/login',
                                // search:'?id=123',
                                state: {
                                    from: props.location.pathname
                                }
                            }
                        } />
                    }
                }}
            ></Route>
        );
    }
}

export default AuthRoute;
