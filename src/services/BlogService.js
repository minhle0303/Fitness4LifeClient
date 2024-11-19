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
//check title exist
export const checkTitleExists = async (title) => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log('API Response:', response.data); // Debugging

    if (!response.data || !response.data.data) {
      console.error('Invalid response structure:', response.data);
      return false;
    }

    const normalizedTitle = title.trim().toLowerCase();
    console.log('Normalized Input Title:', normalizedTitle);

    const exists = response.data.data.some((blog, index) => {
      const blogTitle = blog.title.trim().toLowerCase();
      console.log(`Blog #${index + 1} Title:`, blogTitle); // Debugging each title
      return blogTitle === normalizedTitle;
    });

    return exists;
  } catch (error) {
    console.error('Error checking title uniqueness:', error.response?.data || error.message);
    throw error;
  }
};

//delete
export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response; 
  } catch (error) {
    console.error("Error while deleting the blog:", error);
    throw error; 
  }
};
