import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import UploadImage from '../UploadImage/UploadImage';


function Profile() {
  const { userData, updateUser, logout } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userData(id);
        setData(user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, userData]);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: data[field] };
      const updatedUser = await updateUser(id, updatedData);
      console.log('User updated successfully:', updatedUser);

      setData((prev) => ({ ...prev, [field]: updatedUser[field] }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
      {data.profilePhoto ? (
          <img
            src={`http://localhost:5000/${data.profilePhoto}`}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          /> ) :
        <UploadImage /> 
        }
        <h1>{data.username}</h1>
      </div>
      <div className="profile-info">
        {['username', 'email', 'age'].map((field) => (
          <div className="profile-row" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {isEditing[field] ? (
              <div className="input-container">
                <input
                  type="text"
                  value={data[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
                <button onClick={() => handleSave(field)}>Save</button>
              </div>
            ) : (
              <div className="value-container">
                <span>{data[field]}</span>
                <FaPen className="edit-icon" onClick={() => handleEditClick(field)} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
