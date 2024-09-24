import React from 'react';
import './Card.css'; 

const Card = ({id,title,tag}) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <span className="card-avatar">
          <img src="path_to_avatar_image" alt="avatar" className="avatar" />
        </span>
      </div>
      <h2 className="card-title">{title}</h2>
      <div className="card-footer">
        <div className="card-status">
          <span className="icon">❗</span> 
        </div>
        <div className="card-tag">{tag}</div>
      </div>
    </div>
  );
};

export default Card;
