import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModalComponent from '../../Components/ModalComponent/ModalComponent.tsx';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = React.memo(() => {

    const navigate = useNavigate();

    const { user } = useAuth0();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        id: null,
        userId: null,
        username: null,
        tagline: null,
        location: null,
        email: null,
        profileImageUrl: null,
        coverImageUrl: null,
        firstName: null,
        lastName: null,
        createdAt: null,
        updatedAt: null,
        followers: [],
        following: []
      });
      
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleSave = (formData) => {
      const url = 'http://localhost:8050/api/users/create';
      formData = {...formData, 'email': user?.email, 'userId': user?.sub}
      axios.post(url, formData)
        .then(response => {
          setUserData(response.data);
          setIsModalOpen(false);
          setErrorMessage('');
          navigate('/home');
        })
        .catch(error => {
          if (error.response && error.response.status === 409) {
            setErrorMessage('A user with this username already exists. Please try a different username.');
          } else {
            console.error('Error saving user data:', error);
          }
        });
    };

    useEffect(() => {
        const userId = user?.sub;
        const url = `http://localhost:8050/api/users/getUser/${userId}`;
        axios.get(url)
          .then(response => {
            setUserData(response.data);
            navigate('/home');
        })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setIsModalOpen(true);
            } else {
              console.error('Error fetching user data:', error);
            }
          });
      }, []);

    return  <Box>
        <p>Loading...</p>
        <ModalComponent open={isModalOpen} 
            onClose={handleModalClose} 
            onSave={handleSave}
            errorMessage={errorMessage}/>
        </Box>
});

export default SignupPage;