import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { fetchBlogs } from '../../../services/BlogService'; 
import { TextField, IconButton, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import CreateBlogModal from './CreateBlogModal';
// import CreateBlogModal from '../../../services/CreateBlogModal';

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState([]);
  
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBlog = () => {
      setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
      setIsModalOpen(false); // Close the modal
  };
  const handleBlogCreated = () => {
    getBlogs(); // Reload data when a new blog is created
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


  const handleEdit = (row) => {
    console.log("Edit blog:", row);
    // Xử lý logic edit blog
  };

  const handleDelete = (row) => {
    console.log("Delete blog:", row);
    // Xử lý logic xóa blog
  };

  const columns = [
    { field: 'authorId', headerName: 'Author', width: 170, renderCell: (params) => `Author ${params.value}` },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'category', headerName: 'Category', width: 200 },
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
              style={{ marginLeft: '20px'}}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
          <CreateBlogModal open={isModalOpen} onClose={handleCloseModal}  onBlogCreated={handleBlogCreated} />

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
