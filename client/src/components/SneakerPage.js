import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SneakersContext from './SneakersContext';
import SneakerForm from './SneakerForm';
import UserContext from './UserContext';

function SneakerPage() {
  const { sneakers, setSneakers } = useContext(SneakersContext);
  const { isLoggedIn, currentUser } = useContext(UserContext);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [sneakerToEdit, setSneakerToEdit] = useState(null);

  console.log('isLoggedIn:', isLoggedIn);
  console.log('currentUser:', currentUser);

  const toggleEditForm = (sneaker) => {
    setIsFormVisible(false);
    setIsEditFormVisible(!isEditFormVisible);
    setSneakerToEdit(sneaker);
  };

  const handleEditSneaker = async (editedSneaker) => {
    try {
      const response = await fetch(`/sneakers/${editedSneaker.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedSneaker),
      });
  
      if (response.ok) {
        const updatedSneaker = await response.json();
  
        setSneakers((prevSneakers) =>
          prevSneakers.map((sneaker) =>
            sneaker.id === updatedSneaker.id ? updatedSneaker : sneaker
          )
        );
  
        setIsEditFormVisible(false); 
  
        console.log('Sneaker updated successfully!');
      } else {
        console.error('Failed to update sneaker');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCreateSneaker = async (newSneaker) => {
    try {
      const response = await fetch('/sneakers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newSneaker,
          user_id: currentUser.id,
        }),
      });
  
      if (response.ok) {
        const createdSneaker = await response.json();
        setSneakers((prevSneakers) => {
          console.log('Updated Sneakers State:', [...prevSneakers, createdSneaker]);
          return [...prevSneakers, createdSneaker];
        });
        setIsFormVisible(!isFormVisible);
        setIsEditFormVisible(!isEditFormVisible);
        console.log('Sneaker added successfully!');        
      } else {
        console.error('Failed to add sneaker to the database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleDeleteSneaker = async (sneakerId) => {
    try {
      const response = await fetch(`/sneakers/${sneakerId}`, {
        method: 'DELETE',
      });
  
      console.log('Response:', response);
  
      if (response.ok) {
        setSneakers((prevSneakers) =>
          prevSneakers.filter((sneaker) => sneaker.id !== sneakerId)
        );
  
        console.log('Sneaker deleted successfully!');
      } else {
        console.error('Failed to delete sneaker');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2 className="sneaker-page-heading">All Sneakers</h2>
      {isLoggedIn && (
        <>
          <button className='button' onClick={() => setIsFormVisible(!isFormVisible)}>
            Add Sneaker to the Database
          </button>
          {isFormVisible && (
            <SneakerForm
              onSubmit={handleCreateSneaker}
              isEditFormVisible={isEditFormVisible}
              setIsEditFormVisible={setIsEditFormVisible}
              isFormVisible={isFormVisible}
              setIsFormVisible={setIsFormVisible}
            />
          )}
        </>
      )}

<div className="sneaker-list">
        {sneakers.map((sneaker) => (
          <div key={sneaker.id} className="sneaker-card">
            <Link to={`/sneakers/${sneaker.id}`}>
              <h3>
                {sneaker.brand} - {sneaker.model}
              </h3>
              <p>Size: {sneaker.size}</p>
              <p>Condition: {sneaker.condition}</p>
              <img src={sneaker.photo_url} alt={`${sneaker.brand} ${sneaker.model}`} />
            </Link>
            {isLoggedIn && currentUser.id === sneaker.user_id && (
              <div>
                <button onClick={() => toggleEditForm(sneaker)}>Edit</button>
                <button onClick={() => handleDeleteSneaker(sneaker.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditFormVisible && (
        <SneakerForm
          onSubmit={handleEditSneaker}
          sneakerToEdit={sneakerToEdit}
          onCancel={() => setIsEditFormVisible(false)}
        />
      )}
    </div>
  );
}

export default SneakerPage;
