import React from 'react';
import './Heading.css'; 
import Add from '../icons_FEtask/add.svg';
import DotMenu from '../icons_FEtask/3 dot menu.svg';

// Define the component
const Heading = ({ heading, Icon, number }) => {
  return (
    <div className='heading-ribbon' >
        <img src={Icon} alt = "" className ='heading-ribbon-icon'/>
        <div className='heading-ribbon-heading'>
            <h3>{heading}</h3>
            <div className='heading-ribbon-number'>{number}</div>
        </div>
        <img src = {Add} alt = "" className ='heading-ribbon-icon'/>
        <img src = {DotMenu} alt = "" className ='heading-ribbon-icon'/>
    </div>
  );
};


export default Heading;
