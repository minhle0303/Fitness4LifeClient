import axios from "axios";
import { Modal, Box, TextField, Button, Typography, Checkbox, FormControlLabel, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { useEffect, useState } from 'react';

function EditBlogModal2({ open, blog, onClose, onSave, onBlogEdited }) {
    const [editedBlog, setEditedBlog] = useState(blog || {});
    const [deleteImages, setDeleteImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      if (blog) {
        setEditedBlog(blog);
        setDeleteImages([]);
        setNewImages([]);
        setError('');
      }
    }, [blog]);
  
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        // Validate ngay khi người dùng nhập
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: value.trim() === '' ? `${name} is required.` : '',
        }));
      
        setEditedBlog((prev) => ({ ...prev, [name]: value }));
      };
      
    
      const handleCheckboxChange = (imageId) => {
        setDeleteImages((prev) =>
          prev.includes(imageId)
            ? prev.filter((id) => id !== imageId)
            : [...prev, imageId]
        );
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
  
    const renderTextField = (label, name, multiline = false, rows = 1) => (
      <TextField
        label={label}
        name={name}
        value={editedBlog[name] || ''}
        onChange={handleChange}
        error={!!errors[name]}
        helperText={errors[name]}
        multiline={multiline}
        rows={rows}
      />
    );

    const validateForm = () => {
        const newErrors = {};
        // if (!editedBlog.authorId || editedBlog.authorId.trim() === '') {
        //   newErrors.authorId = 'Authorid is required.';
        // }
        if (!editedBlog.title || editedBlog.title.trim() === '') {
          newErrors.title = 'Title is required.';
        }
        if (!editedBlog.category || editedBlog.category.trim() === '') {
          newErrors.category = 'Category is required.';
        }
        if (!editedBlog.tags || editedBlog.tags.trim() === '') {
          newErrors.tags = 'tags is required.';
        }
        if (!editedBlog.content || editedBlog.content.trim() === '') {
          newErrors.content = 'Content is required.';
        }
        if (newImages.some((image) => !/\.(jpeg|jpg|png|heic)$/i.test(image.file.name))) {
          newErrors.newImages = 'Only .jpeg, .jpg, .png, .heic files are allowed.';
        }
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
      };
  
    const handleSave = async () => {
        if (!validateForm()) return;
        
      
        try {
          const formData = new FormData();
          formData.append('authorId', editedBlog.authorId || '');
          formData.append('title', editedBlog.title || '');
          formData.append('content', editedBlog.content || '');
          formData.append('category', editedBlog.category || '');
          formData.append('tags', editedBlog.tags || '');
          formData.append('deleteImageUrl', 20036|| '');
      
          newImages.forEach((image) => {
            formData.append('thumbnailUrl', image.file);
          });
      
          // Log formData content
          for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
          }
      
          const response = await axios.put(
            `http://localhost:8080/api/blogs/update/${editedBlog.id}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
          
      
          if (response.status === 200) {
            onSave(response.data);
            onBlogEdited();
            onClose();
            if (typeof onBlogEdited === 'function') {
                onBlogEdited('Blog updated successfully!');
            }
          } else {
            setError('Failed to update blog. Please try again.');
          }
        } catch (error) {
          setError('An error occurred while updating the blog.');
        }
      };
      
  
    if (!blog) return null;
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Blog
          </Typography>
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          
          {renderTextField('AuthorId', 'authorId')}
          {renderTextField('Title', 'title')}
          <FormControl fullWidth margin="normal" error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={editedBlog.category}
                            onChange={handleChange}
                        >
                           <MenuItem value="Nutrition & Diet">Nutrition & Diet</MenuItem>
                            <MenuItem value="Lifestyle & Health">Lifestyle & Health</MenuItem>
                            <MenuItem value="Trends & Innovations">Trends & Innovations</MenuItem>
                            <MenuItem value="Workouts & Training"> Workouts & Training</MenuItem>

                        </Select>
                        {errors.category && <p style={{ color: 'red', marginTop: '5px' }}>{errors.category}</p>}
                    </FormControl>
          {renderTextField('Tags', 'tags')}
          {renderTextField('Content', 'content', true, 4)}
  
          {/* Rest of the code remains unchanged */}
          <Box>
            <Typography variant="body1" gutterBottom>
              Current Thumbnails:
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 1 }}>
              {editedBlog.thumbnailUrl?.map((thumb) => (
                <Box key={thumb.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <img src={thumb.imageUrl} alt={`Thumbnail ${thumb.id}`} style={{ width: 80, height: 80 }} />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={deleteImages.includes(thumb.id)}
                        onChange={() => handleCheckboxChange(thumb.id)}
                      />
                    }
                    label="Delete"
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              Upload New Images:
            </Typography>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
            {errors.newImages && (
              <Typography color="error" variant="body2">
                {errors.newImages}
              </Typography>
            )}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 1, marginTop: 2 }}>
              {newImages.map((img, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <img src={img.imageUrl} alt={`New Image ${index}`} style={{ width: 80, height: 80 }} />
                </Box>
              ))}
            </Box>
          </Box>
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
  
  export default EditBlogModal2;
  