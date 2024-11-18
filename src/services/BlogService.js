import axios from 'axios';

const API_URL = 'http://localhost:8080/api/blogs'; 

export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.data; // Trả về dữ liệu
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};
export const createBlog = async (formData) => {
  try {
      const response = await axios.post(`${API_URL}/create`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
  } catch (error) {
      throw new Error('Error creating blog');
  }
};

export const checkTitleExists = async (title) => {
  try {
      const response = await axios.get(`${API_URL}`);
      const normalizedTitle = title.trim().toLowerCase();
      const exists = response.data.data.some(
          (blog) => blog.title.toLowerCase() === normalizedTitle
      );
      return exists;
  } catch (error) {
      console.error('Error checking title uniqueness:', error);
      throw error;
  }
};