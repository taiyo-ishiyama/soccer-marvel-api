import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  name,
  id,
  thumbnail,
  handleDetailsClick,
  handleAddToTeamClick,
}) {
  return (
    <div className='card'>
      <div className='card-header'>
        <h1 className='card-name'>{name}</h1>
      </div>
      <img src={thumbnail} alt='thumbnail' />
      <div className='card-footer'>
        <Link to={`/${id}`} target='_blank'>
          <button>See Details</button>
        </Link>
        <button onClick={() => handleAddToTeamClick(id)}>
          Add to My Team
        </button>
      </div>
    </div>
  );
}
