import { useState, useEffect } from 'react'
import { getCurrentUser } from '../api/userApi';
import type { UserResponseDTO } from '../types/api';

const Profile = () => {

    const [response, setResponse] = useState<UserResponseDTO | null>(null);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
            const userData = await getCurrentUser();
            setResponse(userData);
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }   
        };

        fetchUserData();
    }, []);   

  return (
    <div>
        <h1>Profile</h1>
        <p>ID: {response?.id}</p>
        <p>Username: {response?.username}</p>
        <p>Email: {response?.email}</p>
    </div>
  )
}

export default Profile