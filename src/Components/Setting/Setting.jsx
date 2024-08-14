import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../../Route/ClientAuth/ClientContext';
import { database, auth, EmailAuthProvider, reauthenticateWithCredential } from '../../firebaseConfig';
import { update, ref } from 'firebase/database';
import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from '../../firebaseConfig'; // Make sure to import your firebase storage instance
import './style/setting.css';
import { ToastContainer, toast } from 'react-toastify';
import { updatePassword } from '@firebase/auth';

export default function Setting() {
  const { userData } = useContext(ClientContext);
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    country: '',
    province: '',
    city: '',
    zipCode: '',
    profileImage: '' // Add profileImage to formData
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const fetchEmailVerificationStatus = () => {
      const user = auth.currentUser;
      if (user) {
        setEmailVerified(user.emailVerified);
      }
    };

    fetchEmailVerificationStatus();
  }, []);
  
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        dob: userData.dob || '',
        gender: userData.gender || '',
        country: userData.country || '',
        province: userData.province || '',
        city: userData.city || '',
        zipCode: userData.zipCode || '',
        profileImage: userData.profileImage || '' // Set profileImage from userData
      });
    }
  }, [userData]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const imageRef = storageRef(storage, `profileImages/${userData.uid}/${file.name}`);

    try {
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      setFormData({ ...formData, profileImage: imageURL });
      toast.success('Profile image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image: ', error.message);
      toast.error(`Error uploading image: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.uid) {
      toast.error('User ID is not available');
      return;
    }
    try {
      const userRef = ref(database, `userInfo/${userData.uid}`);
      await update(userRef, formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('No user is currently signed in');
        return;
      }
  
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.oldPassword
      );
  
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordData.newPassword);
  
      toast.success('Password updated successfully');
    } catch (error) {
  
      if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect old password');
      } else if (error.code === 'auth/weak-password') {
        toast.error('New password is too weak');
      } else {
        toast.error('Error updating password');
      }
    }
  };

  return (
    <div className="settings-container">
      <ToastContainer />
      <div className="settings-menu">
        <ul className="list-group">
          <li
            className={`list-group-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            Account Setting
          </li>
          <li
            className={`list-group-item ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => handleTabClick('password')}
          >
            Change Password
          </li>
        </ul>
      </div>
      <div className="settings-content">
        {activeTab === 'account' && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.profileImage && (
                <img src={formData.profileImage} alt="Profile" className="profile-image" />
              )}
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userData?.email || ''}
                readOnly
              />
              {emailVerified ? (
                <span className="verified-icon">&#10004; Verified</span>
              ) : (
                <span className="unverified-icon">&#10008; Unverified</span>
              )}
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                className="form-control"
                name="contactNumber"
                value={userData?.contactNumber || ''}
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <input
                type="text"
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Province</label>
              <input
                type="text"
                className="form-control"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Profile</button>
          </form>
        )}
        {activeTab === 'password' && (
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        )}
      </div>
    </div>
  );
}
