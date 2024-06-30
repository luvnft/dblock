import React from 'react';
import { LoaderIcon } from '../assets/export';

const Loader = () => {
  return (
    <div className="loading-container">
        <img src={LoaderIcon} alt="Loading..." className="loading-container-icon" />
    </div>
  )
}

export default Loader;