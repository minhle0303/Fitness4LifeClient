import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { TextField, IconButton, Typography, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import CreateBlogModal2 from './CreateBlogModal2';
// import CreateUserModal from './CreateUserModal'; // You can implement this if needed
import axios from 'axios';
import EditUserModal from './EditUserModal';

export default function UserAdmin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState('');


  const handleEdit = (row) => {
    setSelectedUser(row); // Save the selected blog details
    console.log("user",selectedUser );
    
    setIsEditModalOpen(true); // Open the modal
  };

  const handleCreateUser = () => {
    setIsCreateModalOpen(true); // Open the modal for creating a new user
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false); 
    setIsEditModalOpen(false); // Close the modal
  };


  //gửi message và load data khi thành công CRUD
  const handleUserSuccess = (successMessage) => {
    getUsers();
    setMessage(successMessage);
    setTimeout(() => {
      setMessage('');
    }, 6000);
  };
 
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/manager/all');
      const transformedUsers = response.data
      .filter((user) => user.role !== 'ADMIN') // Lọc bỏ người dùng có role là ADMIN
      .map((user) => ({
        ...user,
        age: user.profileDTO?.age || 'N/A',
        address: user.profileDTO?.address || 'N/A',
      }));


      
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers); // Initialize filteredUsers
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    setFilteredUsers(
      users.filter(user =>
        user.fullName.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleDelete = async (row) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/users/${row.id}`);
      if (response.status === 200) {
        handleUserSuccess('Deleted user successfully');
      } else {
        console.error("Failed to delete the user:", response.data);
      }
    } catch (error) {
      console.error("Error while deleting the user:", error);
    }
  };

  const columns = [
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 300 },
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'status', headerName: 'Active', width: 100, renderCell: (params) => (params.value ? 'Yes' : 'No') },
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
        params.row.status ? (
            // Hiển thị nút Block nếu Active = true
            <GridActionsCellItem
              className="action-btn delete-btn"
              icon={<i className='bx bx-user-x'></i>}
              label="Block"
            //   onClick={() => handleBlock(params.row)}
              showInMenu
            />
          ) : (
            // Hiển thị nút Unban nếu Active = false
            <GridActionsCellItem
              className="action-btn edit-btn"
              icon={<i className='bx bx-user-check'></i>}
              label="Unblock"
            //   onClick={() => handleUnban(params.row)}
              showInMenu
            />
          ),
      ],
    },
  ];

  return (
    <div className="bottom-data">
      <div className="orders">
        <div className="header">
          <i className='bx bx-receipt'></i>
          <h3>Users List</h3>

          {/* Tooltip to open Create User Modal */}
          <Tooltip title="Create New User" placement="left">
            <IconButton
              color="primary"
              onClick={handleCreateUser}
              style={{ marginLeft: '20px' }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>

          {/* You can implement a CreateUserModal component */}
          {/* <CreateUserModal open={isCreateModalOpen} onClose={handleCloseModal} onUserCreated={handleUserCreated} /> */}
          <EditUserModal
          open={isEditModalOpen}
          user={selectedUser}
          onClose={handleCloseModal}
          onUserEdited={handleUserSuccess}
          onSave={(updatedUser) => {
            console.log("Updated Blog:", updatedUser);
            // Handle the save logic here (e.g., send an API request to update the blog)
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
          }}
        />
      

          <TextField
            className='text-field'
            label="Search by name..."
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            size="small"
            style={{ marginBottom: '10px', width: '50%' }}
          />
        </div>

        {message && (
          <div className="alert-container">
            <div className="alert">{message}</div>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid
              className="data-grid"
              rows={filteredUsers}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              getRowId={(row) => row.id}
              disableSelectionOnClick
              sx={{
                fontSize: 14,
              }}
              checkboxSelection
            />
          </div>
        )}
      </div>
    </div>
  );
}
