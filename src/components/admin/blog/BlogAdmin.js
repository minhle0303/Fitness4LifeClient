import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/blogs')
      .then(response => {
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data); // Initialize filteredBlogs
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    setFilteredBlogs(
      blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchValue)
      )
    );
  };

  return (
    <div className="bottom-data">
      <div className="orders">
        <div className="header">
          <i className='bx bx-receipt'></i>
          <h3>Recent Blogs</h3>
          <div className="search-container-blog">
            <i className='bx bx-search'></i>
            <input 
              type="text" 
              placeholder="Search by title..." 
              className="search-box" 
              value={search}
              onChange={handleSearchChange} 
            />
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filteredBlogs.length === 0 ? (
              <p>No data trùng khớp</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Author</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id}>
                      <td>
                        <p>{`Author ${blog.authorId}`}</p>
                      </td>
                      <td>{blog.title}</td>
                      <td><p>{blog.category}</p></td>
                      <td className="options">
                        <button className="action-btn edit">
                          <i className='bx bx-edit'></i>
                          <span className="btn-text">Edit</span>
                        </button>
                        <button className="action-btn delete">
                          <i className='bx bx-trash'></i>
                          <span className="btn-text">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
