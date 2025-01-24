import React from "react";

const TeamCard = ({ image, name, title }) => {
  return (
    <div className="team-card">
      <img src={image} alt={name} className="team-card__image" />
      <div className="team-card__info">
        <h3>{name}</h3>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default TeamCard;
