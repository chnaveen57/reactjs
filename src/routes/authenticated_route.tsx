import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
const AuthenticatedRoute = ({ component, ...rest }: RouteProps) => {
    if (!component) {
      throw Error("component is undefined");
    }
    const Component = component; // JSX Elements have to be uppercase.
    const render = (props: RouteComponentProps<any>): React.ReactNode => {
      if (localStorage.getItem('user')) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/' }} />
    };
  
    return (<Route {...rest} render={render} />);
  }

export default AuthenticatedRoute;