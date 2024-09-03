import React, { useContext, useState } from 'react';
import { ProfileContext } from '../context/ProfileContext';

const ProfilePage = () => {
    const { profile, loading, errors, updateProfile } = useContext(ProfileContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        username: profile.username,
        email: profile.email,
    });

    const handleChange = (e) => {
        setEditedProfile({
            ...editedProfile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateProfile(editedProfile);
        if (success) {
            setIsEditing(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Profile Page</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={editedProfile.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span>{errors.username}</span>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editedProfile.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div>
                    <p>Username: {profile.username}</p>
                    <p>Email: {profile.email}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
