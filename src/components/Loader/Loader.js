import React from 'react';
import  {MutatingDots} from 'react-loader-spinner';
import s from './Loader.module.css';


const Loader = () => {
    return (
      <div className={s.Loader}>
        <MutatingDots color="#00BFFF" width={80} height={80} />
      </div>
    );
  };
  
  export default Loader;