import React from 'react';
import './loading.scss';
const LoadingSpinner = () => (
  <div className='modal display-block loading'>
    <i className="fa fa-spinner fa-spin loading-icon"/> Loading...
  </div>
);

export default LoadingSpinner;