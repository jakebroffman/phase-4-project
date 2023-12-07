import React, { useEffect, useState } from 'react';

function SneakerPage() {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    fetch('/sneakers')
      .then((r) => r.json())
      .then((data) => setSneakers(data));
  }, []);

  return (
    <div className="sneaker-page">
        <h2>All Sneakers</h2>
            <div className="sneaker-list">
                {sneakers.map((sneaker) => (
                    <div key={sneaker.id} className="sneaker-card">
                        <h3>{sneaker.brand} - {sneaker.model}</h3>
                        <p>Size: {sneaker.size}</p>
                        <p>Condition: {sneaker.condition}</p>
                        <img src={sneaker.photo_url} alt={`${sneaker.brand} ${sneaker.model}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default SneakerPage;
