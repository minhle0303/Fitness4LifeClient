import axios from "axios";
import { Modal, Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FormField from '../../custom/FormField'; // Adjust the path as necessary

function EditUserModal({ open, user, onClose, onSave, onUserEdited }) {
    const [editedUser , setEditedUser ] = useState(user || {});
    const [newImages, setNewImages] = useState([]);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (user) {
        setEditedUser(user);
        console.log(editedUser);
        
        setNewImages([]);
        setError('');
      }
    }, [user]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
  
  // Nếu tên trường là trong profileDTO, cập nhật profileDTO
  if (name in editedUser.profileDTO) {
    setEditedUser((prev) => ({
      ...prev,
      profileDTO: {
        ...prev.profileDTO,
        [name]: value
      }
    }));
  } else {
    // Nếu không phải trường profileDTO, cập nhật trực tiếp vào editedUser
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Validate on user input
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: value.trim() === '' ? `${name} is required.` : '',
  }));
};
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImageObjects = files.map((file, index) => ({
          id: `${file.name}-${index}`, // Unique identifier
          imageUrl: URL.createObjectURL(file),
          file, // File for uploading
        }));
        setNewImages((prev) => [...prev, ...newImageObjects]);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!editedUser.fullName || editedUser.fullName.trim() === '') {
          newErrors.fullName = 'Full Name is required.';
        }
        if (!editedUser.phone || editedUser.phone.trim() === '') {
          newErrors.phone = 'Phone number is required.';
        }
        if (!editedUser.role || editedUser.role.trim() === '') {
          newErrors.role = 'Role is required.';
        }
        if (!editedUser.gender || editedUser.gender.trim() === '') {
          newErrors.gender = 'Gender is required.';
        }
        if (newImages.some((image) => !/\.(jpeg|jpg|png|heic)$/i.test(image.file.name))) {
          newErrors.newImages = 'Only .jpeg, .jpg, .png, .heic files are allowed.';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };
  
    const handleSave = async () => {
        if (!validateForm()) return;
        
        try {
          const formData = new FormData();
          formData.append('fullName', editedUser.fullName || '');
          formData.append('phone', editedUser.phone || '');
          formData.append('role', editedUser.role || '');
          formData.append('gender', editedUser.gender || '');
          formData.append('status', editedUser.status ? 'true' : 'false');
          formData.append('maritalStatus', editedUser.profileDTO?.maritalStatus || '');
          formData.append('hobbies', editedUser.profileDTO?.hobbies || '');
          formData.append('age', editedUser.profileDTO?.age || '');
          formData.append('avatar', editedUser.profileDTO?.avatar || '');
          formData.append('address', editedUser.profileDTO?.address || '');
          formData.append('description', editedUser.profileDTO?.description || '');
      
        

          const response = await axios.put(
            `http://localhost:8080/api/users/update/${editedUser.id}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
          
          if (response.status === 200) {
            onSave(response.data);
            onUserEdited();
            onClose();
            if (typeof onUserEdited === 'function') {
                onUserEdited('User updated successfully!');
            }
          } else {
            setError('Failed to update user. Please try again.');
          }
        } catch (error) {
          setError('An error occurred while updating the user.');
        }
    };

    if (!user) return null;

    return (
      <Modal open={open} onClose={onClose}>
        <Box
         className="modal-box-form"
        >
          <Typography variant="h6" gutterBottom>
            Edit User
          </Typography>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          
          
          <FormField label="Full Name" name="fullName" value={editedUser.fullName} onChange={handleChange} />
          <FormField label="Phone" name="phone" value={editedUser.phone} onChange={handleChange} />
          
          <FormField 
            label="Gender" 
            name="gender" 
            value={editedUser.gender} 
            onChange={handleChange} 
            type="select" 
            options={[
              { value: 'MALE', label: 'Male' },
              { value: 'FEMALE', label: 'Female' },
              { value: 'OTHER', label: 'Other' },
            ]}
            error={errors.gender}
          />
          <FormField 
            label="Address" 
            name="address" 
            value={editedUser.profileDTO?.address} 
            onChange={handleChange} 
          />
          <FormField 
            label="Age" 
            name="age" 
            value={editedUser.profileDTO?.age} 
            onChange={handleChange} 
          />

          <FormField 
            label="Hobbies" 
            name="hobbies" 
            value={editedUser.profileDTO?.hobbies} 
            onChange={handleChange} 
          />

          <FormField 
            label="Description" 
            name="description" 
            value={editedUser.profileDTO?.description} 
            onChange={handleChange} 
            type="textarea" 
          />

          <FormField 
            label="Marital Status" 
            name="maritalStatus" 
            value={editedUser.profileDTO?.maritalStatus} 
            onChange={handleChange} 
            type="select" 
            options={[
              { value: 'SINGLE', label: 'Single' },
              { value: 'MARRIED', label: 'Married' },
              { value: 'DIVORCED', label: 'Divorced' },
            ]}
          />

          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
}

export default EditUserModal;