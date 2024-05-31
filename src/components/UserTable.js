import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Box, TableRow, Paper, Switch, IconButton, Button, Avatar } from '@mui/material';
import { Edit, Delete, Add, UpdateRounded } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import AddUser from './AddUser';
import EditUser from './EditUser';

const initialUsers = [];



function UserTable() {
  const [users, setUsers] = useState(initialUsers || []);
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const setInitialUsers = () =>{
    fetch('http://localhost:3001/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding the user');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleTogglePromote = (id) => {
    return fetch('http://localhost:3001/users/' + id)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching the user');
        }
        return response.json();
      })
      .then(data => {
        let user = data;
        user.promote = !user.promote;
        delete user._id;
        return user; // Devuelve el usuario modificado
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  const updatePromote = (id) => {
    handleTogglePromote(id).then(user => {
      if (!user) {
        // Manejar caso donde user es undefined
        console.error('User not found or an error occurred');
        return;
      }
  
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
  
      fetch('http://localhost:3001/users/' + id, requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error updating the user');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          setInitialUsers();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  };

  const setStatusColor = (userStatus) => {
    if (userStatus === "Active") {
      return "green";
    } else if (userStatus === "Inactive") {
      return "red";
    } else {
      return "grey";
    }
  };

  const setAvatar = (avatar) => {
    if (avatar === "") {
      return "/avatar.png";
    } else {
      return avatar;
    }
  };

  const handleAddUser = (newUser) => {
    const requestOptions = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newUser) 
    };
    

    fetch('http://localhost:3001/users', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding the user');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleEditUser = (updatedUser, id) => {
    const requestOptions = {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(updatedUser) 
    };
    

    fetch('http://localhost:3001/users/' + id, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error editing the user');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDelete = (id) => {
    const requestOptions = {
      method: 'DELETE', 
      headers: { 'Content-Type': 'application/json' }, 
    };
    

    fetch('http://localhost:3001/users/' + id, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error adding the user');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = (user) => {
    setSelectedUser(user);
    setOpenE(true);
  };

  const handleCloseEdit = () => {
    setOpenE(false);
    setSelectedUser(null);
  };

  setInitialUsers();

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleClickOpen}>
        Add new user
      </Button>

      <AddUser open={open} handleClose={handleClose} handleAddUser={handleAddUser} />
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'><b>User</b></TableCell>
              <TableCell align='center'><b>User Role</b></TableCell>
              <TableCell align='center'><b>Status</b></TableCell>
              <TableCell align='center'><b>Social Profile</b></TableCell>
              <TableCell align='center'><b>Promote</b></TableCell>
              <TableCell align='center'><b>Rating</b></TableCell>
              <TableCell align='center'><b>Last Login</b></TableCell>
              <TableCell align='center'><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Box display={"flex"} alignItems="center">
                      <Avatar src={setAvatar(user.avatar)} alt={user.name} />
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Box display={"flex"} alignItems={"center"}>
                      <CircleIcon sx={{ color: setStatusColor(user.status) }} />
                      {user.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <a href={user.gitHub} target="_blank" rel="noreferrer">
                        <img src="/gitHub.png" height={"35px"} alt="GitHub"></img>
                      </a>
                    </IconButton>
                    <IconButton color="primary">
                      <a href={user.x} target="_blank" rel="noreferrer">
                        <img src="/x.png" height={"30px"} alt="X"></img>
                      </a>
                    </IconButton>
                    <IconButton color="primary">
                      <a href={user.linkedIn} target="_blank" rel="noreferrer">
                        <img src="/linkedin.png" height={"35px"} alt="Instagram"></img>
                      </a>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Switch checked={user.promote} onChange={() => updatePromote(user._id)} />
                  </TableCell>
                  <TableCell>{user.rating}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleClickOpenEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton sx={{ color: "red" }} onClick={() => handleDelete(user._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No users available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUser 
          open={openE} 
          handleClose={handleCloseEdit} 
          handleEditUser={handleEditUser} 
          user={selectedUser} 
        />
      )}
    </>
  );
}

export default UserTable;
