import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
const OfferRoute = ({ component, ...rest }: RouteProps) => {
    if (!component) {
      throw Error("component is undefined");
    }
    const Component = component; // JSX Elements have to be uppercase.
    const render = (props: RouteComponentProps<any>): React.ReactNode => {
      if (JSON.parse(localStorage.getItem('vehicle')!).count) {
        return <Component {...props} />;
      }
      return <Redirect to={{ pathname: '/home/profile' }} />
    };
  
    return (<Route {...rest} render={render} />);
  }

export default OfferRoute;