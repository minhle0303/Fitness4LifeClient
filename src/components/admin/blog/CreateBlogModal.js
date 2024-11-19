import React, { useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { checkTitleExists, createBlog } from '../../../services/BlogService';

export default function CreateBlogModal({ open, onClose, onBlogCreated }) {
    const [formData, setFormData] = useState({
        authorId: '',
        title: '',
        content: '',
        category: '',
        tags: '',
        thumbnailUrl: null,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        let isValid = true;
    
        // Check if files are valid
        for (let i = 0; i < files.length; i++) {
            if (!validFormats.includes(files[i].type)) {
                isValid = false;
                break;
            }
        }
    
        // If files are valid
        if (isValid) {
            setFormData((prev) => ({
                ...prev,
                thumbnailUrl: files, // Ensure this is always an array of files
            }));
            setErrors((prev) => ({ ...prev, thumbnailUrl: null }));
        } else {
            setErrors((prev) => ({
                ...prev,
                thumbnailUrl: 'Invalid file type. Only .jpeg, .jpg, and .png are allowed.',
            }));
        }
    
        // Check if at least one file is selected
        if (files.length === 0) {
            setErrors((prev) => ({
                ...prev,
                thumbnailUrl: 'At least one image is required.',
            }));
        }
    };
    

    const validateField = async (fieldName, value) => {
        let error = null;

        switch (fieldName) {
            case 'authorId':
                if (!value.trim()) error = 'Author is required';
                break;
            case 'title':
                if (!value.trim()) {
                    error = 'Title is required';
                } else {
                    const existingTitle = await checkTitleExists(value);
                    if (existingTitle) error = 'Title already exists';
                }
                break;
            case 'content':
                if (!value.trim()) error = 'Content is required';
                break;
            case 'category':
                if (!value) error = 'Category is required';
                break;
            case 'tags':
                if (!value.trim()) error = 'Tags are required';
                break;
                case 'thumbnailUrl':
                    // Ensure that value is always an array and check if it has any files
                    if (!value || value.length === 0) {
                        error = 'At least one image is required.';
                    }
                    break;
            default:
                break;
        }

        setErrors((prev) => ({
            ...prev,
            [fieldName]: error,
        }));
    };

    const validateForm = async () => {
        const fieldsToValidate = ['authorId', 'title', 'content', 'category', 'tags', 'thumbnailUrl'];
        const newErrors = {};

        for (const field of fieldsToValidate) {
            const value = formData[field];
            await validateField(field, value);
            if (errors[field]) newErrors[field] = errors[field];
        }

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        const formDataToSubmit = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'thumbnailUrl' && value) {
                for (let i = 0; i < value.length; i++) {
                    formDataToSubmit.append('thumbnailUrl', value[i]);
                }
            } else {
                formDataToSubmit.append(key, value);
            }
        }

        try {
            await createBlog(formDataToSubmit);
            onBlogCreated();
            onClose();
            if (typeof onBlogCreated === 'function') {
                onBlogCreated('Blog create successfully!');
            }
        } catch (err) {
            console.error('Error creating blog', err);
        }
    };

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
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <h2>Create New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Author"
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.authorId}
                        helperText={errors.authorId}
                    />
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        multiline
                        rows={10}
                        margin="normal"
                        error={!!errors.content}
                        helperText={errors.content}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.category}>
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <MenuItem value="Nutrition & Diet">Nutrition & Diet</MenuItem>
                            <MenuItem value="Lifestyle & Health">Lifestyle & Health</MenuItem>
                            <MenuItem value="Trends & Innovations">Trends & Innovations</MenuItem>
                            <MenuItem value="Workouts & Training"> Workouts & Training</MenuItem>

                        </Select>
                        {errors.category && <p style={{ color: 'red', marginTop: '5px' }}>{errors.category}</p>}
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.tags}
                        helperText={errors.tags}
                    />
                    <input type="file" name="thumbnailUrl" multiple onChange={handleFileChange} />
                    {errors.thumbnailUrl && <p style={{ color: 'red' }}>{errors.thumbnailUrl}</p>}
                    <div style={{ marginTop: '10px' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Create Blog
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
}
