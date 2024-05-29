import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Box, TableRow, Paper, Switch, IconButton, Button, Avatar } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';

const initialUsers = [
  { id: 1, name: 'Jese Leos', role: 'Administrator', status: 'Active', social: ['https://github.com', 'https://twitter.com', 'https://linkedin.com', 'g'], promote: true, rating: 4.7, lastLogin: '20 Nov 2022' },
  { id: 2, name: 'Bonnie Green', role: 'Viewer', status: 'Inactive', social: ['https://github.com', 'https://twitter.com', 'https://linkedin.com'], promote: false, rating: 3.9, lastLogin: '23 Nov 2022' },
  // Añadir más usuarios según sea necesario
];

function UserTable() {
  const [users, setUsers] = useState(initialUsers);

  const handleTogglePromote = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, promote: !user.promote } : user
    ));

  };

  const setStatusColor = (userStatus) =>{
    if (userStatus === "Active"){
      return "green";
    }
    else if (userStatus === "Inactive"){
      return "red";
    }
    else{
      return "grey";
    }
  }

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <>
      <Button variant="contained" color="primary" startIcon={<Add />}>
        Add new user
      </Button>
      
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box display={"flex"} alignItems="center">
                  <Avatar src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" alt={user.name}/>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Box display={"flex"} alignItems={"center"}>
                    
                  <CircleIcon sx = {{color: setStatusColor(user.status)}}/>
                  
                  {user.status}
                  </Box>
                  

                  </TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <a href={user.social[0]} target="_blank" rel="noreferrer"> 
                    <img src="/gitHub.png" height={"35px"} alt="GitHub"></img>
                    </a>
                  </IconButton>
                  <IconButton color="primary">
                    <a href={user.social[1]} target="_blank" rel="noreferrer"> 
                    <img src="/x.png" height={"30px"} alt="X"></img>
                    </a>
                  </IconButton>
                  <IconButton color="primary">
                    <a href={user.social[2]} target="_blank" rel="noreferrer"> 
                    <img src="/linkedin.png" height={"35px"} alt="Instagram"></img>
                    </a>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Switch checked={user.promote} onChange={() => handleTogglePromote(user.id)} />
                </TableCell>
                <TableCell>{user.rating}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton sx={{color: "red"}} onClick={() => handleDelete(user.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UserTable;
