import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SneakerContext from './SneakersContext';
import SneakerForm from './SneakerForm'; // Import the SneakerForm component

function SneakerPage() {
  const { sneakers } = useContext(SneakerContext);
  const [isFormVisible, setIsFormVisible] = useState(false);


  return (
    <div>
      <h2>All Sneakers</h2>
      <button onClick={() => setIsFormVisible(!isFormVisible)}>Add Sneaker to the Database</button>
      
      {isFormVisible && <SneakerForm />}
      
      <div className="sneaker-list">
        {sneakers.map((sneaker) => (
          <Link key={sneaker.id} to={`/sneakers/${sneaker.id}`} className="sneaker-card">
            <h3>{sneaker.brand} - {sneaker.model}</h3>
            <p>Size: {sneaker.size}</p>
            <p>Condition: {sneaker.condition}</p>
            <img src={sneaker.photo_url} alt={`${sneaker.brand} ${sneaker.model}`} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SneakerPage;
