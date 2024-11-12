import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // Fetch current blog details
    axios.get(`http://localhost:8080/api/blogs/${id}`)
      .then((response) => {
        setBlog(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog details:', error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Fetch other blogs (exclude the current one)
    axios.get("http://localhost:8080/api/blogs")
      .then((response) => {
        const allBlogs = response.data.data;
        const otherBlogs = allBlogs.filter((b) => b.id !== id).slice(0, 3);
        console.log("Fetched otherBlogs:", otherBlogs); // Kiểm tra dữ liệu lấy về

        setBlogs(otherBlogs); // Set blogs here
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
      });
  }, [id]); // Add id as dependency to refetch when the blog id changes

  useEffect(() => {
    console.log("Updated blogs:", blogs); // This will log the updated blogs array
  }, [blogs]); // Log when blogs are updated

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section id="services" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      {/* Blog detail on the left side */}
      <div className="blog-detail" style={{ flex: 8, paddingRight: '20px' }}>
        <h2>{blog.title}</h2>
        <p><strong>Category:</strong> {blog.category}</p>
        <p><strong>Tags:</strong> {blog.tags}</p>
        <p><strong>Created At:</strong> {new Date(blog.createdAt).toLocaleString()}</p>
        <div>
          <p>{blog.content}</p>
        </div>
      </div>

      {/* Related blog links on the right side */}
      <div className="related-blogs" style={{ flex: 3}}>
        <h3>Other Blogs</h3>
        {blogs.length > 0 ? (
          <ul>
            {blogs.map((relatedBlog) => (
              <li key={relatedBlog.id}>
                <Link to={`/blog/${relatedBlog.id}`} style={{ textDecoration: 'none', color: '#007bff' }}>
                  {relatedBlog.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No other blogs available.</p>
        )}
      </div>
    </section>
  );
};

export default BlogDetail;
