import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { deleteBlog, fetchBlogs } from '../../../services/BlogService';
import { TextField, IconButton, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import CreateBlogModal2 from './CreateBlogModal2';
import CreateBlogModal from './CreateBlogModal';
// import EditBlogModal from './EditBlogModal';
import axios from 'axios';
import EditBlogModal2 from './EditBlogModal2';

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);

  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleEdit = (row) => {
    setSelectedBlog(row); // Save the selected blog details
    setIsEditModalOpen(true); // Open the modal
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedBlog(null); // Reset the selected blog
  };

  const handleCreateBlog = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleBlogCreated = (successMessage) => {
    getBlogs(); // Reload data when a new blog is created
    setMessage(successMessage);
    setTimeout(() => {
      setMessage('');
    }, 6000);
  };
  const getBlogs = async () => {
    try {
      const data = await fetchBlogs();
      setBlogs(data);
      setFilteredBlogs(data); // Initialize filteredBlogs
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
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


  const handleDelete = async (row) => {
    try {

      const response = await deleteBlog(row.id);

      if (response.status === 200) {
        handleBlogCreated('Deleted blog successfully');

      } else {
        console.error("Failed to delete the blog:", response.data);
      }
    } catch (error) {
      console.error("Error while deleting the blog:", error);
    }
  };

  const columns = [
    { field: 'authorId', headerName: 'Author', width: 170, renderCell: (params) => `Author ${params.value}` },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'category', headerName: 'Category', width: 190 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Options',
      headerAlign: 'right',
      align: 'right',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          className="action-btn edit-btn"
          icon={<i className='bx bx-edit'></i>}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          className="action-btn delete-btn"
          icon={<i className='bx bx-trash'></i>}
          label="Delete"
          onClick={() => handleDelete(params.row)}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <div className="bottom-data">
      <div className="orders">
        <div className="header">
          <i className='bx bx-receipt'></i>
          <h3>Recent Blogs</h3>
          {/* Nút Create with Tooltip */}
          <Tooltip title="Create New Blog" placement="left" classes={{ popper: 'custom-tooltip' }}>
            <IconButton
              color="primary"
              onClick={handleCreateBlog}
              style={{ marginLeft: '20px' }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <CreateBlogModal open={isModalOpen} onClose={handleCloseModal} onBlogCreated={handleBlogCreated} />
          <EditBlogModal2
            open={isEditModalOpen}
            blog={selectedBlog}
            onClose={handleCloseEditModal}
            onBlogEdited={handleBlogCreated}
            onSave={(updatedBlog) => {
              console.log("Updated Blog:", updatedBlog);
              // Handle the save logic here (e.g., send an API request to update the blog)
              setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                  blog.id === updatedBlog.id ? updatedBlog : blog
                )
              );
            }}
          />

          <TextField
            className='text-field'
            label="Search by title..."
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            size="small"
            style={{ marginBottom: '10px', width: '50%' }}
          />

        </div>
        {message && (
          <div className="alert-container">
            <div className="alert">
              {message}
            </div>
          </div>
        )}
        {/* Hiển thị "Create New Blog" khi nút Create được nhấn */}
        {isCreateModalOpen && (
          <Typography variant="h6" style={{ marginTop: '10px' }}>
            Create New Blog
          </Typography>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              className="data-grid"
              rows={filteredBlogs}
              columns={columns}
              pageSize={1}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.id} // Xác định trường ID
              disableSelectionOnClick
              sx={{
                fontSize: 14, // Thay đổi kích thước font chữ
              }}
              initialState={{
                pagination: { paginationModel: { pageSize: 7 } },
              }}
              checkboxSelection
              pageSizeOptions={[5]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
